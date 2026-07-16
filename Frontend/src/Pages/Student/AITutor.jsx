import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const API_URL = '/api/ai/chat/completions';

const SYSTEM_PROMPT = `You are Lumora, an AI tutor for Lumora Academy — an Egyptian educational platform (Thanaweya Amma / secondary school). The user is a STUDENT. You help them with: understanding course material, explaining concepts (physics, math, chemistry, geometry, English, etc.), solving problems, answering questions about their courses, lectures, assignments, quizzes, exams, and providing study tips. Be encouraging, patient, and educational — guide students toward understanding rather than just giving answers. Use examples and analogies suitable for Egyptian secondary school students. Be concise, respectful, and helpful. You support both English and Egyptian Arabic (ammeyya masria). If the user writes in Arabic, reply in Arabic. Use markdown formatting (tables, lists, bold, code blocks) when it improves readability.`;

export default function StudentAITutor() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm **Lumora**, your AI tutor. Ask me anything about your courses, lessons, or any topic you're studying. I'm here to help you learn! 📚" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, streamingContent]);
  useEffect(() => { setTimeout(() => textareaRef.current?.focus(), 100); }, []);
  useEffect(() => {
    const el = textareaRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 160) + 'px'; }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, userMsg],
          temperature: 0.7,
          stream: false
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text();
      if (!text) throw new Error('Empty response');

      let full = '';

      const sseLines = text.split('\n').filter(l => l.startsWith('data: '));
      if (sseLines.length > 0) {
        for (const line of sseLines) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              full += delta;
              setStreamingContent(full);
            }
          } catch { /* skip */ }
        }
      } else {
        try {
          const parsed = JSON.parse(text);
          full = parsed.choices?.[0]?.message?.content || '';
        } catch { /* skip */ }
      }

      if (full) {
        let i = 0;
        const interval = setInterval(() => {
          if (i >= full.length) {
            clearInterval(interval);
            setMessages(prev => [...prev, { role: 'assistant', content: full }]);
            setStreamingContent('');
          } else {
            setStreamingContent(full.slice(0, i + 1));
            i++;
          }
        }, 15);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I received an empty response. Please try again.' }]);
        setStreamingContent('');
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an error: ${err.message}. Please try again.` }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#F5F5F7]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8ED] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#00C6FF] flex items-center justify-center shadow-sm">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
              Lumora AI Tutor
              <span className="px-2 py-0.5 bg-[#34C759]/10 text-[#34C759] text-[10px] font-bold rounded-full">Online</span>
            </h2>
            <p className="text-xs text-[#86868B]">Ask questions about your courses and lessons</p>
          </div>
        </div>
        <button
          onClick={() => { setMessages([{ role: 'assistant', content: "Hello! I'm **Lumora**, your AI tutor. Ask me anything about your courses, lessons, or any topic you're studying. I'm here to help you learn! 📚" }]); setStreamingContent(''); }}
          className="px-4 py-2 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <Sparkles size={14} /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : ''} gap-4 max-w-4xl mx-auto w-full`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#0071E3]' : 'bg-gradient-to-br from-[#0071E3] to-[#00C6FF]'}`}>
              {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
            </div>
            <div className={`max-w-[75%] ${msg.role === 'user' ? '' : ''}`}>
              <div className={`text-sm font-bold text-[#1D1D1F] mb-1.5 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.role === 'user' ? 'You' : 'Lumora AI'}
              </div>
              <div className="prose prose-sm prose-p:leading-relaxed prose-headings:text-[#1D1D1F] prose-strong:text-[#1D1D1F] prose-code:bg-[#E8E8ED] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:bg-[#1D1D1F] prose-pre:text-[#F5F5F7] prose-table:text-sm prose-th:bg-[#E8E8ED] prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-[#D2D2D7] prose-table:border-collapse prose-table:w-full max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {streamingContent && (
          <div className="flex gap-4 max-w-4xl mx-auto w-full">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#00C6FF] flex items-center justify-center shrink-0 mt-1">
              <Bot size={18} className="text-white" />
            </div>
            <div className="max-w-[75%]">
              <div className="text-sm font-bold text-[#1D1D1F] mb-1.5">Lumora AI</div>
              <div className="prose prose-sm prose-p:leading-relaxed prose-headings:text-[#1D1D1F] prose-strong:text-[#1D1D1F] prose-code:bg-[#E8E8ED] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:bg-[#1D1D1F] prose-pre:text-[#F5F5F7] prose-table:text-sm prose-th:bg-[#E8E8ED] prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-[#D2D2D7] prose-table:border-collapse prose-table:w-full max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{streamingContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {loading && !streamingContent && (
          <div className="flex gap-4 max-w-4xl mx-auto w-full">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#00C6FF] flex items-center justify-center shrink-0 mt-1">
              <Bot size={18} className="text-white" />
            </div>
            <div className="max-w-[75%]">
              <div className="text-sm font-bold text-[#1D1D1F] mb-1.5">Lumora AI</div>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-[#86868B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#86868B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#86868B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-6 py-4 border-t border-[#E8E8ED] bg-white shrink-0">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-2xl px-5 py-3 border border-[#E8E8ED] focus-within:border-[#0071E3] focus-within:ring-2 focus-within:ring-[#0071E3]/10 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Lumora about your lessons..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-[#1D1D1F] outline-none placeholder:text-[#86868B] resize-none overflow-y-auto max-h-[160px] leading-relaxed"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className={`p-2.5 rounded-xl transition-all ${input.trim() && !loading ? 'bg-[#0071E3] text-white hover:bg-[#0056B3] shadow-sm' : 'bg-[#E8E8ED] text-[#86868B] cursor-not-allowed'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
