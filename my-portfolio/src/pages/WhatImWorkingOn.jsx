// src/pages/WhatImWorkingOn.jsx
import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Link as MuiLink,
  useTheme,
} from "@mui/material";

export default function WhatImWorkingOn() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section heading */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 600,
            mb: { xs: 4, md: 6 },
          }}
        >
          What I&apos;m working on.
        </Typography>

        {/* Two-card layout */}
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="stretch"
        >
          {/* Card 1 – Portfolio */}
          <Grid item xs={12} md={6}>
            <TileCard
              eyebrow="Now"
              title="SergioAntezana.com"
              subtitle="A portfolio built with React, MUI, Figma, GitHub, and AI as a design partner."
              body={[
                "I’m experimenting with a portfolio that shows how I think, not just what the UI looks like.",
                "The goal is a simple, honest site that’s easy to maintain and reflects real system-level UX work.",
              ]}
              linkHref="https://sergioantezana.com"
              linkLabel="Visit site"
            />
          </Grid>

          {/* Card 2 – UX Katarzis */}
          <Grid item xs={12} md={6}>
            <TileCard
              eyebrow="In progress"
              title="UX Katarzis (GPT)"
              subtitle="A UX companion for both new and experienced designers."
              body={[
                "Built from the patterns I use when solving UX and product problems.",
                "Helps structure thinking around goals, workflows, and patterns instead of jumping straight to screens.",
              ]}
              linkHref="https://chatgpt.com/g/g-U8o9KZ3e3-ux-katarzis"
              linkLabel="Try UX Katarzis"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TileCard({ eyebrow, title, subtitle, body, linkHref, linkLabel }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: 4,
        bgcolor:
          theme.palette.mode === "light"
            ? theme.palette.common.white
            : theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "light"
            ? "0 18px 30px rgba(0,0,0,0.06)"
            : "0 18px 30px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top visual placeholder – replace with image/illustration later */}
      <Box
        sx={{
          minHeight: 180,
          bgcolor:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          {eyebrow}
        </Typography>
      </Box>

      {/* Text block */}
      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {subtitle}
        </Typography>

        {body?.map((p) => (
          <Typography
            key={p.slice(0, 20)}
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.25 }}
          >
            {p}
          </Typography>
        ))}

        <MuiLink
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{ display: "inline-flex", mt: 1 }}
        >
          <Button
            variant="text"
            size="small"
            sx={{
              px: 0,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            {linkLabel} &nbsp;›
          </Button>
        </MuiLink>
      </Box>
    </Box>
  );
}
