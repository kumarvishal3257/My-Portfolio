import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function FadeIn({ children, className = "", delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export default FadeIn;
