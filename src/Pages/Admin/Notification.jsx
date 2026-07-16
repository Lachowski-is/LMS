import React, { useState } from 'react';
import { Bell, Search, X, CheckCircle, XCircle, ShieldAlert, UserCheck, Clock, Video, UserPlus, Filter, CheckSquare } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, title: 'New enrollment: Physics 3rd Sec', description: 'Ahmed Hassan enrolled in Physics 3rd Secondary section', time: '2 min ago', type: 'success', icon: UserCheck },
  { id: 2, title: 'Payment failed: Vodafone Cash #8821', description: 'Transaction of 3,500 EGP from Mohamed Ali failed due to insufficient balance', time: '15 min ago', type: 'warning', icon: XCircle },
  { id: 3, title: 'AI Grading complete: 42 submissions', description: 'AI has finished grading Physics Midterm for 3rd Sec — 42 submissions reviewed', time: '1 hr ago', type: 'info', icon: CheckCircle },
  { id: 4, title: 'Security alert: IP collision detected', description: 'Multiple login attempts from unusual IP address 185.23.45.67', time: '2 hrs ago', type: 'danger', icon: ShieldAlert },
  { id: 5, title: 'New student registration: 12 today', description: '12 new students registered across all grades today', time: '3 hrs ago', type: 'success', icon: UserPlus },
  { id: 6, title: 'Assignment deadline approaching: Physics HW', description: 'Physics Homework 3 is due in 2 hours — 18 submissions still pending', time: '5 hrs ago', type: 'warning', icon: Clock },
  { id: 7, title: 'Upcoming live meeting: Physics Review', description: 'Physics Live Review session starts in 30 minutes — 45 attendees expected', time: '8 hrs ago', type: 'info', icon: Video },
  { id: 8, title: 'Payment approved: Mohamed Ali (3,500 EGP)', description: 'Vodafone Cash payment of 3,500 EGP has been approved', time: '10 hrs ago', type: 'success', icon: CheckCircle },
  { id: 9, title: 'New teacher application: Sara Khaled', description: 'Sara Khaled applied for Mathematics teacher position', time: '1 day ago', type: 'info', icon: UserPlus },
  { id: 10, title: 'System update scheduled', description: 'Server maintenance scheduled for Saturday 2:00 AM — 30 min downtime expected', time: '1 day ago', type: 'warning', icon: Clock },
  { id: 11, title: 'Bulk payment processed: 18 students', description: '18 pending payments were approved in bulk by admin', time: '2 days ago', type: 'success', icon: CheckSquare },
  { id: 12, title: 'Fraud alert: Duplicate payment detected', description: 'Payment ticket #9921 appears to be a duplicate of #9874', time: '2 days ago', type: 'danger', icon: ShieldAlert },
];

const TYPE_STYLES = {
  success: 'bg-[#34C759]/10 text-[#34C759] ring-1 ring-[#34C759]/20',
  warning: 'bg-[#FF9500]/10 text-[#FF9500] ring-1 ring-[#FF9500]/20',
  info: 'bg-[#0071E3]/10 text-[#0071E3] ring-1 ring-[#0071E3]/20',
  danger: 'bg-[#FF3B30]/10 text-[#FF3B30] ring-1 ring-[#FF3B30]/20',
};

export default function AdminNotification() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selected, setSelected] = useState([]);

  const filtered = NOTIFICATIONS.filter(n => {
    if (filterType !== 'all' && n.type !== filterType) return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map(n => n.id));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans antialiased text-[#1D1D1F]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1D1D1F]">Notifications</h1>
            <p className="text-sm text-[#86868B] mt-1">Stay updated with everything happening in your academy</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#D2D2D7] text-sm font-medium text-[#86868B]">
            <Bell size={16} />
            <span>{NOTIFICATIONS.length} total</span>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E8E8ED] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#E8E8ED]">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-2xl px-4 py-2.5 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all">
                <Search size={15} className="text-[#86868B]" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notifications..." className="bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none w-full" />
                {search && <button onClick={() => setSearch('')} className="p-0.5 hover:bg-[#D2D2D7] rounded"><X size={14} className="text-[#86868B]" /></button>}
              </div>
              <div className="flex gap-1.5">
                {['all', 'success', 'warning', 'info', 'danger'].map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all capitalize ${filterType === t ? 'bg-[#0071E3] text-white shadow-sm' : 'bg-[#F5F5F7] text-[#86868B] hover:bg-[#E8E8ED]'}`}
                  >{t}</button>
                ))}
              </div>
            </div>
          </div>

          {selected.length > 0 && (
            <div className="px-5 py-3 bg-[#0071E3]/5 border-b border-[#0071E3]/10 flex items-center gap-2">
              <span className="text-xs font-bold text-[#0071E3]">{selected.length} selected</span>
              <button className="ml-auto px-3 py-1 bg-white text-[#0071E3] rounded-lg text-xs font-bold border border-[#D2D2D7] hover:bg-[#F5F5F7] transition-all">Mark as Read</button>
              <button className="px-3 py-1 bg-[#FF3B30] text-white rounded-lg text-xs font-bold hover:bg-[#D93025] transition-all">Dismiss</button>
            </div>
          )}

          <div className="divide-y divide-[#E8E8ED]">
            {filtered.map(n => (
              <div key={n.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-[#F5F5F7] transition-colors ${selected.includes(n.id) ? 'bg-[#0071E3]/5' : ''}`}>
                <div className="pt-0.5">
                  <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleSelect(n.id)} className="rounded accent-[#0071E3] w-4 h-4 cursor-pointer" />
                </div>
                <div className={`p-2 rounded-xl shrink-0 ${TYPE_STYLES[n.type]}`}>
                  <n.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1D1D1F]">{n.title}</p>
                  <p className="text-xs text-[#86868B] mt-0.5">{n.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#86868B] font-medium">{n.time}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full capitalize ${TYPE_STYLES[n.type]}`}>{n.type}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <Bell size={32} className="text-[#C7C7CC] mx-auto mb-3" />
                <p className="text-sm text-[#86868B]">No notifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
