import React from "react";
import {
  SiAmazonaws,
  SiCss3,
  SiDocker,
  SiGit,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJira,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSonar,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { BsBroadcast } from "react-icons/bs";
import { TbApi } from "react-icons/tb";
import {
  HiOutlineCheckCircle,
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineLightningBolt,
  HiOutlineServer,
  HiOutlineTemplate,
} from "react-icons/hi";
import { MdDevices, MdLoop, MdSpeed, MdViewList, MdWeb } from "react-icons/md";
import { skills } from "../../data/content";
import FadeIn from "../FadeIn";

const GROUPS = [
  { key: "frontend", title: "Frontend", Icon: HiOutlineChip, items: skills.frontend },
  { key: "backend", title: "Backend", Icon: HiOutlineServer, items: skills.backend },
  { key: "cloud", title: "Cloud & DevOps", Icon: SiAmazonaws, items: skills.cloud },
  { key: "performance", title: "Performance & Engineering", Icon: MdSpeed, items: skills.performance },
  { key: "testing", title: "Testing & Quality", Icon: HiOutlineCheckCircle, items: skills.testing },
  { key: "tools", title: "Tools", Icon: HiOutlineTemplate, items: skills.tools },
];

const SKILL_ICONS = {
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "JavaScript (ES6+)": SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  "Tailwind CSS": SiTailwindcss,
  "Redux/Zustand": SiRedux,
  Zustand: HiOutlineCube,
  "Responsive Design": MdDevices,
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  "REST API Design": TbApi,
  "Node.js": SiNodedotjs,
  Microservices: HiOutlineCollection,
  WebSockets: BsBroadcast,
  "AWS (ECS, S3, EC2)": SiAmazonaws,
  "CI/CD": MdLoop,
  Git: SiGit,
  GitLab: SiGitlab,
  Jenkins: SiJenkins,
  Docker: SiDocker,
  "React Performance Optimization": SiReact,
  Memoization: HiOutlineLightningBolt,
  Virtualization: MdViewList,
  "SSR/CSR": MdWeb,
  "Lazy Loading": HiOutlineCode,
  Jest: SiJest,
  "Unit Testing": HiOutlineCheckCircle,
  SonarQube: SiSonar,
  "Code Reviews": HiOutlineTemplate,
  Jira: SiJira,
  Postman: SiPostman,
};

const CORE_ITEMS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Java",
  "Spring Boot",
  "Node.js",
  "AWS (ECS, S3, EC2)",
  "Jest",
  "Redux/Zustand",
];

function SkillChip({ item, emphasize = false }) {
  const Icon = SKILL_ICONS[item];
  return (
    <li className={emphasize ? "is-core" : undefined}>
      {Icon ? <Icon aria-hidden="true" /> : null}
      <span>{item}</span>
    </li>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="site-wrap">
        <FadeIn className="skills-intro">
          <p className="section-eyebrow">Technical Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-lead">
            Tools and technologies I use to build scalable, reliable web applications.
          </p>
        </FadeIn>

        <div className="skills-board">
          <FadeIn className="skill-core">
            <h3>Core stack</h3>
            <ul className="skill-chips">
              {CORE_ITEMS.map((item) => (
                <SkillChip key={item} item={item} emphasize />
              ))}
            </ul>
          </FadeIn>

          <div className="skills-grid">
            {GROUPS.map((group, index) => (
              <FadeIn key={group.key} className="skill-card" delay={0.04 + index * 0.04}>
                <h3>
                  <group.Icon aria-hidden="true" />
                  {group.title}
                </h3>
                <ul className="skill-chips">
                  {group.items.map((item) => (
                    <SkillChip key={item} item={item} />
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
