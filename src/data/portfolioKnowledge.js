import {
  education,
  experience,
  interests,
  projects,
  site,
  skills,
} from "./content";

export const UNKNOWN_REPLY =
  "I don't have verified information about that. You can contact Vishal directly through email or LinkedIn.";

export const SUGGESTED_QUESTIONS = [
  "Tell me about Vishal's experience",
  "What are his technical skills?",
  "What projects has he built?",
  "How can I contact him?",
];

export const knowledge = {
  name: site.name,
  role: site.title,
  roles: site.roles,
  summary: site.summary,
  location: site.location,
  email: site.email,
  phone: site.phone,
  phoneHref: site.phoneHref,
  resumePdf: site.resumePdf,
  socials: site.socials,
  experience,
  skills,
  education,
  interests,
  projects: projects.map((project) => ({
    title: project.title,
    source: project.source,
    subtitle: project.subtitle,
    description: project.description,
    stack: project.stack,
    ghLink: project.ghLink,
    demoLink: project.demoLink,
  })),
};
