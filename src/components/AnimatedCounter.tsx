import React, { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.5,
    delay: 0
  });

  useEffect(() => {
    if (!isVisible) {
      setCurrentValue(0);
      return;
    }

    let startTime: number | null = null;
    const animationFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCurrentValue(Math.floor(targetValue * easeOutQuart));
      
      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      } else {
        setCurrentValue(targetValue);
      }
    };

    const frameId = requestAnimationFrame(animationFrame);
    
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isVisible, targetValue, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{currentValue.toLocaleString()}{suffix}
    </span>
  );
};