// src/sections/AboutSection.jsx
// Wrapper around <Section> for the "About me" content on the home page.

import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Section from "../components/Section";

export default function AboutSection() {
  return (
    <Section id="about" title="About me" variant="soft" layout="split">
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="body1" color="text.secondary">
          For 15+ years, I’ve designed inside environments where the stakes are
          high and the complexity is real — intelligence spaces, justice
          systems, enterprise platforms with thousands of moving parts. In every
          one of them, my work begins with the same belief: people deserve tools
          that make their world feel lighter, not heavier.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          I build systems that scale, patterns that reduce cognitive load, and
          experiences that let humans focus on the work that actually matters.
          The moments I chase aren’t flashy UI shots — they’re the quiet ones: a
          workflow that suddenly makes sense, a task that takes minutes instead
          of hours, a user who finally feels in control instead of overwhelmed.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Lately, I’m exploring how AI can amplify that impact — not by
          replacing the craft, but by expanding what designers can imagine,
          prototype, and deliver. I care about accessibility as a principle, not
          a checkbox. About clarity as a form of respect. About design as a way
          of thinking that doesn’t turn off at 5 PM.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Because at the core, I’m driven by a simple idea: make the complex
          feel effortless — and the people using it feel empowered.
        </Typography>
      </Stack>
    </Section>
  );
}
