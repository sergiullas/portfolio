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

  // Handle deep links AND scroll-to-top on route change
  React.useEffect(() => {
    // 1) Home with hash: /#about, /#contact, etc.
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return; // ⬅️ stop here, do NOT scroll to top
      }
    }

    // 2) Any other route (or home without hash): scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // or omit behavior for instant jump
    });
  }, [location.pathname, location.hash]);

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
