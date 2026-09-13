import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { projects } from "../../data/content";
import FadeIn from "../FadeIn";

function Projects() {
  const reduce = useReducedMotion();

  return (
    <section className="section" id="projects">
      <div className="site-wrap">
        <FadeIn>
          <p className="eyebrow">02 — Selected work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-lead">
            Resume projects first, then personal browser work.
          </p>
        </FadeIn>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="project-card"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="project-media">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-placeholder" aria-hidden="true">
                    {project.title}
                  </div>
                )}
              </div>
              <div className="project-body">
                <div className="project-kicker">
                  <span>{project.source}</span>
                  <span>{project.subtitle}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="chip-row" aria-label="Technologies">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.ghLink && (
                    <a
                      href={project.ghLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <BsGithub aria-hidden="true" /> GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <CgWebsite aria-hidden="true" /> Demo
                    </a>
                  )}
                  {!project.ghLink && !project.demoLink && (
                    <span className="project-note">Repository URL not listed</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
