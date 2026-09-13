import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "../data/content";

function TypeCycle() {
  const reduce = useReducedMotion();
  const titles = site.roles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(titles[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const full = titles[index];
    let wait = deleting ? 28 : 52;
    if (!deleting && text === full) wait = 1500;
    if (deleting && text === "") wait = 240;

    const timer = window.setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((value) => (value + 1) % titles.length);
        return;
      }
      const nextLength = deleting ? text.length - 1 : text.length + 1;
      setText(full.slice(0, nextLength));
    }, wait);

    return () => window.clearTimeout(timer);
  }, [deleting, index, reduce, text, titles]);

  if (reduce) {
    return <span>{site.title}</span>;
  }

  return (
    <span className="type-cycle">
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
}

export default TypeCycle;
