import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Trash2, Edit3, Search, FileQuestion,
  CheckCircle, AlertCircle, Sparkles, BookOpen,
  Layers, GripVertical, ArrowRight,
  ChevronDown, ChevronUp, Save, HelpCircle,
  Shuffle, Link2, Type, AlignLeft,
  FileText, Upload, Brain, ListTodo,
} from "lucide-react";

// ─── Color System ───────────────────────────────────────────────────
const TYPE_COLORS = {
  choose:       { bg: "bg-blue-50",     text: "text-blue-700",     border: "border-blue-200",     dot: "bg-blue-500",    label: "Multiple Choice" },
  "true-false": { bg: "bg-violet-50",   text: "text-violet-700",   border: "border-violet-200",   dot: "bg-violet-500",  label: "True / False" },
  complete:     { bg: "bg-amber-50",    text: "text-amber-700",    border: "border-amber-200",    dot: "bg-amber-500",   label: "Complete" },
  correct:      { bg: "bg-orange-50",   text: "text-orange-700",   border: "border-orange-200",   dot: "bg-orange-500",  label: "Correct the Underlined" },
  order:        { bg: "bg-cyan-50",     text: "text-cyan-700",     border: "border-cyan-200",     dot: "bg-cyan-500",    label: "Order" },
  match:        { bg: "bg-rose-50",     text: "text-rose-700",     border: "border-rose-200",     dot: "bg-rose-500",    label: "Match" },
  "short-answer": { bg: "bg-teal-50",   text: "text-teal-700",     border: "border-teal-200",     dot: "bg-teal-500",    label: "Short Answer", manual: true },
  "long-answer":  { bg: "bg-indigo-50", text: "text-indigo-700",   border: "border-indigo-200",   dot: "bg-indigo-500",  label: "Long Answer", manual: true },
  essay:        { bg: "bg-emerald-50",  text: "text-emerald-700",  border: "border-emerald-200",  dot: "bg-emerald-500", label: "Essay", manual: true },
  file:         { bg: "bg-pink-50",     text: "text-pink-700",     border: "border-pink-200",     dot: "bg-pink-500",    label: "File / Photo Based", manual: true },
};

const AUTO_TYPES = ["choose", "complete", "correct", "true-false", "order", "match"];
const TYPE_ICONS = { choose: CheckCircle, "true-false": HelpCircle, complete: Type, correct: Edit3, order: Shuffle, match: Link2, "short-answer": AlignLeft, "long-answer": FileText, essay: BookOpen, file: Upload };

const initialBanks = [
  {
    id: 1, name: "Physics – Mechanics", description: "Forces, energy, and Newtonian motion",
    questions: [
      { id: "q1", type: "choose", text: "What is the SI unit of force?", choices: ["Newton", "Joule", "Watt", "Pascal"], correctAnswer: "Newton" },
      { id: "q2", type: "true-false", text: "An object at rest stays at rest unless acted upon by an external force.", correctAnswer: "True" },
      { id: "q3", type: "short-answer", text: "State Newton's First Law of Motion." },
      { id: "q4", type: "essay", text: "Explain the relationship between kinetic and potential energy." },
    ],
  },
  {
    id: 2, name: "Pure Math – Algebra", description: "Equations, complex numbers, polynomials",
    questions: [
      { id: "q5", type: "choose", text: "What is the conjugate of 3 + 4i?", choices: ["3 - 4i", "-3 + 4i", "-3 - 4i", "3 + 4i"], correctAnswer: "3 - 4i" },
      { id: "q6", type: "complete", text: "The quadratic formula is x = (-b ± √(b² - 4ac)) / ___", correctAnswer: "2a" },
      { id: "q7", type: "order", text: "Order the steps to solve a quadratic equation", items: ["Set equation to zero", "Identify a, b, c", "Apply quadratic formula", "Simplify"], correctOrder: ["Set equation to zero", "Identify a, b, c", "Apply quadratic formula", "Simplify"] },
    ],
  },
  {
    id: 3, name: "Chemistry – Stoichiometry", description: "Mole concept, balancing equations",
    questions: [
      { id: "q8", type: "correct", text: "Water is H2O2", correctAnswer: "H2O" },
      { id: "q9", type: "match", text: "Match each element to its symbol", pairs: [{ left: "Hydrogen", right: "H" }, { left: "Oxygen", right: "O" }, { left: "Carbon", right: "C" }, { left: "Nitrogen", right: "N" }] },
      { id: "q10", type: "file", text: "Upload the balanced equation for HCl + NaOH." },
    ],
  },
  {
    id: 4, name: "English – Grammar", description: "Tenses, passive voice, sentence structure",
    questions: [
      { id: "q11", type: "choose", text: "Which tense is used for habitual actions?", choices: ["Present Simple", "Present Continuous", "Past Simple", "Future"], correctAnswer: "Present Simple" },
      { id: "q12", type: "true-false", text: "The passive voice uses 'to be' + past participle.", correctAnswer: "True" },
      { id: "q13", type: "long-answer", text: "Describe the difference between active and passive voice with examples." },
    ],
  },
];

