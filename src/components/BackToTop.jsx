import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="pill-venom-inactive !w-10 !h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all z-40 !fixed bottom-20 right-4 sm:bottom-24 sm:right-6"
      aria-label="Back to top"
    >
      <FaArrowUp size={14} />
    </button>
  );
};

export default BackToTop;
