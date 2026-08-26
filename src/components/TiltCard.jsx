import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = "", ...props }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8; // Max 8 degree tilt X
    const rY = ((x - centerX) / centerX) * 8;  // Max 8 degree tilt Y

    setRotateX(rX);
    setRotateY(rY);
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden pro-card ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* 3D Dynamic Cursor Reflection Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(450px circle at ${spotlight.x}% ${spotlight.y}%, rgba(99, 102, 241, 0.15), transparent 60%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
};

export default TiltCard;
