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

interface Node {
  x: number;
  y: number;
}

export const SystemIntroSequence: React.FC<SystemIntroSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const run = useCallback(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = W < 768;

    // ── Phase Timing (Deliberate & Impressive Narrative ~7.7s total) ──
    const STAGE1_MS = 1000; // Ambient space buildup
    const STAGE2_MS = 1600; // Handwriting "building..."
    const HOLD2_MS  = 500;  // Hold "building..."
    const STAGE3_MS = 1600; // Assembly of "BUILDING INTELLIGENCE"
    const HOLD3_MS  = 600;  // Hold "BUILDING INTELLIGENCE"
    const STAGE4_MS = 1200; // Network formation & node pulses
    const STAGE5_MS = 800;  // Convergence to center
    const STAGE6_MS = 400;  // Fade out into Hero

    const T_STAGE1 = STAGE1_MS;
    const T_STAGE2 = T_STAGE1 + STAGE2_MS + HOLD2_MS;
    const T_STAGE3 = T_STAGE2 + STAGE3_MS + HOLD3_MS;
    const T_STAGE4 = T_STAGE3 + STAGE4_MS;
    const T_STAGE5 = T_STAGE4 + STAGE5_MS;
    const T_STAGE6 = T_STAGE5 + STAGE6_MS;

    const colors = ['#818cf8', '#22d3ee', '#c084fc', '#a855f7'];
    const numParticles = isMobile ? Math.floor(40 + Math.random() * 10) : Math.floor(90 + Math.random() * 20);

    // Initial background ambient particles
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: 0.6 + Math.random() * 0.8,
        alpha: 0.2 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Helper to sample text particle points
    const getParticlePointsFromTexts = (text1: string, font1: string, text2: string, font2: string, sampleGap = 5) => {
      const pts: { x: number; y: number }[] = [];
      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.ceil(W * dpr);
      offCanvas.height = Math.ceil(H * dpr);
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return pts;

      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      
      const gap = H * 0.05;

      offCtx.font = font1;
      offCtx.fillText(text1, W / 2, H / 2 - gap);

      offCtx.font = font2;
      offCtx.fillText(text2, W / 2, H / 2 + gap);

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
        for (let i = 0; i < 250; i++) {
          pts.push({
            x: W / 2 + (Math.random() - 0.5) * 320,
            y: H / 2 + (Math.random() - 0.5) * 90,
          });
        }
      }
      return pts;
    };

    const cursiveText = 'building...';
    
    // Setup points for phase 3
    const buildFont = `500 ${Math.min(W * 0.045, 34)}px 'Kanit', sans-serif`;
    const intelFont = `900 ${Math.min(W * 0.085, 68)}px 'Kanit', sans-serif`;
    const intelPts = getParticlePointsFromTexts('BUILDING', buildFont, 'INTELLIGENCE', intelFont, isMobile ? 7 : 5);
    
    // Assign random subset of text points to particles
    const assignedIntelPts = particles.map(() => intelPts[Math.floor(Math.random() * intelPts.length)] || { x: W / 2, y: H / 2 });

    // Node locations for Phase 4 (Hexagon Network)
    const nodes: Node[] = [];
    const hexRadius = Math.min(W, H) * 0.26;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      nodes.push({
        x: W / 2 + Math.cos(angle) * hexRadius,
        y: H / 2 + Math.sin(angle) * hexRadius
      });
    }

    let t0 = 0;
    
    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      const elapsed = ts - t0;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, W, H);

      // -- STAGE 1: AMBIENT SPACE (0 -> T_STAGE1)
      if (elapsed <= T_STAGE1) {
        const progress = elapsed / STAGE1_MS;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * progress;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
      // -- STAGE 2: HANDWRITING "building..." (T_STAGE1 -> T_STAGE2)
      else if (elapsed <= T_STAGE2) {
        const stage2Elapsed = elapsed - T_STAGE1;
        const writeProgress = Math.min(1, stage2Elapsed / STAGE2_MS);
        
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

        const fontSz = Math.min(W * 0.085, 75);
        ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const charsToShow = Math.floor(writeProgress * cursiveText.length);
        const partialStr = cursiveText.substring(0, charsToShow);

        ctx.fillStyle = 'rgba(215, 226, 234, 0.95)';
        ctx.fillText(partialStr, W / 2, H / 2);

        // Glowing pen cursor tip with subtle sparkle emissions
        if (charsToShow > 0 && charsToShow <= cursiveText.length) {
          const textW = ctx.measureText(partialStr).width;
          const fullW = ctx.measureText(cursiveText).width;
          const tipX = W / 2 - fullW / 2 + textW;
          const tipY = H / 2;

          const g = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 16);
          g.addColorStop(0, 'rgba(168, 85, 247, 0.95)');
          g.addColorStop(0.5, 'rgba(34, 211, 238, 0.5)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(tipX, tipY, 16, 0, Math.PI * 2);
          ctx.fill();

          for (let s = 0; s < 2; s++) {
            if (Math.random() > 0.4) {
              ctx.fillStyle = '#22d3ee';
              ctx.globalAlpha = Math.random() * 0.9;
              ctx.beginPath();
              ctx.arc(tipX + (Math.random() - 0.5) * 12, tipY + (Math.random() - 0.5) * 12, 0.6 + Math.random(), 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1;
      }
      // -- STAGE 3: BUILDING INTELLIGENCE (T_STAGE2 -> T_STAGE3)
      else if (elapsed <= T_STAGE3) {
        const stage3Elapsed = elapsed - T_STAGE2;
        const progress = Math.min(1, stage3Elapsed / STAGE3_MS);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        // Cursive text gracefully fades out
        if (stage3Elapsed < 300) {
          const fadeProgress = stage3Elapsed / 300;
          const fontSz = Math.min(W * 0.085, 75);
          ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(215, 226, 234, ${0.95 * (1 - fadeProgress)})`;
          ctx.fillText(cursiveText, W / 2, H / 2);
        }

        particles.forEach((p, idx) => {
          const target = assignedIntelPts[idx];
          if (target) {
            p.x += (target.x - p.x) * ease * 0.12;
            p.y += (target.y - p.y) * ease * 0.12;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, p.alpha + progress);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.6, 0, Math.PI * 2);
          ctx.fill();
        });
        
        const gap = H * 0.05;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * progress})`;
        
        ctx.font = buildFont;
        ctx.fillText('BUILDING', W / 2, H / 2 - gap);

        ctx.font = intelFont;
        ctx.fillText('INTELLIGENCE', W / 2, H / 2 + gap);

        ctx.globalAlpha = 1;
      }
      // -- STAGE 4: AI NETWORK FORMATION (T_STAGE3 -> T_STAGE4)
      else if (elapsed <= T_STAGE4) {
        const stage4Elapsed = elapsed - T_STAGE3;
        const progress = stage4Elapsed / STAGE4_MS;
        const ease = 1 - Math.pow(1 - progress, 3);

        particles.forEach((p, idx) => {
          const targetNode = nodes[idx % nodes.length];
          const tx = targetNode.x + Math.sin(idx + stage4Elapsed * 0.002) * 25;
          const ty = targetNode.y + Math.cos(idx + stage4Elapsed * 0.002) * 25;
          p.x += (tx - p.x) * ease * 0.14;
          p.y += (ty - p.y) * ease * 0.14;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.4, 1 - progress * 0.4);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Connecting laser lines between nodes
        ctx.globalAlpha = 0.2 * progress;
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
             ctx.moveTo(nodes[i].x, nodes[i].y);
             ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
        ctx.stroke();
        
        // Node pulsing circles
        nodes.forEach((n) => {
           const pulse = Math.sin(stage4Elapsed * 0.006) * 0.5 + 0.5;
           const r = 5 + pulse * 3;
           ctx.fillStyle = `rgba(192, 132, 252, ${0.6 + pulse * 0.4})`;
           ctx.beginPath();
           ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
           ctx.fill();
        });
        
        ctx.globalAlpha = 1;
      }
      // -- STAGE 5: CONVERGENCE VORTEX (T_STAGE4 -> T_STAGE5)
      else if (elapsed <= T_STAGE5) {
        const stage5Elapsed = elapsed - T_STAGE4;
        const progress = stage5Elapsed / STAGE5_MS;
        const ease = progress * progress * progress;
        
        particles.forEach((p) => {
          p.x += (W / 2 - p.x) * ease * 0.4;
          p.y += (H / 2 - p.y) * ease * 0.4;
          
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 1 - progress * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        });

        nodes.forEach((n) => {
          n.x += (W / 2 - n.x) * ease * 0.4;
          n.y += (H / 2 - n.y) * ease * 0.4;
        });

        // Network collapses
        ctx.globalAlpha = 0.2 * (1 - progress);
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
             ctx.moveTo(nodes[i].x, nodes[i].y);
             ctx.lineTo(nodes[j].x, nodes[j].y);
          }
        }
        ctx.stroke();

        // Central soft radial glow expanding
        ctx.globalAlpha = progress;
        const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 120 * progress);
        g.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
        g.addColorStop(0.5, 'rgba(34, 211, 238, 0.4)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 120 * progress, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }
      // -- STAGE 6: FADE TO HERO (T_STAGE5 -> T_STAGE6)
      else if (elapsed <= T_STAGE6) {
        onComplete();
        return;
      }
      // -- DONE
      else {
        onComplete();
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
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
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
      className="fixed inset-0 z-50 bg-[#08080C]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Optional Skip Button for Instant Portfolio Access */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-all z-50 flex items-center gap-1.5 group cursor-pointer"
      >
        <span>Skip Intro</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </motion.div>
  );
};
