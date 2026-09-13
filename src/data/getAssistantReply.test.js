import { getAssistantReply } from "./getAssistantReply";
import { UNKNOWN_REPLY } from "./portfolioKnowledge";

test("answers experience from the resume", () => {
  const reply = getAssistantReply("Tell me about Vishal's experience");
  expect(reply.text).toMatch(/Infosys/);
  expect(reply.text).toMatch(/TuteDude/);
  expect(reply.text).toMatch(/March 2022/);
});

test("answers skills from the resume", () => {
  const reply = getAssistantReply("What are his technical skills?");
  expect(reply.text).toMatch(/React/);
  expect(reply.text).not.toMatch(/Next\.js/);
});

test("answers projects with verified links", () => {
  const reply = getAssistantReply("What projects has he built?");
  expect(reply.text).toMatch(/GitHub Profile Viewer/);
  expect(reply.text).toMatch(/Currency Convertor/);
  expect(reply.links.some((link) => link.href.includes("Github-profile-viewer"))).toBe(true);
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

test("answers a specific project without inventing a missing repo URL", () => {
  const reply = getAssistantReply("Tell me about the Currency Convertor");
  expect(reply.text).toMatch(/Currency Convertor/);
  expect(reply.text).toMatch(/repository URL is not listed/i);
  expect(reply.links).toHaveLength(0);
});

test("does not invent current employment or salary", () => {
  expect(getAssistantReply("What is his salary?").text).toBe(UNKNOWN_REPLY);
  expect(getAssistantReply("Does he know Java?").text).toBe(UNKNOWN_REPLY);
  expect(getAssistantReply("What awards has he won?").text).toBe(UNKNOWN_REPLY);
});
