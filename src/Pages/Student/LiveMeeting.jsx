import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video, Calendar, Play, X, Trash2,
  Sparkles, AlertCircle, Search,
  Radio, History, Loader2
} from "lucide-react";

const mockMeetings = [
  { id: 1, title: "React Hooks Deep Dive", course: { title: "Advanced React" }, startTime: new Date().toISOString(), status: "Live", meetingUrl: "https://meet.jit.si/room1" },
  { id: 2, title: "Intro to Machine Learning", course: { title: "AI Fundamentals" }, startTime: new Date(Date.now() + 86400000).toISOString(), status: "Upcoming", meetingUrl: "https://meet.jit.si/room2" },
  { id: 3, title: "Database Design Principles", course: { title: "SQL Mastery" }, startTime: new Date(Date.now() - 86400000).toISOString(), status: "Ended", meetingUrl: "https://meet.jit.si/room3" },
  { id: 4, title: "GraphQL vs REST", course: { title: "API Design" }, startTime: new Date(Date.now() + 172800000).toISOString(), status: "Upcoming", meetingUrl: "https://meet.jit.si/room4" },
  { id: 5, title: "TypeScript Generics", course: { title: "TypeScript Pro" }, startTime: new Date().toISOString(), status: "Live", meetingUrl: "https://meet.jit.si/room5" },
  { id: 6, title: "Kubernetes for Beginners", course: { title: "DevOps Bootcamp" }, startTime: new Date(Date.now() - 172800000).toISOString(), status: "Ended", meetingUrl: "https://meet.jit.si/room6" },
];

