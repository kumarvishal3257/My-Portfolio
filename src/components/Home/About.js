import React from "react";
import { education, interests, site } from "../../data/content";
import FadeIn from "../FadeIn";
import Avatar from "../Avatar/Avatar";
import portrait from "../../Assets/vishal-avatar.png";

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-wrap">
        <FadeIn className="about-copy-col">
          <h2 className="section-title">About</h2>
          <p className="about-lead">{site.summary}</p>
          <dl className="about-facts">
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {education.degree}
                <br />
                {education.school}, {education.place}
                <br />
                {education.dates} · {education.gpa}
              </dd>
            </div>
            <div>
              <dt>Interests</dt>
              <dd>{interests.join(", ").replace(/, ([^,]*)$/, " and $1")}</dd>
            </div>
          </dl>
        </FadeIn>

        <FadeIn delay={0.1} className="about-photo-col">
          <Avatar
            src={portrait}
            size={260}
            className="avatar-about"
            alt="Portrait of Vishal Kumar"
          />
        </FadeIn>
      </div>
    </section>
  );
}

export default About;
