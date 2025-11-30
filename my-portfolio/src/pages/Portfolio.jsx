// -----------------------------------------------------------------------------
// pages/Portfolio.jsx
// Portfolio landing page aggregating hero and core sections.
//
// - Composes shared sections (hero, about, philosophy, work, contact) into a page.
// - Receives nav helpers/props from App to enable smooth scroll or mode toggles.
//
// Accessibility
// - Each section renders semantic landmarks; keep heading hierarchy consistent.
// - Ensure in-page navigation moves focus when treating sections like pages.
//
// How to customize
// - Reorder or replace sections to create alternate landing experiences.
// - Inject new props (e.g., feature flags) to test variants without rewriting.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Helmet } from "react-helmet-async";
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

const CASE_STUDY_PASSWORD =
  import.meta.env.VITE_CASE_STUDY_PASSWORD || "Youarehired!";

export default function PortfolioPage() {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("portfolio-unlocked") === "true";
  });

  const pageHelmet = (
    <Helmet>
      <title>Portfolio — Sergio Antezana</title>
      <meta
        name="description"
        content="Selected UX and product design work, including systems design, workflow simplification, and interaction patterns."
      />
    </Helmet>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CASE_STUDY_PASSWORD) {
      setUnlocked(true);
      setError("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-unlocked", "true");
      }
    } else {
      setError("Check the password and try again.");
    }
  };

  // 🔐 Locked view
  if (!unlocked) {
    return (
      <Section variant="white" layout="stack" fullHeight>
        {pageHelmet}

        <Box
          sx={{
            maxWidth: "sm",
            margin: "0 auto",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            My Work
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These case studies are restricted and require a password to view.
            If you received a password in a recruiting email or conversation,
            enter it below to unlock a view of my work.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Don&apos;t have a password yet? Feel free to reach out via email or
            LinkedIn on the homepage and I&apos;ll share more context when
            appropriate.
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
                FormHelperTextProps={{
                  role: error ? "alert" : undefined,
                }}
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
    <Section
      variant="white"
      title="Case studies (clearance-safe)"
      titleComponent="h1"
    >
      {pageHelmet}

      <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
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
