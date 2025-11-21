// Updated: 2025-11-20 · 19:15 ET  // 7:15 PM · Thursday, November 20, 2025

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

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";

const NAME_AUDIO_SRC = ""; // Optional: point to /audio/sergio-antezana-name.mp3 when available

export default function MyResumePage() {
  const { setShowName } = useHeaderNameVisibility();
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the hero (name block) is visible ≥ 40%, hide header name.
        // When it scrolls out of that threshold, show header name again.
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
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
      sx={(t) => ({
        minHeight: "100vh",
        bgcolor: t.palette.background.default,
        color: t.palette.text.primary,
        py: { xs: 4, md: 8 },
      })}
    >
      {/* Wider container, but constrain readable line length inside */}
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 880, mx: "auto" }}>
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
                  src="" // Optional: add headshot
                  sx={{ width: 56, height: 56 }}
                />

                <Box>
                  <NameWithPronunciation />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, maxWidth: "40rem" }}
                  >
                    Creating systems that make complex, high-stakes work feel
                    lighter — with accessibility, clarity, and long-term
                    product health built in.
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
                      primary="Eastern Time (ET)"
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

            {/* ABOUT SECTION */}
            <SectionBlock id="about" label="About">
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 70 + "ch" }}
              >
                For 15+ years, I&apos;ve designed inside environments where the
                stakes are high and the complexity is real — intelligence
                spaces, justice systems, enterprise platforms with thousands of
                moving parts. In every one of them, my work starts from a
                simple belief: people deserve tools that make their world feel
                lighter, not heavier.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, maxWidth: 70 + "ch" }}
              >
                I build systems that scale, patterns that reduce cognitive
                load, and experiences that let humans focus on the work that
                matters. The wins I care about aren&apos;t flashy dribbble shots,
                but workflows that finally make sense and tasks that take
                minutes instead of hours.
              </Typography>
            </SectionBlock>

            {/* EXPERIENCE SECTION (placeholder structure) */}
            <SectionBlock id="experience" label="Experience">
              <JobBlock
                company="High-stakes environments"
                role="Senior UX & Product Designer"
                period="2010 — Present"
                summary="Leading UX and product design across complex domains with accessibility, systems thinking, and team enablement at the core."
              />
              {/* TODO: Add specific roles/organizations */}
            </SectionBlock>

            {/* Selected work section can be added later */}
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
                rel: href.startsWith("http") ? "noreferrer" : undefined,
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
  return (
    <Box id={id} sx={{ mt: 2 }}>
      <Typography
        variant="overline"
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          mb: 1,
          opacity: 0.7,
        }}
      >
        {label}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );
}

function JobBlock({ company, role, period, summary }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        {company}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {role} · {period}
      </Typography>
      {summary && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          {summary}
        </Typography>
      )}
    </Box>
  );
}
