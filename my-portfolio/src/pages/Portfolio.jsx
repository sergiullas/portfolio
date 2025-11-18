import * as React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
} from "@mui/material";

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

  if (!unlocked) {
    return (
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <Typography variant="h4">Portfolio</Typography>
            <Typography variant="body1" color="text.secondary">
              These case studies are restricted and require a password to view.
              If you received a password in a recruiting email or conversation,
              enter it below.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                  Unlock Portfolio
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    );
  }

  // 🔓 Unlocked view – reuse your CaseStudy cards
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Case Studies (Clearance-Safe)
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          These case studies describe my work at a process and outcomes level,
          with all sensitive details removed or generalized.
        </Typography>

        <Grid container spacing={3}>
          <CaseStudyCard
            title="Modernizing a Mission-Critical Review Workflow"
            problem="Fragmented tools, manual handoffs, and inconsistent workflows created operational risk and slowed decision-making."
            role="Lead UX Designer · Systems Thinker · Accessibility Lead"
            outcomes={[
              "Reduced workflow steps",
              "Improved clarity and collaboration",
              "Reduced errors and redundancy",
              "Raised accessibility compliance",
            ]}
          />

          <CaseStudyCard
            title="Building an Enterprise Design System"
            problem="Teams were designing inconsistent UIs with varying accessibility standards, causing user confusion and significant rework."
            role="Design System Lead · Interaction Designer · Accessibility Specialist"
            outcomes={[
              "Increased design consistency",
              "Reduced dev rework",
              "Improved accessibility compliance",
              "Created scalable component architecture",
            ]}
          />

          <CaseStudyCard
            title="Improving Decision-Making in a High-Stakes Analytical Tool"
            problem="Analysts struggled with cognitive overload due to cluttered interfaces and fragmented information."
            role="Lead UX Researcher · Interaction Designer · Service Designer"
            outcomes={[
              "Improved task success",
              "Reduced cognitive load",
              "Streamlined triage & comparison flows",
              "Enabled faster decision-making",
            ]}
          />
        </Grid>
      </Container>
    </Box>
  );
}
