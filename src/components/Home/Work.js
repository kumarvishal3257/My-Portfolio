import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../../data/content";
import FadeIn from "../FadeIn";

function Work() {
  const reduce = useReducedMotion();

  return (
    <section className="section" id="work">
      <div className="site-wrap">
        <FadeIn>
          <p className="eyebrow">01 — Experience</p>
          <h2 className="section-title">Work</h2>
        </FadeIn>

        <ol className="timeline">
          {experience.map((job, index) => (
            <motion.li
              key={job.company}
              className="timeline-item"
              initial={reduce ? false : { opacity: 0, x: -18 }}
              whileInView={reduce ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="timeline-meta">
                <p className="timeline-dates">{job.dates}</p>
                <p className="timeline-place">
                  {job.location} · {job.duration}
                </p>
              </div>
              <div className="timeline-body">
                <h3>
                  {job.role}
                  <span> {job.company}</span>
                </h3>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Work;
