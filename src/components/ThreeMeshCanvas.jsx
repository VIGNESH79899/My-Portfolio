import React, { useEffect, useRef } from 'react';

const ThreeMeshCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse inertia tracking
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create 3D grid points (Apple / Linear style wave mesh)
    const rows = 22;
    const cols = 30;
    const spacing = 42;
    let time = 0;

    const render = () => {
      time += 0.025;

      // Smooth inertia lerp for mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      const mouseNormX = (currentMouseX / width - 0.5) * 2;
      const mouseNormY = (currentMouseY / height - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);

      const startX = width / 2 - (cols * spacing) / 2;
      const startY = height / 2 - (rows * spacing) / 2 + 60;

      ctx.lineWidth = 0.9;

      // Render Horizontal Waves
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacing;
          const y = startY + r * spacing;

          const distToMouse = Math.sqrt(
            Math.pow(x - currentMouseX, 2) + Math.pow(y - currentMouseY, 2)
          );
          const mouseEffect = Math.max(0, 1 - distToMouse / 300) * 40;
          const wave = Math.sin(time + c * 0.22 + r * 0.22) * 14 + mouseEffect;

          const projX = x + mouseNormX * (r - rows / 2) * 2.2;
          const projY = y - wave + mouseNormY * (c - cols / 2) * 2.2;

          if (c === 0) {
            ctx.moveTo(projX, projY);
          } else {
            ctx.lineTo(projX, projY);
          }

          // Draw Glowing Nodes at intersections near mouse
          if (distToMouse < 220) {
            ctx.fillStyle = `rgba(119, 124, 98, ${0.4 - distToMouse / 550})`;
            ctx.beginPath();
            ctx.arc(projX, projY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.strokeStyle = `rgba(119, 124, 98, ${0.07 + (r / rows) * 0.12})`;
        ctx.stroke();
      }

      // Vertical Lines
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const x = startX + c * spacing;
          const y = startY + r * spacing;

          const distToMouse = Math.sqrt(
            Math.pow(x - currentMouseX, 2) + Math.pow(y - currentMouseY, 2)
          );
          const mouseEffect = Math.max(0, 1 - distToMouse / 300) * 40;
          const wave = Math.sin(time + c * 0.22 + r * 0.22) * 14 + mouseEffect;

          const projX = x + mouseNormX * (r - rows / 2) * 2.2;
          const projY = y - wave + mouseNormY * (c - cols / 2) * 2.2;

          if (r === 0) {
            ctx.moveTo(projX, projY);
          } else {
            ctx.lineTo(projX, projY);
          }
        }
        ctx.strokeStyle = `rgba(140, 114, 88, 0.06)`;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
};

export default ThreeMeshCanvas;