// ─── Animation Tokens ───────────────────────────────────────────────
const spring = { type: "spring", stiffness: 400, damping: 28 };
const smooth = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: smooth } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94, y: 8 }, show: { opacity: 1, scale: 1, y: 0, transition: { ...smooth } } };

// ─── Toast ──────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  const s = type === "success"
    ? "bg-white border-[#D2D2D7] text-[#34C759]"
    : "bg-white border-[#D2D2D7] text-[#FF3B30]";
  const Icon = type === "success" ? CheckCircle : AlertCircle;
  return (
    <motion.div initial={{ opacity: 0, y: -24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.96 }}
      className="fixed top-6 right-6 z-[70] px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-3"
    >
      <Icon size={18} /> <span className="text-[#1D1D1F]">{message}</span>
      <button onClick={onClose} className="ml-2 p-0.5 rounded-lg opacity-40 hover:opacity-100 transition-opacity text-[#86868B]"><X size={14} /></button>
    </motion.div>
  );
};

// ─── Confirm Dialog ─────────────────────────────────────────────────
function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onCancel}>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={spring}
            onClick={(e) => e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-sm shadow-xl border border-[#D2D2D7] p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-[#FF3B30]" />
            </div>
            <h3 className="text-base font-semibold text-[#1D1D1F] text-center mb-1">{title}</h3>
            <p className="text-sm text-[#86868B] text-center mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="flex-1 py-2.5 rounded-full text-sm font-semibold text-[#1D1D1F] bg-[#E8E8ED] hover:bg-[#D2D2D7] transition-colors">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-[#FF3B30] hover:bg-[#D93025] transition-colors">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ─────────────────────────────────────────────────
export default function TeacherQuestionBank() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showToast = (msg, type = "success") => setToast({ message: msg, type });
  const dismissToast = () => setToast(null);

  useEffect(() => {
    setTimeout(() => { setBanks(initialBanks); setLoading(false); }, 480);
  }, []);

  const filteredBanks = useMemo(() => {
    if (!search.trim()) return banks;
    const q = search.toLowerCase();
    return banks.filter((b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
  }, [banks, search]);

  const stats = useMemo(() => {
    const totalQ = banks.reduce((s, b) => s + b.questions.length, 0);
    const autoQ = banks.reduce((s, b) => s + b.questions.filter((q) => AUTO_TYPES.includes(q.type)).length, 0);
    return { total: banks.length, questions: totalQ, auto: autoQ, manual: totalQ - autoQ };
  }, [banks]);

  // ── Bank Modal ──
  const [bankModal, setBankModal] = useState(null);
  const [bankForm, setBankForm] = useState({ name: "", description: "" });

  // ── Question Modal ──
  const [qModal, setQModal] = useState(null);
  const [qForm, setQForm] = useState({ type: "choose", text: "", choices: ["", ""], correctAnswer: "", items: ["", ""], pairs: [{ left: "", right: "" }] });

  // ── Import Modal ──
  const [showImportModal, setShowImportModal] = useState(false);

  const openBankModal = (mode, bank) => {
    setBankForm(mode === "add" ? { name: "", description: "" } : { name: bank.name, description: bank.description });
    setBankModal({ mode, bank });
  };

  const saveBank = () => {
    if (!bankForm.name.trim()) return showToast("Bank name is required", "error");
    if (bankModal.mode === "add") {
      setBanks((prev) => [...prev, { id: Date.now(), name: bankForm.name, description: bankForm.description, questions: [] }]);
      showToast(`"${bankForm.name}" created`);
    } else {
      setBanks((prev) => prev.map((b) => b.id === bankModal.bank.id ? { ...b, name: bankForm.name, description: bankForm.description } : b));
      showToast("Bank updated");
    }
    setBankModal(null);
  };

  const deleteBank = (id) => {
    const name = banks.find((b) => b.id === id)?.name;
    setBanks((prev) => prev.filter((b) => b.id !== id));
    showToast(`"${name}" deleted`);
    setConfirm(null);
  };

  const openQModal = (mode, bankId, question) => {
    if (mode === "add") {
      setQForm({ type: "choose", text: "", choices: ["", ""], correctAnswer: "", items: ["", ""], pairs: [{ left: "", right: "" }] });
      setQModal({ bankId, mode: "add" });
    } else {
      setQForm({
        type: question.type, text: question.text,
        choices: question.choices || ["", ""],
        correctAnswer: question.correctAnswer || "",
        items: question.items || ["", ""],
        pairs: question.pairs || [{ left: "", right: "" }],
      });
      setQModal({ bankId, mode: "edit", question });
    }
  };

  const saveQuestion = () => {
    if (!qForm.text.trim()) return showToast("Question text is required", "error");
    if (qModal.mode === "add") {
      const newQ = { id: `q${Date.now()}`, type: qForm.type, text: qForm.text };
      if (qForm.type === "choose") { newQ.choices = qForm.choices.filter(Boolean); newQ.correctAnswer = qForm.correctAnswer; }
      else if (qForm.type === "true-false") newQ.correctAnswer = qForm.correctAnswer;
      else if (["complete", "correct"].includes(qForm.type)) newQ.correctAnswer = qForm.correctAnswer;
      else if (qForm.type === "order") { newQ.items = qForm.items.filter(Boolean); newQ.correctOrder = qForm.items.filter(Boolean); }
      else if (qForm.type === "match") newQ.pairs = qForm.pairs.filter((p) => p.left && p.right);
      setBanks((prev) => prev.map((b) => b.id === qModal.bankId ? { ...b, questions: [...b.questions, newQ] } : b));
      showToast("Question added");
    } else {
      setBanks((prev) => prev.map((b) => b.id !== qModal.bankId ? b : {
        ...b, questions: b.questions.map((q) => q.id === qModal.question.id ? {
          ...q, text: qForm.text, type: qForm.type,
          choices: qForm.type === "choose" ? qForm.choices.filter(Boolean) : q.choices,
          correctAnswer: AUTO_TYPES.includes(qForm.type) ? qForm.correctAnswer : undefined,
          items: qForm.type === "order" ? qForm.items.filter(Boolean) : q.items,
          correctOrder: qForm.type === "order" ? qForm.items.filter(Boolean) : q.correctOrder,
          pairs: qForm.type === "match" ? qForm.pairs.filter((p) => p.left && p.right) : q.pairs,
        } : q),
      }));
      showToast("Question updated");
    }
    setQModal(null);
  };

  const deleteQuestion = (bankId, qId) => {
    setBanks((prev) => prev.map((b) => b.id === bankId ? { ...b, questions: b.questions.filter((q) => q.id !== qId) } : b));
    showToast("Question deleted");
    setConfirm(null);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative size-9">
            <div className="absolute inset-0 rounded-full border-2 border-[#E8E8ED]" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#0071E3] animate-spin" />
          </div>
          <p className="text-sm text-[#86868B] font-medium">Loading question banks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F5F5F7]">
      <AnimatePresence>
        {toast && <Toast key="toast" {...toast} onClose={dismissToast} />}
      </AnimatePresence>

      <ConfirmDialog open={!!confirm} title={confirm?.title} message={confirm?.message}
        onConfirm={confirm?.onConfirm} onCancel={() => setConfirm(null)}
      />

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={mounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }}
        className="shrink-0 px-6 sm:px-8 pt-6 pb-3"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search question banks..."
              className="w-full border border-[#D2D2D7] py-3 pl-9 pr-3.5 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
            />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => openBankModal("add")}
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all"
          >
            <Plus size={16} /> New Question Bank
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowImportModal(true)}
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-[#1D1D1F] rounded-full text-sm font-semibold border border-[#D2D2D7] hover:bg-[#F5F5F7] transition-all"
          >
            <Upload size={16} /> Import
          </motion.button>
        </div>

        <div className="flex items-center gap-5 text-xs text-[#86868B]">
          <span className="font-semibold text-[#1D1D1F]">{stats.total} Bank{stats.total !== 1 ? "s" : ""}</span>
          <span className="w-1 h-1 rounded-full bg-[#C7C7CC]" />
          <span className="font-semibold text-[#1D1D1F]">{stats.questions} Question{stats.questions !== 1 ? "s" : ""}</span>
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 sm:px-8 pb-8">
        <AnimatePresence mode="wait">
          {filteredBanks.length === 0 ? (
            <motion.div key="empty" variants={fadeUp} initial="hidden" animate="show" exit="hidden"
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#E8E8ED] flex items-center justify-center mb-5">
                <FileQuestion size={34} className="text-[#86868B]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">{search ? "No results found" : "No question banks yet"}</h3>
              <p className="text-sm text-[#86868B] mb-6 max-w-sm">{search ? "Try adjusting your search terms." : "Create your first question bank to start building."}</p>
              {!search && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => openBankModal("add")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all"
                ><Plus size={16} /> Create Bank</motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div key="grid" variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBanks.map((bank) => (
                <BankCard key={bank.id} bank={bank}
                  onOpen={() => setQModal({ bankId: bank.id, mode: "view" })}
                  onEdit={() => openBankModal("edit", bank)}
                  onDelete={() => setConfirm({
                    title: "Delete this bank?",
                    message: `"${bank.name}" and its ${bank.questions.length} questions will be permanently removed.`,
                    onConfirm: () => deleteBank(bank.id),
                  })}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bank Form Modal ── */}
      <AnimatePresence>
        {bankModal && (
          <motion.div key="bankModal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setBankModal(null)}
          >
            <motion.div variants={scaleIn} initial="hidden" animate="show" exit="hidden"
              onClick={(e) => e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-md shadow-xl border border-[#D2D2D7] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#E8E8ED]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0071E3] flex items-center justify-center text-white shadow-sm">
                    {bankModal.mode === "add" ? <Plus size={16} /> : <Edit3 size={16} />}
                  </div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F]">{bankModal.mode === "add" ? "New Question Bank" : "Edit Question Bank"}</h3>
                </div>
                <button onClick={() => setBankModal(null)} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#86868B] transition-colors"><X size={16} /></button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#86868B] mb-1.5">Bank Name <span className="text-[#FF3B30]">*</span></label>
                  <input value={bankForm.name} onChange={(e) => setBankForm({ ...bankForm, name: e.target.value })}
                    placeholder="e.g. Physics – Mechanics"
                    className="w-full border border-[#D2D2D7] px-3.5 py-2.5 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#86868B] mb-1.5">Description</label>
                  <textarea value={bankForm.description} onChange={(e) => setBankForm({ ...bankForm, description: e.target.value })}
                    rows={2} placeholder="Brief description..."
                    className="w-full border border-[#D2D2D7] px-3.5 py-2.5 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all resize-none bg-white" />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setBankModal(null)} className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#1D1D1F] bg-[#E8E8ED] hover:bg-[#D2D2D7] transition-colors">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={saveBank}
                    className="px-6 py-2.5 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all"
                  >{bankModal.mode === "add" ? "Create Bank" : "Save Changes"}</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Questions List Modal ── */}
      <AnimatePresence>
        {qModal?.mode === "view" && (
          <QuestionsModal key="questionsModal" bank={banks.find((b) => b.id === qModal.bankId)}
            onClose={() => setQModal(null)}
            onAdd={() => openQModal("add", qModal.bankId)}
            onEdit={(q) => openQModal("edit", qModal.bankId, q)}
            onDelete={(qId) => setConfirm({
              title: "Delete this question?",
              message: "This action cannot be undone.",
              onConfirm: () => deleteQuestion(qModal.bankId, qId),
            })}
          />
        )}
      </AnimatePresence>

      {/* ── Question Form Modal ── */}
      <AnimatePresence>
        {qModal && (qModal.mode === "add" || qModal.mode === "edit") && (
          <QuestionFormModal key="questionFormModal"
            qForm={qForm} setQForm={setQForm}
            onSave={saveQuestion} onClose={() => setQModal(null)}
            isEdit={qModal.mode === "edit"}
          />
        )}
      </AnimatePresence>

      {/* ── Import Modal ── */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div key="importModal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowImportModal(false)}
          >
            <motion.div variants={scaleIn} initial="hidden" animate="show" exit="hidden"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] w-full max-w-lg shadow-xl border border-[#D2D2D7] overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
                    <Upload size={18} className="text-[#0071E3]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1D1D1F]">Import Question Bank</h3>
                    <p className="text-xs text-[#86868B] mt-0.5">Choose a source to import from</p>
                  </div>
                </div>
                <button onClick={() => setShowImportModal(false)} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#86868B] transition-colors"><X size={18} /></button>
              </div>

              <div className="px-6 pb-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'PDF', icon: FileText, desc: 'Extract questions from PDF documents', color: 'from-[#FF3B30] to-[#FF9500]' },
                    { type: 'Image', icon: Upload, desc: 'Scan questions from images', color: 'from-[#0071E3] to-[#00C6FF]' },
                    { type: 'Excel Template', icon: FileText, desc: 'Import from our Excel template', color: 'from-[#34C759] to-[#30D158]' },
                  ].map(({ type, icon: Icon, desc, color }) => (
                    <button key={type}
                      onClick={() => { /* handle import type */ }}
                      className="group flex flex-col items-center gap-2.5 p-5 rounded-2xl border border-[#E8E8ED] bg-white hover:border-[#D2D2D7] hover:shadow-sm transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold text-[#1D1D1F] text-center leading-tight">{type}</span>
                      <span className="text-[10px] text-[#86868B] text-center leading-tight">{desc}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#E8E8ED] pt-5">
                  <div className="border-2 border-dashed border-[#D2D2D7] rounded-2xl p-6 text-center hover:border-[#0071E3] transition-colors cursor-pointer bg-[#F5F5F7]">
                    <Upload size={24} className="text-[#86868B] mx-auto mb-3" />
                    <p className="text-sm font-semibold text-[#1D1D1F]">Upload File</p>
                    <p className="text-xs text-[#86868B] mt-1">PDF, PNG, JPG, or Excel (.xlsx)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Bank Card ──────────────────────────────────────────────────────
function BankCard({ bank, onOpen, onEdit, onDelete }) {
  const count = bank.questions.length;
  const autoCount = bank.questions.filter((q) => AUTO_TYPES.includes(q.type)).length;
  const manualCount = count - autoCount;

  return (
    <motion.div variants={fadeUp} layout
      className="group relative bg-white rounded-[20px] border border-[#D2D2D7]/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      <div className="h-1 bg-[#0071E3] rounded-t-[20px]" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center shrink-0">
              <Layers size={18} className="text-[#0071E3]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-[#1D1D1F] truncate">{bank.name}</h3>
              <p className="text-[11px] text-[#86868B] truncate">{bank.description}</p>
            </div>
          </div>
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150 shrink-0">
            <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F] transition-colors"><Edit3 size={12} /></button>
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-[#FF3B30]/10 text-[#86868B] hover:text-[#FF3B30] transition-colors"><Trash2 size={12} /></button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] mb-2.5">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#86868B] font-semibold">
            <ListTodo size={11} /> {count}
          </span>
          {autoCount > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full admin-badge-success">
              <CheckCircle size={11} /> {autoCount}
            </span>
          )}
          {manualCount > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full admin-badge-warning">
              <Sparkles size={11} /> {manualCount}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {[...new Set(bank.questions.map((q) => q.type))].slice(0, 3).map((t) => {
            const c = TYPE_COLORS[t];
            if (!c) return null;
            const Icon = TYPE_ICONS[t] || FileQuestion;
            return (
              <span key={t} className={`admin-tag inline-flex items-center gap-1 ${c.text}`}>
                <Icon size={9} /> {c.label.split(" ")[0]}
              </span>
            );
          })}
          {count > 3 && <span className="px-1.5 py-0.5 text-[10px] text-[#86868B] font-medium">+{count - 3}</span>}
        </div>

        <button onClick={onOpen}
          className="w-full py-2.5 rounded-full text-xs font-semibold text-[#86868B] bg-[#F5F5F7] hover:bg-[#E8E8ED] hover:text-[#1D1D1F] transition-colors"
        >View Questions</button>
      </div>
    </motion.div>
  );
}

// ─── Questions List Modal ───────────────────────────────────────────
function QuestionsModal({ bank, onClose, onAdd, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  if (!bank) return null;
  return (
    <motion.div key="qm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}
    >
      <motion.div variants={scaleIn} initial="hidden" animate="show" exit="hidden"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[20px] w-full max-w-2xl max-h-[85vh] shadow-xl border border-[#D2D2D7] flex flex-col overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#E8E8ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0071E3] flex items-center justify-center text-white shadow-sm">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1D1D1F]">{bank.name}</h3>
              <p className="text-[11px] text-[#86868B]">{bank.questions.length} question{bank.questions.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={onAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0071E3] text-white rounded-full text-xs font-semibold hover:bg-[#0056B3] transition-all"
            ><Plus size={13} /> Add Question</motion.button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#86868B] transition-colors"><X size={16} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {bank.questions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-xl bg-[#F5F5F7] flex items-center justify-center mx-auto mb-3">
                <FileQuestion size={26} className="text-[#86868B]" />
              </div>
              <h4 className="text-sm font-semibold text-[#1D1D1F] mb-1">No questions yet</h4>
              <p className="text-xs text-[#86868B] mb-4">Add your first question to this bank.</p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={onAdd}
                className="px-5 py-2.5 bg-[#0071E3] text-white rounded-full text-xs font-semibold transition-all"
              ><Plus size={13} className="inline mr-1" /> Add Question</motion.button>
            </div>
          ) : (
            bank.questions.map((q, i) => {
              const tc = TYPE_COLORS[q.type] || TYPE_COLORS.choose;
              const Icon = TYPE_ICONS[q.type] || FileQuestion;
              return (
                <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-sm transition-all overflow-hidden"
                >
                  <button onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                    className="w-full flex items-center gap-3 px-3.5 py-3 text-left"
                  >
                    <span className={`w-6 h-6 rounded-lg ${tc.bg} flex items-center justify-center text-[10px] font-bold ${tc.text} shrink-0`}>{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-[#1D1D1F] line-clamp-1">{q.text}</span>
                      <span className={`text-[10px] font-medium ${tc.text} flex items-center gap-1 mt-0.5`}>
                        <Icon size={9} /> {tc.label}
                      </span>
                    </div>
                    <div className={`p-1 rounded transition-colors shrink-0 ${expanded === q.id ? "bg-[#F5F5F7]" : ""}`}>
                      {expanded === q.id ? <ChevronUp size={13} className="text-[#86868B]" /> : <ChevronDown size={13} className="text-[#86868B]" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expanded === q.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#F5F5F7]"
                      >
                        <div className="px-3.5 pb-3.5 pt-2.5 space-y-2.5 text-xs text-[#86868B]">
                          {q.choices && (
                            <div className="flex flex-wrap gap-1.5">
                              {q.choices.map((c, ci) => (
                                <span key={ci} className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${c === q.correctAnswer ? "admin-badge-success" : "bg-white border-[#D2D2D7] text-[#86868B]"}`}>
                                  {c === q.correctAnswer && <CheckCircle size={9} className="inline mr-1" />}
                                  {String.fromCharCode(65 + ci)}. {c}
                                </span>
                              ))}
                            </div>
                          )}
                          {q.type === "true-false" && (
                            <div className="flex gap-1.5">
                              {["True", "False"].map((v) => (
                                <span key={v} className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${v === q.correctAnswer ? "admin-badge-success" : "bg-white border-[#D2D2D7] text-[#86868B]"}`}>
                                  {v === q.correctAnswer && <CheckCircle size={9} className="inline mr-1" />}
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}
                          {["complete", "correct"].includes(q.type) && q.correctAnswer && (
                            <p className="flex items-center gap-1.5"><CheckCircle size={11} className="text-[#34C759]" /> <span className="font-medium text-[#86868B]">Answer:</span> <span className="admin-badge-success px-2 py-0.5 rounded text-xs">{q.correctAnswer}</span></p>
                          )}
                          {q.items && (
                            <div className="space-y-1">
                              {q.items.map((item, ci) => (
                                <div key={ci} className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded bg-white border border-[#D2D2D7] flex items-center justify-center text-[9px] font-bold text-[#86868B] shrink-0">{ci + 1}</span>
                                  <span className="text-[#86868B]">{item}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {q.pairs && (
                            <div className="space-y-1">
                              {q.pairs.map((p, ci) => (
                                <div key={ci} className="flex items-center gap-2 text-[11px]">
                                  <span className="px-2 py-1 bg-white border border-[#D2D2D7] rounded text-[#86868B] min-w-[70px]">{p.left}</span>
                                  <ArrowRight size={10} className="text-[#A1A1A6] shrink-0" />
                                  <span className="px-2 py-1 bg-white border border-[#D2D2D7] rounded text-[#86868B] min-w-[70px]">{p.right}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {q.type === "file" && (
                            <p className="flex items-center gap-1.5 text-[11px] admin-badge-warning px-2.5 py-1.5 rounded border">Manually graded — teacher or AI will review</p>
                          )}
                          <div className="flex gap-1.5 pt-2">
                            <button onClick={() => onEdit(q)} className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-medium text-[#86868B] hover:bg-[#F5F5F7] transition-colors"><Edit3 size={10} /> Edit</button>
                            <button onClick={() => onDelete(q.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-medium text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors"><Trash2 size={10} /> Delete</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Question Form Modal ────────────────────────────────────────────
function QuestionFormModal({ qForm, setQForm, onSave, onClose, isEdit }) {
  const update = (key, val) => setQForm((prev) => ({ ...prev, [key]: val }));

  return (
    <motion.div key="qfm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}
    >
      <motion.div variants={scaleIn} initial="hidden" animate="show" exit="hidden"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[20px] w-full max-w-lg max-h-[85vh] shadow-xl border border-[#D2D2D7] flex flex-col overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#E8E8ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0071E3] flex items-center justify-center text-white shadow-sm">
              <FileQuestion size={16} />
            </div>
            <h3 className="text-sm font-semibold text-[#1D1D1F]">{isEdit ? "Edit Question" : "New Question"}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#86868B] transition-colors"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Type selector */}
          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-2">Question Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(TYPE_COLORS).map(([id, c]) => {
                const Icon = TYPE_ICONS[id] || FileQuestion;
                const selected = qForm.type === id;
                return (
                  <motion.button key={id} whileTap={{ scale: 0.97 }}
                    onClick={() => update("type", id)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-[12px] text-[11px] font-medium border transition-all text-left ${selected ? `${c.bg} ${c.border} ${c.text} ring-1 ${c.border}` : "bg-white border-[#D2D2D7] text-[#86868B] hover:border-[#A1A1A6]"}`}
                  >
                    <Icon size={13} />
                    <span className="truncate leading-tight">{c.label}</span>
                    {selected && <CheckCircle size={10} className="ml-auto shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Question text */}
          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1.5">Question Text <span className="text-[#FF3B30]">*</span></label>
            <textarea value={qForm.text} onChange={(e) => update("text", e.target.value)} rows={2}
              placeholder="Type your question here..."
              className="w-full border border-[#D2D2D7] px-3.5 py-2.5 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all resize-none bg-white"
            />
          </div>

          {/* Type fields */}
          {qForm.type === "choose" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
              <label className="block text-xs font-medium text-[#86868B]">Answer Choices</label>
              {qForm.choices.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${c === qForm.correctAnswer ? "admin-badge-success" : "bg-[#F5F5F7] text-[#86868B]"}`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <input value={c} onChange={(e) => {
                    const arr = [...qForm.choices];
                    arr[i] = e.target.value;
                    update("choices", arr);
                  }} placeholder={`Choice ${String.fromCharCode(65 + i)}`}
                    className="flex-1 border border-[#D2D2D7] px-3 py-2 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                  />
                  {i === qForm.choices.length - 1 ? (
                    <button onClick={() => update("choices", [...qForm.choices, ""])}
                      className="px-2.5 py-1.5 text-[11px] font-medium text-[#0071E3] hover:bg-[#0071E3]/5 rounded-lg transition-colors shrink-0"
                    >+ Add</button>
                  ) : (
                    <button onClick={() => update("choices", qForm.choices.filter((_, j) => j !== i))}
                      className="p-1.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors shrink-0"
                    ><X size={13} /></button>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1.5">Correct Answer</label>
                <select value={qForm.correctAnswer} onChange={(e) => update("correctAnswer", e.target.value)}
                  className="w-full border border-[#D2D2D7] px-3 py-2.5 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                >
                  <option value="">Select correct answer...</option>
                  {qForm.choices.filter(Boolean).map((c, i) => <option key={i} value={c}>{String.fromCharCode(65 + i)}. {c}</option>)}
                </select>
              </div>
            </motion.div>
          )}

          {qForm.type === "true-false" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <label className="block text-xs font-medium text-[#86868B] mb-2">Correct Answer</label>
              <div className="flex gap-2">
                {["True", "False"].map((val) => (
                  <button key={val} onClick={() => update("correctAnswer", val)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${qForm.correctAnswer === val ? "admin-badge-success border" : "bg-white border-[#D2D2D7] text-[#86868B] hover:border-[#A1A1A6]"}`}
                  >{val}</button>
                ))}
              </div>
            </motion.div>
          )}

          {["complete", "correct"].includes(qForm.type) && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">Correct Answer</label>
              <div className="relative">
                <CheckCircle size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#34C759]" />
                <input value={qForm.correctAnswer} onChange={(e) => update("correctAnswer", e.target.value)}
                  placeholder="Enter the correct answer..."
                  className="w-full pl-9 pr-3.5 py-2.5 border border-[#D2D2D7] rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                />
              </div>
            </motion.div>
          )}

          {qForm.type === "order" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
              <label className="block text-xs font-medium text-[#86868B]">Ordered Items <span className="text-[#A1A1A6] font-normal">(correct sequence)</span></label>
              {qForm.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-white border border-[#D2D2D7] flex items-center justify-center text-[10px] font-bold text-[#86868B] shrink-0">{i + 1}</span>
                  <input value={item} onChange={(e) => {
                    const arr = [...qForm.items];
                    arr[i] = e.target.value;
                    update("items", arr);
                  }} placeholder={`Step ${i + 1}`}
                    className="flex-1 border border-[#D2D2D7] px-3 py-2 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                  />
                  {i === qForm.items.length - 1 ? (
                    <button onClick={() => update("items", [...qForm.items, ""])}
                      className="px-2.5 py-1.5 text-[11px] font-medium text-[#0071E3] hover:bg-[#0071E3]/5 rounded-lg transition-colors shrink-0"
                    >+ Add</button>
                  ) : (
                    <button onClick={() => update("items", qForm.items.filter((_, j) => j !== i))}
                      className="p-1.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors shrink-0"
                    ><X size={13} /></button>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {qForm.type === "match" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
              <label className="block text-xs font-medium text-[#86868B]">Matching Pairs</label>
              {qForm.pairs.map((pair, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={pair.left} onChange={(e) => {
                    const arr = [...qForm.pairs];
                    arr[i] = { ...arr[i], left: e.target.value };
                    update("pairs", arr);
                  }} placeholder="Left"
                    className="flex-1 border border-[#D2D2D7] px-3 py-2 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                  />
                  <div className="w-7 h-7 rounded bg-[#F5F5F7] border border-[#D2D2D7] flex items-center justify-center shrink-0">
                    <ArrowRight size={12} className="text-[#86868B]" />
                  </div>
                  <input value={pair.right} onChange={(e) => {
                    const arr = [...qForm.pairs];
                    arr[i] = { ...arr[i], right: e.target.value };
                    update("pairs", arr);
                  }} placeholder="Right"
                    className="flex-1 border border-[#D2D2D7] px-3 py-2 rounded-xl text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all bg-white"
                  />
                  {i === qForm.pairs.length - 1 ? (
                    <button onClick={() => update("pairs", [...qForm.pairs, { left: "", right: "" }])}
                      className="px-2.5 py-1.5 text-[11px] font-medium text-[#0071E3] hover:bg-[#0071E3]/5 rounded-lg transition-colors shrink-0"
                    >+</button>
                  ) : (
                    <button onClick={() => update("pairs", qForm.pairs.filter((_, j) => j !== i))}
                      className="p-1.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors shrink-0"
                    ><X size={13} /></button>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {TYPE_COLORS[qForm.type]?.manual && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="admin-badge-warning p-3 rounded-xl text-xs flex items-start gap-2"
            >
              <Sparkles size={14} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Manual Grading</p>
                <p className="opacity-80">This type cannot be auto-graded. A teacher or AI will review responses.</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-end gap-2 px-5 py-3 border-t border-[#E8E8ED] bg-[#F5F5F7]/50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#1D1D1F] bg-[#E8E8ED] hover:bg-[#D2D2D7] transition-colors">Cancel</button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={onSave}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all"
          ><Save size={13} /> {isEdit ? "Save Changes" : "Add Question"}</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
