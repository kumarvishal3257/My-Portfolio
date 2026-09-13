import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiAmazonaws,
  SiGit,
  SiJest,
  SiJira,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { BsBroadcast } from "react-icons/bs";
import { TbApi } from "react-icons/tb";
import {
  HiOutlineCheckCircle,
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineLightningBolt,
  HiOutlineOfficeBuilding,
  HiOutlineShieldCheck,
  HiOutlineTemplate,
  HiOutlineTrendingDown,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { MdOutlineLayers } from "react-icons/md";
import { experience } from "../../data/content";
import FadeIn from "../FadeIn";

const TECH = [
  "Java Spring Boot",
  "Amazon S3",
  "AWS ECS",
  "REST APIs",
  "Next.js",
  "Node.js",
  "WebSockets",
  "Zustand",
  "React",
  "Jest",
  "Jira",
  "Git",
].sort((a, b) => b.length - a.length);

const TECH_PATTERN = new RegExp(
  `(${TECH.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

const TECH_ICONS = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  "Node.js": SiNodedotjs,
  AWS: SiAmazonaws,
  WebSockets: BsBroadcast,
  Zustand: HiOutlineCube,
  "REST APIs": TbApi,
  Jira: SiJira,
  Git: SiGit,
  Jest: SiJest,
  Agile: HiOutlineTemplate,
};

const IMPACT_ICONS = {
  "Faster dashboard load time": HiOutlineLightningBolt,
  "Jest test coverage": HiOutlineCheckCircle,
  "Full-stack platform": MdOutlineLayers,
  "Reduced manual effort": HiOutlineTrendingDown,
  "Higher development efficiency": HiOutlineTrendingUp,
  "Unit test coverage": HiOutlineShieldCheck,
};

function emphasize(text) {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  text.replace(TECH_PATTERN, (match, _group, offset) => {
    if (offset > lastIndex) {
      nodes.push(text.slice(lastIndex, offset));
    }
    nodes.push(
      <span className="tech-mark" key={`t-${key++}`}>
        {match}
      </span>
    );
    lastIndex = offset + match.length;
    return match;
  });
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function Work() {
  const reduce = useReducedMotion();

  return (
    <section className="section work-section" id="work">
      <div className="work-wrap">
        <FadeIn>
          <h2 className="section-title">Work</h2>
        </FadeIn>

        <ol className="work-timeline">
          {experience.map((job, index) => {
            const CompanyIcon = job.current ? HiOutlineChip : HiOutlineOfficeBuilding;
            return (
              <motion.li
                key={job.company}
                className={`work-card ${job.current ? "is-current" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="work-marker" aria-hidden="true" />
                <article className="work-card-inner">
                  <div className="work-main">
                    {job.current && <p className="work-label">Current</p>}
                    <div className="work-heading">
                      <span className="work-company-icon" aria-hidden="true">
                        <CompanyIcon />
                      </span>
                      <div>
                        <h3 className="work-role">{job.role}</h3>
                        <p className="work-company">{job.company}</p>
                        <p className="work-meta">
                          {job.location}
                          <span aria-hidden="true"> · </span>
                          {job.dates}
                        </p>
                      </div>
                    </div>
                    <ul className="work-points">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{emphasize(bullet)}</li>
                      ))}
                    </ul>
                  </div>

                  <aside className="work-aside">
                    <h4 className="work-aside-title">Key Technologies</h4>
                    <ul className="work-chips">
                      {job.technologies.map((tech) => {
                        const Icon = TECH_ICONS[tech];
                        return (
                          <li key={tech}>
                            {Icon ? <Icon aria-hidden="true" /> : null}
                            <span>{tech}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <h4 className="work-aside-title">Key Impact</h4>
                    <ul className="work-metrics">
                      {job.impact.map((item) => {
                        const Icon = IMPACT_ICONS[item.label];
                        return (
                          <li key={item.label}>
                            {Icon ? (
                              <span className="work-metric-icon" aria-hidden="true">
                                <Icon />
                              </span>
                            ) : null}
                            <div>
                              <strong>{item.value}</strong>
                              <span>{item.label}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default Work;
