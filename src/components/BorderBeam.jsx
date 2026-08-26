import React from 'react';

const BorderBeam = ({
  size = 120,
  duration = 8,
  anchor = 90,
  colorFrom = "#6366f1",
  colorTo = "#a855f7",
  delay = 0,
}) => {
  return (
    <div
      style={{
        "--size": `${size}px`,
        "--duration": `${duration}s`,
        "--anchor": `${anchor}%`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `${delay}s`,
      }}
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
    >
      <div className="absolute aspect-square w-[var(--size)] animate-border-beam bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent offset-anchor-[var(--anchor)] offset-path-[rect(0_auto_auto_0_round_inherit)] opacity-75" />
    </div>
  );
};

export default BorderBeam;
