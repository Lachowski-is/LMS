import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FilePlus, Trophy, X, Check, Sparkles, BookOpen, GraduationCap,
  ClipboardList, User, ThumbsUp, ThumbsDown, Brain,
  ChevronRight, Star, Eye, Plus, Minus, Send, BarChart3,
  ArrowUpRight, ArrowDownRight, Minus as MinusIcon, Search,
  MessageSquare, Download, AlertCircle, CheckCircle2, Target,
  Calendar, Clock, RotateCcw
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════ */
const questionTypes = [
  { id: "choose", label: "Choose", icon: CheckCircle2, defaultCount: 4, avgTime: 45, marks: 3 },
  { id: "correct-underlined", label: "Correct underlined", icon: () => null, defaultCount: 3, avgTime: 60, marks: 3 },
  { id: "complete", label: "Complete", icon: () => null, defaultCount: 3, avgTime: 50, marks: 3 },
  { id: "write-term", label: "Write Term", icon: () => null, defaultCount: 3, avgTime: 55, marks: 5 },
  { id: "short-answer", label: "Short answer", icon: () => null, defaultCount: 3, avgTime: 90, marks: 5 },
  { id: "long-answer", label: "Long answer", icon: () => null, defaultCount: 2, avgTime: 180, marks: 10 },
  { id: "essay", label: "Essay", icon: () => null, defaultCount: 1, avgTime: 600, marks: 20 },
];

const mockMaterials = [
  { id: 1, name: "Chapter 1: Introduction to Algebra", pages: 24, lastAccessed: "2 days ago", type: "PDF" },
  { id: 2, name: "Chapter 2: Linear Equations", pages: 32, lastAccessed: "1 week ago", type: "PDF" },
  { id: 3, name: "Chapter 3: Quadratic Functions", pages: 28, lastAccessed: "3 days ago", type: "PDF" },
  { id: 4, name: "Chapter 4: Statistics Basics", pages: 20, lastAccessed: "Today", type: "PDF" },
  { id: 5, name: "Lecture Notes - Week 1-4", pages: 56, lastAccessed: "Yesterday", type: "DOC" },
  { id: 6, name: "Supplementary Reading: Calculus Preview", pages: 40, lastAccessed: "5 days ago", type: "PDF" },
  { id: 7, name: "Practice Problems Set A", pages: 12, lastAccessed: "Today", type: "PDF" },
  { id: 8, name: "Formula Sheet", pages: 2, lastAccessed: "Today", type: "PDF" },
];

const mockCourses = [
  { id: 1, name: "Mathematics 101 — A", students: 32, color: "#0071E3" },
  { id: 2, name: "Mathematics 101 — B", students: 28, color: "#5E5CE6" },
  { id: 3, name: "Advanced Algebra — A", students: 18, color: "#FF9500" },
  { id: 4, name: "Statistics Fundamentals", students: 45, color: "#34C759" },
];

const mockAssessments = {
  1: [
    { id: 101, name: "Midterm Exam", type: "Exam", totalQuestions: 5, totalMarks: 100, status: "graded", avgScore: 76, submitted: 30, due: "2026-07-10" },
    { id: 102, name: "Week 5 Quiz", type: "Quiz", totalQuestions: 3, totalMarks: 30, status: "active", avgScore: null, submitted: 28, due: "2026-07-20" },
    { id: 103, name: "Homework 3", type: "Assignment", totalQuestions: 4, totalMarks: 40, status: "pending", avgScore: null, submitted: 0, due: "2026-07-25" },
  ],
  2: [
    { id: 201, name: "Final Exam", type: "Exam", totalQuestions: 6, totalMarks: 120, status: "draft", avgScore: null, submitted: 0, due: "2026-08-15" },
    { id: 202, name: "Pop Quiz 2", type: "Quiz", totalQuestions: 2, totalMarks: 20, status: "graded", avgScore: 82, submitted: 26, due: "2026-07-05" },
  ],
  3: [
    { id: 301, name: "Polynomials Test", type: "Exam", totalQuestions: 4, totalMarks: 80, status: "graded", avgScore: 88, submitted: 17, due: "2026-07-08" },
  ],
  4: [
    { id: 401, name: "Statistics Midterm", type: "Exam", totalQuestions: 5, totalMarks: 100, status: "active", avgScore: null, submitted: 42, due: "2026-07-18" },
    { id: 402, name: "Regression Assignment", type: "Assignment", totalQuestions: 3, totalMarks: 50, status: "pending", avgScore: null, submitted: 0, due: "2026-07-28" },
  ],
};

