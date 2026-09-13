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
  "Where does Vishal currently work?",
  "Tell me about his experience",
  "What frontend technologies does he use?",
  "How can I contact him?",
];

export const knowledge = {
  name: site.name,
  role: site.title,
  roles: site.roles,
  summary: site.summary,
  years: "around 4 years",
  location: site.location,
  email: site.email,
  phone: site.phone,
  phoneHref: site.phoneHref,
  resumePdf: site.resumePdf,
  resumeDrive: site.resumeDrive,
  socials: site.socials,
  experience,
  skills,
  education,
  interests,
  projects: projects.map((project) => ({
    title: project.title,
    live: Boolean(project.live && project.demoLink),
    description: project.description,
    highlights: project.highlights || [],
    stack: project.stack,
    ghLink: project.ghLink,
    demoLink: project.demoLink,
  })),
};
