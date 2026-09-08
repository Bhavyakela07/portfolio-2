'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, CheckCircle, Zap, Bot, Play, Cpu, Layers, Sparkles, Sliders } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDemosProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemos: React.FC<ProjectDemosProps> = ({ project, onClose }) => {
  // Demo 1: RecoverOS State
  const [recoverScenario, setRecoverScenario] = useState<'quietHours' | 'highAmount' | 'validRetry'>('quietHours');
  
  // Demo 2: Skill Gap Analyzer State
  const [targetRole, setTargetRole] = useState('Senior RAG Engineer');
  const [isAnalyzingGap, setIsAnalyzingGap] = useState(false);
  const [gapResults, setGapResults] = useState<{ matchScore: number; missing: string[]; status: string } | null>(null);

  // Demo 3: KAVAACH Pothole Overlay State
  const [showBoundingBox, setShowBoundingBox] = useState(true);

  // Demo 4: PerspectAI Fact Check State
  const [claimText, setClaimText] = useState('Payment failures automatically trigger immediate 24/7 retries.');
  const [isFactChecking, setIsFactChecking] = useState(false);
  const [factCheckResult, setFactCheckResult] = useState<{ verdict: string; confidence: number; jsonOutput: string } | null>(null);

  // Demo 5: Virtual Photographer State
  const [garmentType, setGarmentType] = useState<'jacket' | 'hoodie' | 'blazer'>('jacket');

  if (!project) return null;

  const handleRunSkillGap = () => {
    setIsAnalyzingGap(true);
    setTimeout(() => {
      setGapResults({
        matchScore: 92,
        missing: ['Distributed Tracing (Jaeger)', 'Kserve Model Serving'],
        status: 'SpaCy Exact + Qdrant Vector + Groq Llama 3 Verified'
      });
      setIsAnalyzingGap(false);
    }, 600);
  };

  const handleRunFactCheck = () => {
    setIsFactChecking(true);
    setTimeout(() => {
      setFactCheckResult({
        verdict: 'MISLEADING / FALSE',
        confidence: 0.96,
        jsonOutput: JSON.stringify({
          claim: claimText,
          verdict: "FALSE",
          confidence: 0.96,
          policyRuleEnforced: "IST Quiet Hours (22:00-08:00) blocks outreach",
          timestamp: new Date().toISOString()
        }, null, 2)
      });
      setIsFactChecking(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0D13]/85 backdrop-blur-xl"
        />

        {/* Demo Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-50 w-full max-w-3xl liquid-glass rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Specular Rim */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl liquid-chip text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Interactive Micro-Demo Simulator
                </span>
                <h3 className="text-lg font-bold text-slate-100">{project.title}</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DEMO CONTENT BODY */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">

            {/* DEMO 1: RECOVEROS DEMO */}
            {project.demoType === 'recoverOS' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="text-xs font-mono text-slate-400 mb-2">SELECT FAILURE SCENARIO:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => setRecoverScenario('quietHours')}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        recoverScenario === 'quietHours'
                          ? 'bg-indigo-950/90 border-indigo-500 text-indigo-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      🌙 Failed at 23:30 IST (Quiet Hours)
                    </button>

                    <button
                      onClick={() => setRecoverScenario('highAmount')}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        recoverScenario === 'highAmount'
                          ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      💰 ₹75,000 Payment Failure (&gt; ₹50k Cap)
                    </button>

                    <button
                      onClick={() => setRecoverScenario('validRetry')}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        recoverScenario === 'validRetry'
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      ✅ Standard ₹2,500 Failure at 14:00 IST
                    </button>
                  </div>
                </div>

                {/* Engine Comparison View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* AI Recommendation */}
                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">1. AI ML Model (XGBoost)</span>
                      <h5 className="font-bold text-slate-200 text-sm mt-1">Probability Engine</h5>
                      <p className="text-xs text-slate-400 mt-2">
                        {recoverScenario === 'quietHours' && "Predicts 84% recovery likelihood based on customer LTV."}
                        {recoverScenario === 'highAmount' && "Predicts 79% recovery likelihood based on transaction history."}
                        {recoverScenario === 'validRetry' && "Predicts 91% recovery likelihood."}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-indigo-900/60 font-mono text-xs text-indigo-300">
                      Recommendation: <span className="text-emerald-400 font-bold">RETRY</span>
                    </div>
                  </div>

                  {/* Deterministic Policy Engine */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">2. Policy Engine (Absolute Authority)</span>
                      <h5 className="font-bold text-slate-200 text-sm mt-1">Governance Guardrails</h5>
                      <p className="text-xs text-slate-400 mt-2">
                        {recoverScenario === 'quietHours' && "⛔ VIOLATION: IST Quiet Hours (22:00-08:00 IST). Outreach blocked."}
                        {recoverScenario === 'highAmount' && "⚠️ ESCALATION: Amount exceeds ₹50k limit. Routed to human review."}
                        {recoverScenario === 'validRetry' && "✅ ALL CHECKS PASSED: Quiet hours ok, limits ok, caps ok."}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-xs font-bold">
                      Final Action:{' '}
                      <span className={recoverScenario === 'validRetry' ? 'text-emerald-400' : 'text-rose-400'}>
                        {recoverScenario === 'quietHours' && 'DO_NOT_RETRY (Blocked)'}
                        {recoverScenario === 'highAmount' && 'UNKNOWN_HUMAN_REVIEW'}
                        {recoverScenario === 'validRetry' && 'ALLOW_RETRY'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 2: SKILL GAP ANALYZER */}
            {project.demoType === 'skillGap' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="text-xs font-mono text-slate-400">Target Role to Benchmark Against:</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                  />
                  <button
                    onClick={handleRunSkillGap}
                    disabled={isAnalyzingGap}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    {isAnalyzingGap ? 'Executing SpaCy + Qdrant + Groq LPU...' : 'Run Hybrid RAG Gap Analysis'}
                  </button>
                </div>

                {gapResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl bg-slate-950 border border-indigo-800/60 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-indigo-400 font-bold">MATCH ACCURACY SCORE</span>
                      <span className="text-2xl font-extrabold text-emerald-400 font-mono">{gapResults.matchScore}%</span>
                    </div>
                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">Verified Pipeline:</span> {gapResults.status}
                    </div>
                    <div className="text-xs text-slate-400">
                      <span className="text-amber-400 font-bold">Identified Missing Skill Gaps:</span> {gapResults.missing.join(', ')}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* DEMO 3: KAVAACH POTHOLE INSPECTOR */}
            {project.demoType === 'kavaach' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-300">YOLOv8 Detection Overlay</span>
                  <button
                    onClick={() => setShowBoundingBox(!showBoundingBox)}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-500 transition-colors"
                  >
                    {showBoundingBox ? 'Hide YOLO Bounding Box' : 'Show YOLO Bounding Box'}
                  </button>
                </div>

                <div className="relative w-full h-56 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
                    <p className="text-xs text-slate-500 font-mono">Road Surveillance Live Stream Frame #4092</p>
                  </div>

                  {showBoundingBox && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute w-44 h-28 border-2 border-amber-400 rounded-lg bg-amber-500/10 shadow-lg shadow-amber-500/20 flex flex-col justify-between p-2"
                    >
                      <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono font-bold text-[10px] self-start shadow">
                        pothole: 96.4%
                      </span>
                      <span className="text-[9px] font-mono text-amber-300 self-end">
                        Geo: 26.9124°N, 75.7873°E
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between text-xs font-mono text-slate-400">
                  <span>FastAPI Inference Latency: <strong className="text-emerald-400">24ms</strong></span>
                  <span>Model: YOLOv8 Custom Fine-Tuned</span>
                </div>
              </div>
            )}

            {/* DEMO 4: PERSPECTAI */}
            {project.demoType === 'perspectAI' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <label className="text-xs font-mono text-slate-400">Claim to Fact-Check:</label>
                  <input
                    type="text"
                    value={claimText}
                    onChange={(e) => setClaimText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                  />
                  <button
                    onClick={handleRunFactCheck}
                    disabled={isFactChecking}
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    {isFactChecking ? 'Generating Gemini Fact Verdict...' : 'Run Gemini Fact-Checker'}
                  </button>
                </div>

                {factCheckResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-slate-950 border border-cyan-800/60 font-mono text-xs text-cyan-300"
                  >
                    <div className="text-[10px] text-slate-400 mb-2 uppercase font-bold">Structured Gemini JSON Verdict:</div>
                    <pre className="bg-slate-900 p-3 rounded-lg text-[11px] text-slate-200 overflow-x-auto">
                      {factCheckResult.jsonOutput}
                    </pre>
                  </motion.div>
                )}
              </div>
            )}

            {/* DEMO 5: VIRTUAL PHOTOGRAPHER */}
            {project.demoType === 'virtualPhotographer' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400 mb-3 block">SELECT GARMENT FOR GEMINI VISION CHAIN:</span>
                  <div className="flex gap-2">
                    {(['jacket', 'hoodie', 'blazer'] as const).map((item) => (
                      <button
                        key={item}
                        onClick={() => setGarmentType(item)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                          garmentType === item
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-purple-900/60 text-center space-y-3">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-200">Dual Gemini Vision API Chain Active</h5>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    API 1 (Garment Understanding: {garmentType.toUpperCase()}) ➔ API 2 (Outfit Compositing Render) ➔ Streamlit UI Output
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Close Demo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
