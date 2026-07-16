import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Archive, Trash2, X, Check, MoreHorizontal, Upload } from 'lucide-react';

export default function AdminCourses() {
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

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const AVAILABLE_TEACHERS = ['Dr. Mohamed', 'Mr. Hassan', 'Ms. Fatima', 'Mr. Khaled', 'Ms. Aya', 'Dr. Nour', 'Ms. Mona'];

  const [form, setForm] = useState({ title: '', description: '', grade: 10, price: 0, selectedTeachers: [], tags: '', image: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const openAdd = () => {
    setEditingCourse(null);
    setForm({ title: '', description: '', grade: 10, price: 0, selectedTeachers: [], tags: '', image: '' });
    setImagePreview(null);
    setShowCourseModal(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setForm({ title: course.title, description: course.description, grade: course.grade, price: course.price, selectedTeachers: course.teachers, tags: course.tags.join(', '), image: course.image });
    setImagePreview(course.image);
    setShowCourseModal(true);
    setOpenMenuId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
        setForm(f => ({ ...f, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTeacher = (name) => {
    setForm(f => ({
      ...f,
      selectedTeachers: f.selectedTeachers.includes(name)
        ? f.selectedTeachers.filter(t => t !== name)
        : [...f.selectedTeachers, name]
    }));
  };

  const saveCourse = () => {
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    const courseData = { title: form.title, description: form.description, grade: Number(form.grade), price: Number(form.price), teachers: form.selectedTeachers, tags, image: form.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80' };

    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } : c));
    } else {
      setCourses(prev => [...prev, { id: Date.now(), ...courseData }]);
    }
    setShowCourseModal(false);
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setConfirmAction(null);
  };

  const handleArchive = (id) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, archived: true } : c));
    setConfirmAction(null);
  };

  const filteredCourses = courses.filter(c => 
    !c.archived && 
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
        <button 
          onClick={openAdd} 
          className="flex items-center gap-3 px-6 py-3 bg-[#0071E3] hover:bg-[#0056B3] text-white rounded-full text-base font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          Add Course
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="relative flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group"
            onClick={() => navigate(`/admin/course/${course.id}`)}
          >
            <div className="absolute top-6 right-6 z-10" onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === course.id ? null : course.id); }}>
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-sm transition-all text-[#86868B] hover:text-[#1D1D1F]">
                <MoreHorizontal size={20} />
              </button>
              {openMenuId === course.id && (
                <div className="absolute right-0 top-14 w-48 bg-white rounded-[20px] border border-[#D2D2D7] shadow-xl shadow-black/5 overflow-hidden z-20 animate-admin-fadeIn" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openEdit(course)} className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors">
                    <Edit size={18} />
                    Edit
                  </button>
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

      {/* Add / Edit Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-admin-fadeIn" onClick={() => setShowCourseModal(false)}>
          <div className="bg-white w-full max-w-lg shadow-xl rounded-[20px] animate-admin-scaleIn max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 pt-8 pb-4 shrink-0">
              <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1F]">{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
              <button onClick={() => setShowCourseModal(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors">
                <X size={24} className="text-[#86868B]" />
              </button>
            </div>
            <div className="px-8 pb-4 overflow-y-auto space-y-5">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-base text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white" placeholder="Course title" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-base text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all resize-none bg-white" placeholder="Course description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Grade</label>
                  <select value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))} className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-base text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white">
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Price (EGP)</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-base text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Teachers</label>
                <div className="flex flex-wrap gap-2 p-3 bg-[#F5F5F7] rounded-xl">
                  {AVAILABLE_TEACHERS.map(name => (
                    <button key={name} type="button" onClick={() => toggleTeacher(name)}
                      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${form.selectedTeachers.includes(name) ? 'bg-[#0071E3] text-white shadow-sm' : 'bg-white text-[#86868B] border border-[#D2D2D7] hover:border-[#0071E3]'}`}
                    >{name}</button>
                  ))}
                </div>
                {form.selectedTeachers.length === 0 && <p className="text-xs text-[#FF3B30] mt-1">Select at least one teacher</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Tags (comma-separated)</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full rounded-xl border border-[#D2D2D7] px-4 py-3 text-base text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white" placeholder="SCIENCE, ADVANCED" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Course Image</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 p-4 border-2 border-dashed border-[#D2D2D7] rounded-xl hover:border-[#0071E3] transition-colors cursor-pointer bg-[#F5F5F7]">
                  {imagePreview ? (
                    <div className="flex items-center gap-3 w-full">
                      <img src={imagePreview} alt="Preview" className="w-16 h-12 rounded-lg object-cover" />
                      <span className="text-sm text-[#86868B]">Click to change image</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Upload size={20} className="text-[#86868B]" />
                      <span className="text-sm text-[#86868B]">Click to upload course image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 flex gap-4 justify-end border-t border-[#E8E8ED] shrink-0">
              <button onClick={() => setShowCourseModal(false)} className="px-6 py-3 bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#1D1D1F] rounded-full text-sm font-semibold transition-all">Cancel</button>
              <button onClick={saveCourse} className="px-6 py-3 bg-[#0071E3] hover:bg-[#0056B3] text-white rounded-full text-sm font-semibold transition-all">{editingCourse ? 'Save Changes' : 'Create Course'}</button>
            </div>
          </div>
        </div>
      )}

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
