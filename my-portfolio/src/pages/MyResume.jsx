// Updated: 2025-11-21 · 22:45 ET  // 10:45 PM · Friday, November 21, 2025

// src/pages/MyResume.jsx
// Minimal resume layout: identity block + meta card + content sections.

import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Link as MuiLink,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

const SECTION_ITEMS = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import headshot from "../assets/headshot-sergio.png";

import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";

const NAME_AUDIO_SRC = ""; // Optional: set to /audio/sergio-antezana-name.mp3 when available

function computeTimeDiff() {
  try {
    const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetTZ = "America/New_York";

    const now = new Date();
    const userOffset = new Intl.DateTimeFormat("en-US", { timeZone: userTZ, hour: "2-digit", hour12: false }).format(now);
    const targetOffset = new Intl.DateTimeFormat("en-US", { timeZone: targetTZ, hour: "2-digit", hour12: false }).format(now);

    const userHour = parseInt(userOffset, 10);
    const targetHour = parseInt(targetOffset, 10);

    let diff = targetHour - userHour;
    if (diff > 12) diff -= 24;
    if (diff < -12) diff += 24;

    if (diff === 0) return "Same time";
    if (diff > 0) return `${diff}h ahead`;
    return `${Math.abs(diff)}h behind`;
  } catch {
    return "";
  }
}

