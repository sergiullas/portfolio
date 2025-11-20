// src/App.jsx
import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PortfolioPage from "./pages/Portfolio";
import LayoutShell from "./components/LayoutShell.jsx";

// Phase 2 section wrappers
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ResumeSection from "./sections/ResumeSection";
import ContactSection from "./sections/ContactSection";


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

      {/* RESUME SECTION */}
      <ResumeSection />

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
