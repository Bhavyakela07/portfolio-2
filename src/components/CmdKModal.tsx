'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Send, FolderGit2, Mail, FileText, Bot, Terminal, Code2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface CmdKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CmdKModal: React.FC<CmdKModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'qa'>('qa');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm Bhavya's AI Resume Agent. Ask me anything about his 5 flagship projects (RecoverOS, Skill-Gap-Analyzer, KAVAACH, PerspectAI, Virtual Photographer), his RAG/Computer Vision tech stack, or his education!",
      time: 'Just now'
    }
  ]);

  // Pre-configured Q&A database for instant, robust answers
  const answerQuestions = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('recoveros') || q.includes('payment') || q.includes('razorpay')) {
      return "🛡️ **RecoverOS** is an AI-Governed Payment Recovery System built for Razorpay AI Buildathon 2026. Its core thesis is 'AI Recommends. Policy Governs.' It combines an XGBoost calibrated probability model (CalibratedClassifierCV) with a deterministic Policy Engine enforcing IST quiet hours (22:00–08:00 IST), ₹50k escalation caps, and fail-closed safety guardrails.";
    }
    if (q.includes('skill-gap') || q.includes('rag') || q.includes('resume') || q.includes('qdrant') || q.includes('groq')) {
      return "🎯 **Skill-Gap-Analyzer** is an AI-powered resume & job matching platform. Bhavya built a Hybrid RAG pipeline combining SpaCy exact matching, Qdrant vector search, and Groq Llama 3 LLM verification, which reduced false-positive skill matches by ~90% and delivered 18x faster inference leveraging Groq LPUs.";
    }
    if (q.includes('kavaach') || q.includes('pothole') || q.includes('yolo') || q.includes('vision') || q.includes('road')) {
      return "🚗 **KAVAACH** is an AI Road Safety & Infrastructure System that fine-tuned a YOLOv8 computer vision model into a full-stack detection system. Served over FastAPI REST endpoints with sub-second response times and geo-tagged detection overlays in React!";
    }
    if (q.includes('perspectai') || q.includes('fact') || q.includes('misinformation') || q.includes('gemini')) {
      return "🔍 **PerspectAI** is an AI misinformation fact-checking platform powered by Google Gemini API and FastAPI. It classifies claims as True/False/Misleading with confidence scoring, structuring 100% of LLM outputs into parseable JSON for real-time UI rendering.";
    }
    if (q.includes('virtual photographer') || q.includes('try-on') || q.includes('streamlit') || q.includes('outfit')) {
      return "📸 **AI Virtual Photographer** is a virtual try-on system chaining dual Gemini Vision API calls (garment understanding -> outfit compositing) into an automated Streamlit workflow, collapsing multi-step manual compositing into single-click execution.";
    }
    if (q.includes('tech stack') || q.includes('skills') || q.includes('python') || q.includes('react')) {
      return "⚡ **Bhavya's Tech Stack:** \n• **AI/ML:** RAG Architecture, Groq (Llama 3), Gemini API, YOLOv8, OpenCV, SpaCy, Qdrant Vector DB, XGBoost, PyTorch/Sentence-Transformers.\n• **Full-Stack:** React 19/18, TypeScript, Tailwind CSS, FastAPI, Node.js, PostgreSQL, Docker, AWS (EC2/Lambda).";
    }
    if (q.includes('education') || q.includes('parul') || q.includes('cgpa') || q.includes('degree')) {
      return "🎓 **Education:** B.Tech in Computer Science & Engineering from Parul University, Vadodara, Gujarat (2023–2027) with CGPA 7.20/10. Graduating in 2027!";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('github')) {
      return `📬 **Contact Bhavya Kela:** \n• Email: bhavyakela@gmail.com \n• Phone: +91 97730 93843 \n• GitHub: https://github.com/Bhavyakela07`;
    }

    return `🤖 Thanks for your question! Bhavya is a final-year CS undergrad (2027) specializing in Generative AI, RAG architecture, Computer Vision (YOLOv8), and Full-Stack APIs (FastAPI/React). Ask me about RecoverOS, Skill-Gap-Analyzer, KAVAACH, or PerspectAI!`;
  };

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsg = { sender: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      const response = answerQuestions(text);
      setChatMessages(prev => [...prev, { sender: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 400);
  };

  // Keyboard shortcut Cmd+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('openCmdK'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = resumeData.projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative z-50 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header Tabs */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'qa'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                AI Resume Chatbot
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'search'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                Search Projects & Links
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: AI RESUME CHATBOT */}
          {activeTab === 'qa' && (
            <div className="flex-1 flex flex-col min-h-0 bg-slate-950/40">
              {/* Preset suggestion pills */}
              <div className="p-3 border-b border-slate-800/60 bg-slate-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Quick Ask:
                </span>
                <button
                  onClick={() => handleSendChat('Tell me about RecoverOS')}
                  className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs hover:bg-indigo-900 transition-colors whitespace-nowrap"
                >
                  🛡️ RecoverOS Architecture
                </button>
                <button
                  onClick={() => handleSendChat('What is Skill-Gap-Analyzer?')}
                  className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs hover:bg-cyan-900 transition-colors whitespace-nowrap"
                >
                  🎯 Skill-Gap-Analyzer RAG
                </button>
                <button
                  onClick={() => handleSendChat('Explain KAVAACH pothole system')}
                  className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs hover:bg-amber-900 transition-colors whitespace-nowrap"
                >
                  🚗 KAVAACH YOLOv8
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-sm">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none leading-relaxed'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask anything about Bhavya's projects, RAG, YOLOv8, or skills..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  onClick={() => handleSendChat()}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SEARCH PROJECTS & LINKS */}
          {activeTab === 'search' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search project name, tech tag (e.g. FastAPI, RAG, YOLOv8)..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {/* Project items */}
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
                  Projects ({filteredProjects.length})
                </div>
                {filteredProjects.map((project) => (
                  <a
                    key={project.id}
                    href={`#${project.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 group-hover:scale-105 transition-transform">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 text-sm group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1">{project.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap max-w-[200px] justify-end">
                      {project.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}

                {/* Quick actions */}
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 pt-3 pb-1">
                  Quick Links
                </div>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  Email Bhavya ({resumeData.email})
                </a>
                <a
                  href={resumeData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition-colors"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Visit GitHub ({resumeData.github})
                </a>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Esc</kbd> to exit</span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-indigo-400" /> Powered by Bhavya's Resume Knowledge Graph
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
