import { knowledge, UNKNOWN_REPLY } from "./portfolioKnowledge";

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function hasWord(text, word) {
  return new RegExp(`(?:^|\\s)${word}(?:\\s|$)`).test(text);
}

function flatSkills() {
  return Object.values(knowledge.skills).flat();
}

const KNOWN_TECH = new Set(
  [
    ...flatSkills(),
    ...knowledge.projects.flatMap((project) => project.stack),
    "React",
    "Next",
    "Spring",
    "REST",
    "API",
    "Zustand",
    "HTML5",
    "ES6",
  ]
    .map((item) => normalize(item).replace(/\.js$/, ""))
    .filter(Boolean)
);

const UNKNOWN_TECH = [
  "python",
  "angular",
  "vue",
  "php",
  "kotlin",
  "swift",
  "golang",
  "ruby",
  "mongodb",
  "express",
];

function mentionsUnverifiedTech(query) {
  return UNKNOWN_TECH.some((term) => hasWord(query, term) || query.includes(term));
}

function currentRole() {
  return knowledge.experience.find((job) => job.current) || knowledge.experience[0];
}

function jobBlock(job) {
  const status = job.current ? "Current role" : "Previous role";
  return [
    `${status}: ${job.role} at ${job.company}, ${job.location}, ${job.dates}.`,
    job.bullets.map((item) => `• ${item}`).join("\n"),
  ].join("\n");
}

function experienceAnswer() {
  return {
    text: [
      `${knowledge.name} has ${knowledge.years} of experience.`,
      ...knowledge.experience.map(jobBlock),
    ].join("\n\n"),
    links: [],
  };
}

function currentAnswer() {
  const job = currentRole();
  return {
    text: [
      `${knowledge.name} currently works as ${job.role} at ${job.company} in ${job.location} (${job.dates}).`,
      knowledge.summary,
    ].join("\n\n"),
    links: [],
  };
}

function companyAnswer(name) {
  const job = knowledge.experience.find(
    (item) => normalize(item.company).includes(normalize(name))
  );
  if (!job) return { text: UNKNOWN_REPLY, links: [] };
  return { text: jobBlock(job), links: [] };
}

function skillsAnswer() {
  return {
    text: [
      `Frontend: ${knowledge.skills.frontend.join(", ")}.`,
      `Backend: ${knowledge.skills.backend.join(", ")}.`,
      `Cloud & DevOps: ${knowledge.skills.cloud.join(", ")}.`,
      `Performance: ${knowledge.skills.performance.join(", ")}.`,
      `Testing: ${knowledge.skills.testing.join(", ")}.`,
      `Tools: ${knowledge.skills.tools.join(", ")}.`,
    ].join("\n\n"),
    links: [],
  };
}

function frontendAnswer() {
  return {
    text: `${knowledge.name} uses these frontend technologies: ${knowledge.skills.frontend.join(", ")}.`,
    links: [],
  };
}

function backendAnswer() {
  return {
    text: `${knowledge.name} has backend experience with ${knowledge.skills.backend.join(", ")}. At Infosys he maintained and debugged Java Spring Boot REST endpoints. At Tulip Technology Solutions he works across frontend, backend and API integration, including Java Spring Boot and Node.js.`,
    links: [],
  };
}

function projectLines(project) {
  const links = [];
  if (project.ghLink) {
    links.push({ label: `${project.title} GitHub`, href: project.ghLink });
  }
  if (project.demoLink) {
    links.push({ label: `${project.title} live demo`, href: project.demoLink });
  }
  const linkNote =
    project.ghLink || project.demoLink
      ? ""
      : " A repository URL is not listed in the resume or portfolio.";
  const liveNote = project.demoLink ? " Live demo is available." : "";
  const highlightNote =
    project.highlights && project.highlights.length
      ? ` Highlights: ${project.highlights.join("; ")}.`
      : "";
  return {
    text: `${project.title}: ${project.description} Stack: ${project.stack.join(", ")}.${highlightNote}${liveNote}${linkNote}`,
    links,
  };
}

function projectsAnswer(specific) {
  const list = specific ? [specific] : knowledge.projects;
  const parts = list.map((project) => projectLines(project));
  return {
    text: parts.map((part) => part.text).join("\n\n"),
    links: parts.flatMap((part) => part.links),
  };
}

function contactAnswer() {
  const socialLines = knowledge.socials
    .map((social) => `${social.name}: ${social.href}`)
    .join("\n");
  return {
    text: [
      `You can contact ${knowledge.name} using these verified details:`,
      `Email: ${knowledge.email}`,
      `Phone: ${knowledge.phone}`,
      socialLines,
      `Resume: download the PDF on this site, or open the online copy.`,
    ].join("\n"),
    links: [
      { label: "Email", href: `mailto:${knowledge.email}` },
      { label: "Phone", href: knowledge.phoneHref },
      ...knowledge.socials.map((social) => ({
        label: social.name,
        href: social.href,
      })),
      { label: "Resume PDF", href: knowledge.resumePdf },
      { label: "Online resume", href: knowledge.resumeDrive },
    ],
  };
}

