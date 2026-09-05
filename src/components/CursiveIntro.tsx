'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CursiveIntroProps {
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
}

export const CursiveIntro: React.FC<CursiveIntroProps> = ({ onComplete }) => {
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

    // ── Config ──
    const WRITE_MS = 1800;   // letter-by-letter writing
    const HOLD_MS = 500;     // hold completed text
    const SHATTER_MS = 900;  // particles fly out
    const CONVERGE_MS = 700; // particles pull to center
    const FADE_MS = 400;     // fade overlay

    const letters = ['h', 'e', 'l', 'l', 'o', '.'];
    const fontSize = Math.min(W * 0.13, 130);
    const fontStr = `italic 700 ${fontSize}px Georgia, "Times New Roman", serif`;
    const colors = ['#818cf8', '#22d3ee', '#c084fc', '#a5b4fc', '#67e8f9'];

    // Measure each letter width for positioning
    ctx.font = fontStr;
    const totalText = 'hello.';
    const totalWidth = ctx.measureText(totalText).width;
    const startX = (W - totalWidth) / 2;

    const letterPositions: { char: string; x: number }[] = [];
    let cursorX = startX;
    for (const ch of letters) {
      letterPositions.push({ char: ch, x: cursorX });
      cursorX += ctx.measureText(ch).width;
    }

    // ── Build particles from rendered text pixels ──
    const particles: Particle[] = [];

    const offCanvas = document.createElement('canvas');
    offCanvas.width = Math.ceil(W * dpr);
    offCanvas.height = Math.ceil(H * dpr);
    const offCtx = offCanvas.getContext('2d');

    if (offCtx) {
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.fillStyle = '#ffffff';
      offCtx.font = fontStr;
      offCtx.textBaseline = 'middle';
      let ox = startX;
      for (const ch of letters) {
        offCtx.fillText(ch, ox, H / 2);
        ox += offCtx.measureText(ch).width;
      }

      try {
        const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
        const data = imgData.data;
        const gap = 5;
        for (let py = 0; py < H; py += gap) {
          for (let px = 0; px < W; px += gap) {
            const idx = (Math.floor(py * dpr) * offCanvas.width + Math.floor(px * dpr)) * 4;
            if (idx >= 0 && idx < data.length && data[idx + 3] > 100) {
              particles.push({
                x: px, y: py, vx: 0, vy: 0,
                size: 1.8 + Math.random() * 2,
                alpha: 0,
                color: colors[Math.floor(Math.random() * colors.length)],
              });
            }
          }
        }
      } catch {
        for (let i = 0; i < 350; i++) {
          particles.push({
            x: W * 0.25 + Math.random() * W * 0.5,
            y: H * 0.4 + Math.random() * H * 0.2,
            vx: 0, vy: 0,
            size: 2 + Math.random() * 2, alpha: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    }

    // ── Cursor glow sparkles ──
    const sparks: { x: number; y: number; a: number; s: number }[] = [];

    let t0 = 0;
    let phase: 'write' | 'hold' | 'shatter' | 'converge' | 'fade' | 'done' = 'write';

    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      const dt = ts - t0;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#030509';
      ctx.fillRect(0, 0, W, H);

      // ───────── WRITE: letter by letter ─────────
      if (phase === 'write') {
        const p = Math.min(dt / WRITE_MS, 1);
        const lettersToShow = Math.floor(p * letters.length);
        const letterFrac = (p * letters.length) - lettersToShow; // fraction into current letter

        ctx.font = fontStr;
        ctx.textBaseline = 'middle';

        // Draw completed letters with full opacity
        for (let i = 0; i < lettersToShow && i < letters.length; i++) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.fillText(letterPositions[i].char, letterPositions[i].x, H / 2);
        }

        // Draw current letter fading in
        if (lettersToShow < letters.length) {
          const cur = letterPositions[lettersToShow];
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = letterFrac;
          ctx.fillText(cur.char, cur.x, H / 2);
          ctx.globalAlpha = 1;

          // Glowing cursor at the right edge of current letter
          const curW = ctx.measureText(cur.char).width;
          const cursorTipX = cur.x + curW * letterFrac;
          const cursorTipY = H / 2;

          const g = ctx.createRadialGradient(cursorTipX, cursorTipY, 0, cursorTipX, cursorTipY, 22);
          g.addColorStop(0, 'rgba(34, 211, 238, 0.95)');
          g.addColorStop(0.5, 'rgba(129, 140, 248, 0.35)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cursorTipX, cursorTipY, 22, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle emission from cursor tip
          if (Math.random() > 0.35) {
            sparks.push({
              x: cursorTipX + (Math.random() - 0.5) * 14,
              y: cursorTipY + (Math.random() - 0.5) * 14,
              a: 1, s: 1 + Math.random() * 2.5,
            });
          }
        }

        // Draw & decay sparkles
        for (let i = sparks.length - 1; i >= 0; i--) {
          const sp = sparks[i];
          sp.a -= 0.04;
          if (sp.a <= 0) { sparks.splice(i, 1); continue; }
          ctx.fillStyle = `rgba(34, 211, 238, ${sp.a})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.s, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p >= 1) { phase = 'hold'; t0 = ts; }
      }

      // ───────── HOLD: full text + shimmer sweep ─────────
      else if (phase === 'hold') {
        const p = Math.min((ts - t0) / HOLD_MS, 1);

        // Full text
        ctx.font = fontStr;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 1;
        let dx = startX;
        for (const ch of letters) {
          ctx.fillText(ch, dx, H / 2);
          dx += ctx.measureText(ch).width;
        }

        // Light sweep
        const sweepX = W * 0.05 + p * W * 0.9;
        const sg = ctx.createRadialGradient(sweepX, H / 2, 0, sweepX, H / 2, 90);
        sg.addColorStop(0, 'rgba(34, 211, 238, 0.3)');
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.fillRect(0, 0, W, H);

        if (p >= 1) {
          phase = 'shatter'; t0 = ts;
          particles.forEach(pt => {
            pt.alpha = 1;
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 10;
            pt.vx = Math.cos(angle) * speed;
            pt.vy = Math.sin(angle) * speed;
          });
        }
      }

      // ───────── SHATTER: particles fly outward ─────────
      else if (phase === 'shatter') {
        const p = Math.min((ts - t0) / SHATTER_MS, 1);

        particles.forEach(pt => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vx *= 0.95;
          pt.vy *= 0.95;
          pt.alpha = 1 - p * 0.4;

          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        if (p >= 1) { phase = 'converge'; t0 = ts; }
      }

      // ───────── CONVERGE: particles pull to center vortex ─────────
      else if (phase === 'converge') {
        const p = Math.min((ts - t0) / CONVERGE_MS, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cx = W / 2;
        const cy = H / 2;

        particles.forEach(pt => {
          pt.x += (cx - pt.x) * ease * 0.12;
          pt.y += (cy - pt.y) * ease * 0.12;
          pt.alpha = Math.max(0, 1 - p);

          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * (1 - p * 0.5), 0, Math.PI * 2);
          ctx.fill();
        });

        // Core glow
        const cr = 25 + p * 100;
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        cg.addColorStop(0, `rgba(99, 102, 241, ${0.7 * p})`);
        cg.addColorStop(0.5, `rgba(34, 211, 238, ${0.3 * p})`);
        cg.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();

        if (p >= 1) { phase = 'fade'; t0 = ts; }
      }

      // ───────── FADE: reveal portfolio ─────────
      else if (phase === 'fade') {
        const p = Math.min((ts - t0) / FADE_MS, 1);
        const cx = W / 2;
        const cy = H / 2;
        const r = 130 + p * 280;
        const fg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        fg.addColorStop(0, `rgba(99, 102, 241, ${0.3 * (1 - p)})`);
        fg.addColorStop(1, 'transparent');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        if (p >= 1) { phase = 'done'; onComplete(); return; }
      }

      if (phase !== 'done') {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => run(), 60);
    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [run]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#030509]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  );
};
