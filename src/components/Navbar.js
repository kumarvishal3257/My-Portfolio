import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { site, navItems } from "../data/content";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/resume") {
      setActive("resume");
      return undefined;
    }

    const ids = navItems.map((item) => item.hash);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  const goTo = (hash) => {
    setOpen(false);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReduced ? "auto" : "smooth";
    if (location.pathname !== "/") {
      navigate(`/#${hash}`);
      return;
    }
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior });
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-nav-inner">
        <button
          type="button"
          className="brand"
          onClick={() => goTo("home")}
          aria-label="Vishal Kumar, go to home"
        >
          <span className="brand-mark">{site.shortName}</span>
          <span className="brand-name">{site.name}</span>
        </button>

        <button
          type="button"
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <button
              key={item.hash}
              type="button"
              className={active === item.hash ? "is-active" : ""}
              aria-current={active === item.hash ? "location" : undefined}
              onClick={() => goTo(item.hash)}
            >
              {item.label}
            </button>
          ))}
          <a
            className="nav-resume"
            href={site.resumePdf}
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume PDF"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
