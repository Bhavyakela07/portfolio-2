'use client';

import React, { useEffect, useRef } from 'react';

export interface DotOrbitProps {
  mode?: 'orbit' | 'drift';
  interaction?: 'repel' | 'attract' | 'off';
  tracking?: 'global' | 'local' | 'off';
  density?: number;
  speed?: number;
  dotSize?: number;
  linkDistance?: number;
  background?: string;
  dotColor?: string;
  lineColor?: string;
  opacity?: number;
  alpha?: number;
  interactionRadius?: number;
  interactionStrength?: number;
  cursorEase?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Dot {
  i: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  baseA: number;
  phase: number;
}

export const DotOrbit: React.FC<DotOrbitProps> = ({
  mode = 'orbit',
  interaction = 'repel',
  tracking = 'global',
  density = 1,
  speed = 0.8,
  dotSize = 2,
  linkDistance = 140,
  background = 'transparent',
  dotColor = '#38bdf8',
  lineColor = '#6366f1',
  opacity = 0.85,
  alpha = 1.4,
  interactionRadius = 160,
  interactionStrength = 22,
  cursorEase = 40,
  className = '',
  style,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    inside: false,
    hasInit: false,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionScale = prefersReducedMotion ? 0.45 : 1;

    let w = 1;
    let h = 1;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeToLerp = (ease: number) => clamp((clamp(ease, 0, 100) / 100) * 0.3, 0, 0.3);

    const toRgba = (input: string, aVal: number) => {
      const s = (input || '').trim();
      if (s.startsWith('rgba(') || s.startsWith('rgb(')) {
        const nums = s
          .replace(/rgba?\(/, '')
          .replace(')', '')
          .split(',')
          .map((v) => parseFloat(v.trim()));
        const r = nums[0] ?? 0;
        const g = nums[1] ?? 0;
        const b = nums[2] ?? 0;
        return `rgba(${r}, ${g}, ${b}, ${aVal})`;
      }
      const hx = s.replace('#', '').trim();
      const full = hx.length === 3 ? hx.split('').map((c) => c + c).join('') : hx.slice(0, 6);
      const n = parseInt(full || '000000', 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return `rgba(${r}, ${g}, ${b}, ${aVal})`;
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const m = mouseRef.current;
      if (!m.hasInit) {
        m.targetX = w * 0.5;
        m.targetY = h * 0.5;
        m.x = m.targetX;
        m.y = m.targetY;
        m.hasInit = true;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const rebuildDots = (): Dot[] => {
      const count = clamp(Math.floor(((w * h) / 12000) * density), 25, 300);
      const cx = w * 0.5;
      const cy = h * 0.5;
      return Array.from({ length: count }).map((_, i) => {
        const r = Math.min(w, h) * (0.15 + Math.random() * 0.38);
        const a = Math.random() * Math.PI * 2;
        return {
          i,
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseR: r,
          baseA: a,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    let dots = rebuildDots();
    let lastArea = w * h;

    const onWindowPointerMove = (e: PointerEvent) => {
      if (tracking !== 'global') return;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && x <= r.width && y >= 0 && y <= r.height;
      const m = mouseRef.current;
      m.targetX = x;
      m.targetY = y;
      m.inside = inside;
    };

    if (tracking === 'global') {
      window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    }

    const step = (tMs: number) => {
      const t = (tMs / 1000) * motionScale;
      const area = w * h;
      if (Math.abs(area - lastArea) / Math.max(1, lastArea) > 0.3) {
        dots = rebuildDots();
        lastArea = area;
      }

      // Cursor easing
      const m = mouseRef.current;
      const lerp = easeToLerp(cursorEase);
      if (lerp > 0) {
        m.x += (m.targetX - m.x) * lerp;
        m.y += (m.targetY - m.y) * lerp;
      } else {
        m.x = m.targetX;
        m.y = m.targetY;
      }

      // Background clearing
      ctx.clearRect(0, 0, w, h);
      if (background && background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      }

      const cx = w * 0.5;
      const cy = h * 0.5;
      const interactionEnabled = interaction !== 'off' && tracking !== 'off';
      const ir = Math.max(10, interactionRadius);
      const ir2 = ir * ir;
      const strength = interactionStrength * motionScale;
      const alphaBoost = clamp(alpha, 0.2, 3);

      for (const d of dots) {
        if (mode === 'orbit') {
          const a = d.baseA + t * speed * 0.6 + Math.sin(t * 0.5 + d.phase) * 0.15;
          const rr = d.baseR * (0.92 + 0.08 * Math.sin(t * 1.1 + d.phase));
          d.x = cx + Math.cos(a) * rr;
          d.y = cy + Math.sin(a) * rr;
        } else {
          d.x += d.vx * speed * motionScale;
          d.y += d.vy * speed * motionScale;
          if (d.x < -20) d.x = w + 20;
          if (d.x > w + 20) d.x = -20;
          if (d.y < -20) d.y = h + 20;
          if (d.y > h + 20) d.y = -20;
        }

        if (interactionEnabled && m.inside) {
          const dx = d.x - m.x;
          const dy = d.y - m.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < ir2) {
            const dist = Math.sqrt(dist2) || 1;
            const falloff = 1 - dist / ir;
            const dirx = dx / dist;
            const diry = dy / dist;
            const sign = interaction === 'repel' ? 1 : -1;
            const push = sign * falloff * falloff * strength;
            d.x += dirx * push;
            d.y += diry * push;
          }
        }
      }

      // Constellation Links
      const maxD = Math.max(20, linkDistance);
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 1;

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const d = Math.sqrt(d2);
            const lineAlpha = (1 - d / maxD) * 0.5 * opacity * alphaBoost;
            ctx.strokeStyle = toRgba(lineColor, clamp(lineAlpha, 0, 1));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Orbital Dots
      for (const d of dots) {
        const pulse = 0.8 + 0.2 * Math.sin(t * 2 + d.phase);
        const r = Math.max(0.6, dotSize * pulse);
        const dotAlpha = 0.95 * opacity * alphaBoost;
        ctx.fillStyle = toRgba(dotColor, clamp(dotAlpha, 0, 1));
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (tracking === 'global') {
        window.removeEventListener('pointermove', onWindowPointerMove);
      }
    };
  }, [
    mode,
    interaction,
    tracking,
    density,
    speed,
    dotSize,
    linkDistance,
    background,
    dotColor,
    lineColor,
    opacity,
    alpha,
    interactionRadius,
    interactionStrength,
    cursorEase,
  ]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (tracking !== 'local') return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const m = mouseRef.current;
    m.targetX = e.clientX - r.left;
    m.targetY = e.clientY - r.top;
    m.inside = true;
  };

  const onPointerLeave = () => {
    if (tracking !== 'local') return;
    mouseRef.current.inside = false;
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={tracking === 'local' ? onPointerMove : undefined}
      onPointerLeave={tracking === 'local' ? onPointerLeave : undefined}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
export default DotOrbit;
