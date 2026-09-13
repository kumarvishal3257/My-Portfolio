import { getAssistantReply } from "./getAssistantReply";
import { UNKNOWN_REPLY } from "./portfolioKnowledge";

test("answers experience from the resume", () => {
  const reply = getAssistantReply("Tell me about Vishal's experience");
  expect(reply.text).toMatch(/Tulip Technology Solutions/);
  expect(reply.text).toMatch(/Software Developer \(Full-Stack\)/);
  expect(reply.text).toMatch(/Infosys/);
  expect(reply.text).toMatch(/Previous role: Full-Stack Developer at Infosys/);
  expect(reply.text).toMatch(/March 2022/);
});

test("answers the current role", () => {
  const reply = getAssistantReply("Where does Vishal currently work?");
  expect(reply.text).toMatch(/Tulip Technology Solutions/);
  expect(reply.text).toMatch(/September 2025/);
  expect(reply.text).not.toMatch(/I don't have verified information about a current employer/);
});

test("answers skills from the resume", () => {
  const reply = getAssistantReply("What are his technical skills?");
  expect(reply.text).toMatch(/React/);
  expect(reply.text).toMatch(/Next\.js/);
  expect(reply.text).toMatch(/Spring Boot/);
});

test("answers verified Java and AWS questions", () => {
  expect(getAssistantReply("Does Vishal know Java?").text).toMatch(/Java/);
  expect(getAssistantReply("Does Vishal use AWS?").text).toMatch(/AWS/);
  expect(getAssistantReply("Does Vishal have backend experience?").text).toMatch(/Spring Boot/);
});

test("answers years of experience from the resume", () => {
  expect(getAssistantReply("How many years of experience does he have?").text).toMatch(/4 years/);
});

test("answers projects with verified links", () => {
  const reply = getAssistantReply("What projects has he built?");
  expect(reply.text).toMatch(/Currency Convertor/);
  expect(reply.text).toMatch(/GitHub Profile Viewer/);
  expect(reply.text).not.toMatch(/Weather App/);
  expect(reply.text).not.toMatch(/Password Generator/);
  expect(reply.links.some((link) => link.href.includes("Github-profile-viewer"))).toBe(true);
  expect(reply.links.some((link) => link.href.includes("currency-convertor-neon.vercel.app"))).toBe(true);
});

test("answers contact with verified details", () => {
  const reply = getAssistantReply("How can I contact him?");
  expect(reply.text).toMatch(/kumarvishal3257@gmail.com/);
  expect(reply.links.some((link) => link.href.includes("linkedin"))).toBe(true);
});

test("answers education from the resume", () => {
  const reply = getAssistantReply("Where did he study?");
  expect(reply.text).toMatch(/B\.Tech/);
  expect(reply.text).toMatch(/8\.15 CGPA/);
});

test("answers a specific project with verified GitHub and live demo links", () => {
  const reply = getAssistantReply("Tell me about the Currency Convertor");
  expect(reply.text).toMatch(/Currency Convertor/);
  expect(reply.text).toMatch(/useCurrencyInfo/);
  expect(reply.text).not.toMatch(/repository URL is not listed/i);
  expect(reply.links.some((link) => link.href.includes("github.com/kumarvishal3257/Currency-Convertor"))).toBe(true);
  expect(reply.links.some((link) => link.href.includes("currency-convertor-neon.vercel.app"))).toBe(true);
});

test("answers resume with the PDF and Google Drive links", () => {
  const reply = getAssistantReply("Can I see his resume?");
  expect(reply.text).toMatch(/Google Drive/);
  expect(reply.links.some((link) => link.href.includes("Vishal_Kumar_Resume.pdf"))).toBe(true);
  expect(
    reply.links.some((link) =>
      link.href.includes("1t7UdbnuK9EyrIuPZ6g65qgLqLEPqKUC_")
    )
  ).toBe(true);
});

test("does not describe the Infosys role as Frontend Developer", () => {
  const reply = getAssistantReply("What did he do at Infosys?");
  expect(reply.text).toMatch(/Full-Stack Developer at Infosys/);
  expect(reply.text).not.toMatch(/Frontend Developer/);
});

test("does not invent salary or awards", () => {
  expect(getAssistantReply("What is his salary?").text).toBe(UNKNOWN_REPLY);
  expect(getAssistantReply("What awards has he won?").text).toBe(UNKNOWN_REPLY);
});
