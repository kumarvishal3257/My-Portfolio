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

const KNOWN_TECH = new Set(
  [
    ...knowledge.skills.technical,
    ...knowledge.skills.tools,
    ...knowledge.projects.flatMap((project) => project.stack),
    "Redux",
    "REST",
    "API",
    "Axios",
    "Fetch",
    "HTML5",
    "ES6",
  ].map((item) => normalize(item).replace(/\.js$/, ""))
);

const UNKNOWN_TECH = [
  "python",
  "angular",
  "vue",
  "php",
  "docker",
  "aws",
  "kotlin",
  "swift",
  "golang",
  "ruby",
  "next",
  "nextjs",
  "next.js",
];

function mentionsUnverifiedTech(query) {
  if (hasWord(query, "java") && !query.includes("javascript")) return true;
  return UNKNOWN_TECH.some((term) => query.includes(term));
}

function experienceAnswer() {
  const [infosys, intern] = knowledge.experience;
  return {
    text: [
      `The resume lists two roles.`,
      `${infosys.role} at ${infosys.company} in ${infosys.location}, ${infosys.dates} (${infosys.duration}).`,
      infosys.bullets.slice(0, 4).map((item) => `• ${item}`).join("\n"),
      `${intern.role} at ${intern.company} (${intern.location}), ${intern.dates} (${intern.duration}).`,
      intern.bullets.map((item) => `• ${item}`).join("\n"),
      `I don't have verified information about a current employer.`,
    ].join("\n\n"),
    links: [],
  };
}

function skillsAnswer() {
  return {
    text: [
      `Verified technical skills: ${knowledge.skills.technical.join(", ")}.`,
      `Tools: ${knowledge.skills.tools.join(", ")}.`,
      `Soft skills listed on the resume: ${knowledge.skills.soft.join(", ")}.`,
    ].join("\n\n"),
    links: [],
  };
}

function projectLines(project) {
  const links = [];
  if (project.ghLink) {
    links.push({ label: `${project.title} GitHub`, href: project.ghLink });
  }
  if (project.demoLink) {
    links.push({ label: `${project.title} demo`, href: project.demoLink });
  }

  const linkNote =
    project.ghLink || project.demoLink
      ? ""
      : " A repository URL is not listed in the resume or portfolio.";

  return {
    text: `${project.title} (${project.source}): ${project.description} Stack: ${project.stack.join(", ")}.${linkNote}`,
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
      `Resume: available as a PDF download on this site.`,
    ].join("\n"),
    links: [
      { label: "Email", href: `mailto:${knowledge.email}` },
      { label: "Phone", href: knowledge.phoneHref },
      ...knowledge.socials.map((social) => ({
        label: social.name,
        href: social.href,
      })),
      { label: "Resume", href: knowledge.resumePdf },
    ],
  };
}

function aboutAnswer() {
  return {
    text: [
      `${knowledge.name} is a ${knowledge.role} based in ${knowledge.location}.`,
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
  return {
    text: `${knowledge.name} is from ${knowledge.location}. The Infosys role was based in Bhubaneswar, Orissa. The TuteDude internship was remote.`,
    links: [],
  };
}

function resumeAnswer() {
  return {
    text: `Vishal's resume is available as a PDF on this site.`,
    links: [{ label: "Download resume", href: knowledge.resumePdf }],
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
    if (title.includes("insect") && includesAny(query, ["insect"])) {
      return true;
    }
    if (title.includes("password") && hasWord(query, "password")) {
      return true;
    }
    return false;
  });
}

const BLOCKED = [
  "salary",
  "ctc",
  "package",
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

  if (includesAny(query, ["current job", "currently work", "current employer", "work now"])) {
    return {
      text: `The most recent role in the resume is Senior Systems Engineer at Infosys, March 2022 – Nov 2024. ${UNKNOWN_REPLY}`,
      links: [],
    };
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
    !includesAny(query, ["work", "job", "company", "infosys"])
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

  if (includesAny(query, ["experience", "infosys", "tutedude", "intern", "work history", "worked", "engineer", "job", "role"])) {
    return experienceAnswer();
  }

  if (includesAny(query, ["hobby", "hobbies", "reading", "cooking", "travelling", "traveling"])) {
    return {
      text: `Apart from coding, the portfolio lists ${knowledge.interests.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
      links: [],
    };
  }

  if (
    includesAny(query, ["who", "about", "introduce", "summary", "hello"]) ||
    hasWord(query, "hi") ||
    hasWord(query, "hey") ||
    hasWord(query, "vishal")
  ) {
    return aboutAnswer();
  }

  return { text: UNKNOWN_REPLY, links: [] };
}
