import React from "react";
import { Link } from "react-router-dom";
import { site } from "../../data/content";

function Resume() {
  return (
    <main id="content" className="resume-page">
      <div className="site-wrap resume-panel">
        <p className="eyebrow">Resume</p>
        <h1>Vishal Kumar</h1>
        <p>
          {site.title}. Open the PDF resume in a new tab.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href={site.resumePdf} target="_blank" rel="noreferrer">
            Download resume
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