const studentAnswerData = [
  {
    id: 1, name: "Alice Johnson", avatar: "AJ",
    answers: [
      { text: "x = 5", aiFeedback: "Correct solution. You used the right algebraic steps, though showing your work would improve clarity.", maxMark: 5, confidence: 0.95 },
      { text: "A quadratic equation is an equation of the form ax² + bx + c = 0 where a ≠ 0.", aiFeedback: "Accurate definition. Consider adding an example to demonstrate understanding.", maxMark: 10, confidence: 0.88 },
      { text: "First, I would rearrange the terms. Then apply the quadratic formula. Finally, simplify.", aiFeedback: "Good high-level steps but missing the actual computation. Include the intermediate values.", maxMark: 15, confidence: 0.72 },
    ],
  },
  {
    id: 2, name: "Bob Smith", avatar: "BS",
    answers: [
      { text: "x = 5 and x = -2", aiFeedback: "You found two solutions but the equation only has one. Double-check your factoring.", maxMark: 5, confidence: 0.91 },
      { text: "It's a polynomial equation where the highest exponent is 2.", aiFeedback: "Informal but essentially correct. Could be more precise with the mathematical definition.", maxMark: 10, confidence: 0.76 },
      { text: "I would use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a", aiFeedback: "Formula is correct. Apply it to the specific problem to receive full credit.", maxMark: 15, confidence: 0.85 },
    ],
  },
  {
    id: 3, name: "Carol Williams", avatar: "CW",
    answers: [
      { text: "x = 5 ✓", aiFeedback: "Correct answer. The checkmark shows confidence — excellent work!", maxMark: 5, confidence: 0.98 },
      { text: "A quadratic equation is a second-degree polynomial equation in a single variable x.", aiFeedback: "Precise and concise. A model answer.", maxMark: 10, confidence: 0.97 },
      { text: "Step 1: 2x² + 3x - 5 = 0\nStep 2: a = 2, b = 3, c = -5\nStep 3: x = (-3 ± √(9 + 40)) / 4\nStep 4: x = (-3 ± 7) / 4\nStep 5: x = 1 or x = -2.5", aiFeedback: "Excellent step-by-step work. All intermediate values shown clearly.", maxMark: 15, confidence: 0.99 },
    ],
  },
  {
    id: 4, name: "David Chen", avatar: "DC",
    answers: [
      { text: "I don't know", aiFeedback: "Consider reviewing Chapter 2 on solving linear equations. Here's a hint: isolate x by performing inverse operations.", maxMark: 5, confidence: 0.45 },
      { text: "", aiFeedback: "No answer provided. This topic is covered in Chapter 1, Section 3.", maxMark: 10, confidence: 0.30 },
      { text: "x = (-b ± √(b² - 4ac)) / 2a", aiFeedback: "You wrote the formula correctly but didn't apply it to the problem. Please show the substitution steps.", maxMark: 15, confidence: 0.82 },
    ],
  },
];

const generatedQuestionSamples = {
  "choose": "What is the value of x in 2x + 5 = 15?",
  "correct-underlined": "The *quick* brown fox jumps over the lazy dog.",
  "complete": "The quadratic formula is x = ________.",
  "write-term": "Define the term 'coefficient' in your own words.",
  "short-answer": "Explain the difference between a variable and a constant.",
  "long-answer": "Describe the step-by-step process of solving a system of linear equations using substitution.",
  "essay": "Discuss the real-world applications of quadratic functions in physics and engineering.",
};

