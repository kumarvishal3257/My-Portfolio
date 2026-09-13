import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  };

  const onMove = (event) => {
    if (reduce || (typeof window.matchMedia === "function" && window.matchMedia("(hover: none)").matches)) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-6px)`;
  };

  return (
    <div className="tilt-wrap">
      <div
        ref={ref}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
      </div>
    </div>
  );
}

export default TiltCard;
