import { useState } from 'react';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle, BarChart3, Flame, Target, Calendar, Zap, ChevronRight, FileText, Video, HelpCircle, ClipboardList, Users } from 'lucide-react';

const coursesProgress = [
  { id: 1, title: "Physics – 3rd Secondary", progress: 72, color: "#0071E3", grade: 85, lessonsCompleted: 18, totalLessons: 25, lastActivity: "2h ago", instructor: "Dr. Mohamed" },
  { id: 2, title: "Pure Math – 3rd Secondary", progress: 45, color: "#FF9F0A", grade: 72, lessonsCompleted: 11, totalLessons: 24, lastActivity: "1d ago", instructor: "Mr. Khaled" },
  { id: 3, title: "Chemistry – 3rd Secondary", progress: 90, color: "#34C759", grade: 91, lessonsCompleted: 26, totalLessons: 29, lastActivity: "5h ago", instructor: "Ms. Fatima" },
  { id: 4, title: "Solid Geometry – 3rd Secondary", progress: 30, color: "#AF52DE", grade: 65, lessonsCompleted: 5, totalLessons: 17, lastActivity: "3d ago", instructor: "Mr. Khaled" },
  { id: 5, title: "Mechanics – 2nd Secondary", progress: 100, color: "#34C759", grade: 96, lessonsCompleted: 22, totalLessons: 22, lastActivity: "1w ago", instructor: "Dr. Mohamed" },
  { id: 6, title: "English – 1st Secondary", progress: 100, color: "#34C759", grade: 94, lessonsCompleted: 16, totalLessons: 16, lastActivity: "2w ago", instructor: "Ms. Aya" },
];

const weeklyActivity = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 3.0 }, { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4.0 }, { day: "Fri", hours: 0.5 }, { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 2.0 },
];

const monthlyActivity = [
  { day: "Week 1", hours: 14 }, { day: "Week 2", hours: 18 }, { day: "Week 3", hours: 12 }, { day: "Week 4", hours: 20 },
];

const subjectPerformance = [
  { subject: "Physics", score: 85, color: "#0071E3" },
  { subject: "Pure Math", score: 72, color: "#FF9F0A" },
  { subject: "Chemistry", score: 91, color: "#34C759" },
  { subject: "Solid Geometry", score: 65, color: "#AF52DE" },
  { subject: "Mechanics", score: 96, color: "#5856D6" },
  { subject: "English", score: 94, color: "#FF6482" },
];

const quizData = [
  { course: "Physics – 3rd Secondary", completed: 4, total: 5, avgScore: 82, color: "#0071E3" },
  { course: "Pure Math – 3rd Secondary", completed: 2, total: 3, avgScore: 75, color: "#FF9F0A" },
  { course: "Chemistry – 3rd Secondary", completed: 2, total: 2, avgScore: 94, color: "#34C759" },
  { course: "Solid Geometry – 3rd Secondary", completed: 1, total: 2, avgScore: 68, color: "#AF52DE" },
  { course: "English – 1st Secondary", completed: 1, total: 1, avgScore: 90, color: "#FF6482" },
];

const assignmentData = [
  { course: "Physics – 3rd Secondary", submitted: 3, total: 4, graded: 3, avgScore: 88, color: "#0071E3" },
  { course: "Pure Math – 3rd Secondary", submitted: 1, total: 2, graded: 1, avgScore: 70, color: "#FF9F0A" },
  { course: "Chemistry – 3rd Secondary", submitted: 1, total: 1, graded: 1, avgScore: 95, color: "#34C759" },
  { course: "Mechanics – 2nd Secondary", submitted: 2, total: 2, graded: 2, avgScore: 92, color: "#5856D6" },
  { course: "English – 1st Secondary", submitted: 1, total: 1, graded: 0, avgScore: null, color: "#FF6482" },
];

const examData = [
  { course: "Physics – 3rd Secondary", taken: 1, total: 1, avgScore: 86, color: "#0071E3" },
  { course: "Chemistry – 3rd Secondary", taken: 1, total: 1, avgScore: 93, color: "#34C759" },
  { course: "Mechanics – 2nd Secondary", taken: 1, total: 1, avgScore: 90, color: "#5856D6" },
];