export default function MyResumePage() {
  const { setShowName } = useHeaderNameVisibility();
  const heroRef = React.useRef(null);
  const [activeSection, setActiveSection] = React.useState("summary");
  const [localTime, setLocalTime] = React.useState("");

  // Local time indicator (updates every minute)
  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date());

    setLocalTime(format());
    const id = window.setInterval(() => setLocalTime(format()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Track which section is active while scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      let currentId = SECTION_ITEMS[0]?.id;

      SECTION_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // 120px from top roughly under your header
        if (rect.top <= 120 && rect.bottom >= 120) {
          currentId = id;
        }
      });

      setActiveSection(currentId);
    };

    handleScroll(); // set initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80; // header height + breathing room
    const top = window.scrollY + el.getBoundingClientRect().top - offset;

    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the hero (name block) is visible ≥ 40%, hide header name.
        // When it scrolls out of that threshold, show header name again.
        const isVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.4;
        setShowName(!isVisible);
      },
      {
        threshold: [0, 0.4, 1],
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      setShowName(true); // reset when leaving the page
    };
  }, [setShowName]);

  return (
    <Box
      component="main"
      role="main"
      sx={(t) => ({
        minHeight: "100vh",
        bgcolor: t.palette.background.default,
        color: t.palette.text.primary,
        py: { xs: 4, md: 8 },
      })}
    >
      {/* Wider container, but constrain readable line length inside */}
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 880, mx: "auto", px: { xs: 2, md: 6 } }}>
          <Stack spacing={4}>
            {/* Identity block */}
            <Box id="resume-hero" ref={heroRef}>
              <Typography
                variant="overline"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  opacity: 0.7,
                }}
              >
                Product & UX Design
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Avatar
                  alt="Sergio Antezana"
                  src={headshot}
                  sx={{ width: 150, height: 150 }}
                />

                <Box>
                  <NameWithPronunciation />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "40rem" }}
                  >
                    Product Designer · Systems Thinker · UX Strategist <br />

                    I help teams turn business goals into clear, usable product systems. I work closely with engineering and product partners to translate ideas into scalable UX patterns and practical solutions. I bring structure to complex projects and help teams move from confusion to clarity.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Meta card: 2-column grid of key info */}
            <Box
              sx={(t) => ({
                borderRadius: 2,
                border: `1px solid ${t.palette.divider}`,
                backgroundColor: t.palette.background.paper,
                boxShadow: t.shadows[0],
                px: { xs: 2, md: 3 },
                py: { xs: 2, md: 2.5 },
              })}
            >
              <Grid
                container
                columnSpacing={{ xs: 2, md: 4 }}
                rowSpacing={{ xs: 1.5, md: 1.5 }}
              >
                {/* LEFT COLUMN */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.5}>
                    <MetaRow
                      icon={<WorkOutlineIcon fontSize="small" />}
                      primary="Senior Product & UX Designer"
                      secondary="Systems, design ops, accessibility"
                    />

                    <MetaRow
                      icon={<WorkOutlineIcon fontSize="small" />}
                      primary="Open to senior/lead roles"
                    />

                    <MetaRow
                      icon={<FlagIcon fontSize="small" />}
                      primary="Washington, DC metro (remote-first)"
                    />

                    <MetaRow
                      icon={<AccessTimeIcon fontSize="small" />}
                      primary={localTime}
                      secondary={
                        computeTimeDiff() === "Same time"
                          ? `Same time — Eastern Time (ET)`
                          : `${computeTimeDiff()} — Eastern Time (ET)`
                      }
                    />
                  </Stack>
                </Grid>

                {/* RIGHT COLUMN */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1.5}>
                    <MetaRow
                      icon={<EmailIcon fontSize="small" />}
                      primary="santezana@nayas.com"
                      href="mailto:santezana@nayas.com"
                    />

                    <MetaRow
                      icon={<LanguageIcon fontSize="small" />}
                      primary="linkedin.com/in/santezana"
                      href="https://www.linkedin.com/in/santezana/"
                    />

                    <MetaRow
                      icon={<LanguageIcon fontSize="small" />}
                      primary="github.com/sergiullas"
                      href="https://github.com/sergiullas"
                    />

                    <MetaRow
                      icon={<WcIcon fontSize="small" />}
                      primary="he / him"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* Sticky section nav */}
            <Box
              component="nav"
              aria-label="Resume sections"
              sx={(t) => ({
                display: { xs: "none", sm: "block" },   // 👈 hide on phones, show on tablet+
                position: { xs: "static", md: "sticky" },
                top: { md: 88 },
                zIndex: 1,
                mb: { xs: 2, md: 3 },
                pb: 1,
                borderBottom: {
                  xs: `1px solid ${t.palette.divider}`,
                  md: "none",
                },
                backgroundColor:
                  t.palette.mode === "dark"
                    ? t.palette.grey[900]
                    : t.palette.background.paper,
                boxShadow: t.palette.mode === "dark" ? t.shadows[3] : t.shadows[1],
                borderRadius: 1,
              })}
            >

              <Stack
                direction="row"
                justifyContent="center"
                spacing={1}
                sx={{
                  overflowX: "auto",
                  py: 0.5,
                }}
              >
                {SECTION_ITEMS.map(({ id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <Box
                      key={id}
                      component="button"
                      type="button"
                      onClick={() => handleNavClick(id)}
                      aria-current={isActive ? "true" : undefined}
                      sx={(t) => {
                        const isDark = t.palette.mode === "dark";
                        const activeBg = isDark ? t.palette.grey[800] : t.palette.common.white;

                        return {
                          border: "none",
                          backgroundColor: isActive ? activeBg : "transparent",
                          padding: "6px 14px",
                          borderRadius: 999,
                          fontSize: "0.7rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          cursor: "pointer",
                          outlineOffset: 2,
                          transition:
                            "background-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease",
                          opacity: isActive ? 1 : 0.85,
                          fontWeight: isActive ? 600 : 400,
                          color: isActive
                            ? t.palette.getContrastText(activeBg) // solid white in dark mode
                            : t.palette.text.secondary,
                          ...(isActive
                            ? {
                              boxShadow: t.shadows[1],
                            }
                            : {
                              "&:hover": {
                                backgroundColor: isDark
                                  ? t.palette.grey[800]
                                  : t.palette.action.hover,
                              },
                            }),
                        };
                      }}
                    >
                      {label}
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            {/* SUMMARY SECTION */}
            <SectionBlock id="summary" label="Summary">
              <Typography variant="body1" color="text.secondary" mb={2}>
                Product Designer with 15+ years of experience working on large, complex platforms across government, enterprise, and secure environments. I focus on system-level thinking, design patterns, and bridging communication between product and engineering teams. I’m good at spotting patterns fast, simplifying complexity, and helping teams align around a shared direction.
              </Typography>
              <Typography variant="body1" color="text.secondary" >
                Engineers often come to me to translate product ideas into UI structures. Junior designers come to me for guidance and career advice. I lead through clarity, consistency, and practical decision-making — not titles — and I am at my best in Principal, Staff, and Lead UX roles where strategy and hands-on work meet.
              </Typography>
            </SectionBlock>

            {/* CORE SKILLS & EXPERTISE SECTION */}
            <SectionBlock id="skills" label="Core skills & expertise">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Design Leadership &amp; Strategy:</strong> Vision &amp; Roadmapping · UX Governance · Mentorship · Cross-Functional Alignment · Accessibility Advocacy
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Design Systems &amp; Accessibility:</strong> Figma · Material Design · MUI · Design Tokens · Component Lifecycle Management · WCAG 2.2 / Section 508 · Trusted Tester Certified
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>AI-Enhanced Design Workflow:</strong> ChatGPT · Gemini · Figma AI · Replit · Generative AI for UX Writing &amp; Ideation · Low-Code / No-Code Prototyping
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Technical Collaboration:</strong> HTML/CSS/JS (Responsive Prototyping) · Design Tokens Integration · Jira · Confluence
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Research &amp; UXOps:</strong> Information Architecture · Usability Testing · Human-AI Interaction · Agile UX · UXOps Frameworks
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* EXPERIENCE SECTION */}
            <SectionBlock id="experience" label="Experience">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Booz Allen Hamilton — Senior Lead Technologist / UX Strategist
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Washington, DC | 2009 — 2025
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1.5, maxWidth: "70ch" }}
              >
                Directed UX strategy and product design for mission-critical enterprise systems across justice, defense, and intelligence sectors. Built and scaled UX teams, design systems, and accessibility frameworks that improved delivery speed and user experience across secure environments.
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                Key achievements
              </Typography>

              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Enterprise UX Leadership:</strong> Directed end-to-end UX for multiple enterprise-scale systems, introducing self-service design frameworks that streamlined development handoffs and improved delivery velocity.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Design Systems at Scale:</strong> Created reusable UI libraries adopted across more than a dozen enterprise applications, improving consistency, reducing UI rework, and accelerating time to delivery.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Accessibility Excellence:</strong> Championed accessibility compliance (WCAG 2.2 / Section 508), building agency-wide accessibility frameworks and training programs that became organizational best practices.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Cross-Functional Collaboration:</strong> Partnered with engineering and product teams to embed iterative usability testing within agile cycles, increasing user alignment and minimizing post-release rework.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Mentorship &amp; UX Advocacy:</strong> Coached emerging designers and PMs in design thinking and accessibility standards, improving overall UX maturity and delivery quality.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>AI &amp; Automation:</strong> Pioneered AI-assisted design and prototyping workflows using ChatGPT, Gemini, and Replit to accelerate ideation, improve design fidelity, and reduce prototyping overhead.
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* PROJECTS HIGHLIGHTS SECTION */}
            <SectionBlock id="projects" label="Projects highlights">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Enterprise Workflow Platform (2023–2025):</strong> Led UX design for low-code platform enabling form, workflow, and dashboard creation. Significantly reduced reliance on development teams by introducing self-service end-user workflows. Improved iteration speed and reduced developer handoffs through low-code UX architecture. Observed measurable efficiency gains across product teams after design system adoption.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Accessibility Modernization Program (2016–2019):</strong> Modernized 12 DOJ web applications for Section 508/WCAG compliance; established reusable component library. Drove measurable improvements in product adoption following usability testing and UX refinements. Improved adoption rates and reduced support requests based on post-launch feedback. Contributed to demonstrable improvements in usage and satisfaction across user groups.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Multiple Intelligence Community Systems (2014–2018):</strong> Designed and implemented reusable UI components adopted across multiple enterprise applications to improve consistency and efficiency. Collaborated with 10+ cross-functional teams to define UX governance standards across the organization. Led accessibility compliance initiatives that became the reference model for other programs.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>AI-Driven Prototyping Pilot (2023):</strong> Internal project, implemented Figma AI and ChatGPT-assisted ideation workflows; proven to significantly reduce design cycle time. Validated how generative tools could reduce design iteration cycles and improve stakeholder engagement during concept reviews.
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* EDUCATION & CERTIFICATIONS SECTION */}
            <SectionBlock id="education" label="Education & certifications">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Bachelor in Business Administration</strong> (UMSS – Bolivia)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Artificial Intelligence Foundational</strong> (Booz Allen)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Artificial Intelligence, Enablement</strong> (Booz Allen)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Usability Analyst</strong> (Human Factors International)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Trusted Tester</strong> – Office of Accessible Systems &amp; Technology (DHS)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Interaction Design</strong> (Nielsen Norman Group)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>UX Management</strong> (Nielsen Norman Group)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>UX Master Certification</strong> (Nielsen Norman Group)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Human Systems Integration</strong> (Georgia Tech)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Scrum Master</strong> (Scrum Alliance)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Agile Professional</strong> (IC Agile)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Team Facilitator</strong> (IC Agile)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Team Coach</strong> (IC Agile)
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* You can add a Contact section later if you want it separate from the meta block */}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// --- Helper components ---

