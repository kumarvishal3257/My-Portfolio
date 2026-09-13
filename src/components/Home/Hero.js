import React from "react";
import { site } from "../../data/content";
import FadeIn from "../FadeIn";
import MagneticLink from "../MagneticLink";
import HeroScene from "./HeroScene";
import TypeCycle from "../TypeCycle";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="site-wrap hero-grid">
        <FadeIn className="hero-copy">
          <h1 className="hero-name">
            <span>Vishal</span> Kumar
          </h1>
          <p className="hero-role" aria-live="polite">
            <TypeCycle />
          </p>
          <p className="hero-summary">{site.summary}</p>
          <p className="hero-tech">{site.techLine}</p>
          <div className="hero-actions">
            <MagneticLink className="btn btn-solid" href="#work">
              View My Work
            </MagneticLink>
            <MagneticLink
              className="btn btn-ghost"
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </MagneticLink>
            <MagneticLink
              className="btn btn-ghost"
              href={site.resumeDrive}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Online
            </MagneticLink>
          </div>
          <p className="hero-fact">{site.factLine}</p>
        </FadeIn>

        <FadeIn className="hero-visual" delay={0.12}>
          <HeroScene />
        </FadeIn>
      </div>
    </section>
  );
}

export default Hero;
