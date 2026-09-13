import React, { useEffect, useState } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/Chat/ChatWidget";
import "./style.css";
import "./App.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <div className="env" aria-hidden="true">
          <div className="env-glow env-glow-a" />
          <div className="env-glow env-glow-b" />
          <div className="env-grid" />
        </div>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home initialSection="about" />} />
          <Route path="/project" element={<Home initialSection="projects" />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
