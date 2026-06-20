import React, { useEffect, useState, useRef } from 'react';
import { toPersianNumber } from '../utils/persian';

interface StatCounterProps {
  value: number;
  label: string;
  suffix: string;
  key?: any;
}

export default function StatCounter({ value, label, suffix }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const end = value;
          const isDecimal = !Number.isInteger(value);
          const duration = 1500; // ms
          const stepTime = 16; // ~60fps
          const steps = Math.ceil(duration / stepTime);
          const increment = (end - start) / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            start += increment;
            if (step >= steps) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
            }
          }, stepTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, hasAnimated]);

  // Translate the suffix for Persian if needed
  let persianSuffix = suffix;
  if (suffix === '+') persianSuffix = ' +';
  if (suffix === 'K+') persianSuffix = ' هزار+';
  if (suffix === 'M+') persianSuffix = ' میلیون+';

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center p-6 text-center border-l last:border-l-0 dark:border-neutral-800 border-neutral-200 md:p-8 flex-1"
      id={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F2C94C] tracking-tight flex items-baseline">
        <span>{toPersianNumber(count)}</span>
        <span className="text-xl md:text-2xl text-stone-500 font-medium mr-1">{persianSuffix}</span>
      </div>
      <p className="mt-2 text-xs md:text-sm font-bold dark:text-neutral-300 text-neutral-700 tracking-wider">
        {label}
      </p>
    </div>
  );
}
