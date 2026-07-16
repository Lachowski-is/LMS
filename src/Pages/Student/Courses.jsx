import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Archive, Trash2, MoreHorizontal } from 'lucide-react';

export default function StudentCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80',
      title: 'Physics – 3rd Secondary',
      description: 'Comprehensive coverage of mechanics, electricity, magnetism, waves, and modern physics for Thanaweya Amma.',
      teachers: ['Dr. Mohamed', 'Mr. Hassan'],
      grade: 12,
      price: 349,
      tags: ['SCIENCE', 'ADVANCED']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=400&q=80',
      title: 'Pure Math – 3rd Secondary',
      description: 'Algebra, calculus, trigonometry, and complex numbers tailored to the Egyptian national curriculum.',
      teachers: ['Mr. Khaled'],
      grade: 12,
      price: 399,
      tags: ['MATH', 'ADVANCED']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1502784444186-359be1869e3f?auto=format&fit=crop&w=400&q=80',
      title: 'Solid Geometry – 3rd Secondary',
      description: '3D geometry, coordinate systems, vectors, and spatial reasoning for advanced level students.',
      teachers: ['Mr. Khaled', 'Ms. Mona'],
      grade: 12,
      price: 249,
      tags: ['MATH', 'GEOMETRY']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
      title: 'Mechanics – 2nd Secondary',
      description: 'Statics, dynamics, friction, and Newtonian mechanics with real-world problem-solving.',
      teachers: ['Dr. Mohamed', 'Ms. Fatima', 'Mr. Hassan'],
      grade: 11,
      price: 279,
      tags: ['SCIENCE', 'INTERMEDIATE']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
      title: 'English – 1st Secondary',
      description: 'Grammar, reading comprehension, essay writing, and vocabulary building for Grade 10 students.',
      teachers: ['Ms. Aya'],
      grade: 10,
      price: 199,
      tags: ['LANGUAGE', 'BEGINNER']
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80',
      title: 'Chemistry – 3rd Secondary',
      description: 'Organic and inorganic chemistry, chemical equations, stoichiometry, and lab techniques.',
      teachers: ['Ms. Fatima', 'Dr. Nour'],
      grade: 12,
      price: 329,
      tags: ['SCIENCE', 'CHEMISTRY']
    }
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setConfirmAction(null);
  };

  const handleArchive = (id) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, archived: true } : c));
    setConfirmAction(null);
  };

  const MY_NAME = 'Dr. Mohamed';
  const filteredCourses = courses.filter(c => 
    !c.archived && c.teachers.includes(MY_NAME) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans antialiased text-[#1D1D1F]">
      <header className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute inset-y-0 left-4 my-auto text-[#86868B]" size={20} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full rounded-xl border border-[#D2D2D7] bg-white py-3 pl-12 pr-4 text-base text-[#1D1D1F] outline-none transition-all focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20"
          />
        </div>

      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="relative flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group"
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            <div className="absolute top-6 right-6 z-10" onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === course.id ? null : course.id); }}>
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-sm transition-all text-[#86868B] hover:text-[#1D1D1F]">
                <MoreHorizontal size={20} />
              </button>
              {openMenuId === course.id && (
                <div className="absolute right-0 top-14 w-48 bg-white rounded-[20px] border border-[#D2D2D7] shadow-xl shadow-black/5 overflow-hidden z-20 animate-admin-fadeIn" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => { setConfirmAction({ type: 'archive', id: course.id }); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors">
                    <Archive size={18} />
                    Archive
                  </button>
                  <button onClick={() => { setConfirmAction({ type: 'delete', id: course.id }); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="relative h-56 w-full overflow-hidden rounded-t-[20px] bg-[#E8E8ED]">
              <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="flex flex-grow flex-col p-8">
              <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F] leading-tight line-clamp-2">{course.title}</h3>
              <p className="mt-3 text-base text-[#86868B] leading-relaxed line-clamp-2">{course.description}</p>

              <div className="mt-6 space-y-3 text-sm text-[#86868B]">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Teachers:</span>
                  <span className="text-[#1D1D1F] font-semibold truncate">{course.teachers.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Grade:</span>
                  <span className="text-[#1D1D1F] font-bold text-lg">{course.grade}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <span className="text-2xl font-bold text-[#1D1D1F]">{course.price} EGP</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-[#D2D2D7]">
                {course.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#E8E8ED] text-[#86868B] text-xs font-semibold rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Confirm Action Modal */}
      {confirmAction && confirmAction.type !== 'select' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-admin-fadeIn" onClick={() => setConfirmAction(null)}>
          <div className="bg-white w-full max-w-sm shadow-xl rounded-[20px] p-8 text-center animate-admin-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${confirmAction.type === 'delete' ? 'bg-[#FF3B30]/10' : 'bg-[#FF9500]/10'}`}>
              {confirmAction.type === 'delete' ? <Trash2 size={40} className="text-[#FF3B30]" /> : <Archive size={40} className="text-[#FF9500]" />}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-[#1D1D1F] mb-3">{confirmAction.type === 'delete' ? 'Delete Course' : 'Archive Course'}</h3>
            <p className="text-base text-[#86868B] mb-8">Are you sure you want to {confirmAction.type} this course? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setConfirmAction(null)} className="px-6 py-3 bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#1D1D1F] rounded-full text-sm font-semibold transition-all">Cancel</button>
              <button onClick={() => confirmAction.type === 'delete' ? handleDelete(confirmAction.id) : handleArchive(confirmAction.id)} className={`px-6 py-3 text-white rounded-full text-sm font-semibold transition-all ${confirmAction.type === 'delete' ? 'bg-[#FF3B30] hover:bg-[#D93025]' : 'bg-[#FF9500] hover:bg-[#E68400]'}`}>{confirmAction.type === 'delete' ? 'Delete' : 'Archive'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
