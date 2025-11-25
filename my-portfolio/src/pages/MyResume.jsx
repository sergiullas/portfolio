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
  Chip, // ⬅️ added for Current era + tags
} from "@mui/material";

import { useTheme, alpha } from "@mui/material/styles"; // ⬅️ for timeline colors

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import headshot from "../assets/headshot-sergio.png";

import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";

const SECTION_ITEMS = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

const NAME_AUDIO_SRC = ""; // Optional: set to /audio/sergio-antezana-name.mp3 when available

function computeTimeDiff() {
  try {
    const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetTZ = "America/New_York";

    const now = new Date();
    const userOffset = new Intl.DateTimeFormat("en-US", {
      timeZone: userTZ,
      hour: "2-digit",
      hour12: false,
    }).format(now);
    const targetOffset = new Intl.DateTimeFormat("en-US", {
      timeZone: targetTZ,
      hour: "2-digit",
      hour12: false,
    }).format(now);

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

  // ⬅️ Era 4 open by default, others closed
  const [openEras, setOpenEras] = React.useState({
    era1: false,
    era2: false,
    era3: false,
    era4: true,
  });

  const toggleEra = React.useCallback((id) => {
    setOpenEras((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

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
                sx={(t) => ({
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  opacity: 0.85,
                  color: t.palette.primary.main,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  "&::before": {
                    content: '""',
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "999px",
                    backgroundColor: t.palette.primary.main,
                  },
                })}
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
                    I help teams turn business goals into clear, usable product
                    systems. I work closely with engineering and product
                    partners to translate ideas into scalable UX patterns and
                    practical solutions. I bring structure to complex projects
                    and help teams move from confusion to clarity.
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
                display: { xs: "none", sm: "block" }, // hide on phones, show on tablet+
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
                boxShadow:
                  t.palette.mode === "dark" ? t.shadows[3] : t.shadows[1],
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
                        const activeBg = isDark
                          ? t.palette.grey[800]
                          : t.palette.common.white;

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
                            ? t.palette.getContrastText(activeBg)
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
                Product Designer with 15+ years of experience working on
                large, complex platforms across government, enterprise, and
                secure environments. I focus on system-level thinking, design
                patterns, and bridging communication between product and
                engineering teams. I’m good at spotting patterns fast,
                simplifying complexity, and helping teams align around a shared
                direction.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Engineers often come to me to translate product ideas into UI
                structures. Junior designers come to me for guidance and career
                advice. I lead through clarity, consistency, and practical
                decision-making — not titles — and I am at my best in
                Principal, Staff, and Lead UX roles where strategy and
                hands-on work meet.
              </Typography>
            </SectionBlock>

            {/* CORE SKILLS & EXPERTISE SECTION */}
            <SectionBlock id="skills" label="Core skills & expertise">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Design Leadership &amp; Strategy:</strong> Vision
                    &amp; Roadmapping · UX Governance · Mentorship ·
                    Cross-Functional Alignment · Accessibility Advocacy
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Design Systems &amp; Accessibility:</strong> Figma
                    · Material Design · MUI · Design Tokens · Component
                    Lifecycle Management · WCAG 2.2 / Section 508 · Trusted
                    Tester Certified
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>AI-Enhanced Design Workflow:</strong> ChatGPT ·
                    Gemini · Figma AI · Replit · Generative AI for UX Writing
                    &amp; Ideation · Low-Code / No-Code Prototyping
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Technical Collaboration:</strong> HTML/CSS/JS
                    (Responsive Prototyping) · Design Tokens Integration ·
                    Jira · Confluence
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Research &amp; UXOps:</strong> Information
                    Architecture · Usability Testing · Human-AI Interaction ·
                    Agile UX · UXOps Frameworks
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* EXPERIENCE SECTION */}
            <SectionBlock id="experience" label="Experience">
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Booz Allen Hamilton — Washington, DC
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                2009 – Present
              </Typography>

              {/* Current era chip */}
              <Box sx={{ mt: 1.5 }}>
                <Chip
                  label="Current era: UX Strategy & Systems Leadership"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Box sx={{ mt: 2.5 }}>
                {/* Era 1 */}
                <EraItem
                  id="era1"
                  title="Era 1 — Foundations (Web & Early UX)"
                  subtitle="Web Designer → Usability Specialist"
                  open={openEras.era1}
                  onToggle={() => toggleEra("era1")}
                  tags={[
                    "Visual Design",
                    "HTML/CSS",
                    "Front-end Collaboration",
                    "Usability Testing",
                  ]}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "70ch" }}
                  >
                    Started as a visual / web designer supporting early federal systems,
                    focusing on clean layouts, basic UX practices, and learning how to
                    ship production-ready UI in partnership with engineers.
                  </Typography>
                  <Box
                    component="ul"
                    sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
                  >
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Built and refined UI for DHS and ODNI applications, translating
                        requirements into usable page layouts and navigation.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Ran basic usability reviews and worked with teams to fix common
                        pain points such as unclear labels, cluttered layouts, and
                        inconsistent flows.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Helped standardize early UI patterns (buttons, tables, forms)
                        that reduced ad-hoc “one-off” screens and made future changes
                        easier to implement.
                      </Typography>
                    </li>
                  </Box>
                </EraItem>

                {/* Era 2 */}
                <EraItem
                  id="era2"
                  title="Era 2 — Human Factors & Applied Research"
                  subtitle="Human Factors Specialist → Human Factors Scientist, Lead"
                  open={openEras.era2}
                  onToggle={() => toggleEra("era2")}
                  tags={[
                    "Human Factors",
                    "Usability Studies",
                    "Task Analysis",
                    "Cognitive Load",
                  ]}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "70ch" }}
                  >
                    Moved into human factors, bringing a more analytical, evidence-based
                    lens to UX decisions for complex intelligence and defense systems.
                    Work focused on making high-risk workflows safer, more efficient, and
                    easier to learn.
                  </Typography>
                  <Box
                    component="ul"
                    sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
                  >
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Led usability evaluations, task analyses, and performance studies
                        to understand how analysts and operators actually used
                        mission-critical tools.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Turned research findings into clear, prioritized UX
                        recommendations that guided roadmap decisions and design changes.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Partnered with product and engineering leads to reduce cognitive
                        load, streamline workflows, and mitigate error-prone interactions
                        in secure environments.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Established repeatable research practices that teams could reuse
                        instead of treating each study as a one-off effort.
                      </Typography>
                    </li>
                  </Box>
                </EraItem>

                {/* Era 3 */}
                <EraItem
                  id="era3"
                  title="Era 3 — UX Design & Product Execution"
                  subtitle="UX Designer → UX Designer, Lead"
                  open={openEras.era3}
                  onToggle={() => toggleEra("era3")}
                  tags={[
                    "End-to-End UX",
                    "Interaction Design",
                    "Complex Systems",
                    "Agile Delivery",
                  ]}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "70ch" }}
                  >
                    Shifted into end-to-end product design, owning UX for large, data-heavy
                    federal platforms. Acted as a bridge between product owners and
                    multiple engineering teams to make complex workflows understandable and
                    buildable.
                  </Typography>
                  <Box
                    component="ul"
                    sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
                  >
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Designed flows, wireframes, and detailed interaction patterns for
                        complex search, workflow, and reporting tools used across
                        multiple programs.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Worked closely with tech leads to translate constraints into
                        pragmatic UX decisions, ensuring designs were feasible and could
                        be delivered incrementally in Agile environments.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Introduced reusable patterns (tables, filters, detail views,
                        error handling) that reduced design and engineering rework across
                        related products.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Mentored designers on structuring problem spaces, documenting
                        decisions, and communicating clearly with non-design partners.
                      </Typography>
                    </li>
                  </Box>
                </EraItem>

                {/* Era 4 */}
                <EraItem
                  id="era4"
                  title="Era 4 — UX Strategy & Systems Leadership"
                  subtitle="UX Strategist, Lead"
                  open={openEras.era4}
                  onToggle={() => toggleEra("era4")}
                  isLast
                  tags={[
                    "Design Strategy",
                    "Design Systems",
                    "Org-level UX",
                    "Cross-functional Leadership",
                  ]}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "70ch" }}
                  >
                    Operating as a systems-oriented UX leader for multi-year, multi-team
                    programs. Focused on bringing structure to ambiguity, aligning
                    stakeholders, and scaling UX practices in ways that feel practical to
                    engineering and product partners.
                  </Typography>
                  <Box
                    component="ul"
                    sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
                  >
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Defined UX frameworks and guidelines used across major FBI and
                        DOJ programs, giving teams shared patterns instead of starting
                        from scratch on every screen.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Partnered with product leads to turn high-level mission and
                        business goals into clear UX objectives, roadmaps, and design
                        priorities for delivery teams.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Influenced system and API decisions by framing trade-offs in terms
                        of user impact, operational risk, and long-term maintainability.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Provided coaching and design direction to UX practitioners across
                        programs, helping them deliver consistent experiences while still
                        supporting team autonomy.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" color="text.secondary">
                        Helped move teams toward design-system thinking: shared tokens,
                        components, and interaction patterns that made it easier to ship
                        accessible, consistent interfaces.
                      </Typography>
                    </li>
                  </Box>
                </EraItem>
              </Box>

              {/* Key Federal Programs (unchanged) */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Key federal programs (selected)
                </Typography>
                <Box
                  component="ul"
                  sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
                >
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Federal Bureau of Investigation (FBI):</strong> Chameleon,
                      DELTA, NGNCP, EPAS
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Department of Justice (DOJ):</strong> USTP
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Defense Intelligence Agency (DIA):</strong> JIDO, OSCAR,
                      COUGAR, Black Forest, CRATE
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Department of Homeland Security (DHS):</strong> SEVIS II,
                      ICE CMM, RAMP
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>U.S. EUCOM / Joint Analysis Center:</strong> IPAS
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Director of National Intelligence (ODNI):</strong> DRAMRS
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Food and Drug Administration (FDA):</strong> CDRH
                    </Typography>
                  </li>
                </Box>
              </Box>
            </SectionBlock>


            {/* PROJECTS HIGHLIGHTS SECTION */}
            <SectionBlock id="projects" label="Projects highlights">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Enterprise Workflow Platform (2023–2025):</strong>{" "}
                    Designed the UX for a low-code platform used to build
                    forms, workflows, and dashboards. Focused on clarity,
                    reusable patterns, and reducing the amount of custom work
                    engineering teams had to maintain. Helped teams move faster
                    by giving them simple structures to start from.
                  </Typography>
                </li>

                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Accessibility Modernization Program (2016–2019):</strong>{" "}
                    Improved usability and accessibility across 12 DOJ
                    applications. Created shared components that teams could
                    reuse instead of rebuilding from scratch. Supported testing
                    and refinement work that reduced support issues and made the
                    products easier to use.
                  </Typography>
                </li>

                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Intelligence Community Systems (2014–2018):</strong>{" "}
                    Designed UI patterns and workflows for several intelligence
                    and defense applications. Worked with multiple teams to
                    bring consistency to large systems and improve how
                    information was presented to analysts. Helped introduce
                    accessibility and UX standards that other groups later
                    adopted.
                  </Typography>
                </li>

                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>AI-Driven Prototyping Pilot (2023):</strong> Explored
                    how tools like Figma AI and ChatGPT could speed up early
                    design work. Proved out approaches that reduced manual
                    prototyping and helped teams get ideas in front of
                    stakeholders earlier.
                  </Typography>
                </li>
              </Box>
            </SectionBlock>

            {/* EDUCATION & CERTIFICATIONS SECTION */}
            <SectionBlock id="education" label="Education & certifications">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Bachelor in Business Administration</strong> (UMSS
                    – Bolivia)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Artificial Intelligence Foundational</strong> (Booz
                    Allen)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Artificial Intelligence, Enablement</strong> (Booz
                    Allen)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Certified Usability Analyst</strong> (Human Factors
                    International)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Trusted Tester</strong> – Office of Accessible
                    Systems &amp; Technology (DHS)
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
                    <strong>UX Master Certification</strong> (Nielsen Norman
                    Group)
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
      audioRef.current
        .play()
        .catch(() => {
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
          backgroundColor:
            t.palette.mode === "dark"
              ? t.palette.grey[900]
              : t.palette.action.hover,
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
              rel: href.startsWith("http")
                ? "noopener noreferrer"
                : undefined,
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

// ⬇️ Updated EraItem only, to match screenshot + ARIA

function EraItem({
  id,
  title,
  subtitle,
  open,
  onToggle,
  isLast = false,
  tags = [],
  children,
}) {
  const theme = useTheme();
  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.divider;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        pb: isLast ? 0 : 3,
        position: "relative",
        "&:hover .era-icon-box": {
          borderColor: open ? activeColor : theme.palette.text.primary,
          transform: "scale(1.05)",
        },
      }}
    >
      {/* Left Column: Icon + Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 32,
        }}
      >
        {/* Icon */}
        <Box
          className="era-icon-box"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: open ? activeColor : inactiveColor,
            color: open ? activeColor : theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            transition: "all 0.25s ease-out",
            boxShadow: open ? `0 0 0 4px ${alpha(activeColor, 0.16)}` : "none",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: "1.1rem" }} />
        </Box>

        {/* Vertical line */}
        {!isLast && (
          <Box
            sx={{
              width: 2,
              bgcolor: open ? alpha(activeColor, 0.4) : inactiveColor,
              flexGrow: 1,
              mt: -0.5,
              transition: "background-color 0.25s ease-out",
            }}
          />
        )}
      </Box>

      {/* Right Column: Content */}
      <Box sx={{ flexGrow: 1, pt: 0.5 }}>
        <Box
          component="button"
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-content`}
          aria-label={`${title} details`}
          sx={{
            width: "100%",
            border: "none",
            background: "none",
            padding: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                color: open ? activeColor : "text.primary",
                transition: "color 0.2s ease-out",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box sx={{ color: "text.secondary", mt: 0.25 }}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </Box>

        <Collapse in={open}>
          <Box id={`${id}-content`}>
            {children}

            {tags.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.75, flexWrap: "wrap", gap: 1 }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
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
