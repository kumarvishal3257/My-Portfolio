import React from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/content";

function Resume() {
  return (
    <main id="content" className="resume-page">
      <div className="site-wrap resume-panel">
        <p className="resume-kicker">Resume</p>
        <h1>Vishal Kumar</h1>
        <p>
          {site.title}. Download the PDF or open the online copy.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href={site.resumePdf} target="_blank" rel="noopener noreferrer">
            Download resume
          </a>
          <a
            className="btn btn-ghost"
            href={site.resumeDrive}
            target="_blank"
            rel="noopener noreferrer"
          >
            View online
          </a>
          <Link className="btn btn-ghost" to="/#work">
            Back to work
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Resume;