const attendanceData = [
  { course: "Physics – 3rd Secondary", attended: 8, total: 10, color: "#0071E3" },
  { course: "Pure Math – 3rd Secondary", attended: 4, total: 7, color: "#FF9F0A" },
  { course: "Chemistry – 3rd Secondary", attended: 6, total: 6, color: "#34C759" },
  { course: "Solid Geometry – 3rd Secondary", attended: 2, total: 5, color: "#AF52DE" },
  { course: "Mechanics – 2nd Secondary", attended: 4, total: 4, color: "#5856D6" },
  { course: "English – 1st Secondary", attended: 2, total: 3, color: "#FF6482" },
];

const recentActivity = [
  { type: "completed", item: "Newton's Laws Problem Set", course: "Physics – 3rd Secondary", time: "2 hours ago", icon: FileText, color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  { type: "watched", item: "Coulomb's Law", course: "Physics – 3rd Secondary", time: "4 hours ago", icon: Video, color: "text-[#0071E3]", bg: "bg-[#0071E3]/10" },
  { type: "quiz", item: "Energy Quiz", course: "Physics – 3rd Secondary", time: "1 day ago", icon: HelpCircle, color: "text-[#FF9F0A]", bg: "bg-[#FF9F0A]/10" },
  { type: "completed", item: "Hydrocarbons", course: "Chemistry – 3rd Secondary", time: "5 hours ago", icon: FileText, color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  { type: "exam", item: "Organic Chemistry Quiz", course: "Chemistry – 3rd Secondary", time: "2 days ago", icon: ClipboardList, color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
  { type: "watched", item: "Limit & Continuity", course: "Pure Math – 3rd Secondary", time: "1 day ago", icon: Video, color: "text-[#0071E3]", bg: "bg-[#0071E3]/10" },
];

export default function StudentProgress() {
  const [view, setView] = useState("weekly");

  const totalCourses = coursesProgress.length;
  const completed = coursesProgress.filter(c => c.progress === 100).length;
  const inProgress = coursesProgress.filter(c => c.progress > 0 && c.progress < 100).length;
  const avgScore = Math.round(coursesProgress.reduce((s, c) => s + c.grade, 0) / totalCourses);
  const totalStudyHours = weeklyActivity.reduce((s, d) => s + d.hours, 0);

  const totalQuizzes = quizData.reduce((s, d) => s + d.total, 0);
  const completedQuizzes = quizData.reduce((s, d) => s + d.completed, 0);
  const avgQuizScore = Math.round(quizData.filter(d => d.avgScore).reduce((s, d) => s + d.avgScore, 0) / quizData.filter(d => d.avgScore).length);

  const totalAssignments = assignmentData.reduce((s, d) => s + d.total, 0);
  const submittedAssignments = assignmentData.reduce((s, d) => s + d.submitted, 0);
  const gradedAssignments = assignmentData.filter(d => d.avgScore).length;
  const avgAssignmentScore = gradedAssignments > 0 ? Math.round(assignmentData.filter(d => d.avgScore).reduce((s, d) => s + d.avgScore, 0) / gradedAssignments) : 0;

  const totalExams = examData.reduce((s, d) => s + d.total, 0);
  const takenExams = examData.reduce((s, d) => s + d.taken, 0);
  const avgExamScore = Math.round(examData.filter(d => d.avgScore).reduce((s, d) => s + d.avgScore, 0) / examData.filter(d => d.avgScore).length);

  const totalSessions = attendanceData.reduce((s, d) => s + d.total, 0);
  const attendedSessions = attendanceData.reduce((s, d) => s + d.attended, 0);
  const attendanceRate = Math.round((attendedSessions / totalSessions) * 100);

  return (
    <div className="p-6 space-y-8 pb-16">
      {/* ─── Welcome ─── */}
      <div>
        <h1 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">Your Progress</h1>
        <p className="text-sm text-[#86868B] mt-1">Track your learning journey across all courses</p>
      </div>

      {/* ─── Stats Row ─── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Enrolled", value: totalCourses, icon: BookOpen, color: "text-[#0071E3]", bg: "bg-[#0071E3]/10" },
          { label: "Completed", value: completed, icon: CheckCircle, color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
          { label: "In Progress", value: inProgress, icon: BarChart3, color: "text-[#FF9F0A]", bg: "bg-[#FF9F0A]/10" },
          { label: "Avg Score", value: `${avgScore}%`, icon: Award, color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/10" },
          { label: "Study Hours", value: totalStudyHours, icon: Clock, color: "text-[#5856D6]", bg: "bg-[#5856D6]/10" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E8ED] hover:shadow-sm transition-all">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={20} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{s.value}</p>
              <p className="text-xs font-medium text-[#86868B] mt-1 uppercase tracking-wide">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Assessment & Attendance Stats ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Quizzes Done", value: `${completedQuizzes}/${totalQuizzes}`, sub: `Avg ${avgQuizScore}%`, icon: HelpCircle, color: "text-[#FF9F0A]", bg: "bg-[#FF9F0A]/10" },
          { label: "Assignments", value: `${submittedAssignments}/${totalAssignments}`, sub: `${gradedAssignments} graded · ${avgAssignmentScore}%`, icon: FileText, color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
          { label: "Exams Taken", value: `${takenExams}/${totalExams}`, sub: `Avg ${avgExamScore}%`, icon: ClipboardList, color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
          { label: "Attendance", value: `${attendedSessions}/${totalSessions}`, sub: `${attendanceRate}% rate`, icon: Users, color: "text-[#0071E3]", bg: "bg-[#0071E3]/10" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E8ED] hover:shadow-sm transition-all">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={20} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{s.value}</p>
              <p className="text-xs font-medium text-[#86868B] mt-1 uppercase tracking-wide">{s.label}</p>
              <p className="text-[11px] font-medium mt-1" style={{ color: s.color }}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ─── Course Progress ─── */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E8E8ED]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#0071E3]/10 rounded-xl">
                <Target size={18} className="text-[#0071E3]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Course Progress</h3>
            </div>
            <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{completed}/{totalCourses} completed</span>
          </div>
          <div className="space-y-5">
            {coursesProgress.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1D1D1F] truncate">{c.title}</p>
                    <p className="text-xs text-[#86868B] mt-0.5">{c.lessonsCompleted}/{c.totalLessons} lessons · Last {c.lastActivity}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-bold" style={{ color: c.color }}>{c.progress}%</p>
                    {c.progress === 100 && <p className="text-[10px] font-medium text-[#34C759]">Grade: {c.grade}%</p>}
                  </div>
                </div>
                <div className="w-full h-2 bg-[#F0F0F2] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${c.progress}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Column ─── */}
        <div className="space-y-6">

          {/* ─── Streak ─── */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#FF9F0A]/10 rounded-xl">
                <Flame size={18} className="text-[#FF9F0A]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Streak</h3>
            </div>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-[#FF9F0A]">7</div>
              <p className="text-sm text-[#86868B] mt-2">day streak 🔥</p>
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold ${i < 5 ? 'bg-[#FF9F0A] text-white' : i === 5 ? 'bg-[#FF9F0A]/40 text-[#86868B]' : 'bg-[#F5F5F7] text-[#D2D2D7]'}`}>{d}</div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Subject Performance ─── */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#AF52DE]/10 rounded-xl">
                <Award size={18} className="text-[#AF52DE]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Performance</h3>
            </div>
            <div className="space-y-3">
              {subjectPerformance.map((s) => (
                <div key={s.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#1D1D1F]">{s.subject}</span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F0F0F2] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${s.score}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Active Time ─── */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-[#5856D6]/10 rounded-xl">
                <Clock size={18} className="text-[#5856D6]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Active Time</h3>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setView("weekly")} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${view === "weekly" ? "bg-[#5856D6] text-white" : "bg-[#F5F5F7] text-[#86868B] hover:bg-[#E8E8ED]"}`}>Weekly</button>
              <button onClick={() => setView("monthly")} className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${view === "monthly" ? "bg-[#5856D6] text-white" : "bg-[#F5F5F7] text-[#86868B] hover:bg-[#E8E8ED]"}`}>Monthly</button>
            </div>
            <div className="space-y-2">
              {(view === "weekly" ? weeklyActivity : monthlyActivity).map((d, i) => {
                const max = Math.max(...(view === "weekly" ? weeklyActivity : monthlyActivity).map(x => x.hours));
                const pct = (d.hours / max) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#86868B] w-10 shrink-0">{d.day}</span>
                    <div className="flex-1 h-5 bg-[#F0F0F2] rounded-lg overflow-hidden">
                      <div className="h-full rounded-lg bg-gradient-to-r from-[#5856D6] to-[#007AFF] transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-[#1D1D1F] w-8 text-right">{d.hours}h</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E8E8ED] flex items-center justify-between">
              <span className="text-xs text-[#86868B]">Total this {view === "weekly" ? "week" : "month"}</span>
              <span className="text-lg font-bold text-[#5856D6]">{(view === "weekly" ? weeklyActivity : monthlyActivity).reduce((s, d) => s + d.hours, 0)}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quiz Progress ─── */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FF9F0A]/10 rounded-xl">
              <HelpCircle size={18} className="text-[#FF9F0A]" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Quiz Progress</h3>
          </div>
          <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{completedQuizzes}/{totalQuizzes} completed · Avg {avgQuizScore}%</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizData.map((q) => (
            <div key={q.course} className="p-4 bg-[#F5F5F7] rounded-2xl">
              <p className="text-sm font-semibold text-[#1D1D1F] truncate mb-3">{q.course}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#86868B]">Completed</span>
                <span className="text-xs font-bold text-[#1D1D1F]">{q.completed}/{q.total}</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8E8ED] rounded-full mb-3 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(q.completed / q.total) * 100}%`, backgroundColor: q.color }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#86868B]">Avg Score</span>
                <span className="text-sm font-bold" style={{ color: q.color }}>{q.avgScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Assignment Progress ─── */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#34C759]/10 rounded-xl">
              <FileText size={18} className="text-[#34C759]" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Assignment Progress</h3>
          </div>
          <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{submittedAssignments}/{totalAssignments} submitted</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignmentData.map((a) => (
            <div key={a.course} className="p-4 bg-[#F5F5F7] rounded-2xl">
              <p className="text-sm font-semibold text-[#1D1D1F] truncate mb-3">{a.course}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#86868B]">Submitted</span>
                <span className="text-xs font-bold text-[#1D1D1F]">{a.submitted}/{a.total}</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8E8ED] rounded-full mb-3 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${(a.submitted / a.total) * 100}%`, backgroundColor: a.color }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#86868B]">{a.graded > 0 ? `Graded · ${a.avgScore}%` : "Pending grading"}</span>
                <span className="text-sm font-bold" style={{ color: a.graded > 0 ? a.color : "#A1A1A6" }}>{a.graded > 0 ? `${a.avgScore}%` : "—"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Exam Progress ─── */}
      {examData.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FF3B30]/10 rounded-xl">
                <ClipboardList size={18} className="text-[#FF3B30]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Exam Progress</h3>
            </div>
            <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{takenExams}/{totalExams} taken · Avg {avgExamScore}%</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {examData.map((e) => (
              <div key={e.course} className="p-4 bg-[#F5F5F7] rounded-2xl">
                <p className="text-sm font-semibold text-[#1D1D1F] truncate mb-3">{e.course}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#86868B]">Taken</span>
                  <span className="text-xs font-bold text-[#1D1D1F]">{e.taken}/{e.total}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E8E8ED] rounded-full mb-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(e.taken / e.total) * 100}%`, backgroundColor: e.color }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#86868B]">Score</span>
                  <span className="text-sm font-bold" style={{ color: e.color }}>{e.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Live Meeting Attendance ─── */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0071E3]/10 rounded-xl">
              <Users size={18} className="text-[#0071E3]" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Live Meeting Attendance</h3>
          </div>
          <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{attendedSessions}/{totalSessions} attended · {attendanceRate}%</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendanceData.map((a) => {
            const rate = Math.round((a.attended / a.total) * 100);
            return (
              <div key={a.course} className="p-4 bg-[#F5F5F7] rounded-2xl">
                <p className="text-sm font-semibold text-[#1D1D1F] truncate mb-3">{a.course}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#86868B]">Attended</span>
                  <span className="text-xs font-bold text-[#1D1D1F]">{a.attended}/{a.total}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E8E8ED] rounded-full mb-3 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${rate}%`, backgroundColor: a.color }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#86868B]">Rate</span>
                  <span className="text-sm font-bold" style={{ color: a.color }}>{rate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Recent Activity ─── */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E8ED]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-[#34C759]/10 rounded-xl">
            <Zap size={18} className="text-[#34C759]" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">Recent Activity</h3>
        </div>
        <div className="space-y-1">
          {recentActivity.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-[#F5F5F7] rounded-2xl transition-all group cursor-default">
                <div className={`w-10 h-10 ${a.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1D1D1F] truncate">{a.item}</p>
                  <p className="text-xs text-[#86868B]">{a.course}</p>
                </div>
                <span className="text-xs text-[#A1A1A6] shrink-0">{a.time}</span>
                <ChevronRight size={14} className="text-[#D2D2D7] group-hover:text-[#86868B] transition-colors shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
