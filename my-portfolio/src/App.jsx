// src/App.jsx
import * as React from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Grid,
  Link as MuiLink,
} from "@mui/material";

import { Routes, Route, useLocation } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import Header from "./components/Header";
import Section from "./components/Section";
import SkillGroup from "./components/SkillGroup";
import PortfolioPage from "./pages/Portfolio";

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
    <>
      <Header mode={mode} setMode={setMode} scrollToId={scrollToId} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              scrollToId={scrollToId}
            />
          }
        />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </>
  );
}

// ---------------- HOME PAGE ----------------

function HomePage({ scrollToId }) {
  return (
    <>
      {/* HERO SECTION */}
      <Box id="hero" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center">
            <Typography variant="h2" align="center">
              Senior UX & Product Designer
            </Typography>

            <Typography variant="h5" color="text.secondary" align="center">
              Systems Thinker | Accessibility & Design Systems Specialist
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              maxWidth="sm"
            >
              I design intuitive, accessible, enterprise-grade products for
              complex, high-stakes environments. This portfolio provides a
              clearance-safe view of my process, decision-making, and outcomes.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                onClick={() => scrollToId("skills")}
              >
                View Skills
              </Button>
              <Button variant="outlined" href="/resume.pdf" target="_blank">
                Download Resume
              </Button>
              <Button variant="text" onClick={() => scrollToId("contact")}>
                Contact
              </Button>
            </Stack>

            <Stack direction="row" spacing={2}>
              <IconLink
                href="https://github.com/your-handle"
                label="GitHub"
                icon={<GitHubIcon />}
              />
              <IconLink
                href="https://linkedin.com/in/your-handle"
                label="LinkedIn"
                icon={<LinkedInIcon />}
              />
              <IconLink
                href="mailto:you@example.com"
                label="Email"
                icon={<MailOutlineIcon />}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ABOUT SECTION */}
      <Section id="about" title="About Me">
        <Typography variant="body1" color="text.secondary">
          I’m a Senior UX/Product Designer with 10+ years of experience creating
          enterprise workflows, design systems, and accessible digital products
          for mission-critical environments.
          <br />
          <br />
          Much of my work is protected under federal security requirements, so
          this portfolio focuses on my process, frameworks, and outcomes rather
          than visual artifacts.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          My strengths:
          <ul>
            <li>Systems Thinking</li>
            <li>Accessibility by Design (WCAG 2.2)</li>
            <li>Enterprise UX and workflow modernization</li>
            <li>Cross-functional collaboration in regulated environments</li>
          </ul>
        </Typography>
      </Section>

      {/* SKILLS SECTION */}
      <Section id="skills" title="Skills & Tools">
        <Grid container spacing={3}>
          <SkillGroup
            title="Core Skills"
            skills={[
              "UX Strategy",
              "Workflow & Systems Design",
              "User Research",
              "Interaction Design",
              "Prototyping",
              "Design Systems",
              "Accessibility (WCAG 2.2)",
              "Cross-functional facilitation",
            ]}
          />
          <SkillGroup
            title="Tools"
            skills={[
              "Figma",
              "MUI / React",
              "FigJam",
              "Miro",
              "Jira",
              "Confluence",
              "Adobe CC",
              "UserTesting / Lookback",
            ]}
          />
        </Grid>
      </Section>

      {/* SECURITY SECTION */}
      <Section id="security" title="Why My Work Isn’t Public">
        <Typography variant="body1" color="text.secondary">
          Many of my projects were developed in secure environments and cannot
          be shared publicly. To maintain confidentiality, this portfolio
          focuses on my design thinking, systems approach, and measurable
          outcomes—rather than screenshots or sensitive artifacts.
        </Typography>
      </Section>

      {/* CONTACT */}
      <Box id="contact" sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4">Let’s Collaborate</Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              I’m open to full-time roles, consulting, and design system
              engagements.
            </Typography>

            <Button
              variant="contained"
              size="large"
              href="mailto:you@example.com"
              startIcon={<MailOutlineIcon />}
            >
              you@example.com
            </Button>

            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} YOUR NAME
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// REUSABLE
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
