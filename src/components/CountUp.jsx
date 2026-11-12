import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({ to, end, value, duration = 1.2, suffix = "" }) => {
  const rawTarget = to ?? end ?? value;
  const target = typeof rawTarget === 'number' ? rawTarget : parseFloat(rawTarget);
  const isValidNumber = !isNaN(target);
  const finalValue = isValidNumber ? target : 0;
  const isInteger = Number.isInteger(finalValue);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(finalValue);

  useEffect(() => {
    if (!isInView || !isValidNumber || finalValue === 0) {
      setCount(finalValue);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Smooth ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * finalValue;

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(finalValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, finalValue, duration, isValidNumber]);

  const displayValue = isInteger ? Math.round(count) : count.toFixed(1);

  return (
    <span ref={ref} className="font-mono font-extrabold">
      {displayValue}{suffix}
    </span>
  );
};

export default CountUp;
