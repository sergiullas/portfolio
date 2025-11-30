// src/sections/PhilosophySection.jsx

import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Section from "../components/Section";

export default function PhilosophySection() {
  return (
    <Section id="resume" title="Philosophy" variant="white" layout="split">
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h3" color="text.secondary">
          Direction is more important than speed.
        </Typography>
        <Typography variant="h4" color="text.secondary">
          Going faster without direction is going nowhere.
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Design works best when it makes things easier for the user.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          That only happens when the whole team sees the problem the same way. Once everyone understands what the user is trying to do, the work becomes smoother and the product is easier to understand.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          I help teams get aligned by creating simple structures, shared patterns, and familiar language that keeps everyone moving in the same direction.
        </Typography>

      </Stack>
    </Section>
  );
}
