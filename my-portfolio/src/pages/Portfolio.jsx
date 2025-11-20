// src/pages/Portfolio.jsx
import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
} from "@mui/material";

import Section from "../components/Section";
import CaseStudyCard from "../components/CaseStudyCard";

// ❗ change this to whatever password you want (remember: not truly secure)
const CASE_STUDY_PASSWORD = "Youarehired!";

export default function PortfolioPage() {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("portfolio-unlocked") === "true";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CASE_STUDY_PASSWORD) {
      setUnlocked(true);
      setError("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-unlocked", "true");
      }
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // 🔐 Locked view
  if (!unlocked) {
    return (
      <Section variant="white" layout="stack" fullHeight>
        <Box
          sx={{
        
            // --- Centering Rules ---
            maxWidth: 'sm',      // 1. Limit the width of the Box
            margin: '0 auto',    // 2. Center the limited-width Box horizontally
            // -----------------------
          }}
        >

          <Typography variant="h2" component="h2" gutterBottom>
            My Work
          </Typography>

          <Typography variant="body1" color="text.secondary">
            These case studies are restricted and require a password to view.
            If you received a password in a recruiting email or conversation,
            enter it below to unlock a view of my work.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Password"
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                error={Boolean(error)}
                helperText={error || " "}
                autoComplete="off"
                fullWidth
              />
              <Button type="submit" variant="contained">
                Unlock portfolio
              </Button>
            </Stack>
          </Box>

        </Box>
      </Section>
    );
  }

  // 🔓 Unlocked view – reuse your CaseStudy cards
  return (
    <Section variant="white" as="main">
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
          Case studies (clearance-safe)
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          These examples describe my work at a process and outcomes level, with
          all sensitive details removed or generalized. They illustrate how I
          approach complex, high-stakes problems, collaborate with teams, and
          measure impact.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CaseStudyCard
              title="Modernizing a mission-critical review workflow"
              problem="Fragmented tools, manual handoffs, and legacy workflows created operational risk and slowed decision-making."
              role="Lead UX Designer · Systems Thinker · Accessibility Lead"
              outcomes={[
                "Reduced workflow steps and ambiguity",
                "Improved clarity and collaboration between roles",
                "Reduced errors and redundant work",
                "Raised accessibility compliance across the workflow",
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <CaseStudyCard
              title="Reimagining an internal intelligence platform"
              problem="Critical insights were buried across multiple tools, making it hard for busy stakeholders to get a confident picture quickly."
              role="Lead Product Designer · Research Partner"
              outcomes={[
                "Unified key workflows and views into a single experience",
                "Improved time-to-insight for core tasks",
                "Increased stakeholder confidence in data and decisions",
                "Enabled roadmap for future automation and integrations",
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <CaseStudyCard
              title="Improving decision-making in a high-stakes analytical tool"
              problem="Analysts struggled with cognitive overload due to cluttered interfaces and fragmented information."
              role="Lead UX Researcher · Interaction Designer · Service Designer"
              outcomes={[
                "Improved task success on critical workflows",
                "Reduced cognitive load for expert users",
                "Streamlined triage and comparison flows",
                "Enabled faster, more confident decision-making",
              ]}
            />
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
}
