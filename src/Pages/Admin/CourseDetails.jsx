import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, FileText, HelpCircle, ClipboardList, File, Video, GraduationCap, Users, Award, Plus, Edit3, X, Upload, Check, Clock, UserCheck, Loader2, AlertCircle, Play, FileBadge, FileSpreadsheet, Image, Monitor, PenTool, Tv, Calendar, Download } from "lucide-react";

// ─── Unified Monochrome Type Config ───
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

const mockStudents = [
  {
    name: "Mohamed Ali", status: "submitted", submittedAt: "2026-07-12",
    answers: {
      q1: "Newton's First Law states that an object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by a net external force.",
      q2: "a = F/m = 20N/5kg = 4 m/s²",
      q3: "Kinetic energy is the energy of motion while potential energy is stored energy due to position.",
      q4: "Newton",
      q5: "Coulomb's law states that the force between two charges is proportional to the product of charges and inversely proportional to the square of distance.",
      q6: "V = IR = 2A × 10Ω = 20V",
      q7: "In series circuits, current is same through all components. In parallel, voltage is same across all branches.",
      q8: "x² = 4, so x = ±2",
      q9: "3 - 4i",
      q10: "The sum of a complex number and its conjugate gives twice the real part, which is real.",
      q11: "12x³ - 4x",
      q12: "f'(x) = lim(h→0) [f(x+h) - f(x)]/h",
      q13: "Continuity means a function has no breaks, jumps, or holes at a point.",
      q14: "2H₂ + O₂ → 2H₂O",
      q15: "98.08 g/mol",
      q16: "The mole is a unit for amount of substance, equal to 6.022×10²³ particles.",
      q17: "V = (4/3)πr³ = (4/3)π(27) = 36π cm³",
      q18: "1×4 + 2×(-1) + 3×2 = 4 - 2 + 6 = 8",
    }
  },
  {
    name: "Fatima Zahra", status: "submitted", submittedAt: "2026-07-11",
    answers: {
      q1: "A body continues in its state of rest or uniform motion unless compelled by an external force.",
      q2: "a = 20/5 = 4 m/s²",
      q3: "Kinetic energy depends on speed, potential energy depends on height.",
      q4: "Newton",
      q5: "Coulomb's law: F = k(q1×q2)/r²",
      q6: "V = 2×10 = 20V",
      q7: "Series: same current, different voltage. Parallel: same voltage, different current.",
      q8: "x = 2 or x = -2",
      q9: "3 - 4i",
      q10: "Adding a+bi and a-bi gives 2a which is real.",
      q11: "12x³ - 4x",
      q12: "f'(x) = limit as h→0 of (f(x+h)-f(x))/h",
      q13: "A function is continuous if you can draw it without lifting your pen.",
      q14: "2H₂ + O₂ → 2H₂O",
      q15: "98 g/mol",
      q16: "A mole is 6.022×10²³ particles of a substance.",
      q17: "V = 4/3 × π × 27 = 36π cm³",
      q18: "8",
    }
  },
  {
    name: "Youssef Samir", status: "submitted", submittedAt: "2026-07-13",
    answers: {
      q1: "Objects stay still or moving until force acts on them.",
      q2: "4 m/s²",
      q3: "KE when moving, PE when up high.",
      q4: "Newton",
      q5: "Force equals k times charge1 times charge2 over distance squared.",
      q6: "20 volts",
      q7: "Series: one path. Parallel: multiple paths.",
      q8: "x = ±2",
      q9: "3 - 4i",
      q10: "Complex conjugates have opposite imaginary parts so they cancel when added.",
      q11: "12x³ - 4x",
      q12: "Derivative is the slope of the tangent line.",
      q13: "Continuous means smooth, no breaks.",
      q14: "2H2 + O2 = 2H2O",
      q15: "About 98 g/mol",
      q16: "A mole is Avogadro's number of things.",
      q17: "113.1 cm³",
      q18: "8",
    }
  },
  {
    name: "Aya Mohamed", status: "pending", submittedAt: null,
    answers: {
      q1: "Newton's first law says that... (incomplete draft)",
    }
  },
  {
    name: "Kareem Adel", status: "submitted", submittedAt: "2026-07-10",
    answers: {
      q1: "Newton's First Law: inertia - objects resist changes in motion.",
      q2: "a = 20N/5kg = 4m/s²",
      q3: "Kinetic energy is ½mv² while potential energy is mgh.",
      q4: "Newton",
      q5: "F = kq₁q₂/r² where k = 9×10⁹",
      q6: "V = IR = 2×10 = 20V",
      q7: "Series circuits: current constant, voltage divides. Parallel: voltage constant, current divides.",
      q8: "x = 2, x = -2",
      q9: "3 - 4i",
      q10: "Sum of conjugates = 2×real part, which is always real.",
      q11: "12x³ - 4x",
      q12: "Limit definition of derivative is f'(x) = lim[h→0] (f(x+h)-f(x))/h",
      q13: "Continuity means the limit exists and equals the function value at that point.",
      q14: "2H₂ + O₂ → 2H₂O",
      q15: "98.08 g/mol (H₂=2.02, S=32.06, O₄=64)",
      q16: "The mole allows us to count particles by weighing, 1 mol = 6.022×10²³ entities.",
      q17: "V = 4/3 π(3)³ = 36π ≈ 113.1 cm³",
      q18: "1×4 + 2×(-1) + 3×2 = 4 - 2 + 6 = 8",
    }
  },
  {
    name: "Nadia Hassan", status: "missing", submittedAt: null, answers: {}
  },
];

