import React from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { site } from "../../data/content";
import FadeIn from "../FadeIn";

const icons = {
  GitHub: AiFillGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: AiFillInstagram,
};

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="site-wrap">
        <FadeIn>
          <p className="eyebrow">04 — Contact</p>
          <h2 className="section-title">Contact</h2>
          <p className="section-lead">
            For frontend roles or project conversations, use email, phone, or
            the links below.
          </p>
        </FadeIn>

        <FadeIn className="contact-panel" delay={0.08}>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="contact-phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <div className="contact-row">
            {site.socials.map((social) => {
              const Icon = icons[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                >
                  {Icon ? <Icon aria-hidden="true" /> : null}
                  {social.name}
                </a>
              );
            })}
            <a href={site.resumePdf} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Contact;
