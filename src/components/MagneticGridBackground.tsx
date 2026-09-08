'use client';

import React, { useEffect, useRef } from 'react';

export interface MagneticGridProps {
  dotColor?: string;
  activeColor?: string;
  bgColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  influenceRadius?: number;
  attractMode?: boolean;
  maxDisplace?: number;
  springStiffness?: number;
  springDamping?: number;
  mobileCutoff?: number;
  dotOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(color: string): [number, number, number] {
  const c = color.trim();
  if (c.startsWith('#')) {
    const hex = c.replace('#', '');
    const full = hex.length === 3 ? hex.split('').map((ch) => ch + ch).join('') : hex.slice(0, 6);
    const num = parseInt(full || '000000', 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  if (c.startsWith('rgb')) {
    const nums = c.replace(/rgba?\(/, '').replace(')', '').split(',').map((v) => parseFloat(v.trim()));
    return [nums[0] || 0, nums[1] || 0, nums[2] || 0];
  }
  return [255, 255, 255];
}

interface GridDot {
  baseX: number;
  baseY: number;
  currX: number;
  currY: number;
  vx: number;
  vy: number;
  scale: number;
  proximity: number;
}

export const MagneticGridBackground: React.FC<MagneticGridProps> = ({
  dotColor = '#475569',
  activeColor = '#06b6d4',
  bgColor = 'transparent',
  dotSize = 3.5,
  dotSpacing = 30,
  influenceRadius = 140,
  attractMode = false,
  maxDisplace = 14,
  springStiffness = 250,
  springDamping = 22,
  mobileCutoff = 768,
  dotOpacity = 0.45,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: GridDot[] = [];

    const [r1, g1, b1] = hexToRgb(dotColor);
    const [r2, g2, b2] = hexToRgb(activeColor);

    const initDots = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      let effectiveSpacing = dotSpacing;
      const rawCount = Math.ceil(width / dotSpacing) * Math.ceil(height / dotSpacing);
      if (rawCount > 1000) {
        effectiveSpacing = Math.ceil(Math.sqrt((width * height) / 1000));
      }

      const cols = Math.floor(width / effectiveSpacing);
      const rows = Math.floor(height / effectiveSpacing);
      const offsetX = (width - cols * effectiveSpacing) / 2;
      const offsetY = (height - rows * effectiveSpacing) / 2;

      dots = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const bx = offsetX + c * effectiveSpacing;
          const by = offsetY + r * effectiveSpacing;
          dots.push({
            baseX: bx,
            baseY: by,
            currX: 0,
            currY: 0,
            vx: 0,
            vy: 0,
            scale: 1,
            proximity: 0,
          });
        }
      }
    };

    const ro = new ResizeObserver(initDots);
    ro.observe(container);
    initDots();

    // Track mouse globally across entire viewport so hover over cards still reacts
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      cursorRef.current.x = e.clientX - rect.left;
      cursorRef.current.y = e.clientY - rect.top;
      cursorRef.current.active = true;
    };

    const handlePointerLeave = () => {
      cursorRef.current.x = -9999;
      cursorRef.current.y = -9999;
      cursorRef.current.active = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    let lastTime = performance.now();

    const animate = (time: number) => {
      rafRef.current = requestAnimationFrame(animate);

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      if (bgColor && bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      }

      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;
      const isMobile = window.innerWidth < mobileCutoff;

      // Physics spring simulation parameters
      const k = springStiffness;
      const d = springDamping;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        let targetDx = 0;
        let targetDy = 0;
        let proximity = 0;

        if (!isMobile) {
          const dx = dot.baseX - cx;
          const dy = dot.baseY - cy;
          const dist = Math.hypot(dx, dy);

          proximity = Math.max(0, 1 - dist / influenceRadius);

          if (proximity > 0 && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const dir = attractMode ? -1 : 1;
            targetDx = dir * nx * proximity * maxDisplace;
            targetDy = dir * ny * proximity * maxDisplace;
          }
        }

        // Spring integration: F = -k*(x - target) - d*v
        const fx = -k * (dot.currX - targetDx) - d * dot.vx;
        const fy = -k * (dot.currY - targetDy) - d * dot.vy;

        dot.vx += fx * dt;
        dot.vy += fy * dt;
        dot.currX += dot.vx * dt;
        dot.currY += dot.vy * dt;

        // Smooth scale and color interpolation based on proximity
        dot.scale += ((1 + proximity * 1.2) - dot.scale) * 0.2;
        dot.proximity = proximity;

        const x = dot.baseX + dot.currX;
        const y = dot.baseY + dot.currY;
        const radius = Math.max(0.5, (dotSize / 2) * dot.scale);

        // Interpolate color between dotColor and activeColor
        const r = Math.round(r1 + (r2 - r1) * proximity);
        const g = Math.round(g1 + (g2 - g1) * proximity);
        const b = Math.round(b1 + (b2 - b1) * proximity);
        const currentAlpha = Math.min(1, dotOpacity + proximity * 0.45);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    dotColor,
    activeColor,
    bgColor,
    dotSize,
    dotSpacing,
    influenceRadius,
    attractMode,
    maxDisplace,
    springStiffness,
    springDamping,
    mobileCutoff,
    dotOpacity,
  ]);

  return (
    <div
      ref={containerRef}
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

export default MagneticGridBackground;