function aboutAnswer() {
  const job = currentRole();
  return {
    text: [
      `${knowledge.name} is a ${knowledge.role} based in ${knowledge.location}, currently ${job.role} at ${job.company}.`,
      knowledge.summary,
      `Education: ${knowledge.education.degree} from ${knowledge.education.school}, ${knowledge.education.place}, ${knowledge.education.dates}. ${knowledge.education.gpa}.`,
      `Outside of work: ${knowledge.interests.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
    ].join("\n\n"),
    links: [],
  };
}

function educationAnswer() {
  const { degree, school, place, dates, gpa } = knowledge.education;
  return {
    text: `${knowledge.name} completed ${degree} at ${school}, ${place}, ${dates}, with ${gpa}.`,
    links: [],
  };
}

function locationAnswer() {
  const job = currentRole();
  return {
    text: `${knowledge.name} is from ${knowledge.location}. His current role at ${job.company} is in ${job.location}. The Infosys role was in Bhubaneshwar, Orissa.`,
    links: [],
  };
}

function resumeAnswer() {
  return {
    text: `Vishal's resume is available as a PDF download on this site and as an online copy on Google Drive.`,
    links: [
      { label: "Download resume", href: knowledge.resumePdf },
      { label: "Online resume", href: knowledge.resumeDrive },
    ],
  };
}

function findProject(query) {
  return knowledge.projects.find((project) => {
    const title = normalize(project.title);
    if (query.includes(title)) return true;
    if (title.includes("github") && includesAny(query, ["github profile", "profile viewer"])) {
      return true;
    }
    if (title.includes("currency") && includesAny(query, ["currency", "convertor", "converter"])) {
      return true;
    }
    return false;
  });
}

const BLOCKED = [
  "salary",
  "ctc",
  "award",
  "awards",
  "client",
  "clients",
  "married",
  "age",
  "birthday",
  "religion",
];

export function getAssistantReply(rawQuery) {
  const query = normalize(rawQuery || "");
  if (!query) {
    return { text: UNKNOWN_REPLY, links: [] };
  }

  if (includesAny(query, BLOCKED) || mentionsUnverifiedTech(query)) {
    return { text: UNKNOWN_REPLY, links: [] };
  }

  if (
    includesAny(query, [
      "current job",
      "currently work",
      "current employer",
      "current role",
      "work now",
      "where does vishal currently",
      "tulip",
    ])
  ) {
    return currentAnswer();
  }

  if (includesAny(query, ["how many years", "years of experience", "4 years", "4+"])) {
    return {
      text: `The resume describes ${knowledge.name} as a Full-Stack Developer with ${knowledge.years} of experience building scalable, high-performance web applications using React, Next.js, Node.js, and Java Spring Boot.`,
      links: [],
    };
  }

  if (includesAny(query, ["infosys"])) {
    return companyAnswer("Infosys");
  }

  if (hasWord(query, "java") || includesAny(query, ["spring boot", "spring"])) {
    return backendAnswer();
  }

  if (hasWord(query, "aws") || includesAny(query, ["ecs", "s3", "ec2"])) {
    return {
      text: `${knowledge.name} uses AWS. Verified cloud and DevOps skills include ${knowledge.skills.cloud.join(", ")}. At Tulip Technology Solutions he deployed backend services on AWS ECS and integrated Amazon S3 for file and attachment storage.`,
      links: [],
    };
  }

  if (includesAny(query, ["backend"])) {
    return backendAnswer();
  }

  if (includesAny(query, ["frontend"])) {
    return frontendAnswer();
  }

  const project = findProject(query);
  if (project) {
    return projectsAnswer(project);
  }

  if (
    includesAny(query, ["contact", "email", "phone", "linkedin", "instagram", "reach", "hire"]) ||
    (includesAny(query, ["github"]) && !includesAny(query, ["project", "viewer", "built"]))
  ) {
    return contactAnswer();
  }

  if (includesAny(query, ["resume", "cv", "curriculum"])) {
    return resumeAnswer();
  }

  if (includesAny(query, ["education", "college", "university", "cgpa", "gpa", "b.tech", "btech", "degree", "study", "studied", "school"])) {
    return educationAnswer();
  }

  if (
    includesAny(query, ["godda", "from", "live", "location"]) &&
    !includesAny(query, ["work", "job", "company", "infosys", "tulip"])
  ) {
    return locationAnswer();
  }

  if (
    includesAny(query, ["skill", "tech", "stack", "tools"]) ||
    [...KNOWN_TECH].some((tech) => tech.length > 2 && hasWord(query, tech))
  ) {
    return skillsAnswer();
  }

  if (includesAny(query, ["project", "built", "portfolio work"])) {
    return projectsAnswer();
  }

  if (includesAny(query, ["experience", "work history", "worked", "job", "role"])) {
    return experienceAnswer();
  }

  if (includesAny(query, ["hobby", "hobbies", "reading", "cooking", "travelling", "traveling"])) {
    return {
      text: `Apart from coding, the portfolio lists ${knowledge.interests.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
      links: [],
    };
  }

  if (
    includesAny(query, ["who", "about", "introduce", "summary", "hello", "what does vishal do", "what do you do"]) ||
    hasWord(query, "hi") ||
    hasWord(query, "hey") ||
    hasWord(query, "vishal")
  ) {
    return aboutAnswer();
  }

  return { text: UNKNOWN_REPLY, links: [] };
}