const feedbackTemplates = [
  "Excellent work! Your reasoning is clear and thorough.",
  "Good attempt, but please review the fundamental concepts.",
  "Partial credit awarded. Show more intermediate steps next time.",
  "Incorrect. Consider re-reading the relevant chapter section.",
  "Well done! This demonstrates strong understanding of the material.",
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 180, damping: 20 } },
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const Avatar = ({ initials, color, size = "md" }) => {
  const sizeClasses = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs", lg: "w-11 h-11 text-sm" };
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white shadow-sm`}
      style={{ backgroundColor: color || "#0071E3" }}
    >
      {initials}
    </div>
  );
};

const Badge = ({ children, variant = "default", size = "md" }) => {
  const variants = {
    default: "admin-badge-neutral",
    primary: "admin-badge-info",
    success: "admin-badge-success",
    warning: "admin-badge-warning",
    danger: "admin-badge-danger",
    purple: "bg-purple-50 text-purple-600",
    outline: "border border-[#D2D2D7] text-[#86868B] bg-transparent",
  };
  const sizes = { sm: "px-2 py-0.5 text-[10px]", md: "px-2.5 py-1 text-xs", lg: "px-3 py-1.5 text-sm" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

const ProgressBar = ({ value, max = 100, color = "#0071E3", size = "md", showLabel = false, animated = false }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const heightClasses = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${heightClasses[size]} bg-[#E8E8ED] rounded-full overflow-hidden`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: "easeOut" } : { duration: 0 }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-[#86868B] min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

const Checkbox = ({ active, color = "#0071E3", onClick, disabled }) => (
  <motion.button
    animate={active ? { scale: [1, 1.25, 1] } : {}}
    transition={{ duration: 0.25 }}
    whileHover={!disabled ? { x: 2 } : {}}
    whileTap={!disabled ? { scale: 0.99 } : {}}
    onClick={onClick}
    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    style={{
      borderColor: active ? color : "#D2D2D7",
      backgroundColor: active ? color : "transparent",
    }}
  >
    <AnimatePresence>
      {active && (
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <motion.path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  </motion.button>
);

const SegmentedControl = ({ options, value, onChange, color = "#0071E3" }) => (
  <div className="inline-flex p-1 bg-[#E8E8ED] rounded-full">
    {options.map((opt) => {
      const active = value === opt.value;
      return (
        <motion.button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${active ? "text-white" : "text-[#86868B] hover:text-[#1D1D1F]"}`}
        >
          {active && (
            <motion.div
              layoutId="segment-bg"
              className="absolute inset-0 rounded-full shadow-sm"
              style={{ backgroundColor: color }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            {opt.icon && <opt.icon size={14} />}
            {opt.label}
          </span>
        </motion.button>
      );
    })}
  </div>
);

const Toast = ({ message, type = "info", onClose }) => {
  const colors = {
    info: "text-[#0071E3] border-[#0071E3]/20",
    success: "text-[#34C759] border-[#34C759]/20",
    warning: "text-[#FF9500] border-[#FF9500]/20",
    error: "text-[#FF3B30] border-[#FF3B30]/20",
  };
  const icons = { info: AlertCircle, success: CheckCircle2, warning: AlertCircle, error: () => <X size={18} /> };
  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border shadow-xl text-sm font-semibold ${colors[type]}`}
    >
      <Icon size={18} />
      <span className="text-[#1D1D1F]">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 text-[#86868B]">
        <X size={14} />
      </button>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CREATE ASSESSMENT SECTION
   ═══════════════════════════════════════════════════════════════ */

const CreateAssessmentSection = ({ showToast }) => {
  const [step, setStep] = useState(1);
  const [assessmentType, setAssessmentType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [customCounts, setCustomCounts] = useState({});
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attempts, setAttempts] = useState("1");
  const [searchMaterials, setSearchMaterials] = useState("");

  const totalSteps = 4;
  const steps = ["Basics", "Materials", "Questions", "Review"];

  const filteredMaterials = mockMaterials.filter(m =>
    m.name.toLowerCase().includes(searchMaterials.toLowerCase())
  );

  const handleMaterialToggle = (id) => {
    setSelectedMaterials(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleTypeToggle = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(x => x !== typeId) : [...prev, typeId]
    );
    if (!customCounts[typeId]) {
      const type = questionTypes.find(t => t.id === typeId);
      setCustomCounts(prev => ({ ...prev, [typeId]: type.defaultCount }));
    }
  };

  const handleCountChange = (typeId, delta) => {
    setCustomCounts(prev => ({
      ...prev,
      [typeId]: Math.max(1, Math.min(10, (prev[typeId] || 1) + delta))
    }));
  };

  const handleSelectAllTypes = () => {
    if (selectedTypes.length === questionTypes.length) {
      setSelectedTypes([]);
      setCustomCounts({});
    } else {
      const allIds = questionTypes.map(t => t.id);
      setSelectedTypes(allIds);
      const counts = {};
      questionTypes.forEach(t => { counts[t.id] = t.defaultCount; });
      setCustomCounts(counts);
    }
  };

  const handleCourseToggle = (id) => {
    setSelectedCourses(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleLoadTemplate = (template) => {
    setAssessmentType(template.type);
    setDifficulty(template.difficulty);
    setSelectedMaterials(template.materials);
    setSelectedTypes(template.types);
    const counts = {};
    template.types.forEach(tid => {
      const type = questionTypes.find(t => t.id === tid);
      counts[tid] = type.defaultCount;
    });
    setCustomCounts(counts);
    setShowTemplateModal(false);
    showToast("Template loaded successfully!", "success");
  };

  const handleSaveTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: assessmentTitle || `Template ${savedTemplates.length + 1}`,
      type: assessmentType,
      difficulty,
      materials: selectedMaterials,
      types: selectedTypes,
    };
    setSavedTemplates(prev => [...prev, newTemplate]);
    showToast("Template saved!", "success");
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowPreview(true);
      showToast("Assessment generated successfully!", "success");
    }, 2800);
  };

  const activeTypes = selectedTypes;
  const questionCounts = activeTypes.map(typeId => {
    const type = questionTypes.find(t => t.id === typeId);
    return {
      type: type.label,
      typeId,
      count: customCounts[typeId] || type.defaultCount,
      avgTime: type.avgTime,
      marks: type.marks,
    };
  });

  const totalQuestions = questionCounts.reduce((a, b) => a + b.count, 0);
  const estimatedTime = questionCounts.reduce((a, b) => a + (b.count * b.avgTime), 0);
  const totalMarks = questionCounts.reduce((a, b) => a + (b.count * b.marks), 0);

  const canProceed = () => {
    if (step === 1) return assessmentType && difficulty && assessmentTitle;
    if (step === 2) return selectedMaterials.length > 0;
    if (step === 3) return selectedTypes.length > 0;
    return true;
  };

  const typeIcons = {
    Assignment: ClipboardList,
    Exam: BookOpen,
    Quiz: GraduationCap,
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl mx-auto">
      {/* Stepper */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isActive ? "bg-[#0071E3] text-white shadow-lg" :
                      isCompleted ? "bg-[#34C759] text-white" : "bg-[#E8E8ED] text-[#A1A1A6]"
                      }`}
                  >
                    {isCompleted ? <Check size={18} /> : stepNum}
                  </motion.div>
                  <span className={`text-xs font-semibold mt-2 ${isActive ? "text-[#0071E3]" : isCompleted ? "text-[#34C759]" : "text-[#A1A1A6]"}`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-3 bg-[#E8E8ED] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0071E3] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-6">
            {/* Title */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Assessment Title *</label>
              <input type="text" value={assessmentTitle} onChange={e => setAssessmentTitle(e.target.value)}
                placeholder="e.g., Midterm Exam - Linear Equations"
                className="w-full px-5 py-3.5 border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all bg-white"
              />
            </motion.div>

            {/* Type */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-3">Assessment Type *</label>
              <div className="grid grid-cols-3 gap-3">
                {["Assignment", "Exam", "Quiz"].map((type, i) => {
                  const Icon = typeIcons[type];
                  const active = assessmentType === type;
                  return (
                    <motion.button key={type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, type: "spring", stiffness: 120, damping: 16 }}
                      whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setAssessmentType(type)}
                      className={`py-4 px-4 rounded-xl text-sm font-semibold border transition-all ${active ? "border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3] shadow-sm" : "border-[#D2D2D7] text-[#86868B] hover:border-[#A1A1A6] bg-white"}`}
                    >
                      <motion.div animate={active ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.35 }} className="flex flex-col items-center gap-2">
                        <Icon size={22} />
                        <span>{type}</span>
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Difficulty */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-3">Difficulty *</label>
              <div className="grid grid-cols-3 gap-3">
                {["Easy", "Medium", "Hard"].map((level, i) => {
                  const active = difficulty === level;
                  const colors = { Easy: ["#34C759", "#34C75910", "#34C75920"], Medium: ["#FF9500", "#FF950010", "#FF950020"], Hard: ["#FF3B30", "#FF3B3010", "#FF3B3020"] };
                  const [textColor, bgColor, borderColor] = colors[level];
                  return (
                    <motion.button key={level} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i + 0.1, type: "spring", stiffness: 120, damping: 16 }}
                      whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setDifficulty(level)}
                      className={`py-3.5 px-4 rounded-xl text-sm font-semibold border transition-all ${active ? "shadow-sm" : "border-[#D2D2D7] text-[#86868B] hover:border-[#A1A1A6] bg-white"}`}
                      style={active ? { borderColor, backgroundColor: bgColor, color: textColor } : {}}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(star => (
                            <Star key={star} size={12} className={star <= (level === "Easy" ? 1 : level === "Medium" ? 2 : 3) ? "fill-current" : "text-gray-200"} style={active ? { color: textColor } : {}} />
                          ))}
                        </div>
                        <span>{level}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Due Date</label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A6]" />
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Time Limit (min)</label>
                <div className="relative">
                  <Clock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A6]" />
                  <input type="number" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} placeholder="Auto"
                    className="w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all bg-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Attempts */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-[#1D1D1F] mb-2">Allowed Attempts</label>
              <div className="flex items-center gap-3">
                {["1", "2", "3", "unlimited"].map(num => (
                  <motion.button key={num} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setAttempts(num)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${attempts === num ? "border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3]" : "border-[#D2D2D7] text-[#86868B] hover:border-[#A1A1A6] bg-white"}`}
                  >
                    {num === "unlimited" ? "∞" : num}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-[#1D1D1F]">Select Materials *</label>
                <span className="text-xs text-[#A1A1A6]">{selectedMaterials.length} selected</span>
              </div>
              <div className="relative mb-3">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={searchMaterials} onChange={e => setSearchMaterials(e.target.value)} placeholder="Search materials..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                />
              </div>
              <div className="bg-[#F5F5F7] rounded-2xl p-1.5 space-y-0.5 max-h-[320px] overflow-y-auto">
                {filteredMaterials.map((m, i) => {
                  const active = selectedMaterials.includes(m.id);
                  return (
                    <motion.button key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.02 * i }}
                      whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
                      onClick={() => handleMaterialToggle(m.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all ${active ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <Checkbox active={active} onClick={() => handleMaterialToggle(m.id)} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{m.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{m.pages} pages · {m.type} · {m.lastAccessed}</p>
                      </div>
                      {active && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={14} className="text-blue-500" /></motion.div>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-900 mb-2">Teacher Criteria</label>
              <textarea value={criteria} onChange={e => setCriteria(e.target.value)}
                placeholder="e.g., Focus on real-world applications, include at least 3 diagram-based questions..."
                rows={4}
                className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all resize-none"
              />
              <div className="flex justify-end mt-1.5">
                <span className="text-xs text-gray-400">{criteria.length} characters</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-900">Question Types *</label>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSelectAllTypes}
                  className="text-xs text-blue-600 font-medium"
                >
                  {selectedTypes.length === questionTypes.length ? "Deselect All" : "Select All"}
                </motion.button>
              </div>
              <div className="bg-[#F5F5F7] rounded-2xl p-1.5 space-y-0.5">
                {questionTypes.map((type, i) => {
                  const active = selectedTypes.includes(type.id);
                  const count = customCounts[type.id] || type.defaultCount;
                  return (
                    <motion.div key={type.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.02 * i }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${active ? "bg-white shadow-sm" : "text-gray-500"}`}
                    >
                      <Checkbox active={active} onClick={() => handleTypeToggle(type.id)} />
                      <span className="flex-1 font-medium">{type.label}</span>
                      {active && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); handleCountChange(type.id, -1); }}
                            className="w-6 h-6 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-colors"
                          >
                            <Minus size={12} />
                          </motion.button>
                          <span className="w-6 text-center font-semibold text-gray-900">{count}</span>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); handleCountChange(type.id, 1); }}
                            className="w-6 h-6 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-colors"
                          >
                            <Plus size={12} />
                          </motion.button>
                          <span className="text-xs text-gray-400 w-16 text-right">~{Math.round(count * type.avgTime / 60)} min</span>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Live Summary */}
            {selectedTypes.length > 0 && (
              <motion.div variants={fadeUp} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 rounded-2xl p-5 border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={16} className="text-blue-500" />
                  <span className="text-sm font-semibold text-blue-700">Live Preview</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">{totalQuestions}</div>
                    <div className="text-xs text-blue-500">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">{Math.round(estimatedTime / 60)} min</div>
                    <div className="text-xs text-blue-500">Est. Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">{totalMarks}</div>
                    <div className="text-xs text-blue-500">Total Marks</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <motion.div variants={fadeUp} className="bg-white rounded-[20px] border border-[#E8E8ED] p-6">
              <h3 className="text-base font-semibold text-[#1D1D1F] mb-4">Review Configuration</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
                  <span className="text-sm text-[#86868B]">Title</span>
                  <span className="text-sm font-medium text-[#1D1D1F]">{assessmentTitle || "Untitled"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E8E8ED]">
                  <span className="text-sm text-[#86868B]">Type</span>
                  <Badge variant="primary">{assessmentType}</Badge>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Difficulty</span>
                  <Badge variant={difficulty === "Easy" ? "success" : difficulty === "Medium" ? "warning" : "danger"}>{difficulty}</Badge>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Materials</span>
                  <span className="text-sm font-medium text-gray-900">{selectedMaterials.length} selected</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Questions</span>
                  <span className="text-sm font-medium text-gray-900">{totalQuestions} total</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Estimated Time</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(estimatedTime / 60)} minutes</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Total Marks</span>
                  <span className="text-sm font-bold text-gray-900">{totalMarks}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-900 mb-3">Question Breakdown</label>
              <div className="space-y-2">
                {questionCounts.map((q, i) => (
                  <motion.div key={q.type} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                    className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-sm text-gray-700">{q.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" size="sm">×{q.count}</Badge>
                      <span className="text-xs text-gray-400">~{Math.round(q.count * q.avgTime / 60)} min</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="w-full py-4 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                Generate Assessment with AI
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8E8ED]">
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#86868B] bg-[#E8E8ED] hover:bg-[#D2D2D7] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </motion.button>
        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            onClick={() => setStep(Math.min(totalSteps, step + 1))}
            disabled={!canProceed() || step === totalSteps}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0071E3] hover:bg-[#0056B3] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {step === totalSteps ? "Review" : "Next Step"}
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50"
                  >
                    <FilePlus size={18} className="text-blue-600" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">{assessmentTitle || "Assessment Preview"}</h2>
                    <p className="text-xs text-gray-400">{assessmentType} · {difficulty} · {totalQuestions} questions · {totalMarks} marks</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.05, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPreview(false)}
                  className="w-8 h-8 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-all"
                >
                  <X size={14} className="text-gray-500" />
                </motion.button>
              </div>

              <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {questionCounts.map((q, i) => (
                    <motion.span key={q.type} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.04 * i }}
                      className="px-3 py-1.5 bg-[#F5F5F7] rounded-lg text-xs font-medium text-gray-500 border border-gray-100"
                    >
                      {q.type} <span className="text-gray-900 font-semibold">×{q.count}</span>
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="space-y-3">
                  {questionCounts.slice(0, 5).map((q, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.15 }}
                      whileHover={{ x: 2 }}
                      className="p-4 bg-[#F5F5F7] rounded-2xl border border-gray-100 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-white rounded-md text-[11px] font-medium text-blue-600 border border-blue-100">{q.type}</span>
                        <span className="text-[11px] text-gray-400">Question {i + 1}</span>
                        <span className="text-[11px] text-gray-400 ml-auto">{q.avgTime < 60 ? `${q.avgTime}s` : `${Math.round(q.avgTime / 60)} min`}</span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{generatedQuestionSamples[q.typeId]}</p>
                    </motion.div>
                  ))}
                  {questionCounts.length > 5 && <p className="text-xs text-gray-400 text-center py-2">+{questionCounts.length - 5} more question types</p>}
                </motion.div>

                <motion.div variants={fadeUp} className="border-t border-gray-100 pt-5">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Assign to Courses</label>
                  <div className="bg-[#F5F5F7] rounded-2xl p-1.5 space-y-0.5">
                    {mockCourses.map(c => (
                      <motion.button key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * mockCourses.indexOf(c) }} whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
                        onClick={() => handleCourseToggle(c.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all ${selectedCourses.includes(c.id) ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <Checkbox active={selectedCourses.includes(c.id)} color="#34C759" onClick={() => handleCourseToggle(c.id)} />
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                        {c.name}
                        <span className="ml-auto text-xs text-gray-400">{c.students} students</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button whileHover={selectedCourses.length > 0 ? { scale: 1.01 } : {}} whileTap={selectedCourses.length > 0 ? { scale: 0.98 } : {}}
                  disabled={selectedCourses.length === 0}
                  onClick={() => { setShowPreview(false); showToast(`Assigned to ${selectedCourses.length} course(s)!`, "success"); }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {selectedCourses.length > 0 ? `Assign to ${selectedCourses.length} course${selectedCourses.length > 1 ? "s" : ""}` : "Select courses"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generating Overlay */}
      <AnimatePresence>
        {generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
          >
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl bg-blue-100/50" />
                <motion.div animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-blue-100 border-t-blue-500" />
                <div className="absolute inset-2 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <Sparkles size={28} className="text-blue-500" />
                  </motion.div>
                </div>
              </div>
              <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                Crafting Your {assessmentType || "Assessment"}
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="text-sm text-gray-500 mb-5"
              >
                Generating questions based on your criteria...
              </motion.p>
              <div className="flex items-center gap-1.5 justify-center">
                {[0, 150, 300].map(delay => (
                  <motion.span key={delay}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: delay / 1000, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                ))}
              </div>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
                className="h-1 rounded-full mt-6 w-48 mx-auto overflow-hidden origin-left bg-blue-100"
              >
                <motion.div animate={{ x: ["-100%", "0%"] }} transition={{ duration: 2.8, ease: "easeInOut" }}
                  className="h-full w-full rounded-full bg-blue-500"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   MARK & GRADE SECTION
   ═══════════════════════════════════════════════════════════════ */

const MarkGradeSection = ({ showToast }) => {
  const containerBg = "bg-white rounded-[20px] border border-[#E8E8ED] p-6";
  const [markCourseId, setMarkCourseId] = useState(null);
  const [markAssessmentId, setMarkAssessmentId] = useState(null);
  const [markCriteria, setMarkCriteria] = useState("");
  const [grading, setGrading] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [activeFeedbackStudent, setActiveFeedbackStudent] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const [students, setStudents] = useState(() =>
    studentAnswerData.map(s => ({
      ...s,
      answers: s.answers.map(a => ({ ...a, mark: null, correct: null })),
    }))
  );

  const handleGrade = () => {
    setGrading(true);
    setTimeout(() => {
      setGrading(false);
      const graded = studentAnswerData.map(s => ({
        ...s,
        answers: s.answers.map(a => {
          const half = a.maxMark / 2;
          const baseMark = Math.round((Math.random() * 0.6 + 0.2) * a.maxMark);
          const mark = Math.min(a.maxMark, Math.max(0, baseMark));
          return { ...a, mark, correct: mark >= half };
        }),
      }));
      setStudents(graded);
      setShowGrades(true);
      showToast("AI grading complete! Review and adjust marks.", "success");
    }, 3200);
  };

  const updateStudentAnswer = (studentId, answerIdx, field, value) => {
    setStudents(prev => prev.map(s =>
      s.id === studentId
        ? { ...s, answers: s.answers.map((a, i) => i === answerIdx ? { ...a, [field]: value } : a) }
        : s
    ));
  };

  const toggleCorrect = (studentId, answerIdx) => {
    const student = students.find(s => s.id === studentId);
    const answer = student.answers[answerIdx];
    const newCorrect = !answer.correct;
    updateStudentAnswer(studentId, answerIdx, "correct", newCorrect);
    if (newCorrect) {
      updateStudentAnswer(studentId, answerIdx, "mark", answer.maxMark);
    } else {
      updateStudentAnswer(studentId, answerIdx, "mark", 0);
    }
  };

  const getTotalMark = (student) => student.answers.reduce((sum, a) => sum + (a.mark || 0), 0);
  const getMaxTotal = (student) => student.answers.reduce((sum, a) => sum + a.maxMark, 0);
  const getPercentage = (student) => Math.round((getTotalMark(student) / getMaxTotal(student)) * 100);

  const handleBulkApprove = () => {
    showToast(`Approved ${selectedStudents.length} student grades`, "success");
    setSelectedStudents([]);
    setBulkMode(false);
  };

  const handleApplyFeedback = (template) => {
    if (activeFeedbackStudent) {
      const student = students.find(s => s.id === activeFeedbackStudent);
      student.answers.forEach((a, i) => {
        updateStudentAnswer(activeFeedbackStudent, i, "aiFeedback", template);
      });
      setShowFeedbackModal(false);
      setActiveFeedbackStudent(null);
      showToast("Feedback applied to all answers", "info");
    }
  };

  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchStudent.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "score") return getPercentage(b) - getPercentage(a);
      if (sortBy === "status") return (a.answers[0].mark !== null ? 1 : 0) - (b.answers[0].mark !== null ? 1 : 0);
      return 0;
    });

  const classAverage = students.length > 0 && students[0].answers[0].mark !== null
    ? Math.round(students.reduce((sum, s) => sum + getPercentage(s), 0) / students.length)
    : null;

  const gradeDistribution = students.length > 0 && students[0].answers[0].mark !== null
    ? {
      A: students.filter(s => getPercentage(s) >= 90).length,
      B: students.filter(s => getPercentage(s) >= 80 && getPercentage(s) < 90).length,
      C: students.filter(s => getPercentage(s) >= 70 && getPercentage(s) < 80).length,
      D: students.filter(s => getPercentage(s) >= 60 && getPercentage(s) < 70).length,
      F: students.filter(s => getPercentage(s) < 60).length,
    }
    : null;

  const currentAssessment = markCourseId ? mockAssessments[markCourseId]?.find(a => a.id === markAssessmentId) : null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* Course & Assessment Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-900 mb-3">Select Course *</label>
          <div className="bg-[#F5F5F7] rounded-2xl p-1.5 space-y-0.5 max-h-[280px] overflow-y-auto">
            {mockCourses.map((c, i) => (
              <motion.button key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.02 * i }}
                whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
                onClick={() => { setMarkCourseId(c.id); setMarkAssessmentId(null); setShowGrades(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all ${markCourseId === c.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Checkbox active={markCourseId === c.id} color="#FF3B30" onClick={() => { setMarkCourseId(c.id); setMarkAssessmentId(null); }} />
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.students} students</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-900 mb-3">Select Assessment *</label>
          {!markCourseId ? (
            <div className="bg-[#F5F5F7] rounded-2xl p-8 text-center">
              <BookOpen size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Select a course first</p>
            </div>
          ) : (
            <div className="bg-[#F5F5F7] rounded-2xl p-1.5 space-y-0.5 max-h-[280px] overflow-y-auto">
              {mockAssessments[markCourseId]?.map((a, i) => (
                <motion.button key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.02 * i }}
                  whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
                  onClick={() => { setMarkAssessmentId(a.id); setShowGrades(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all ${markAssessmentId === a.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Checkbox active={markAssessmentId === a.id} color="#FF3B30" onClick={() => setMarkAssessmentId(a.id)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{a.name}</span>
                      <Badge variant={a.status === "graded" ? "success" : a.status === "active" ? "primary" : a.status === "draft" ? "purple" : "warning"} size="sm">
                        {a.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{a.totalQuestions} Q · {a.totalMarks} marks · Due {a.due}</p>
                  </div>
                  {a.avgScore && <span className="text-xs font-semibold text-green-600">{a.avgScore}%</span>}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Grading Criteria */}
      <AnimatePresence>
        {markAssessmentId && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-gray-900 mb-2">Grading Criteria</label>
              <textarea value={markCriteria} onChange={e => setMarkCriteria(e.target.value)}
                placeholder="e.g., Award partial credit for correct methodology even if final answer is wrong. Penalize 10% for missing units."
                rows={3}
                className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50 transition-all resize-none"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-gray-400">{markCriteria.length} characters</span>
                <div className="flex gap-2">
                  {feedbackTemplates.slice(0, 3).map((t, i) => (
                    <button key={i} onClick={() => setMarkCriteria(prev => prev ? prev + "\n" + t : t)}
                      className="text-[10px] px-2 py-1 bg-[#E8E8ED] rounded-lg text-gray-500 hover:bg-[#D2D2D7] transition-colors"
                    >
                      + {t.slice(0, 20)}...
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grade Button — always visible */}
      <div className="mt-6">
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={handleGrade}
          disabled={!markCourseId || !markAssessmentId}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-2xl text-sm font-semibold hover:from-red-600 hover:to-red-500 transition-all shadow-lg shadow-red-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Brain size={18} />
          Grade with AI
        </motion.button>
        {!markAssessmentId && markCourseId && (
          <p className="text-xs text-gray-400 text-center mt-2">Select an assessment above to enable grading</p>
        )}
      </div>

      {/* Grading Overlay */}
      <AnimatePresence>
        {grading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
          >
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl bg-red-100/50" />
                <motion.div animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-red-100 border-t-red-500" />
                <div className="absolute inset-2 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <Brain size={28} className="text-red-500" />
                  </motion.div>
                </div>
              </div>
              <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-lg font-semibold text-gray-900 mb-2"
              >
                Grading Submissions
              </motion.h3>
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="text-sm text-gray-500 mb-5"
              >
                Analyzing answers and generating feedback...
              </motion.p>
              <div className="flex items-center gap-1.5 justify-center">
                {[0, 150, 300].map(delay => (
                  <motion.span key={delay}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: delay / 1000, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                ))}
              </div>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 3.2, ease: "easeInOut" }}
                className="h-1 rounded-full mt-6 w-48 mx-auto overflow-hidden origin-left bg-red-100"
              >
                <motion.div animate={{ x: ["-100%", "0%"] }} transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="h-full w-full rounded-full bg-red-500"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grades Results Modal */}
      <AnimatePresence>
        {showGrades && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowGrades(false)}
          >
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50"
                  >
                    <Trophy size={18} className="text-red-500" />
                  </motion.div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Graded Results</h2>
                    <p className="text-xs text-gray-400">
                      {currentAssessment?.name || "Assessment"} · {students.length} students
                      {classAverage !== null && ` · Class Avg: ${classAverage}%`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchStudent} onChange={e => setSearchStudent(e.target.value)} placeholder="Search students..."
                      className="w-48 pl-9 pr-3 py-2 bg-[#F5F5F7] border border-gray-100 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-red-300 focus:ring-2 focus:ring-red-50 transition-all"
                    />
                  </div>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-[#F5F5F7] border border-gray-100 rounded-xl text-xs text-gray-700 outline-none focus:border-red-300"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="score">Sort by Score</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => { setBulkMode(!bulkMode); setSelectedStudents([]); }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${bulkMode ? "bg-red-50 text-red-600 border border-red-200" : "bg-[#F5F5F7] text-gray-600 border border-gray-100"}`}
                  >
                    {bulkMode ? "Done" : "Bulk"}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setShowGrades(false)}
                    className="w-8 h-8 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-all"
                  >
                    <X size={14} className="text-gray-500" />
                  </motion.button>
                </div>
              </div>

              {/* Bulk Actions */}
              <AnimatePresence>
                {bulkMode && selectedStudents.length > 0 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="shrink-0 px-6 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between"
                  >
                    <span className="text-sm text-red-700 font-medium">{selectedStudents.length} students selected</span>
                    <div className="flex items-center gap-2">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleBulkApprove}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1.5"
                      >
                        <Check size={12} />
                        Approve All
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedStudents([])}
                        className="px-4 py-1.5 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-medium hover:bg-[#F5F5F7] transition-colors"
                      >
                        Clear
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Students */}
              <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {filteredStudents.map((student, si) => {
                  const percentage = getPercentage(student);
                  const isSelected = selectedStudents.includes(student.id);
                  const colors = ["#0071E3", "#FF3B30", "#34C759", "#FF9500", "#5E5CE6"];

                  return (
                    <motion.div key={student.id} variants={fadeUp} layout className="bg-[#F5F5F7] rounded-2xl overflow-hidden">
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#E8E8ED] transition-colors"
                        onClick={() => {
                          if (bulkMode) {
                            setSelectedStudents(prev =>
                              prev.includes(student.id) ? prev.filter(id => id !== student.id) : [...prev, student.id]
                            );
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {bulkMode && (
                            <Checkbox active={isSelected} color="#FF3B30"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudents(prev =>
                                  prev.includes(student.id) ? prev.filter(id => id !== student.id) : [...prev, student.id]
                                );
                              }}
                            />
                          )}
                          <Avatar initials={student.avatar} color={colors[si % 5]} />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-[11px] text-gray-400">Total: {getTotalMark(student)} / {getMaxTotal(student)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex items-center gap-1.5">
                            <div className="w-16 h-1.5 bg-[#D2D2D7] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all"
                                style={{
                                  width: `${student.answers.reduce((sum, a) => sum + (a.confidence || 0), 0) / student.answers.length * 100}%`,
                                  backgroundColor: student.answers.reduce((sum, a) => sum + (a.confidence || 0), 0) / student.answers.length > 0.8 ? "#34C759" : "#FF9500"
                                }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-400">
                              {Math.round(student.answers.reduce((sum, a) => sum + (a.confidence || 0), 0) / student.answers.length * 100)}% AI conf.
                            </span>
                          </div>
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + si * 0.1, type: "spring" }}
                            className={`text-sm font-bold px-3 py-1 rounded-lg ${percentage >= 80 ? "bg-green-50 text-green-600" :
                              percentage >= 60 ? "bg-orange-50 text-orange-600" :
                                "bg-red-50 text-red-500"
                              }`}
                          >
                            {percentage}%
                          </motion.div>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); setActiveFeedbackStudent(student.id); setShowFeedbackModal(true); }}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-[#D2D2D7] transition-colors"
                          >
                            <MessageSquare size={12} className="text-gray-500" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="px-4 pb-4 space-y-3">
                        {student.answers.map((answer, ai) => (
                          <motion.div key={ai} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * ai }}
                            className="bg-white rounded-xl p-4 space-y-3 border border-gray-100"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Question {ai + 1}</span>
                                  {answer.confidence && answer.confidence < 0.6 && (
                                    <span className="text-[10px] text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <AlertCircle size={10} />
                                      Review
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">{answer.text || <span className="text-gray-400 italic">No answer provided</span>}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5 p-3 bg-purple-50 rounded-xl border border-purple-100">
                              <Brain size={14} className="text-purple-500 shrink-0 mt-0.5" />
                              <p className="text-[12px] text-gray-600 leading-relaxed">{answer.aiFeedback}</p>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                              <span className="text-[12px] text-gray-500 font-medium">Mark:</span>
                              <div className="flex items-center gap-1.5">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleCorrect(student.id, ai)}
                                  className={`p-1.5 rounded-lg transition-all ${answer.correct ? "bg-green-50 text-green-600" : "bg-[#E8E8ED] text-gray-300"}`}
                                >
                                  <ThumbsUp size={14} />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleCorrect(student.id, ai)}
                                  className={`p-1.5 rounded-lg transition-all ${answer.correct === false ? "bg-red-50 text-red-500" : "bg-[#E8E8ED] text-gray-300"}`}
                                >
                                  <ThumbsDown size={14} />
                                </motion.button>
                              </div>
                              <div className="flex items-center gap-1.5 ml-auto">
                                <input type="number" min={0} max={answer.maxMark} value={answer.mark ?? ""}
                                  onChange={e => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val)) updateStudentAnswer(student.id, ai, "mark", Math.max(0, Math.min(val, answer.maxMark)));
                                    else updateStudentAnswer(student.id, ai, "mark", 0);
                                  }}
                                  className="w-16 px-2.5 py-1.5 bg-[#F5F5F7] border border-gray-200 rounded-lg text-sm text-center text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-50 transition-all"
                                />
                                <span className="text-[12px] text-gray-400">/ {answer.maxMark}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Footer */}
              <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGrades(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-all"
                >
                  Close
                </motion.button>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowGrades(false);
                    setMarkCourseId(null);
                    setMarkAssessmentId(null);
                    showToast("Grades submitted successfully!", "success");
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  Submit Grades
                </motion.button>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => showToast("Grades exported to CSV", "info")}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
                >
                  <Download size={14} />
                  Export
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowFeedbackModal(false)}
          >
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-50">
                    <MessageSquare size={18} className="text-purple-500" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900">Apply Feedback</h2>
                </div>
                <motion.button whileHover={{ scale: 1.05, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFeedbackModal(false)}
                  className="w-8 h-8 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-all"
                >
                  <X size={14} className="text-gray-500" />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                <p className="text-sm text-gray-500">Choose a feedback template to apply to all answers for this student.</p>
                {feedbackTemplates.map((template, i) => (
                  <motion.button key={i} whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}
                    onClick={() => handleApplyFeedback(template)}
                    className="w-full p-4 rounded-xl bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-all text-left text-sm text-gray-700"
                  >
                    {template}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Modal */}
      <AnimatePresence>
        {showAnalytics && gradeDistribution && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowAnalytics(false)}
          >
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-50">
                    <BarChart3 size={18} className="text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Grade Analytics</h2>
                    <p className="text-xs text-gray-400">{currentAssessment?.name}</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.05, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAnalytics(false)}
                  className="w-8 h-8 rounded-lg bg-[#E8E8ED] flex items-center justify-center hover:bg-[#D2D2D7] transition-all"
                >
                  <X size={14} className="text-gray-500" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div className="text-center py-4">
                  <div className="text-5xl font-bold text-gray-900 mb-1">{classAverage}%</div>
                  <div className="text-sm text-gray-500">Class Average</div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                  <div className="space-y-3">
                    {Object.entries(gradeDistribution).map(([grade, count]) => {
                      const colors = { A: "#34C759", B: "#5E5CE6", C: "#FF9500", D: "#FF3B30", F: "#8E8E93" };
                      return (
                        <div key={grade} className="flex items-center gap-3">
                          <span className="w-6 text-sm font-bold text-gray-700">{grade}</span>
                          <div className="flex-1">
                            <ProgressBar value={count} max={students.length} color={colors[grade]} showLabel animated />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Question Performance</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map(qNum => {
                      const avgScore = Math.round(students.reduce((sum, s) => sum + ((s.answers[qNum - 1]?.mark || 0) / s.answers[qNum - 1]?.maxMark * 100), 0) / students.length);
                      return (
                        <div key={qNum} className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                          <span className="text-sm text-gray-700">Question {qNum}</span>
                          <div className="flex items-center gap-3">
                            <ProgressBar value={avgScore} max={100} color={avgScore > 70 ? "#34C759" : avgScore > 50 ? "#FF9500" : "#FF3B30"} size="sm" animated />
                            <span className="text-xs font-medium text-gray-700 w-8 text-right">{avgScore}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   MAIN APP - SINGLE PAGE WITH TWO TABS
   ═══════════════════════════════════════════════════════════════ */

export default function AdminWorkspace() {
  const [activeTab, setActiveTab] = useState("create");
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const tabs = [
    { id: "create", label: "Create Assessment", icon: FilePlus, color: "#0071E3" },
    { id: "mark", label: "Mark & Grade", icon: Trophy, color: "#FF3B30" },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F5F5F7]">
      {/* Top Tab Bar */}
      <div className="sticky top-0 z-30 bg-[#F5F5F7]/80 backdrop-blur-md border-b border-[#E8E8ED] shrink-0">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex gap-1 bg-[#E8E8ED] rounded-full p-1 w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${active ? "text-white" : "text-[#86868B] hover:text-[#1D1D1F]"
                    }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 rounded-full shadow-sm"
                      style={{ backgroundColor: tab.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto min-h-0 max-w-5xl mx-auto px-6 py-8 relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {activeTab === "create" ? (
              <CreateAssessmentSection showToast={showToast} />
            ) : (
              <MarkGradeSection showToast={showToast} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toasts */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Toast message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