// ─── Status Config (Apple Design) ───
const statusConfig = {
  submitted: { icon: Check, label: "Submitted", className: "text-[#34C759]" },
  pending: { icon: Clock, label: "Pending", className: "text-[#86868B]" },
  missing: { icon: AlertCircle, label: "Missing", className: "text-[#FF3B30]" },
};

// ─── Instructor Avatar Images ───
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

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [visible, setVisible] = useState(false);

  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showCreateLecture, setShowCreateLecture] = useState(false);
  const [showCreateAssessment, setShowCreateAssessment] = useState(null);
  const [showScheduleLive, setShowScheduleLive] = useState(false);
  const [showUpload, setShowUpload] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [gradingLesson, setGradingLesson] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rightWrong, setRightWrong] = useState({});
  const [savingStudent, setSavingStudent] = useState(null);
  const [editDesc, setEditDesc] = useState(false);
  const [descText, setDescText] = useState("");
  const [toast, setToast] = useState(null);

  const [editForm, setEditForm] = useState({ title: "", description: "", instructor: "", instructorTitle: "", grade: 10, price: 0 });
  const [lectureForm, setLectureForm] = useState({ title: "", description: "" });
  const [assessmentForm, setAssessmentForm] = useState({ title: "", description: "", selectedQuestions: [] });
  const [liveForm, setLiveForm] = useState({ title: "", date: "", time: "" });
  const [uploadForm, setUploadForm] = useState({ title: "", type: "Video" });

  const course = coursesDB.find(c => c.id === Number(id));
  useEffect(() => { setVisible(true); window.scrollTo(0, 0); }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

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

  const handleContentClick = (lesson) => {
    if (lesson.type === "Video") setVideoUrl(lesson.fileUrl || sampleVideo);
    else if (lesson.type === "PDF" || lesson.type === "PPTX") setPdfUrl({ url: lesson.fileUrl || samplePdf, type: lesson.type, title: lesson.title });
    else if (["Assignment", "Quiz", "Exam"].includes(lesson.type)) setGradingLesson(lesson);
  };

  

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      {/* ─── Toast ─── */}
      {toast && (
        <div className="fixed top-6 right-6 z-[60] px-5 py-3.5 bg-white shadow-xl rounded-2xl flex items-center gap-3 animate-admin-slideDown border border-[#F5F5F7]">
          <div className={`p-1.5 rounded-xl ${toast.type === "success" ? "bg-[#34C759]/10" : "bg-[#FF3B30]/10"}`}>
            {toast.type === "success" ? <Check size={16} className="text-[#34C759]" /> : <AlertCircle size={16} className="text-[#FF3B30]" />}
          </div>
          <span className="text-sm font-medium text-[#1D1D1F]">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-auto p-1 text-[#86868B] hover:text-[#1D1D1F] rounded-full hover:bg-[#F5F5F7] transition-colors"><X size={14} /></button>
        </div>
      )}

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
            <button onClick={() => { setEditForm({ title: course.title, description: course.description, instructor: course.instructor, instructorTitle: course.instructorTitle, grade: course.grade, price: course.price }); setShowEditCourse(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md text-white text-sm font-medium hover:bg-white/20 active:bg-white/25 transition-all rounded-full border border-white/10 hover:border-white/20">
              <Edit3 size={14} /> Edit
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
                <button onClick={() => { setEditDesc(true); setDescText(course.description); }} className="flex items-center gap-1.5 text-sm font-medium text-[#0071E3] hover:text-[#0056B3] bg-[#0071E3]/5 hover:bg-[#0071E3]/10 px-4 py-2 rounded-full transition-all">
                  <Edit3 size={13} /> Edit
                </button>
              </div>
              {editDesc ? (
                <div className="space-y-4">
                  <textarea value={descText} onChange={e => setDescText(e.target.value)} rows={4} className="w-full px-4 py-3 bg-[#F5F5F7] border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all resize-none" />
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setEditDesc(false)} className="px-5 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
                    <button onClick={() => { course.description = descText; setEditDesc(false); showToast("Description updated"); }} className="px-5 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] transition-colors">Save</button>
                  </div>
                </div>
              ) : (
                <p className="text-base text-[#86868B] leading-relaxed">{course.description}</p>
              )}
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
                <button onClick={() => { setLectureForm({ title: "", description: "" }); setShowCreateLecture(true); }} className="flex items-center gap-2 px-5 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] active:scale-[0.97] transition-all shadow-sm">
                  <Plus size={16} /> Create Lecture
                </button>
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
                              <div key={li} onClick={() => handleContentClick(lesson)} className="flex items-center gap-4 py-4 px-4 hover:bg-[#FAFAFA] transition-all cursor-pointer rounded-2xl group active:scale-[0.99]">
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
                          <button onClick={() => { setUploadForm({ title: "", type: "Video" }); setShowUpload(mi); }} className="flex items-center justify-center gap-3 w-full py-4 px-4 mt-4 text-sm font-medium text-[#0071E3] hover:bg-[#0071E3]/5 transition-all rounded-2xl border-2 border-dashed border-[#E8E8ED] hover:border-[#0071E3]/30 active:scale-[0.99]">
                            <Upload size={16} /> Upload Content
                          </button>
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

            {/* Quick Actions */}
            <div className={`bg-white rounded-3xl p-8 transition-all duration-500 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2 mb-6">
                <PenTool size={18} className="text-[#0071E3]" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Create Lecture", icon: PenTool, desc: "Add a new lecture section", onClick: () => { setLectureForm({ title: "", description: "" }); setShowCreateLecture(true); } },
                  { label: "Create Quiz", icon: HelpCircle, desc: "Add a quiz with questions", onClick: () => { setAssessmentForm({ title: "", description: "", selectedQuestions: [] }); setShowCreateAssessment("Quiz"); } },
                  { label: "Create Exam", icon: ClipboardList, desc: "Add a full exam", onClick: () => { setAssessmentForm({ title: "", description: "", selectedQuestions: [] }); setShowCreateAssessment("Exam"); } },
                  { label: "Create Assignment", icon: FileText, desc: "Add a problem set", onClick: () => { setAssessmentForm({ title: "", description: "", selectedQuestions: [] }); setShowCreateAssessment("Assignment"); } },
                  { label: "Schedule Live Meeting", icon: Tv, desc: "Schedule a live session", onClick: () => { setLiveForm({ title: "", date: "", time: "" }); setShowScheduleLive(true); } },
                ].map((action) => (
                  <button key={action.label} onClick={action.onClick} className="w-full flex items-center gap-4 px-5 py-4 bg-[#F5F5F7] active:bg-[#E8E8ED] text-sm font-medium text-[#1D1D1F] transition-all rounded-2xl group active:scale-[0.98] surface-hover">
                    <div className="p-2.5 bg-white rounded-xl">
                      <action.icon size={16} className="text-[#0071E3]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#1D1D1F]">{action.label}</p>
                      <p className="text-xs text-[#86868B]">{action.desc}</p>
                    </div>
                    <ChevronRight size={15} className="ml-auto text-[#C7C7CC] group-hover:text-[#0071E3] group-hover:translate-x-0.5 transition-all" />
                  </button>
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

      {/* ─── Edit Course Modal ─── */}
      {showEditCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditCourse(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-[24px] p-8 animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0071E3]/5 rounded-xl"><Edit3 size={20} className="text-[#0071E3]" /></div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Edit Course</h2>
              </div>
              <button onClick={() => setShowEditCourse(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Title</label>
                <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Description</label>
                <textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all resize-none bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Instructor</label>
                  <input value={editForm.instructor} onChange={e => setEditForm(f => ({ ...f, instructor: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Title</label>
                  <input value={editForm.instructorTitle} onChange={e => setEditForm(f => ({ ...f, instructorTitle: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Grade</label>
                  <select value={editForm.grade} onChange={e => setEditForm(f => ({ ...f, grade: +e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white">
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Price (EGP)</label>
                  <input type="number" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: +e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E8E8ED] flex gap-4 justify-end">
              <button onClick={() => setShowEditCourse(false)} className="px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={() => { showToast("Course updated successfully"); setShowEditCourse(false); }} className="px-6 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] active:scale-[0.97] transition-all shadow-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Lecture Modal ─── */}
      {showCreateLecture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateLecture(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-[24px] p-8 animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#AF52DE]/5 rounded-xl"><PenTool size={20} className="text-[#AF52DE]" /></div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Create Lecture</h2>
              </div>
              <button onClick={() => setShowCreateLecture(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Lecture Title</label>
                <input value={lectureForm.title} onChange={e => setLectureForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#AF52DE] focus:ring-2 focus:ring-[#AF52DE]/10 transition-all bg-white" placeholder="e.g. Week 4: Waves" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Description</label>
                <textarea value={lectureForm.description} onChange={e => setLectureForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#AF52DE] focus:ring-2 focus:ring-[#AF52DE]/10 transition-all resize-none bg-white" placeholder="Dear student, you will learn about..." />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E8E8ED] flex gap-4 justify-end">
              <button onClick={() => setShowCreateLecture(false)} className="px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={() => { showToast("Lecture created successfully"); setShowCreateLecture(false); }} className="px-6 py-3 bg-[#AF52DE] text-white rounded-full text-sm font-medium hover:bg-[#9B45C4] active:scale-[0.97] transition-all shadow-sm">Create Lecture</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Assessment Modal ─── */}
      {showCreateAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateAssessment(null)}>
          <div className="bg-white w-full max-w-2xl shadow-2xl rounded-[24px] p-8 flex flex-col animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()} style={{ maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-8 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF9F0A]/5 rounded-xl">
                  {showCreateAssessment === "Quiz" ? <HelpCircle size={20} className="text-[#FF9F0A]" /> : showCreateAssessment === "Exam" ? <ClipboardList size={20} className="text-[#FF3B30]" /> : <FileText size={20} className="text-[#34C759]" />}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Create {showCreateAssessment}</h2>
              </div>
              <button onClick={() => setShowCreateAssessment(null)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>
            <div className="space-y-5 overflow-y-auto flex-1 pr-1">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Title</label>
                <input value={assessmentForm.title} onChange={e => setAssessmentForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all bg-white" placeholder={`${showCreateAssessment} title`} />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Description</label>
                <textarea value={assessmentForm.description} onChange={e => setAssessmentForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all resize-none bg-white" placeholder="Instructions for students..." />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Type</label>
                <div className="flex items-center gap-3 text-base font-medium text-[#1D1D1F] px-5 py-3.5 bg-[#F5F5F7] rounded-xl">
                  {showCreateAssessment === "Quiz" ? <HelpCircle size={18} className="text-[#FF9F0A]" /> : showCreateAssessment === "Exam" ? <ClipboardList size={18} className="text-[#FF3B30]" /> : <FileText size={18} className="text-[#34C759]" />}
                  {showCreateAssessment}
                </div>
              </div>
              <div className="h-px bg-[#E8E8ED]" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-[#86868B]">Select Questions from Question Banks</label>
                  <span className="text-xs font-medium text-[#0071E3] bg-[#0071E3]/5 px-3 py-1 rounded-full">{assessmentForm.selectedQuestions.length} selected</span>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {questionBanks.map((bank, bi) => (
                    <div key={bi} className="border border-[#E8E8ED] rounded-2xl overflow-hidden">
                      <div className="px-5 py-3.5 bg-[#F5F5F7] border-b border-[#E8E8ED]">
                        <p className="text-sm font-semibold text-[#1D1D1F]">{bank.bank}</p>
                      </div>
                      <div className="divide-y divide-[#E8E8ED]">
                        {bank.questions.map((q) => {
                          const selected = assessmentForm.selectedQuestions.includes(q.id);
                          return (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => setAssessmentForm(p => ({
                                ...p,
                                selectedQuestions: selected
                                  ? p.selectedQuestions.filter(id => id !== q.id)
                                  : [...p.selectedQuestions, q.id]
                              }))}
                              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-[#F5F5F7] ${selected ? "bg-[#0071E3]/[0.03]" : ""}`}
                            >
                              <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 transition-all rounded-full ${selected ? "bg-[#34C759] border-[#34C759] scale-105" : "border-[#C7C7CC] hover:border-[#0071E3]"}`}>
                                {selected && <Check size={14} className="text-white" />}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className={`text-base ${selected ? "text-[#1D1D1F] font-medium" : "text-[#86868B]"}`}>{q.text}</p>
                                <span className={`text-sm ${selected ? "text-[#34C759]" : "text-[#A1A1A6]"}`}>{q.type}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E8E8ED] flex gap-4 justify-end shrink-0">
              <button onClick={() => setShowCreateAssessment(null)} className="px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={() => { showToast(`${showCreateAssessment} created successfully with ${assessmentForm.selectedQuestions.length} questions`); setShowCreateAssessment(null); }} className="px-6 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] active:scale-[0.97] transition-all shadow-sm">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Schedule Live Meeting Modal ─── */}
      {showScheduleLive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setShowScheduleLive(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-[24px] p-8 animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FF3B30]/5 rounded-xl"><Tv size={20} className="text-[#FF3B30]" /></div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Schedule Live Meeting</h2>
              </div>
              <button onClick={() => setShowScheduleLive(false)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Meeting Title</label>
                <input value={liveForm.title} onChange={e => setLiveForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/10 transition-all bg-white" placeholder="Live Review Session" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Date</label>
                  <input type="date" value={liveForm.date} onChange={e => setLiveForm(f => ({ ...f, date: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/10 transition-all bg-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#86868B] block mb-2">Time</label>
                  <input type="time" value={liveForm.time} onChange={e => setLiveForm(f => ({ ...f, time: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#FF3B30] focus:ring-2 focus:ring-[#FF3B30]/10 transition-all bg-white" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E8E8ED] flex gap-4 justify-end">
              <button onClick={() => setShowScheduleLive(false)} className="px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={() => { showToast("Live meeting scheduled"); setShowScheduleLive(false); }} className="px-6 py-3 bg-[#FF3B30] text-white rounded-full text-sm font-medium hover:bg-[#E0352B] active:scale-[0.97] transition-all shadow-sm">Schedule</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Upload Content Modal ─── */}
      {showUpload !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => setShowUpload(null)}>
          <div className="bg-white w-full max-w-lg shadow-2xl rounded-[24px] p-8 animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#34C759]/5 rounded-xl"><Upload size={20} className="text-[#34C759]" /></div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Upload Content</h2>
              </div>
              <button onClick={() => setShowUpload(null)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Title</label>
                <input value={uploadForm.title} onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#D2D2D7] px-4 py-3.5 rounded-xl text-base text-[#1D1D1F] outline-none focus:border-[#34C759] focus:ring-2 focus:ring-[#34C759]/10 transition-all bg-white" placeholder="Content title" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">Type</label>
                <div className="flex flex-wrap gap-2">
                  {["Video", "PDF", "PPTX", "Assignment", "Quiz", "Exam", "Others"].map(t => (
                    <button key={t} type="button" onClick={() => setUploadForm(f => ({ ...f, type: t }))} className={`px-4 py-2 text-sm font-medium transition-all rounded-full ${uploadForm.type === t ? "bg-[#34C759] text-white shadow-sm" : "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#D2D2D7]"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#86868B] block mb-2">File</label>
                <div className="relative">
                  <input type="file" className="w-full px-4 py-4 bg-[#F5F5F7] border-2 border-dashed border-[#D2D2D7] rounded-2xl text-sm text-[#86868B] file:mr-4 file:py-2 file:px-5 file:border-0 file:text-sm file:font-medium file:bg-[#34C759] file:text-white file:rounded-full hover:file:bg-[#2DB84E] transition-all cursor-pointer file:cursor-pointer hover:border-[#34C759]/50" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#E8E8ED] flex gap-4 justify-end">
              <button onClick={() => setShowUpload(null)} className="px-6 py-3 bg-[#E8E8ED] text-[#1D1D1F] rounded-full text-sm font-medium hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={() => { showToast("Content uploaded successfully"); setShowUpload(null); }} className="px-6 py-3 bg-[#34C759] text-white rounded-full text-sm font-medium hover:bg-[#2DB84E] active:scale-[0.97] transition-all shadow-sm"><Upload size={16} className="inline mr-2" /> Upload</button>
            </div>
          </div>
        </div>
      )}

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

      {/* ─── Grading Modal ─── */}
      {gradingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={() => { setGradingLesson(null); setSelectedStudent(null); setRightWrong({}); }}>
          <div className="bg-white w-full max-w-3xl shadow-2xl overflow-hidden rounded-[24px] flex flex-col animate-admin-scaleIn border border-[#F5F5F7]" onClick={e => e.stopPropagation()} style={{ maxHeight: "90vh" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E8E8ED] shrink-0">
              <div className="flex items-center gap-4">
                {selectedStudent && (
                  <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><ArrowLeft size={20} className="text-[#86868B]" /></button>
                )}
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                    {selectedStudent ? selectedStudent.name : gradingLesson.title}
                  </h2>
                  <p className="text-sm text-[#86868B] mt-1">
                    {selectedStudent ? "Mark each question Right or Wrong" : "Click a student to grade"}
                  </p>
                </div>
              </div>
              <button onClick={() => { setGradingLesson(null); setSelectedStudent(null); setRightWrong({}); }} className="p-2 hover:bg-[#F5F5F7] rounded-full transition-colors"><X size={22} className="text-[#86868B]" /></button>
            </div>

            {selectedStudent ? (
              /* ─── Per-Question Grading View ─── */
              <div className="overflow-y-auto flex-1">
                {gradingLesson.questions?.length > 0 ? (
                  <>
                    <div className="px-8 py-4 bg-[#FAFAFA] border-b border-[#E8E8ED] flex items-center justify-between">
                      <span className="text-sm font-medium text-[#86868B]">Questions ({gradingLesson.questions.length})</span>
                      {(() => {
                        const questions = gradingLesson.questions.map(qid => questionBanks.flatMap(b => b.questions).find(q => q.id === qid)).filter(Boolean);
                        const correct = questions.filter(q => rightWrong[q.id] === true).length;
                        const total = questions.filter(q => selectedStudent.answers[q.id] != null).length;
                        return total > 0 ? (
                          <span className="text-sm font-medium text-[#1D1D1F]">{correct}/{total} correct · {Math.round(correct/total*100)}%</span>
                        ) : null;
                      })()}
                    </div>
                    <div className="divide-y divide-[#E8E8ED]">
                      {gradingLesson.questions.map((qid, qi) => {
                        const allQs = questionBanks.flatMap(b => b.questions);
                        const q = allQs.find(q => q.id === qid);
                        if (!q) return null;
                        const answer = selectedStudent.answers[qid];
                        const answered = answer != null;
                        const isRight = rightWrong[q.id];
                        return (
                          <div key={qid} className="px-8 py-6 hover:bg-[#FAFAFA] transition-colors">
                            <div className="flex items-start gap-4 mb-4">
                              <span className={`w-8 h-8 text-sm font-medium flex items-center justify-center shrink-0 mt-0.5 rounded-xl ${isRight === true ? "bg-[#34C759]/10 text-[#34C759]" : isRight === false ? "bg-[#FF3B30]/10 text-[#FF3B30]" : "bg-[#E8E8ED] text-[#1D1D1F]"}`}>{qi + 1}</span>
                              <div className="min-w-0 flex-1">
                                <p className="text-base font-medium text-[#1D1D1F]">{q.text}</p>
                                <span className="text-sm text-[#86868B]">{q.type}</span>
                              </div>
                            </div>
                            {answered ? (
                              <div className="ml-12 space-y-4">
                                <div className="bg-[#FAFAFA] border border-[#E8E8ED] p-5 rounded-2xl">
                                  <p className="text-sm text-[#1D1D1F] leading-relaxed whitespace-pre-wrap">{answer}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-medium text-[#86868B] mr-1">Mark:</span>
                                  <button
                                    onClick={() => setRightWrong(p => ({ ...p, [q.id]: true }))}
                                    className={`px-5 py-2.5 text-sm font-medium transition-all rounded-full ${isRight === true ? "bg-[#34C759] text-white shadow-sm scale-105" : "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#D2D2D7]"}`}
                                  >
                                    <Check size={16} className="inline mr-1.5" /> Right
                                  </button>
                                  <button
                                    onClick={() => setRightWrong(p => ({ ...p, [q.id]: false }))}
                                    className={`px-5 py-2.5 text-sm font-medium transition-all rounded-full ${isRight === false ? "bg-[#FF3B30] text-white shadow-sm scale-105" : "bg-[#E8E8ED] text-[#1D1D1F] hover:bg-[#D2D2D7]"}`}
                                  >
                                    <X size={16} className="inline mr-1.5" /> Wrong
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="ml-12">
                                <div className="bg-[#FAFAFA] border border-dashed border-[#E8E8ED] p-5 rounded-2xl">
                                  <p className="text-sm text-[#A1A1A6] italic">No answer submitted.</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-8 py-6 bg-[#FAFAFA] border-t border-[#E8E8ED]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#86868B]">
                          {(() => {
                            const questions = gradingLesson.questions.map(qid => questionBanks.flatMap(b => b.questions).find(q => q.id === qid)).filter(Boolean);
                            const marked = questions.filter(q => rightWrong[q.id] != null).length;
                            const total = questions.filter(q => selectedStudent.answers[q.id] != null).length;
                            return `Marked ${marked} of ${total} answered questions`;
                          })()}
                        </span>
                        <button
                          onClick={() => {
                            setSavingStudent(selectedStudent.name);
                            setTimeout(() => {
                              const questions = gradingLesson.questions.map(qid => questionBanks.flatMap(b => b.questions).find(q => q.id === qid)).filter(Boolean).filter(q => selectedStudent.answers[q.id] != null);
                              const marked = questions.filter(q => rightWrong[q.id] === true).length;
                              const total = questions.length;
                              const score = total > 0 ? Math.round(marked / total * 100) : 0;
                              selectedStudent._score = score;
                              showToast(`${selectedStudent.name}'s grade saved (${score}%)`);
                              setSavingStudent(null);
                            }, 600);
                          }}
                          className="px-6 py-3 bg-[#0071E3] text-white text-sm font-medium hover:bg-[#0056B3] active:scale-[0.97] transition-all rounded-full shadow-sm"
                        >
                          {savingStudent === selectedStudent.name ? <Loader2 size={16} className="animate-spin" /> : "Save Grade"}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <FileText size={32} className="text-[#A1A1A6]" />
                      </div>
                      <p className="text-base font-medium text-[#86868B]">No questions configured for this assessment.</p>
                      <p className="text-sm text-[#A1A1A6] mt-2">Add questions from the question banks when creating this assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ─── Student List View ─── */
              <div className="divide-y divide-[#E8E8ED] overflow-y-auto flex-1">
                {mockStudents.map((s, i) => {
                  const hasQuestions = gradingLesson.questions?.length > 0;
                  const questions = hasQuestions ? gradingLesson.questions.map(qid => questionBanks.flatMap(b => b.questions).find(q => q.id === qid)).filter(Boolean) : [];
                  const answered = hasQuestions ? questions.filter(q => s.answers[q.id] != null).length : 0;
                  const total = hasQuestions ? questions.length : 0;
                  const status = statusConfig[s.status];
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={i}
                      onClick={() => s.status === "submitted" && hasQuestions ? setSelectedStudent(s) : null}
                      className={`px-8 py-5 transition-all ${s.status === "submitted" && hasQuestions ? "cursor-pointer hover:bg-[#FAFAFA] active:bg-[#F5F5F7]" : ""}`}
                    >
                      <div className="flex items-center gap-5">
                        <Avatar name={s.name} size="sm" className="rounded-2xl" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-5">
                            <p className="text-base font-medium text-[#1D1D1F]">{s.name}</p>
                            <div className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.status === "submitted" ? "bg-[#34C759]/5 text-[#34C759]" : s.status === "pending" ? "bg-[#FF9F0A]/5 text-[#FF9F0A]" : "bg-[#FF3B30]/5 text-[#FF3B30]"}`}>
                              <StatusIcon size={12} />
                              <span>{s.status === "submitted" ? s.submittedAt : status.label}</span>
                            </div>
                          </div>
                          {s.status === "submitted" && hasQuestions && (
                            <p className="text-sm text-[#86868B] mt-1.5">Answered {answered}/{total} questions</p>
                          )}
                          {s.status === "submitted" && !hasQuestions && (
                            <p className="text-sm text-[#86868B] mt-1.5">Submitted</p>
                          )}
                          {s.status === "pending" && (
                            <p className="text-sm text-[#86868B] italic mt-1.5">Waiting for submission</p>
                          )}
                          {s.status === "missing" && (
                            <p className="text-sm text-[#86868B] italic mt-1.5">No submission</p>
                          )}
                        </div>
                        {s.status === "submitted" && hasQuestions && (
                          <ChevronRight size={18} className="text-[#C7C7CC] shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .banner-grid { background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        .surface-hover:hover { background-color: #F5F5F7; }
      `}</style>
    </div>
  );
}
