import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";

function MagneticLink({ href, className, children, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const onMove = (event) => {
    if (reduce || (typeof window.matchMedia === "function" && window.matchMedia("(hover: none)").matches)) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...props}
    >
      {children}
    </a>
  );
}

export default MagneticLink;