function NameWithPronunciation() {
  const audioRef = React.useRef(null);

  const handlePlay = () => {
    if (audioRef.current && NAME_AUDIO_SRC) {
      audioRef.current.play().catch(() => {
        // fail silently if no audio or playback blocked
      });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        Sergio Antezana
      </Typography>

      <Tooltip title='Pronounced "SEHR-hee-oh an-teh-ZAH-nah"'>
        <span>
          <IconButton
            size="small"
            onClick={handlePlay}
            aria-label='Hear how to pronounce "Sergio Antezana"'
          >
            <VolumeUpIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: "lowercase" }}
      >
        he / him
      </Typography>

      {NAME_AUDIO_SRC && (
        <audio ref={audioRef} src={NAME_AUDIO_SRC} preload="none" />
      )}
    </Box>
  );
}

function MetaRow({ icon, primary, secondary, href }) {
  const Wrapper = href ? MuiLink : Box;

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={(t) => ({
          width: 28,
          height: 28,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${t.palette.divider}`,
        })}
      >
        {icon}
      </Box>

      <Box>
        <Wrapper
          {...(href
            ? {
              href,
              underline: "hover",
              color: "inherit",
              target: href.startsWith("http") ? "_blank" : undefined,
              rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
            }
            : {})}
          sx={{ display: "block", fontWeight: 500, fontSize: "0.9rem" }}
        >
          {primary}
        </Wrapper>
        {secondary && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {secondary}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function SectionBlock({ id, label, children }) {
  const headingId = `${id}-heading`;

  const handleCopyLink = () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard?.writeText(url);
    } catch {
      // fail silently if clipboard is unavailable
    }
  };

  return (
    <Box
      id={id}
      component="section"
      aria-labelledby={headingId}
      sx={{ scrollMarginTop: { xs: 96, md: 120 } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          id={headingId}
          variant="overline"
          component="h2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            mb: 1,
            opacity: 0.7,
          }}
        >
          {label}
        </Typography>

        <MuiLink
          component="button"
          type="button"
          onClick={handleCopyLink}
          underline="none"
          sx={{
            mb: 1,
            fontSize: 12,
            opacity: 0.6,
            fontFamily: "monospace",
            "&:hover": { opacity: 1 },
          }}
          aria-label={`Copy link to ${label} section`}
        >
          §
        </MuiLink>
      </Box>

      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );
}
