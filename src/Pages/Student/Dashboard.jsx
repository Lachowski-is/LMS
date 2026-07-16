import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Bot, TrendingUp, Video, Bell, User, LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import StudentCourses from './Courses';
import StudentCourseDetails from './CourseDetails';
import StudentAITutor from './AITutor';
import StudentProgress from './Progress';
import StudentLiveMeeting from './LiveMeeting';
import StudentNotification from './Notification';
import StudentProfileSettings from './ProfileSettings';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const SIDEBAR_ITEMS = [
    { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/student/courses' },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Bot, path: '/student/ai-tutor' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/student/progress' },
    { id: 'meetings', label: 'Live Meetings', icon: Video, path: '/student/meetings' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/student/notifications' },
    { id: 'profile', label: 'Profile', icon: User, path: '/student/profile-settings' },
  ];

  const isActive = (path) => location.pathname === path;
  const isCourseDetails = location.pathname.startsWith('/student/course/');

  const closeMobile = () => setMobileMenuOpen(false);

  const navigateMobile = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (isCourseDetails) return <StudentCourseDetails />;
    switch (location.pathname) {
      case '/student':
      case '/student/courses':
        return <StudentCourses />;
      case '/student/ai-tutor':
        return <StudentAITutor />;
      case '/student/progress':
        return <StudentProgress />;
      case '/student/meetings':
        return <StudentLiveMeeting />;
      case '/student/notifications':
        return <StudentNotification />;
      case '/student/profile-settings':
        return <StudentProfileSettings />;
      default:
        return <StudentCourses />;
    }
  };

  if (isCourseDetails) {
    return <StudentCourseDetails />;
  }

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-50">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
          <img src="/Lumora.png" alt="Lumora" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-[#1D1D1F] truncate">Lumora</h1>
          <p className="text-xs text-[#86868B] truncate">Student Portal</p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigateMobile(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E8E8ED]">
        <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#86868B] hover:bg-[#D2D2D7] hover:text-red-500 transition-colors">
          <LogOut size={20} />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#1D1D1F] flex text-base">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="sidebar-desktop w-[220px] fixed left-0 top-0 h-screen bg-white border-r border-[#E8E8ED] flex flex-col z-50">
        {sidebarContent}
      </aside>

      {/* ─── Mobile Sidebar Overlay ─── */}
      {mobileMenuOpen && (
        <div className="sidebar-mobile-overlay lg:hidden" onClick={closeMobile} />
      )}
      <aside className={`sidebar-mobile-drawer lg:hidden ${mobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <img src="/Lumora.png" alt="Lumora" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <h1 className="text-sm font-bold text-[#1D1D1F]">Lumora</h1>
              <p className="text-[11px] text-[#86868B]">Student Portal</p>
            </div>
          </div>
          <button onClick={closeMobile} className="p-1.5 hover:bg-[#E8E8ED] rounded-lg text-[#86868B]">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigateMobile(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}
              >
                <Icon size={20} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#E8E8ED]">
          <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#86868B] hover:bg-[#D2D2D7] hover:text-red-500 transition-colors">
            <LogOut size={20} />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="main-content-mobile ml-[220px] flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-[#E8E8ED]/80 shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-[#E8E8ED] rounded-lg text-[#86868B] transition-colors lg:hidden touch-target flex items-center justify-center">
                <Menu size={20} />
              </button>
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-2 hover:bg-[#E8E8ED] rounded-lg text-[#86868B] transition-colors hidden lg:flex items-center justify-center">
                {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
              <h1 className="text-base lg:text-lg font-bold text-[#1D1D1F]">
                {SIDEBAR_ITEMS.find(i => isActive(i.path))?.label || 'My Courses'}
              </h1>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
