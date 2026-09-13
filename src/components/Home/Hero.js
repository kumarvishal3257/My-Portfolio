import React from "react";
import Typewriter from "typewriter-effect";
import { useReducedMotion } from "framer-motion";
import { site } from "../../data/content";
import FadeIn from "../FadeIn";
import homeLogo from "../../Assets/home-main.svg";

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="home">
      <div className="site-wrap hero-grid">
        <FadeIn className="hero-copy">
          <p className="eyebrow">Portfolio / {site.title}</p>
          <h1 className="hero-name">
            Vishal
            <span>Kumar</span>
          </h1>
          <div className="hero-role" aria-live="polite">
            {reduce ? (
              <span>{site.roles[0]}</span>
            ) : (
              <Typewriter
                options={{
                  strings: site.roles,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 40,
                  delay: 55,
                }}
              />
            )}
          </div>
          <p className="hero-summary">{site.summary}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#work">
              View work
            </a>
            <a
              className="btn btn-ghost"
              href={site.resumePdf}
              target="_blank"
              rel="noreferrer"
            >
              Download resume
            </a>
          </div>
          <p className="hero-fact">{site.factLine}</p>
        </FadeIn>

        <FadeIn className="hero-visual" delay={0.12}>
          <figure className="hero-frame">
            <img src={homeLogo} alt="" width="520" height="520" aria-hidden="true" />
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}

export default Hero;
