import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, HelpCircle, ClipboardList, AlertCircle, Check, X, Loader2, Maximize2 } from "lucide-react";

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
  { bank: "Physics – Mechanics", questions: [{ id: "q1", text: "State Newton's First Law of Motion.", type: "Short Answer" }, { id: "q2", text: "A 5kg object experiences a net force of 20N. What is its acceleration?", type: "Short Answer" }, { id: "q3", text: "Explain the difference between kinetic and potential energy.", type: "Essay" }, { id: "q4", text: "What is the SI unit of force?", type: "MCQ", choices: ["Newton", "Joule", "Watt", "Pascal"] }] },
  { bank: "Physics – Electricity", questions: [{ id: "q5", text: "State Coulomb's Law.", type: "Short Answer" }, { id: "q6", text: "What is the potential difference across a 10Ω resistor carrying 2A?", type: "Short Answer" }, { id: "q7", text: "Describe the difference between series and parallel circuits.", type: "Essay" }] },
  { bank: "Pure Math – Algebra", questions: [{ id: "q8", text: "Solve for x: 2x² - 8 = 0", type: "Short Answer" }, { id: "q9", text: "What is the conjugate of 3 + 4i?", type: "Short Answer" }, { id: "q10", text: "Prove that the sum of any two complex conjugates is real.", type: "Essay" }] },
  { bank: "Pure Math – Calculus", questions: [{ id: "q11", text: "Find the derivative of f(x) = 3x⁴ - 2x² + 5", type: "Short Answer" }, { id: "q12", text: "State the limit definition of a derivative.", type: "Short Answer" }, { id: "q13", text: "Explain the concept of continuity in your own words.", type: "Essay" }] },
  { bank: "Chemistry – Stoichiometry", questions: [{ id: "q14", text: "Balance the equation: H₂ + O₂ → H₂O", type: "Short Answer" }, { id: "q15", text: "What is the molar mass of H₂SO₄?", type: "Short Answer" }, { id: "q16", text: "Explain the mole concept and its importance in chemistry.", type: "Essay" }] },
  { bank: "Solid Geometry", questions: [{ id: "q17", text: "Find the volume of a sphere with radius 3cm.", type: "Short Answer" }, { id: "q18", text: "What is the dot product of vectors (1,2,3) and (4,-1,2)?", type: "Short Answer" }] },
];

const typeMeta = {
  Assignment: { icon: FileText, label: "Assignment", color: "text-[#34C759]", border: "border-[#34C759]/20" },
  Quiz: { icon: HelpCircle, label: "Quiz", color: "text-[#FF9F0A]", border: "border-[#FF9F0A]/20" },
  Exam: { icon: ClipboardList, label: "Exam", color: "text-[#FF3B30]", border: "border-[#FF3B30]/20" },
};

