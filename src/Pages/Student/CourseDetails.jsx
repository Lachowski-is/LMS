import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, FileText, HelpCircle, ClipboardList, File, Video, Users, Award, Check, Clock, AlertCircle, Play, FileBadge, FileSpreadsheet, Download, X } from "lucide-react";

const typeConfig = {
  Video: { icon: Video, label: "Video" },
  Assignment: { icon: FileText, label: "Assignment" },
  Quiz: { icon: HelpCircle, label: "Quiz" },
  Exam: { icon: ClipboardList, label: "Exam" },
  PDF: { icon: FileBadge, label: "PDF" },
  PPTX: { icon: FileSpreadsheet, label: "Presentation" },
  Others: { icon: File, label: "File" },
};

const getTypeInfo = (type) => typeConfig[type] || typeConfig.Others;

const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4";
const samplePdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const coursesDB = [
  { id: 1, title: "Physics – 3rd Secondary", grade: 12, price: 349, tags: ["SCIENCE", "ADVANCED"], teachers: ["Dr. Mohamed", "Mr. Hassan"], description: "Comprehensive coverage of mechanics, electricity, magnetism, waves, and modern physics for Thanaweya Amma.", image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80", instructor: "Dr. Mohamed", instructorTitle: "Senior Physics Instructor", lectures: [{ title: "Week 1: Mechanics", description: "Dear student, you will learn about Newton's laws of motion, forces, and how to analyze physical systems using free body diagrams.", lessons: [{ title: "Newton's Laws of Motion", type: "Video", fileUrl: sampleVideo }, { title: "Forces & Free Body Diagrams", type: "Video", fileUrl: sampleVideo }, { title: "Newton's Laws Problem Set", type: "Assignment", questions: ["q1", "q2", "q3"] }] }, { title: "Week 2: Energy", description: "Dear student, you will explore work, kinetic energy, potential energy, and the conservation of mechanical energy.", lessons: [{ title: "Work & Kinetic Energy", type: "Video", fileUrl: sampleVideo }, { title: "Potential Energy & Conservation", type: "Video", fileUrl: sampleVideo }, { title: "Energy Quiz", type: "Quiz", questions: ["q3", "q4"] }] }, { title: "Week 3: Electricity", description: "Dear student, you will understand Coulomb's law, electric fields, and electric potential in depth.", lessons: [{ title: "Coulomb's Law", type: "Video", fileUrl: sampleVideo }, { title: "Electric Fields", type: "PDF", fileUrl: samplePdf }, { title: "Electricity Midterm", type: "Exam", questions: ["q5", "q6", "q7"] }] }] },
  { id: 2, title: "Pure Math – 3rd Secondary", grade: 12, price: 399, tags: ["MATH", "ADVANCED"], teachers: ["Mr. Khaled"], description: "Algebra, calculus, trigonometry, and complex numbers tailored to the Egyptian national curriculum.", image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=80", instructor: "Mr. Khaled", instructorTitle: "Math Department Head", lectures: [{ title: "Unit 1: Algebra", description: "Dear student, you will master polynomial functions, complex numbers, and algebraic problem-solving techniques.", lessons: [{ title: "Polynomial Functions", type: "Video", fileUrl: sampleVideo }, { title: "Complex Numbers", type: "Video", fileUrl: sampleVideo }, { title: "Algebra Quiz", type: "Quiz", questions: ["q8", "q9", "q10"] }] }, { title: "Unit 2: Calculus", description: "Dear student, you will dive into limits, continuity, and differentiation rules with practical applications.", lessons: [{ title: "Limits & Continuity", type: "Video", fileUrl: sampleVideo }, { title: "Differentiation Rules", type: "Video", fileUrl: sampleVideo }, { title: "Calculus Problem Set", type: "Assignment", questions: ["q11", "q12", "q13"] }] }] },
  { id: 3, title: "Solid Geometry – 3rd Secondary", grade: 12, price: 249, tags: ["MATH", "GEOMETRY"], teachers: ["Mr. Khaled", "Ms. Mona"], description: "3D geometry, coordinate systems, vectors, and spatial reasoning for advanced level students.", image: "https://images.unsplash.com/photo-1502784444186-359be1869e3f?auto=format&fit=crop&w=800&q=80", instructor: "Mr. Khaled", instructorTitle: "Mathematics Teacher", lectures: [{ title: "Chapter 1: Coordinates", description: "Dear student, you will learn about 3D coordinate systems, distance formulas, and midpoint calculations.", lessons: [{ title: "3D Coordinate System", type: "Video", fileUrl: sampleVideo }, { title: "Distance & Midpoint", type: "Video", fileUrl: sampleVideo }] }, { title: "Chapter 2: Vectors", description: "Dear student, you will study vector operations, dot products, and cross products in three-dimensional space.", lessons: [{ title: "Vector Operations", type: "Video", fileUrl: sampleVideo }, { title: "Dot & Cross Product", type: "Video", fileUrl: sampleVideo }, { title: "Vectors Quiz", type: "Quiz", questions: ["q17", "q18"] }] }] },
  { id: 4, title: "Mechanics – 2nd Secondary", grade: 11, price: 279, tags: ["SCIENCE", "INTERMEDIATE"], teachers: ["Dr. Mohamed", "Ms. Fatima", "Mr. Hassan"], description: "Statics, dynamics, friction, and Newtonian mechanics with real-world problem-solving.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", instructor: "Dr. Mohamed", instructorTitle: "Physics Instructor", lectures: [{ title: "Term 1: Statics", description: "Dear student, you will understand forces in equilibrium, torque, and moment calculations.", lessons: [{ title: "Forces in Equilibrium", type: "Video", fileUrl: sampleVideo }, { title: "Torque & Moments", type: "Video", fileUrl: sampleVideo }, { title: "Statics Problem Set", type: "Assignment", questions: ["q1", "q2"] }] }, { title: "Term 2: Dynamics", description: "Dear student, you will explore Newton's second law, friction, and dynamic systems.", lessons: [{ title: "Newton's Second Law", type: "Video", fileUrl: sampleVideo }, { title: "Friction", type: "Video", fileUrl: sampleVideo }, { title: "Dynamics Exam", type: "Exam", questions: ["q3", "q4"] }] }] },
  { id: 5, title: "English – 1st Secondary", grade: 10, price: 199, tags: ["LANGUAGE", "BEGINNER"], teachers: ["Ms. Aya"], description: "Grammar, reading comprehension, essay writing, and vocabulary building for Grade 10 students.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", instructor: "Ms. Aya", instructorTitle: "English Language Instructor", lectures: [{ title: "Unit 1: Grammar", description: "Dear student, you will review essential tenses, passive voice, and sentence structure.", lessons: [{ title: "Tenses Overview", type: "Video", fileUrl: sampleVideo }, { title: "Passive Voice", type: "Video", fileUrl: sampleVideo }, { title: "Grammar Worksheet", type: "Assignment", questions: [] }] }, { title: "Unit 2: Writing", description: "Dear student, you will learn essay structure, paragraph organization, and academic writing conventions.", lessons: [{ title: "Essay Structure", type: "Video", fileUrl: sampleVideo }, { title: "Paragraph Writing", type: "PDF", fileUrl: samplePdf }, { title: "Writing Quiz", type: "Quiz", questions: [] }] }] },
  { id: 6, title: "Chemistry – 3rd Secondary", grade: 12, price: 329, tags: ["SCIENCE", "CHEMISTRY"], teachers: ["Ms. Fatima", "Dr. Nour"], description: "Organic and inorganic chemistry, chemical equations, stoichiometry, and lab techniques.", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80", instructor: "Ms. Fatima", instructorTitle: "Chemistry Department Head", lectures: [{ title: "Module 1: Stoichiometry", description: "Dear student, you will master mole calculations, balancing equations, and stoichiometric problem-solving.", lessons: [{ title: "Moles & Molar Mass", type: "Video", fileUrl: sampleVideo }, { title: "Balancing Equations", type: "Video", fileUrl: sampleVideo }, { title: "Stoichiometry Problem Set", type: "Assignment", questions: ["q14", "q15"] }] }, { title: "Module 2: Organic Chemistry", description: "Dear student, you will explore hydrocarbons, functional groups, and organic reaction mechanisms.", lessons: [{ title: "Hydrocarbons", type: "Video", fileUrl: sampleVideo }, { title: "Functional Groups", type: "PDF", fileUrl: samplePdf }, { title: "Organic Chemistry Quiz", type: "Quiz", questions: ["q16"] }, { title: "Final Chemistry Exam", type: "Exam", questions: ["q14", "q15", "q16"] }] }] }
];

const questionBanks = [
  {
    bank: "Physics – Mechanics",
    questions: [
      { id: "q1", text: "State Newton's First Law of Motion.", type: "Short Answer" },
      { id: "q2", text: "A 5kg object experiences a net force of 20N. What is its acceleration?", type: "Short Answer" },
      { id: "q3", text: "Explain the difference between kinetic and potential energy.", type: "Essay" },
      { id: "q4", text: "What is the SI unit of force?", type: "MCQ", choices: ["Newton", "Joule", "Watt", "Pascal"] },
    ]
  },
  {
    bank: "Physics – Electricity",
    questions: [
      { id: "q5", text: "State Coulomb's Law.", type: "Short Answer" },
      { id: "q6", text: "What is the potential difference across a 10Ω resistor carrying 2A?", type: "Short Answer" },
      { id: "q7", text: "Describe the difference between series and parallel circuits.", type: "Essay" },
    ]
  },
  {
    bank: "Pure Math – Algebra",
    questions: [
      { id: "q8", text: "Solve for x: 2x² - 8 = 0", type: "Short Answer" },
      { id: "q9", text: "What is the conjugate of 3 + 4i?", type: "Short Answer" },
      { id: "q10", text: "Prove that the sum of any two complex conjugates is real.", type: "Essay" },
    ]
  },
  {
    bank: "Pure Math – Calculus",
    questions: [
      { id: "q11", text: "Find the derivative of f(x) = 3x⁴ - 2x² + 5", type: "Short Answer" },
      { id: "q12", text: "State the limit definition of a derivative.", type: "Short Answer" },
      { id: "q13", text: "Explain the concept of continuity in your own words.", type: "Essay" },
    ]
  },
  {
    bank: "Chemistry – Stoichiometry",
    questions: [
      { id: "q14", text: "Balance the equation: H₂ + O₂ → H₂O", type: "Short Answer" },
      { id: "q15", text: "What is the molar mass of H₂SO₄?", type: "Short Answer" },
      { id: "q16", text: "Explain the mole concept and its importance in chemistry.", type: "Essay" },
    ]
  },
  {
    bank: "Solid Geometry",
    questions: [
      { id: "q17", text: "Find the volume of a sphere with radius 3cm.", type: "Short Answer" },
      { id: "q18", text: "What is the dot product of vectors (1,2,3) and (4,-1,2)?", type: "Short Answer" },
    ]
  },
];

const instructorImages = {
  "Dr. Mohamed": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Mr. Khaled": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Ms. Mona": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Ms. Fatima": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Mr. Hassan": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Ms. Aya": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
  "Dr. Nour": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80&crop=face",
};

const Avatar = ({ name, size = "md", className = "" }) => {
  const imgUrl = instructorImages[name];
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const sizes = { sm: "w-10 h-10 text-sm", md: "w-14 h-14 text-lg", lg: "w-20 h-20 text-2xl" };
  const sizeClass = sizes[size] || sizes.md;
  const gradient = ["from-[#0071E3] to-[#00C6FF]", "from-[#FF6B6B] to-[#FFB347]", "from-[#34C759] to-[#30D158]", "from-[#AF52DE] to-[#FF2D55]", "from-[#FF9F0A] to-[#FF375F]", "from-[#5856D6] to-[#007AFF]", "from-[#00C7BE] to-[#34C759]", "from-[#FF6482] to-[#FF9F0A]"];
  const g = gradient[name.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % gradient.length];

  if (imgUrl) {
    return (
      <div className={`${sizeClass} shrink-0 rounded-2xl overflow-hidden border-2 border-white/80 shadow-sm ${className}`}>
        <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`${sizeClass} bg-gradient-to-br ${g} text-white flex items-center justify-center font-bold shrink-0 rounded-2xl ${className}`}>
      {initials}
    </div>
  );
};

export default function StudentCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [visible, setVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const course = coursesDB.find(c => c.id === Number(id));
  useEffect(() => { setVisible(true); window.scrollTo(0, 0); }, []);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-16 h-16 bg-[#E8E8ED] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={28} className="text-[#86868B]" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1F] mb-2">Course not found</h2>
          <p className="text-[#86868B] text-sm leading-relaxed mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} className="px-8 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] active:scale-[0.97] transition-all inline-flex items-center gap-2"><ArrowLeft size={16} /> Go Back</button>
        </div>
      </div>
    );
  }

  const totalLessons = course.lectures.reduce((s, l) => s + l.lessons.length, 0);
  const allInstructors = [course.instructor, ...course.teachers.filter(t => t !== course.instructor)];

  const handleContentClick = (lesson, lectureIdx, lessonIdx) => {
    if (lesson.type === "Video") setVideoUrl(lesson.fileUrl || sampleVideo);
    else if (lesson.type === "PDF" || lesson.type === "PPTX") setPdfUrl({ url: lesson.fileUrl || samplePdf, type: lesson.type, title: lesson.title });
    else if (["Assignment", "Quiz", "Exam"].includes(lesson.type)) navigate(`/student/assessment/${id}/${lectureIdx}/${lessonIdx}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">

      {/* ─── Hero Banner ─── */}
      <div className="relative h-72 md:h-80 lg:h-96 overflow-hidden">
        <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-40% to-black/20" />
        <div className="absolute inset-0 banner-grid" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3]/10 to-transparent opacity-30" />
        
        <div className="relative h-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col justify-between py-6">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md text-white text-sm font-medium hover:bg-white/20 active:bg-white/25 transition-all rounded-full border border-white/10 hover:border-white/20">
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          <div className="pb-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 bg-white/15 backdrop-blur-md text-white text-[11px] font-bold tracking-wider rounded-full border border-white/20 uppercase">Active</span>
              <span className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Award size={12} /> Grade {course.grade}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">{course.title}</h1>
            <div className="flex items-center gap-3 mt-4">
              <Avatar name={course.instructor} size="sm" className="ring-2 ring-white/30" />
              <div>
                <p className="text-sm text-white/90 font-medium">{course.instructor}</p>
                <p className="text-[12px] text-white/50">{course.lectures.length} lectures · {totalLessons} materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            <div className={`bg-white rounded-3xl p-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                  <BookOpen size={18} className="text-[#0071E3]" /> About This Course
                </h3>
              </div>
              <p className="text-base text-[#86868B] leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {course.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#F5F5F7] text-[#86868B] text-[11px] font-semibold tracking-wide rounded-full border border-[#E8E8ED]">{tag}</span>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="px-8 py-6 border-b border-[#E8E8ED] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#0071E3]/10 rounded-xl">
                    <BookOpen size={18} className="text-[#0071E3]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">Lectures</h3>
                    <p className="text-sm text-[#86868B] mt-0.5">{totalLessons} materials across {course.lectures.length} lectures</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#E8E8ED]">
                {course.lectures.map((lecture, mi) => {
                  const open = expanded[mi];
                  return (
                    <div key={mi}>
                      <button onClick={() => setExpanded(p => ({ ...p, [mi]: !p[mi] }))} className="w-full flex items-center justify-between px-8 py-6 hover:bg-[#FAFAFA] transition-all">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={`p-1.5 rounded-lg transition-all ${open ? "bg-[#0071E3]/5 text-[#0071E3]" : "text-[#A1A1A6]"}`}>
                            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </div>
                          <div className="text-left min-w-0">
                            <span className="font-medium text-base text-[#1D1D1F] block truncate">{lecture.title}</span>
                            <span className="text-sm text-[#86868B]">{lecture.lessons.length} material{lecture.lessons.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                      </button>
                      {open && (
                        <div className="pb-8 px-8 space-y-3 animate-admin-fadeIn">
                          {lecture.description && (
                            <p className="text-sm text-[#86868B] leading-relaxed px-5 py-4 bg-[#FAFAFA] border border-[#E8E8ED] rounded-2xl mb-4">{lecture.description}</p>
                          )}
                          {lecture.lessons.map((lesson, li) => {
                            const info = getTypeInfo(lesson.type);
                            const Icon = info.icon;
                            return (
                              <div key={li} onClick={() => handleContentClick(lesson, mi, li)} className="flex items-center gap-4 py-4 px-4 hover:bg-[#FAFAFA] transition-all cursor-pointer rounded-2xl group active:scale-[0.99]">
                                <div className="p-3 bg-[#E8E8ED] text-[#1D1D1F] shrink-0 rounded-xl group-hover:bg-[#0071E3]/10 group-hover:text-[#0071E3] transition-all"><Icon size={16} /></div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-base font-medium text-[#1D1D1F] truncate">{lesson.title}</p>
                                  <p className="text-sm text-[#86868B] font-medium">{info.label}</p>
                                </div>
                                <div className={`p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all ${lesson.type === "Video" ? "bg-[#0071E3]/5" : "bg-[#F5F5F7]"}`}>
                                  {lesson.type === "Video" ? <Play size={16} className="text-[#0071E3]" /> : <ChevronRight size={16} className="text-[#A1A1A6]" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Instructors */}
            <div className={`bg-white rounded-3xl p-8 transition-all duration-500 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                  <Users size={18} className="text-[#0071E3]" /> Instructors
                </h3>
                <span className="text-[11px] font-semibold text-[#86868B] bg-[#F5F5F7] px-3 py-1.5 rounded-full">{allInstructors.length} {allInstructors.length === 1 ? "member" : "members"}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-all group cursor-default">
                  <Avatar name={course.instructor} size="md" className="group-hover:scale-105 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#1D1D1F] truncate">{course.instructor}</p>
                    <p className="text-[13px] text-[#86868B] truncate mt-0.5">{course.instructorTitle}</p>
                  </div>
                </div>
                {course.teachers.filter(t => t !== course.instructor).map((t, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[#F5F5F7] transition-all group cursor-default">
                    <Avatar name={t} size="sm" className="group-hover:scale-105 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1D1D1F] truncate">{t}</p>
                      <p className="text-[12px] text-[#86868B]">Course Teacher</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#E8E8ED] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight size={14} className="text-[#86868B]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className={`bg-white rounded-3xl p-8 transition-all duration-500 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mb-6">
                <Award size={18} className="text-[#FF9F0A]" /> Course Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Grade", value: course.grade, icon: Award, color: "text-[#0071E3]", bg: "bg-[#0071E3]/5" },
                  { label: "Price", value: `${course.price} EGP`, icon: FileText, color: "text-[#34C759]", bg: "bg-[#34C759]/5" },
                  { label: "Lectures", value: course.lectures.length, icon: BookOpen, color: "text-[#AF52DE]", bg: "bg-[#AF52DE]/5" },
                  { label: "Materials", value: totalLessons, icon: FileText, color: "text-[#FF9F0A]", bg: "bg-[#FF9F0A]/5" },
                ].map((s, i) => {
                  const StatIcon = s.icon;
                  return (
                    <div key={i} className={`${s.bg} p-5 rounded-2xl transition-all cursor-default hover:brightness-95`}>
                      <StatIcon size={16} className={`${s.color} mb-2`} />
                      <p className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{s.value}</p>
                      <p className="text-[11px] font-semibold text-[#86868B] mt-0.5 uppercase tracking-wide">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Video Player Modal ─── */}
      {videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setVideoUrl(null)}>
          <div className="bg-black w-full max-w-4xl shadow-2xl overflow-hidden rounded-[24px] animate-admin-scaleIn border border-[#333]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 bg-[#1D1D1F] border-b border-[#333]">
              <span className="text-sm font-medium text-white/80 flex items-center gap-2"><Video size={16} className="text-[#0071E3]" /> {course.title} — Video Player</span>
              <button onClick={() => setVideoUrl(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-white/50 hover:text-white" /></button>
            </div>
            <video controls autoPlay className="w-full aspect-video bg-black" src={videoUrl} controlsList="nodownload noremoteplayback" disablePictureInPicture onContextMenu={e => e.preventDefault()} />
          </div>
        </div>
      )}

      {/* ─── PDF/PPTX Viewer Modal ─── */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setPdfUrl(null)}>
          <div className="bg-white w-full max-w-5xl shadow-2xl overflow-hidden rounded-[24px] flex flex-col animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()} style={{ maxHeight: "90vh" }}>
            <div className="flex items-center justify-between px-8 py-5 border-b border-[#E8E8ED] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-[#FF9F0A]/5 rounded-xl shrink-0">
                  {pdfUrl.type === "PPTX" ? <FileSpreadsheet size={18} className="text-[#FF9F0A]" /> : <FileBadge size={18} className="text-[#FF3B30]" />}
                </div>
                <span className="text-base font-medium text-[#1D1D1F] truncate">{pdfUrl.title}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href={pdfUrl.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] text-sm font-medium rounded-full transition-all"><Download size={15} /> Download</a>
                <button onClick={() => setPdfUrl(null)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={20} className="text-[#86868B]" /></button>
              </div>
            </div>
            <div className="flex-1 bg-[#F5F5F7] min-h-[600px]">
              <iframe
                src={pdfUrl.type === "PPTX"
                  ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(pdfUrl.url)}`
                  : `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl.url)}&embedded=true`
                }
                className="w-full h-full rounded-b-[24px]"
                style={{ minHeight: "600px" }}
                title={pdfUrl.title}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .banner-grid { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
      `}</style>
    </div>
  );
}
