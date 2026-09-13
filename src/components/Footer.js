import React from "react";
import { site } from "../data/content";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const icons = {
  GitHub: AiFillGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: AiFillInstagram,
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-wrap footer-grid">
        <p>
          {site.name}
          <span> {site.title}</span>
        </p>
        <p>© {year}</p>
        <ul className="footer-social">
          {site.socials.map((social) => {
            const Icon = icons[social.name];
            return (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {Icon ? <Icon aria-hidden="true" /> : social.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