export default function TakeAssessment() {
  const { courseId, lectureIdx, lessonIdx } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const course = coursesDB.find(c => c.id === Number(courseId));
  if (!course) return null;

  const lecture = course.lectures[Number(lectureIdx)];
  if (!lecture) return null;

  const lesson = lecture.lessons[Number(lessonIdx)];
  if (!lesson || !["Assignment", "Quiz", "Exam"].includes(lesson.type)) return null;

  const meta = typeMeta[lesson.type];
  const Icon = meta.icon;
  const isProctored = lesson.type === "Quiz" || lesson.type === "Exam";
  const allQuestions = questionBanks.flatMap(b => b.questions);
  const questions = (lesson.questions || []).map(qid => allQuestions.find(q => q.id === qid)).filter(Boolean);

  const handleCancel = useCallback(() => {
    if (!cancelled) setCancelled(true);
  }, [cancelled]);

  const enterFullScreen = useCallback(async () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } catch {}
  }, []);

  useEffect(() => {
    if (!started) return;
    if (!isProctored) return;

    enterFullScreen();

    const handleVisibility = () => {
      if (document.hidden) handleCancel();
    };

    const handleFSChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        handleCancel();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isProctored) {
        e.preventDefault();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("fullscreenchange", handleFSChange);
    document.addEventListener("webkitfullscreenchange", handleFSChange);
    document.addEventListener("msfullscreenchange", handleFSChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("fullscreenchange", handleFSChange);
      document.removeEventListener("webkitfullscreenchange", handleFSChange);
      document.removeEventListener("msfullscreenchange", handleFSChange);
      document.removeEventListener("keydown", handleKeyDown);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, [started, isProctored, handleCancel, enterFullScreen]);

  const handleSubmit = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  };

  if (cancelled) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 rounded-full bg-[#FF3B30]/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-[#FF3B30]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Assessment Cancelled</h2>
          <p className="text-[#86868B] text-sm leading-relaxed mb-2">This assessment was cancelled due to a suspected policy violation.</p>
          <p className="text-[#86868B] text-sm leading-relaxed mb-8">Tab switching and exiting full-screen are not permitted during {meta.label.toLowerCase()}s.</p>
          <button onClick={() => navigate(`/student/course/${courseId}`)} className="px-8 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] transition-all inline-flex items-center gap-2"><ArrowLeft size={16} /> Back to Course</button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 rounded-full bg-[#34C759]/10 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#34C759]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Submitted Successfully</h2>
          <p className="text-[#86868B] text-sm leading-relaxed mb-8">Your {meta.label.toLowerCase()} has been submitted. You can check the results once graded.</p>
          <button onClick={() => navigate(`/student/course/${courseId}`)} className="px-8 py-3 bg-[#0071E3] text-white rounded-full text-sm font-medium hover:bg-[#0056B3] transition-all inline-flex items-center gap-2"><ArrowLeft size={16} /> Back to Course</button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
        <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#E8E8ED] text-center max-w-md">
            <div className="p-6 rounded-2xl bg-[#F5F5F7] inline-flex mx-auto mb-8">
              {isProctored ? (
                <div className="text-center">
                  <Maximize2 size={32} className="text-[#FF9F0A] mx-auto mb-4" />
                  <p className="text-sm font-semibold text-[#1D1D1F]">Full Screen Mode</p>
                  <p className="text-xs text-[#86868B] mt-1">This {meta.label.toLowerCase()} requires full-screen mode</p>
                </div>
              ) : (
                <FileText size={32} className="text-[#34C759]" />
              )}
            </div>
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-2">Ready to begin?</h2>
            {isProctored && (
              <div className="bg-[#FFF5E6] border border-[#FF9F0A]/20 rounded-2xl p-4 mb-6 text-left">
                <p className="text-xs font-medium text-[#FF9F0A] flex items-center gap-1.5 mb-2"><AlertCircle size={14} /> Important</p>
                <ul className="text-xs text-[#86868B] space-y-1.5 list-disc list-inside">
                  <li>This {meta.label.toLowerCase()} will be taken in full-screen mode</li>
                  <li>Exiting full-screen or switching tabs will cancel your attempt</li>
                  <li>No time limit — take your time</li>
                </ul>
              </div>
            )}
            <button onClick={() => setStarted(true)} className="w-full py-4 bg-[#0071E3] text-white rounded-2xl text-base font-semibold hover:bg-[#0056B3] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-3">
              {isProctored ? "Enter Full Screen & Start" : "Start Assignment"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F5F5F7]">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-xl border border-[#E8E8ED]">
              <Icon size={20} className={meta.color} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1D1D1F]">{lesson.title}</h1>
              <p className="text-sm text-[#86868B]">{questions.length} question{questions.length !== 1 ? "s" : ""} · {meta.label}</p>
            </div>
          </div>
          {isProctored && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF5E6] border border-[#FF9F0A]/20 rounded-full">
              <div className="w-2 h-2 rounded-full animate-pulse bg-[#FF9F0A]" />
              <span className="text-[11px] font-semibold text-[#FF9F0A] uppercase tracking-wider">Proctored</span>
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 border border-[#E8E8ED]">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#F5F5F7] text-sm font-semibold flex items-center justify-center rounded-xl shrink-0 text-[#1D1D1F]">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-[#1D1D1F] mb-1">{q.text}</p>
                  <span className="text-xs font-medium text-[#86868B] bg-[#F5F5F7] px-2.5 py-1 rounded-full">{q.type}</span>

                  <div className="mt-4">
                    {q.type === "MCQ" && q.choices ? (
                      <div className="space-y-2">
                        {q.choices.map((choice, ci) => (
                          <label key={ci} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${answers[q.id] === choice ? "border-[#0071E3] bg-[#0071E3]/5" : "border-[#E8E8ED] hover:border-[#0071E3]/30"}`}>
                            <input
                              type="radio"
                              name={`q-${q.id}`}
                              value={choice}
                              checked={answers[q.id] === choice}
                              onChange={() => setAnswers(p => ({ ...p, [q.id]: choice }))}
                              className="size-4 text-[#0071E3] focus:ring-[#0071E3]/20"
                            />
                            <span className="text-sm text-[#1D1D1F]">{choice}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={answers[q.id] || ""}
                        onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                        rows={3}
                        className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/10 transition-all resize-none bg-white"
                        placeholder="Write your answer here..."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        {questions.length > 0 && (
          <div className="mt-8 mb-16 flex items-center justify-between p-6 bg-white rounded-2xl border border-[#E8E8ED]">
            <span className="text-sm text-[#86868B]">
              {Object.keys(answers).length} of {questions.length} answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] active:scale-[0.97] transition-all disabled:opacity-50 shadow-sm flex items-center gap-2"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}

        {questions.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#E8E8ED]">
              <FileText size={28} className="text-[#A1A1A6]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">No questions</h3>
            <p className="text-sm text-[#86868B]">This assessment has no questions configured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
