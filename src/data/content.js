import githubProfile from "../Assets/Projects/githubProfile.png";
import insectCatch from "../Assets/Projects/Insect.png";
import password from "../Assets/Projects/passwordGenerator.png";

export const site = {
  name: "Vishal Kumar",
  shortName: "VK",
  title: "Frontend Developer",
  location: "Godda, India",
  email: "kumarvishal3257@gmail.com",
  phone: "+91-7366023746",
  phoneHref: "tel:+917366023746",
  resumePdf: `${process.env.PUBLIC_URL}/Vishal_Kumar_Resume.pdf`,
  canonical: "https://my-portfolio-kumarvishal3257s-projects.vercel.app/",
  roles: ["Frontend Developer", "React Developer", "Web Developer"],
  summary:
    "Results-driven Front End Developer with expertise in JavaScript, React, HTML and CSS. Known for efficient task completion and creating visually appealing websites. A problem-solving team player with excellent communication skills, adept at collaborating with cross-functional teams for project success.",
  factLine: "Frontend developer · Infosys (2022–2024) · B.Tech CSE",
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
    role: "Senior Systems Engineer",
    company: "Infosys",
    dates: "March 2022 – Nov 2024",
    duration: "2.8 years",
    location: "Bhubaneswar, Orissa",
    bullets: [
      "Developed advanced web applications using React.js, HTML5, and Tailwind CSS, achieving responsiveness and modern designs.",
      "Integrated RESTful APIs, boosting data retrieval efficiency by 10% and enhancing user performance.",
      "Implemented Redux for state management, reducing bugs by 15% and ensuring consistent app performance.",
      "Collaborated with cross-functional teams to ensure timely project delivery, meeting all requirements and timelines.",
      "Conducted unit testing with Jest, improving component reliability and reducing bugs by 15%.",
      "Troubleshot API integration issues, enhancing data accuracy by 10% and reducing downtime by 5%.",
      "Created reusable code and libraries, improving development efficiency by 35% while managing sprints using Jira.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "TuteDude",
    dates: "June 2021 – December 2021",
    duration: "6 months",
    location: "Remote",
    bullets: [
      "Developed responsive web pages using HTML, CSS, and JavaScript, improving cross-device performance by 5% and reducing page load times by 4%.",
      "Implemented modern UI components with Tailwind CSS, enhancing design consistency and reducing development time.",
      "Collaborated with the team to troubleshoot and optimize frontend code, enhancing page speed by 3% and improving overall performance.",
    ],
  },
];

export const skills = {
  technical: [
    "HTML",
    "CSS",
    "JavaScript",
    "ES6",
    "Tailwind CSS",
    "React",
    "TypeScript",
    "Redux",
    "Jest",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
  tools: ["VS Code", "Jira", "SonarQube", "Jenkins", "Git", "GitLab"],
  soft: [
    "Strong communication",
    "Adaptability",
    "Team collaboration",
    "Accountability",
  ],
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
    title: "GitHub Profile Viewer",
    source: "Resume",
    subtitle: "Web app showing GitHub user profiles",
    description:
      "A responsive web application that displays GitHub user profiles based on input, showcasing repositories, followers, and relevant developer information. Axios is used to fetch and display targeted GitHub profile data.",
    stack: ["HTML5", "CSS", "JavaScript", "Axios"],
    image: githubProfile,
    ghLink: "https://github.com/kumarvishal3257/Github-profile-viewer",
    demoLink: "https://kumarvishal3257.github.io/Github-profile-viewer/",
  },
  {
    title: "Currency Convertor",
    source: "Resume",
    subtitle: "Web app to convert different currencies",
    description:
      "A web application for real-time currency conversion between multiple international currencies. API integration uses Fetch with React custom hooks, along with additional core React features.",
    stack: ["HTML", "Tailwind CSS", "React"],
    image: null,
    ghLink: null,
    demoLink: null,
  },
  {
    title: "Insect Catch Game",
    source: "Personal",
    subtitle: "Browser game built with HTML, CSS and JavaScript",
    description:
      "A never-ending leisure game with insect selection. Images appear randomly on the screen, and the goal is to catch them.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: insectCatch,
    ghLink: "https://github.com/kumarvishal3257/Insect-catch-game",
    demoLink: "https://kumarvishal3257.github.io/Insect-catch-game/",
  },
  {
    title: "Password Generator",
    source: "Personal",
    subtitle: "Generate passwords by length and combination",
    description:
      "A random password generator that lets users choose combination and length, and indicates the strength of the generated password.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: password,
    ghLink: "https://github.com/kumarvishal3257/PasswordGenerator",
    demoLink: "https://kumarvishal3257.github.io/PasswordGenerator/",
  },
];

export const navItems = [
  { label: "Home", hash: "home" },
  { label: "Work", hash: "work" },
  { label: "Projects", hash: "projects" },
  { label: "About", hash: "about" },
  { label: "Contact", hash: "contact" },
];
