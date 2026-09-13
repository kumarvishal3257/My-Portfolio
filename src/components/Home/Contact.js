import React from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineDownload } from "react-icons/hi";
import { site } from "../../data/content";
import FadeIn from "../FadeIn";

function Contact() {
  const linkedIn = site.socials.find((item) => item.name === "LinkedIn");
  const github = site.socials.find((item) => item.name === "GitHub");
  const instagram = site.socials.find((item) => item.name === "Instagram");

  return (
    <section className="section contact-section" id="contact">
      <div className="site-wrap">
        <FadeIn className="contact-intro">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="section-title">Let's build something great.</h2>
          <p className="section-lead">
            I'm open to opportunities, collaborations, and interesting engineering challenges.
          </p>
        </FadeIn>

        <div className="contact-layout">
          <FadeIn className="contact-cta">
            <span className="contact-mark" aria-hidden="true">
              @
            </span>
            <p className="contact-status">
              <span className="live-dot" aria-hidden="true" />
              Open to opportunities
            </p>
            <h3>Have a project or opportunity in mind?</h3>
            <p>
              Reach out for full-stack roles and engineering opportunities. I typically reply by email.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href={`mailto:${site.email}`}>
                <HiOutlineMail aria-hidden="true" /> Email Me
              </a>
              <a
                className="btn btn-ghost"
                href={site.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDownload aria-hidden="true" /> Download Resume
              </a>
            </div>
            <a
              className="contact-drive"
              href={site.resumeDrive}
              target="_blank"
              rel="noopener noreferrer"
            >
              View online resume
            </a>
          </FadeIn>

          <FadeIn className="contact-list" delay={0.08}>
            <a className="contact-item" href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
              <span className="contact-item-icon" aria-hidden="true">
                <HiOutlineMail />
              </span>
              <span>
                <strong>Email</strong>
                <em>{site.email}</em>
              </span>
            </a>
            <a className="contact-item" href={site.phoneHref} aria-label={`Call ${site.phone}`}>
              <span className="contact-item-icon" aria-hidden="true">
                <HiOutlinePhone />
              </span>
              <span>
                <strong>Phone</strong>
                <em>{site.phone}</em>
              </span>
            </a>
            {linkedIn && (
              <a
                className="contact-item"
                href={linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <span className="contact-item-icon" aria-hidden="true">
                  <FaLinkedinIn />
                </span>
                <span>
                  <strong>LinkedIn</strong>
                  <em>vishal-kumar-234a05190</em>
                </span>
              </a>
            )}
            {github && (
              <a
                className="contact-item"
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <span className="contact-item-icon" aria-hidden="true">
                  <AiFillGithub />
                </span>
                <span>
                  <strong>GitHub</strong>
                  <em>kumarvishal3257</em>
                </span>
              </a>
            )}
            {instagram && (
              <a
                className="contact-instagram"
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <AiFillInstagram aria-hidden="true" />
                Instagram
              </a>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default Contact;