const Badge = ({ children, color = "neutral", pulse }) => {
  const map = {
    success: "admin-badge-success border border-transparent",
    info: "admin-badge-info border border-transparent",
    neutral: "admin-badge-neutral border border-transparent",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${map[color] || map.neutral}`}>
      {pulse && <span className="size-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </span>
  );
};

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  const styles = {
    success: "bg-white text-[#34C759]",
    error: "bg-white text-[#FF3B30]",
  };
  const icons = { success: <Sparkles size={18} />, error: <AlertCircle size={18} /> };
  return (
    <div className={`fixed top-6 right-6 z-[60] px-5 py-3.5 rounded-2xl shadow-xl border border-[#D2D2D7] text-sm font-semibold flex items-center gap-3 animate-admin-slideDown ${styles[type]}`}>
      {icons[type]} <span className="text-[#1D1D1F]">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 text-[#86868B]"><X size={14} /></button>
    </div>
  );
};

const Card = ({ children, className = "", delay = 0 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={`bg-white rounded-[20px] border border-[#D2D2D7]/60 shadow-sm transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}>
      {children}
    </div>
  );
};

export default function StudentLiveMeeting() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { setVisible(true); }, []);

  const showToast = useCallback((message, type = "success") => setToast({ message, type }), []);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    setTimeout(() => {
      setMeetings(mockMeetings);
      setLoading(false);
    }, 600);
  }, []);

  const canJoin = useCallback((meeting) => {
    const start = new Date(meeting.startTime);
    return new Date() >= start;
  }, []);

  const getStatus = useCallback((meeting) => {
    if (meeting.status === "Live") return "Live";
    if (meeting.status === "Ended" || meeting.status === "Cancelled") return "Ended";
    return "Upcoming";
  }, []);

  const filteredMeetings = useMemo(() => {
    if (!searchQuery.trim()) return meetings;
    const q = searchQuery.toLowerCase();
    return meetings.filter((m) =>
      m.title.toLowerCase().includes(q) ||
      (m.course?.title || "").toLowerCase().includes(q)
    );
  }, [meetings, searchQuery]);

  const activeMeetings = useMemo(() => filteredMeetings.filter((m) => getStatus(m) !== "Ended"), [filteredMeetings, getStatus]);
  const pastMeetings = useMemo(() => meetings.filter((m) => getStatus(m) === "Ended"), [meetings, getStatus]);

  const handleDelete = async (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
    showToast("Meeting deleted");
  };

  const handleEnd = async (id) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Ended" } : m)));
    showToast("Meeting ended");
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Live": return { badge: "success", icon: Radio, text: "Live Now", pulse: true };
      case "Upcoming": return { badge: "info", icon: Calendar, text: "Upcoming", pulse: false };
      default: return { badge: "neutral", icon: History, text: "Ended", pulse: false };
    }
  };

  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " · " +
      d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#86868B]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {toast && <Toast {...toast} onClose={dismissToast} />}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
            />
          </div>

        </div>

        {/* Active Meetings Grid */}
        {activeMeetings.length === 0 && pastMeetings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#E8E8ED] flex items-center justify-center mx-auto mb-4">
              <Video size={28} className="text-[#86868B]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">No meetings yet</h3>
            <p className="text-sm text-[#86868B] mb-4">Check back later for scheduled live sessions.</p>
          </div>
        ) : (
          <>
            {activeMeetings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {activeMeetings.map((m, i) => {
                  const status = getStatus(m);
                  const sc = getStatusConfig(status);
                  const StatusIcon = sc.icon;
                  return (
                    <Card key={m.id} delay={300 + i * 80} className="group overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className={`h-1 w-full ${status === "Live" ? "bg-[#34C759]" : "bg-[#0071E3]"}`} />

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge color={sc.badge} pulse={sc.pulse}>
                            <StatusIcon size={10} /> {sc.text}
                          </Badge>
                          <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg text-[#86868B] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <h3 className="font-semibold text-[#1D1D1F] text-base mb-1 leading-tight">{m.title}</h3>
                        {m.course && <p className="text-xs text-[#86868B] font-medium mb-4">{m.course.title}</p>}

                        <div className="space-y-2.5 mb-5">
                          <div className="flex items-center gap-2.5 text-xs text-[#86868B]">
                            <div className="w-7 h-7 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
                              <Calendar size={13} className="text-[#86868B]" />
                            </div>
                            <span className="font-medium">{formatDateTime(m.startTime)}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#E8E8ED]">
                          {status === "Live" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/admin/live-room?room=${encodeURIComponent(m.meetingUrl?.split("/").pop() || "")}&name=Admin&id=${m.id}`)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#34C759] hover:bg-[#2DB84E] text-white rounded-full text-xs font-semibold transition-all active:scale-[0.98]"
                              >
                                <Play size={14} fill="currentColor" /> Join Now
                              </button>
                              <button onClick={() => handleEnd(m.id)}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF3B30] hover:bg-[#D93025] text-white rounded-full text-xs font-semibold transition-all active:scale-[0.98]"
                              >
                                <X size={14} /> End
                              </button>
                            </div>
                          ) : status === "Upcoming" && canJoin(m) ? (
                            <button
                              onClick={() => {
                                setMeetings((prev) => prev.map((x) => (x.id === m.id ? { ...x, status: "Live" } : x)));
                                navigate(`/admin/live-room?room=${encodeURIComponent(m.meetingUrl?.split("/").pop() || "")}&name=Admin&id=${m.id}`);
                              }}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0071E3] hover:bg-[#0056B3] text-white rounded-full text-xs font-semibold transition-all active:scale-[0.98]"
                            >
                              <Play size={14} fill="currentColor" /> Start Meeting
                            </button>
                          ) : status === "Upcoming" ? (
                            <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E8E8ED] text-[#86868B] rounded-full text-xs font-semibold cursor-default">
                              <Calendar size={14} /> Scheduled
                            </button>
                          ) : (
                            <button disabled className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E8E8ED] text-[#86868B] rounded-full text-xs font-semibold cursor-default">
                              <History size={14} /> Ended
                            </button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-4">Past Meetings ({pastMeetings.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pastMeetings.map((m, i) => (
                    <Card key={m.id} delay={300 + i * 80} className="group overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300">
                      <div className="h-1 bg-[#D2D2D7] w-full" />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge color="neutral">
                            <History size={10} /> Ended
                          </Badge>
                          <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg text-[#86868B] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h3 className="font-semibold text-[#86868B] text-base mb-1 leading-tight">{m.title}</h3>
                        {m.course && <p className="text-xs text-[#A1A1A6] font-medium mb-4">{m.course.title}</p>}
                        <div className="flex items-center gap-2.5 text-xs text-[#86868B]">
                          <div className="w-7 h-7 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
                            <Calendar size={13} className="text-[#86868B]" />
                          </div>
                          <span className="font-medium">{formatDateTime(m.startTime)}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
