// src/sections/ResumeSection.jsx
// Wrapper around <Section> for the "Resume" content on the home page.

import * as React from "react";
import { Stack, Typography, Button } from "@mui/material";
import Section from "../components/Section";

import { Link as RouterLink } from "react-router-dom";

export default function ResumeSection() {
  return (
    <Section id="resume" title="Resume" variant="white" layout="split">
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="body1" color="text.secondary">
          Senior Product & UX Designer specializing in design systems at scale,
          usability & accessibility standards, and AI-enhanced design workflows.
          Extensive experience leading UX strategy for mission-critical
          enterprise platforms.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/resume"
            aria-label="Open full resume page"
          >
            View my resume</Button>
          <Button variant="outlined">Download PDF version</Button>
        </Stack>
      </Stack>
    </Section>
  );
}
