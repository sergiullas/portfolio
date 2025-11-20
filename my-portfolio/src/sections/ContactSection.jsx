// src/sections/ContactSection.jsx
// Wrapper around <Section> for the "Contact" content on the home page.

import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Section from "../components/Section";

export default function ContactSection() {
  return (
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
  );
}
