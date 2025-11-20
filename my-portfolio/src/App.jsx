// src/App.jsx
import * as React from "react";
import { Typography, Button, Stack } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";

import Section from "./components/Section";
import EditorialHero from "./components/EditorialHero";
import PortfolioPage from "./pages/Portfolio";
import LayoutShell from "./components/LayoutShell.jsx";

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
        <Route path="/" element={<HomePage scrollToId={scrollToId} />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </LayoutShell>
  );
}

// ---------------- HOME PAGE ----------------

function HomePage({ scrollToId }) {
  return (
    <>
      {/* HERO SECTION */}
      <Section
        id="hero"
        variant="white"
        as="header"
        fullHeight
        layout="stack"
        align="left"
      >
        <EditorialHero
          kicker="Senior UX & Product Designer"
          title="You have to keep learning — because the world keeps changing"
          subtitle="Actively applying AI knowledge to design scalable, human-centered products"
          imageAlt="Black and white portrait of the designer"
        />
      </Section>

      {/* ABOUT SECTION */}
      <Section id="about" title="About me" variant="soft" layout="split">
        <Stack spacing={3} alignItems="flex-start">
          <Typography variant="body1" color="text.secondary">
            For 15+ years, I’ve designed inside environments where the stakes
            are high and the complexity is real — intelligence spaces, justice
            systems, enterprise platforms with thousands of moving parts. In
            every one of them, my work begins with the same belief: people
            deserve tools that make their world feel lighter, not heavier.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            I build systems that scale, patterns that reduce cognitive load, and
            experiences that let humans focus on the work that actually matters.
            The moments I chase aren’t flashy UI shots — they’re the quiet ones:
            a workflow that suddenly makes sense, a task that takes minutes
            instead of hours, a user who finally feels in control instead of
            overwhelmed.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Lately, I’m exploring how AI can amplify that impact — not by
            replacing the craft, but by expanding what designers can imagine,
            prototype, and deliver. I care about accessibility as a principle,
            not a checkbox. About clarity as a form of respect. About design as
            a way of thinking that doesn’t turn off at 5 PM.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Because at the core, I’m driven by a simple idea: make the complex
            feel effortless — and the people using it feel empowered.
          </Typography>
        </Stack>
      </Section>

      {/* RESUME SECTION */}
      <Section id="resume" title="Resume" variant="white" layout="split">
        <Stack spacing={3} alignItems="flex-start">
          <Typography variant="body1" color="text.secondary">
            Senior Product & UX Designer specializing in design systems at
            scale, usability & accessibility standards, and AI-enhanced design
            workflows. Extensive experience leading UX strategy for
            mission-critical enterprise platforms.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained">View my resume</Button>
            <Button variant="outlined">Download PDF version</Button>
          </Stack>
        </Stack>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" title="Contact" variant="dark" layout="split">
        <Stack spacing={4} alignItems="flex-start">
          <Typography variant="body1" color="text.secondary">
            I'm always up for good design conversations—whether that's debating
            design system architecture, talking through a UX challenge you're
            facing, or exploring what's next for both of us. Fellow designers,
            recruiters, hiring managers, or anyone curious about human-centered
            design: let's connect. Virtual coffee or the real thing, I'm in.
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 8 }}>
            © {new Date().getFullYear()} Sergio Antezana
          </Typography>
        </Stack>
      </Section>
    </>
  );
}

// REUSABLE ICON LINK (currently unused here but kept for potential reuse)
function IconLink({ href, label, icon }) {
  return (
    <MuiLink
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      sx={{ display: "inline-flex", alignItems: "center", p: 1 }}
    >
      {icon}
    </MuiLink>
  );
}
