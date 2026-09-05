'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SystemIntroSequenceProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  targetX?: number;
  targetY?: number;
}

export const SystemIntroSequence: React.FC<SystemIntroSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const run = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ── Phase Timing (Total ~4.2s) ──
    const PHASE1_MS = 1400; // Phase 1: Handwritten "building..."
    const HOLD1_MS = 300;   // Hold "building..."
    const PHASE2_MS = 1300; // Phase 2: Particle transformation -> "INTELLIGENCE"
    const HOLD2_MS = 300;   // Hold "INTELLIGENCE"
    const PHASE3_MS = 1000; // Phase 3: 3D Tech Nodes Expansion (AI, ML, RAG, VISION, APIs, CLOUD)
    const PHASE4_MS = 700;  // Phase 4: Collapse into "BHAVYA KELA" & Fade out

    const cursiveText = 'building...';
    const intelligenceText = 'INTELLIGENCE';
    const nameText = 'BHAVYA KELA';

    const techTags = ['AI', 'ML', 'RAG', 'VISION', 'APIs', 'CLOUD'];

    const colors = ['#818cf8', '#22d3ee', '#c084fc', '#38bdf8', '#a855f7'];

    // ── Helper to sample text particle points ──
    const getParticlePointsFromText = (text: string, fontStr: string, sampleGap = 4) => {
      const pts: { x: number; y: number }[] = [];
      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.ceil(W * dpr);
      offCanvas.height = Math.ceil(H * dpr);
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return pts;

      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.fillStyle = '#ffffff';
      offCtx.font = fontStr;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, W / 2, H / 2);

      try {
        const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
        const data = imgData.data;
        for (let py = 0; py < H; py += sampleGap) {
          for (let px = 0; px < W; px += sampleGap) {
            const idx = (Math.floor(py * dpr) * offCanvas.width + Math.floor(px * dpr)) * 4;
            if (idx >= 0 && idx < data.length && data[idx + 3] > 120) {
              pts.push({ x: px, y: py });
            }
          }
        }
      } catch {
        // Fallback grid if context fails
        for (let i = 0; i < 200; i++) {
          pts.push({
            x: W / 2 + (Math.random() - 0.5) * 300,
            y: H / 2 + (Math.random() - 0.5) * 80,
          });
        }
      }
      return pts;
    };

    const intelFontSize = Math.min(W * 0.1, 100);
    const intelFont = `900 ${intelFontSize}px 'Kanit', sans-serif`;
    const intelPts = getParticlePointsFromText(intelligenceText, intelFont, 5);

    const nameFontSize = Math.min(W * 0.11, 110);
    const nameFont = `900 ${nameFontSize}px 'Kanit', sans-serif`;
    const namePts = getParticlePointsFromText(nameText, nameFont, 5);

    // Initial background ambient particles
    const particles: Particle[] = [];
    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let t0 = 0;
    let currentPhase: 'phase1' | 'hold1' | 'phase2' | 'hold2' | 'phase3' | 'phase4' | 'done' = 'phase1';

    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      const dt = ts - t0;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, W, H);

      // Render ambient background drift particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // ───────── PHASE 1: Cursive "building..." ─────────
      if (currentPhase === 'phase1') {
        const progress = Math.min(dt / PHASE1_MS, 1);
        const fontSz = Math.min(W * 0.09, 85);
        ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const charsToShow = Math.floor(progress * cursiveText.length);
        const partialStr = cursiveText.substring(0, charsToShow);

        // Draw cursive text in soft purple-white gradient
        ctx.fillStyle = 'rgba(215, 226, 234, 0.95)';
        ctx.fillText(partialStr, W / 2, H / 2);

        // Glowing pen cursor tip
        if (charsToShow > 0) {
          const textW = ctx.measureText(partialStr).width;
          const tipX = W / 2 - ctx.measureText(cursiveText).width / 2 + textW;
          const tipY = H / 2;

          const g = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 18);
          g.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
          g.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(tipX, tipY, 18, 0, Math.PI * 2);
          ctx.fill();
        }

        if (progress >= 1) {
          currentPhase = 'hold1';
          t0 = ts;
        }
      }

      // ───────── HOLD 1 ─────────
      else if (currentPhase === 'hold1') {
        const progress = Math.min((ts - t0) / HOLD1_MS, 1);
        const fontSz = Math.min(W * 0.09, 85);
        ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(215, 226, 234, 0.95)';
        ctx.fillText(cursiveText, W / 2, H / 2);

        if (progress >= 1) {
          currentPhase = 'phase2';
          t0 = ts;
          // Assign target positions for "INTELLIGENCE" particles
          particles.forEach((p, idx) => {
            const target = intelPts[idx % intelPts.length] || { x: W / 2, y: H / 2 };
            p.targetX = target.x;
            p.targetY = target.y;
          });
        }
      }

      // ───────── PHASE 2: Particles self-assemble into "INTELLIGENCE" ─────────
      else if (currentPhase === 'phase2') {
        const progress = Math.min((ts - t0) / PHASE2_MS, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        particles.forEach((p) => {
          if (p.targetX !== undefined && p.targetY !== undefined) {
            p.x += (p.targetX - p.x) * ease * 0.15;
            p.y += (p.targetY - p.y) * ease * 0.15;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, progress * 1.5);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw "INTELLIGENCE" title over particles
        ctx.font = intelFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${progress * 0.9})`;
        ctx.fillText(intelligenceText, W / 2, H / 2);

        if (progress >= 1) {
          currentPhase = 'hold2';
          t0 = ts;
        }
      }

      // ───────── HOLD 2 ─────────
      else if (currentPhase === 'hold2') {
        const progress = Math.min((ts - t0) / HOLD2_MS, 1);
        ctx.font = intelFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillText(intelligenceText, W / 2, H / 2);

        if (progress >= 1) {
          currentPhase = 'phase3';
          t0 = ts;
        }
      }

      // ───────── PHASE 3: 3D Tech Nodes Expand Outward (AI, ML, RAG, VISION, APIs, CLOUD) ─────────
      else if (currentPhase === 'phase3') {
        const progress = Math.min((ts - t0) / PHASE3_MS, 1);
        const ease = 1 - Math.pow(1 - progress, 2);

        // Render expanding orbital tech nodes
        const radius = 100 + ease * (Math.min(W, H) * 0.35);
        ctx.font = `700 ${Math.min(W * 0.035, 24)}px 'Kanit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        techTags.forEach((tag, idx) => {
          const angle = (idx / techTags.length) * Math.PI * 2 + progress * 0.5;
          const nx = W / 2 + Math.cos(angle) * radius;
          const ny = H / 2 + Math.sin(angle) * radius;

          // Connecting laser line to center
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.4 * (1 - progress * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(W / 2, H / 2);
          ctx.lineTo(nx, ny);
          ctx.stroke();

          // Node pill glow
          const nodeGlow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 30);
          nodeGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
          nodeGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = nodeGlow;
          ctx.beginPath();
          ctx.arc(nx, ny, 30, 0, Math.PI * 2);
          ctx.fill();

          // Tag text
          ctx.fillStyle = '#22d3ee';
          ctx.fillText(tag, nx, ny);
        });

        if (progress >= 1) {
          currentPhase = 'phase4';
          t0 = ts;
          // Assign target points to collapse into "BHAVYA KELA"
          particles.forEach((p, idx) => {
            const target = namePts[idx % namePts.length] || { x: W / 2, y: H / 2 };
            p.targetX = target.x;
            p.targetY = target.y;
          });
        }
      }

      // ───────── PHASE 4: Collapse into "BHAVYA KELA" & Fade to Hero ─────────
      else if (currentPhase === 'phase4') {
        const progress = Math.min((ts - t0) / PHASE4_MS, 1);

        particles.forEach((p) => {
          if (p.targetX !== undefined && p.targetY !== undefined) {
            p.x += (p.targetX - p.x) * 0.2;
            p.y += (p.targetY - p.y) * 0.2;
          }
          ctx.fillStyle = '#a855f7';
          ctx.globalAlpha = Math.max(0, 1 - progress);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Render "BHAVYA KELA" title burst
        ctx.font = nameFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - progress * 1.2)})`;
        ctx.fillText(nameText, W / 2, H / 2);

        if (progress >= 1) {
          currentPhase = 'done';
          onComplete();
          return;
        }
      }

      if (currentPhase !== 'done') {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => run(), 50);
    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [run]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#08080C]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  );
};
