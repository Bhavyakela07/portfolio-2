'use client';

import React, { useMemo } from 'react';

export interface GradientBarsProps {
  numBars?: number;
  barWidth?: number;
  barHeight?: number;
  barDirection?: 'Y Axis' | 'X Axis';
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  animationEnabled?: boolean;
  animationMode?: 'Pulse' | 'Float' | 'Wave' | 'None';
  animationIntensity?: number;
  stagger?: number;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GradientBarsBackground: React.FC<GradientBarsProps> = ({
  numBars = 24,
  barWidth = 6,
  barHeight = 420,
  barDirection = 'Y Axis',
  gradientFrom = '#7C3AED',
  gradientTo = '#06B6D4',
  animationDuration = 5,
  animationEnabled = true,
  animationMode = 'Float',
  animationIntensity = 60,
  stagger = 0.08,
  backgroundColor = 'transparent',
  className = '',
  style,
}) => {
  const bars = useMemo(() => {
    const safeCount = Math.max(1, Math.floor(numBars));
    const safeBarWidth = Math.max(1, Math.min(1000, barWidth));
    const safeBarHeight = Math.max(1, Math.min(1000, barHeight));
    const clampedIntensity = Math.max(0, Math.min(100, animationIntensity));
    const intensityFactor = clampedIntensity / 100;

    const shouldAnimate = animationEnabled && animationMode !== 'None';
    const isYAxis = barDirection === 'Y Axis';
    const translatePercent = 4 + intensityFactor * 26;
    const pulseScale = 1 + intensityFactor * 0.35;
    const minOpacity = 0.15 + (1 - intensityFactor) * 0.35;
    const maxOpacity = Math.min(1, 0.35 + intensityFactor * 0.65);

    const keyframeName = isYAxis
      ? animationMode === 'Pulse'
        ? 'framerGradientBarsPulseY'
        : animationMode === 'Wave'
        ? 'framerGradientBarsWaveY'
        : 'framerGradientBarsFloatY'
      : animationMode === 'Pulse'
      ? 'framerGradientBarsPulseX'
      : animationMode === 'Wave'
      ? 'framerGradientBarsWaveX'
      : 'framerGradientBarsFloatX';

    return Array.from({ length: safeCount }, (_, index) => {
      const delay = stagger * index;
      const baseOpacity = 0.25 + (index / safeCount) * 0.5;

      return (
        <div
          key={`bar-${index}`}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: isYAxis ? `${safeBarWidth}px` : `${safeBarHeight}px`,
            minWidth: isYAxis ? `${safeBarWidth}px` : undefined,
            minHeight: isYAxis ? undefined : `${safeBarHeight}px`,
            height: isYAxis ? `min(100%, ${safeBarHeight}px)` : `${safeBarHeight}px`,
            width: isYAxis ? `${safeBarWidth}px` : `min(100%, ${safeBarWidth}px)`,
            background: `linear-gradient(${isYAxis ? '180deg' : '90deg'}, ${gradientFrom}, ${gradientTo})`,
            borderRadius: '9999px',
            opacity: shouldAnimate ? baseOpacity : (minOpacity + maxOpacity) / 2,
            transformOrigin: 'center center',
            animationName: shouldAnimate ? keyframeName : 'none',
            animationDuration: shouldAnimate ? `${animationDuration}s` : undefined,
            animationDelay: shouldAnimate ? `${delay}s` : undefined,
            animationIterationCount: shouldAnimate ? 'infinite' : undefined,
            animationTimingFunction: shouldAnimate ? 'ease-in-out' : undefined,
            animationPlayState: shouldAnimate ? 'running' : 'paused',
            willChange: shouldAnimate ? 'transform, opacity' : undefined,
            ['--gb-translate' as string]: `${translatePercent}%`,
            ['--gb-pulse-scale' as string]: `${pulseScale}`,
            ['--gb-min-opacity' as string]: `${minOpacity}`,
            ['--gb-max-opacity' as string]: `${maxOpacity}`,
          }}
        />
      );
    });
  }, [
    numBars,
    barWidth,
    barHeight,
    barDirection,
    gradientFrom,
    gradientTo,
    animationDuration,
    animationEnabled,
    animationMode,
    animationIntensity,
    stagger,
  ]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <style>{`
        @keyframes framerGradientBarsFloatY {
          0% { transform: translateY(var(--gb-translate)); opacity: var(--gb-min-opacity); }
          50% { transform: translateY(calc(var(--gb-translate) * -1)); opacity: var(--gb-max-opacity); }
          100% { transform: translateY(var(--gb-translate)); opacity: var(--gb-min-opacity); }
        }
        @keyframes framerGradientBarsPulseY {
          0% { transform: scaleY(1); opacity: var(--gb-min-opacity); }
          50% { transform: scaleY(var(--gb-pulse-scale)); opacity: var(--gb-max-opacity); }
          100% { transform: scaleY(1); opacity: var(--gb-min-opacity); }
        }
        @keyframes framerGradientBarsWaveY {
          0% { transform: translateY(var(--gb-translate)) scaleY(1); opacity: var(--gb-min-opacity); }
          50% { transform: translateY(calc(var(--gb-translate) * -1)) scaleY(var(--gb-pulse-scale)); opacity: var(--gb-max-opacity); }
          100% { transform: translateY(var(--gb-translate)) scaleY(1); opacity: var(--gb-min-opacity); }
        }
        @keyframes framerGradientBarsFloatX {
          0% { transform: translateX(var(--gb-translate)); opacity: var(--gb-min-opacity); }
          50% { transform: translateX(calc(var(--gb-translate) * -1)); opacity: var(--gb-max-opacity); }
          100% { transform: translateX(var(--gb-translate)); opacity: var(--gb-min-opacity); }
        }
        @keyframes framerGradientBarsPulseX {
          0% { transform: scaleX(1); opacity: var(--gb-min-opacity); }
          50% { transform: scaleX(var(--gb-pulse-scale)); opacity: var(--gb-max-opacity); }
          100% { transform: scaleX(1); opacity: var(--gb-min-opacity); }
        }
        @keyframes framerGradientBarsWaveX {
          0% { transform: translateX(var(--gb-translate)) scaleX(1); opacity: var(--gb-min-opacity); }
          50% { transform: translateX(calc(var(--gb-translate) * -1)) scaleX(var(--gb-pulse-scale)); opacity: var(--gb-max-opacity); }
          100% { transform: translateX(var(--gb-translate)) scaleX(1); opacity: var(--gb-min-opacity); }
        }
      `}</style>

      {/* Floating Animated Gradient Bars */}
      <div
        aria-hidden={true}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: barDirection === 'Y Axis' ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '24px',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {bars}
      </div>

      {/* Subtle Ambient Radial Overlay to soft-blend with page content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(12, 12, 12, 0.75) 100%)',
        }}
      />
    </div>
  );
};

export default GradientBarsBackground;
