import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import {
  SiAxios,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { projects } from "../../data/content";
import FadeIn from "../FadeIn";
import TiltCard from "../TiltCard";

const TECH_ICONS = {
  React: SiReact,
  Vite: SiVite,
  "Tailwind CSS": SiTailwindcss,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  Axios: SiAxios,
};

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
      />
    );
  }

  const Primary = TECH_ICONS[project.stack[0]] || SiJavascript;
  return (
    <div className="project-abstract" aria-hidden="true">
      <span className="project-abstract-orb" />
      <span className="project-abstract-grid" />
      <Primary />
    </div>
  );
}

function ProjectCard({ project }) {
  const featured = Boolean(project.featured);

  return (
    <TiltCard
      className={`project-card${project.demoLink ? " is-live" : ""}${
        featured ? " is-featured" : " is-secondary"
      }`}
    >
      <div className="project-media">
        <ProjectVisual project={project} />
      </div>
      <div className="project-body">
        <div className="project-kicker">
          {featured && <span className="featured-badge">Featured</span>}
          {project.demoLink ? (
            <span className="live-badge">
              <span className="live-dot" aria-hidden="true" />
              Live
            </span>
          ) : (
            <span>Source</span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <ul className="chip-row" aria-label="Technologies">
          {project.stack.map((item) => {
            const Icon = TECH_ICONS[item];
            return (
              <li key={item}>
                {Icon ? <Icon aria-hidden="true" /> : null}
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        <div className="project-links">
          {project.demoLink && (
            <a
              className="project-link-primary"
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
            >
              <CgWebsite aria-hidden="true" /> Live Demo
            </a>
          )}
          {project.ghLink && (
            <a
              href={project.ghLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
            >
              <BsGithub aria-hidden="true" /> GitHub
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

function Projects() {
  const reduce = useReducedMotion();

  return (
    <section className="section" id="projects">
      <div className="site-wrap">
        <FadeIn>
          <h2 className="section-title">Projects</h2>
          <p className="section-lead">
            Selected GitHub work with verified live demos.
          </p>
        </FadeIn>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className={project.featured ? "project-feature" : "project-secondary"}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
