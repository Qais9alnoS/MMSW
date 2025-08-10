import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'top' | 'bottom' | 'left' | 'right';
  easing?: string;
  scale?: number;
  rotate?: number;
  opacity?: number;
  reset?: boolean;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    duration = 600,
    distance = '50px',
    origin = 'bottom',
    easing = 'ease-out',
    scale = 1,
    rotate = 0,
    opacity = 0,
    reset = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        } else if (reset) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, delay, reset]);

  const getStyles = () => {
    const transforms = {
      top: `translateY(-${distance})`,
      bottom: `translateY(${distance})`,
      left: `translateX(-${distance})`,
      right: `translateX(${distance})`,
    };
    
    const initialTransform = [];
    const finalTransform = [];
    
    // Add translation based on origin
    initialTransform.push(transforms[origin]);
    finalTransform.push('translateY(0) translateX(0)');
    
    // Add scale if not 1
    if (scale !== 1) {
      initialTransform.push(`scale(${scale})`);
      finalTransform.push('scale(1)');
    }
    
    // Add rotation if not 0
    if (rotate !== 0) {
      initialTransform.push(`rotate(${rotate}deg)`);
      finalTransform.push('rotate(0deg)');
    }

    return {
      opacity: isVisible ? 1 : (opacity !== undefined ? opacity : 0),
      transform: isVisible ? finalTransform.join(' ') : initialTransform.join(' '),
      transition: `all ${duration}ms ${easing}`,
    };
  };

  return { ref, isVisible, getStyles };
};