import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CountUp = ({ to, duration = 1.5, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const numericTo = parseFloat(to);
    if (isNaN(numericTo)) return;

    const totalSteps = 40;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = numericTo / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTo) {
        setCount(numericTo);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  const formatted = Number.isInteger(parseFloat(to))
    ? Math.round(count)
    : count.toFixed(1);

  return (
    <span ref={ref} className="font-mono font-extrabold">
      {formatted}{suffix}
    </span>
  );
};

export default CountUp;
