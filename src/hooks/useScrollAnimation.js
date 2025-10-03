import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    stagger = false,
    staggerDelay = 100
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);
          
          // Handle staggered animations for child elements
          if (stagger && ref.current) {
            const children = ref.current.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              child.style.transitionDelay = `${index * staggerDelay}ms`;
              child.classList.add('animate-in');
            });
          }
          
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!entry.isIntersecting && !triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
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
  }, [threshold, rootMargin, triggerOnce, stagger, staggerDelay, hasTriggered]);

  return [ref, isVisible];
};

// Hook for multiple elements with staggered animations
export const useStaggeredScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 100
  } = options;

  const [visibleItems, setVisibleItems] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, index]));
              }, index * staggerDelay);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [threshold, rootMargin, staggerDelay]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  const isVisible = (index) => visibleItems.has(index);

  return { setRef, isVisible };
};
