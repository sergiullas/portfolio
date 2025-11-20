// Updated: 2025-11-20 · 16:45 ET  // 4:45 PM · Thursday, November 20, 2025

// src/sections/HeroSection.jsx
// Section wrapper for the home page hero, restoring consistent padding/grid.

import * as React from "react";
import Section from "../components/Section";
import EditorialHero from "../components/EditorialHero";

export default function HeroSection() {
  return (
    <Section
      id="hero"
      variant="white"
      as="header"
      fullHeight
      layout="stack"
      align="left"
    >
      <EditorialHero />
    </Section>
  );
}
