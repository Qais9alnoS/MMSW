import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  scale?: number;
  rotate?: number;
  opacity?: number;
  reset?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 600,
  distance = '50px',
  origin = 'bottom',
  threshold = 0.1,
  easing = 'ease-out',
  scale = 1,
  rotate = 0,
  opacity = 0,
  reset = false,
}) => {
  const { ref, getStyles } = useScrollReveal({
    delay,
    duration,
    distance,
    origin,
    threshold,
    easing,
    scale,
    rotate,
    opacity,
    reset,
  });

  return (
    <div ref={ref} className={className} style={getStyles()}>
      {children}
    </div>
  );
};

export default ScrollReveal;