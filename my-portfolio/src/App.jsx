// src/App.jsx
import * as React from "react";
import {
  Typography,
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
import EditorialHero from "./components/EditorialHero";
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

        {/* Secondary actions + social links */}
        {/* CTA + social row */}
        <Box
          sx={{
            mt: 6,
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
          }}
        >
          {/* Primary actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => scrollToId("skills")}
              sx={{
                borderRadius: 0,
                px: 3.5,
                py: 1.3,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "0.8rem",
              }}
            >
              View skills
            </Button>
            <Button
              variant="text"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              sx={{ textTransform: "none" }}
            >
              Download resume
            </Button>
            <Button
              variant="text"
              onClick={() => scrollToId("contact")}
              sx={{ textTransform: "none" }}
            >
              Contact
            </Button>
          </Stack>

          {/* Social links */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              opacity: 0.7,
              "&:hover": { opacity: 1 },
            }}
          >
            <IconLink
              href="https://github.com/your-handle"
              label="GitHub"
              icon={<GitHubIcon fontSize="small" />}
            />
            <IconLink
              href="https://www.linkedin.com/in/santezana/"
              label="LinkedIn"
              icon={<LinkedInIcon fontSize="small" />}
            />
            <IconLink
              href="mailto:santezana@nayas.com"
              label="Email"
              icon={<MailOutlineIcon fontSize="small" />}
            />
          </Stack>
        </Box>

      </Section>

      {/* ABOUT SECTION */}
      <Section
        id="about"
        title="About me"
        variant="soft"
        layout="split"
      >
        <Typography variant="body1" color="text.secondary" paragraph>
          For 15+ years, I’ve designed inside environments where the stakes are high
          and the complexity is real — intelligence spaces, justice systems,
          enterprise platforms with thousands of moving parts. In every one of them,
          my work begins with the same belief: people deserve tools that make their
          world feel lighter, not heavier.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          I build systems that scale, patterns that reduce cognitive load, and
          experiences that let humans focus on the work that actually matters. The
          moments I chase aren’t flashy UI shots — they’re the quiet ones: a workflow
          that suddenly makes sense, a task that takes minutes instead of hours, a
          user who finally feels in control instead of overwhelmed.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Lately, I’m exploring how AI can amplify that impact — not by replacing the
          craft, but by expanding what designers can imagine, prototype, and deliver.
          I care about accessibility as a principle, not a checkbox. About clarity as
          a form of respect. About design as a way of thinking that doesn’t turn off
          at 5 PM.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Because at the core, I’m driven by a simple idea: make the complex feel
          effortless — and the people using it feel empowered.
        </Typography>
      </Section>


      {/* SKILLS SECTION */}
      <Section
        id="skills"
        title="Skills & tools"
        variant="white"
        layout="split"
      >
        <Grid container spacing={3}>
          <SkillGroup
            title="Core skills"
            skills={[
              "UX strategy",
              "Workflow & systems design",
              "User research",
              "Interaction design",
              "Prototyping",
              "Design systems",
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
      <Section id="security" title="Why my work isn’t public" variant="soft">
        <Typography variant="body1" color="text.secondary">
          Many of my projects were developed in secure environments and cannot
          be shared publicly. To maintain confidentiality, this portfolio
          focuses on my design thinking, systems approach, and measurable
          outcomes—rather than screenshots or sensitive artifacts.
        </Typography>
      </Section>

      {/* CONTACT */}
      <Section id="contact" variant="dark" align="center" as="footer">
        <Stack spacing={3} alignItems="center">
          <Typography variant="h3" component="h2">
            Let’s collaborate
          </Typography>
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
      </Section>
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
