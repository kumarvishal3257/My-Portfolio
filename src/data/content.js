import currencyConvertor from "../Assets/Projects/currency-convertor.png";
import githubProfileViewer from "../Assets/Projects/github-profile-viewer.png";

export const site = {
  name: "Vishal Kumar",
  shortName: "VK",
  title: "Full-Stack Developer",
  location: "Godda, India",
  email: "kumarvishal3257@gmail.com",
  phone: "+91-7366023746",
  phoneHref: "tel:+917366023746",
  resumePdf: `${process.env.PUBLIC_URL}/Vishal_Kumar_Resume.pdf`,
  resumeDrive:
    "https://drive.google.com/file/d/1t7UdbnuK9EyrIuPZ6g65qgLqLEPqKUC_/view?usp=drive_link",
  canonical: "https://my-portfolio-kumarvishal3257s-projects.vercel.app/",
  roles: [
    "Full-Stack Developer",
    "Software Developer",
    "React.js Developer",
    "Web Developer",
  ],
  summary:
    "Full-Stack Developer with around 4 years of experience building scalable, high-performance web applications using React, Next.js, Node.js, and Java Spring Boot.",
  techLine: "React · Next.js · Node.js · Spring Boot · AWS",
  factLine: "Full-Stack Developer · 4+ Years · React / Next.js · AWS",
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/kumarvishal3257",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vishal-kumar-234a05190/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/just__vishal.__/",
    },
  ],
};

export const experience = [
  {
    role: "Software Developer (Full-Stack)",
    company: "Tulip Technology Solutions",
    dates: "September 2025 – Present",
    location: "Hyderabad, Telangana",
    current: true,
    bullets: [
      "Built and maintained a scalable full-stack business management platform using Next.js, React, Java Spring Boot and REST APIs, supporting lead management, estimates, job scheduling, inventory and analytics.",
      "Delivered end-to-end business features across frontend, backend and API integration layers.",
      "Introduced Zustand for centralized state management, eliminating redundant API calls and reducing dashboard initial load time from 5–6 seconds to 1–2 seconds (70% improvement).",
      "Designed and developed a real-time communication system using Next.js, Node.js and WebSockets for manager-agent chat and global broadcast functionality.",
      "Optimized large datasets using list virtualization and debouncing.",
      "Deployed backend services on AWS ECS and integrated Amazon S3 for file and attachment storage.",
      "Implemented Jest-based testing with 90%+ coverage.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Java",
      "Spring Boot",
      "Node.js",
      "AWS",
      "WebSockets",
      "Zustand",
    ],
    impact: [
      { value: "70%", label: "Faster dashboard load time" },
      { value: "90%+", label: "Jest test coverage" },
      { value: "Scalable", label: "Full-stack platform" },
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Infosys",
    dates: "March 2022 – November 2024",
    location: "Bhubaneshwar, Orissa",
    current: false,
    bullets: [
      "Developed complex modules for Business Partner Management and Shipyard logistics dashboards.",
      "Maintained and debugged Java Spring Boot REST endpoints.",
      "Reduced manual effort by 20% by streamlining partner documentation and container tracking workflows.",
      "Increased development efficiency by 35% through a reusable component library and standardized UI patterns.",
      "Collaborated with cross-functional teams in an Agile environment.",
      "Used Jira and Git throughout the SDLC.",
      "Established Jest testing with 85%+ unit test coverage.",
    ],
    technologies: [
      "React",
      "Java",
      "Spring Boot",
      "REST APIs",
      "Jira",
      "Git",
      "Jest",
      "Agile",
    ],
    impact: [
      { value: "20%", label: "Reduced manual effort" },
      { value: "35%", label: "Higher development efficiency" },
      { value: "85%+", label: "Unit test coverage" },
    ],
  },
];

export const skills = {
  frontend: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux/Zustand",
    "Responsive Design",
  ],
  backend: [
    "Java",
    "Spring Boot",
    "REST API Design",
    "Node.js",
    "Microservices",
    "WebSockets",
  ],
  cloud: [
    "AWS (ECS, S3, EC2)",
    "CI/CD",
    "Git",
    "GitLab",
    "Jenkins",
    "Docker",
  ],
  performance: [
    "React Performance Optimization",
    "Memoization",
    "Virtualization",
    "SSR/CSR",
    "Lazy Loading",
    "WebSockets",
  ],
  testing: ["Jest", "Unit Testing", "SonarQube", "Code Reviews"],
  tools: ["Git", "GitLab", "Jira", "Jenkins", "Postman"],
};

export const education = {
  school: "Dr. B.C. Roy Engineering College",
  place: "Durgapur, West Bengal",
  degree: "B.Tech in Computer Science and Engineering",
  gpa: "8.15 CGPA",
  dates: "July 2017 – June 2021",
};

export const interests = ["Reading books", "Cooking", "Travelling"];

export const projects = [
  {
    title: "Currency Convertor",
    featured: true,
    live: true,
    description:
      "A React + Vite app that converts an amount between currencies using Tailwind CSS, a custom data hook, and a public exchange-rate API.",
    highlights: [
      "Convert an amount between selected from/to currencies",
      "Custom useCurrencyInfo hook fetches the latest rates for the source currency",
      "Currency dropdowns are populated from the API response keys",
      "Swap button exchanges the from and to currencies and amounts",
      "Reusable InputBox for amount entry and currency selection",
      "Full-width, wrapping Tailwind layout for smaller screens",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    image: currencyConvertor,
    ghLink: "https://github.com/kumarvishal3257/Currency-Convertor",
    demoLink: "https://currency-convertor-neon.vercel.app/",
  },
  {
    title: "GitHub Profile Viewer",
    live: true,
    description:
      "A browser app that searches a GitHub username and renders profile details and repositories from the GitHub REST API via Axios.",
    highlights: [
      "Search form submits a GitHub username",
      "Axios calls the GitHub users REST endpoint",
      "Profile card shows avatar, name, bio, followers, following, and public repo count",
      "Loads the five most recently created repositories as links",
      "Shows an error card when the user is not found",
      "Shows an error card if repository fetching fails",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Axios"],
    image: githubProfileViewer,
    ghLink: "https://github.com/kumarvishal3257/Github-profile-viewer",
    demoLink: "https://kumarvishal3257.github.io/Github-profile-viewer/",
  },
];

export const navItems = [
  { label: "Home", hash: "home" },
  { label: "Work", hash: "work" },
  { label: "Projects", hash: "projects" },
  { label: "About", hash: "about" },
  { label: "Skills", hash: "skills" },
  { label: "Contact", hash: "contact" },
];
