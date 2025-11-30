// src/App.jsx
import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PortfolioPage from "./pages/Portfolio";
import LayoutShell from "./components/LayoutShell.jsx";
import MyResumePage from "./pages/MyResume.jsx";

// Phase 2 section wrappers
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import PhilosophySection from "./sections/PhilosophySection.jsx";
import HowIWork from "./sections/HowIWork.jsx";
import WhatImWorkingOn from "./pages/WhatImWorkingOn.jsx";


// App receives mode + setMode from main.jsx
export default function App({ mode, setMode }) {
  const location = useLocation();

  const scrollToId = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Handle deep link like /#about
  React.useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <LayoutShell mode={mode} setMode={setMode} scrollToId={scrollToId}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/resume" element={<MyResumePage />} />
        <Route path="/wip" element={<WhatImWorkingOn />} />
      </Routes>
    </LayoutShell>
  );
}

// ---------------- HOME PAGE ----------------

function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PHILOSOPHY SECTION */}
      <PhilosophySection />

      {/* HOW I WORK SECTION */}
      <HowIWork />

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
