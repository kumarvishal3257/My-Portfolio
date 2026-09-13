import React from "react";
import { education, interests, site, skills } from "../../data/content";
import FadeIn from "../FadeIn";
import avatar from "../../Assets/avatar.svg";

function About() {
  return (
    <section className="section" id="about">
      <div className="site-wrap about-grid">
        <FadeIn>
          <p className="eyebrow">03 — Profile</p>
          <h2 className="section-title">About</h2>
          <p className="about-copy">{site.summary}</p>
          <p className="about-copy">
            Based in {site.location}. {education.degree} from {education.school},{" "}
            {education.place}, {education.dates}. {education.gpa}.
          </p>
          <p className="about-copy">
            Outside of work: {interests.join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="about-aside">
          <img src={avatar} alt="" className="about-avatar" width="280" height="280" />
          <div>
            <h3 className="aside-title">Technical</h3>
            <ul className="chip-row">
              {skills.technical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="aside-title">Tools</h3>
            <ul className="chip-row">
              {skills.tools.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="aside-title">Soft skills</h3>
            <ul className="chip-row">
              {skills.soft.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default About;
