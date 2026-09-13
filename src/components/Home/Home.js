import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Work from "./Work";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Skills from "./Skills";

function Home({ initialSection }) {
  const location = useLocation();

  useEffect(() => {
    const fromHash = location.hash ? location.hash.replace("#", "") : "";
    const target = fromHash || initialSection;
    if (!target) return undefined;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash, initialSection]);

  return (
    <main id="content">
      <Hero />
      <Work />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}

export default Home;
