// src/pages/MyResume.jsx
// Minimal, two-column portfolio layout inspired by chanhdai.com, built with MUI.

import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";

export default function MyResumePage() {
  return (
    <Box
      sx={(t) => ({
        minHeight: "100vh",
        bgcolor: t.palette.background.default,
        color: t.palette.text.primary,
        py: { xs: 4, md: 8 },
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(240px, 280px) minmax(0, 1fr)",
            },
            columnGap: { xs: 4, md: 8 },
            rowGap: { xs: 6, md: 0 },
          }}
        >
          {/* LEFT: Identity / meta column */}
          <Stack spacing={3} sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
            <Box>
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

              <Typography
                variant="h4"
                component="h1"
                sx={{ mt: 1, fontWeight: 600 }}
              >
                Sergio Antezana
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1.5, maxWidth: "32rem" }}
              >
                Senior UX & Product Designer focused on complex systems, design
                ops, and accessibility — building tools that make high-stakes
                work feel lighter and more human.
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: "0.16em" }}
              >
                Currently
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Senior Product & UX Designer · Remote
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: "0.16em" }}
              >
                Links
              </Typography>

              <Stack spacing={0.5} sx={{ mt: 1 }}>
                <MuiLink
                  href="mailto:santezana@nayas.com"
                  underline="hover"
                  color="inherit"
                >
                  Email
                </MuiLink>
                <MuiLink
                  href="https://www.linkedin.com/in/santezana/"
                  target="_blank"
                  rel="noreferrer"
                  underline="hover"
                  color="inherit"
                >
                  LinkedIn
                </MuiLink>
                <MuiLink
                  href="https://github.com/sergiullas"
                  target="_blank"
                  rel="noreferrer"
                  underline="hover"
                  color="inherit"
                >
                  GitHub
                </MuiLink>
                {/* Add more as needed */}
              </Stack>
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: "0.16em" }}
              >
                Resume
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                <MuiLink
                  href="#"
                  underline="hover"
                  color="inherit"
                  // TODO: point this to your actual resume URL
                >
                  View resume
                </MuiLink>
                <MuiLink
                  href="#"
                  underline="hover"
                  color="inherit"
                  // TODO: point this to your PDF resume
                >
                  Download PDF
                </MuiLink>
              </Stack>
            </Box>
          </Stack>

          {/* RIGHT: Content column */}
          <Stack spacing={6}>
            {/* About */}
            <SectionBlock id="about" label="About">
              <Typography variant="body1" color="text.secondary">
                For 15+ years, you’ve designed inside environments where the
                stakes are high and the complexity is real — intelligence
                spaces, justice systems, enterprise platforms with thousands of
                moving parts. Your work starts from a simple belief: people
                deserve tools that make their world feel lighter, not heavier.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                You build systems that scale, patterns that reduce cognitive
                load, and experiences that let humans focus on the work that
                matters. The wins you care about aren’t flashy dribbble shots,
                but workflows that finally make sense and tasks that take
                minutes instead of hours.
              </Typography>
            </SectionBlock>

            {/* Experience (placeholder structure) */}
            <SectionBlock id="experience" label="Experience">
              <JobBlock
                company="High-stakes environments"
                role="Senior UX & Product Designer"
                period="2010 — Present"
                summary="Leading UX and product design across complex domains with accessibility, systems thinking, and team enablement at the core."
              />
              {/* Add more JobBlock entries as you flesh this out */}
            </SectionBlock>

            {/* Selected Work */}
            <SectionBlock id="work" label="Selected Work">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Case studies are under clearance constraints. A password-gated
                view with more detailed stories is available on request.
              </Typography>
              <Stack spacing={2}>
                <ProjectRow
                  title="Modernizing a mission-critical review workflow"
                  role="Lead UX Designer · Systems Thinker · Accessibility Lead"
                />
                <ProjectRow
                  title="Reimagining an internal intelligence platform"
                  role="Lead Product Designer · Research Partner"
                />
                <ProjectRow
                  title="Improving decision-making in a high-stakes analytical tool"
                  role="Lead UX Researcher · Interaction Designer"
                />
              </Stack>
            </SectionBlock>

            {/* Contact */}
            <SectionBlock id="contact" label="Contact">
              <Typography variant="body1" color="text.secondary">
                Open to roles and collaborations where rigorous thinking,
                complex problem spaces, and long-term product health matter.
                Recruiters, design leaders, and teams working on hard problems —
                feel free to reach out.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Best contact:{" "}
                <MuiLink
                  href="mailto:santezana@nayas.com"
                  underline="hover"
                  color="inherit"
                >
                  santezana@nayas.com
                </MuiLink>
              </Typography>
            </SectionBlock>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// Small helper components to keep layout minimal & readable

function SectionBlock({ id, label, children }) {
  return (
    <Box id={id}>
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

function ProjectRow({ title, role }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {role}
      </Typography>
    </Box>
  );
}
