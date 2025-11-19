// src/components/EditorialHero.jsx
import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import heroImage from "../assets/hero-sergio.jpg";

export default function EditorialHero({
  kicker = "Senior UX & Product Designer",
  title = "You have to keep learning — because the world keeps changing.",
  subtitle = "Actively applying AI knowledge to design scalable, human-centered products.",
}) {
  return (
    <Box sx={{ position: "relative"}}>
      <Grid
        container
        spacing={{ xs: 6, md: 10 }}
        alignItems="center"
      >
        {/* LEFT: text block */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: { xs: "38rem", md: "32rem" } }}>
            <Typography
              variant="body2"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                mb: 2,
                opacity: 0.7,
              }}
            >
              {kicker}
            </Typography>

            <Typography variant="h1" component="h1" gutterBottom>
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                maxWidth: "40rem",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT: editorial photo */}
        <Grid item xs={12} md={6}>
          <Box
            sx={(theme) => ({
              maxWidth: 520,
              ml: { xs: 0, md: "auto" },
              aspectRatio: "4 / 3",
              overflow: "hidden",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            })}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Sergio sitting cross-legged on a boardwalk facing the ocean at sunset."
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "grayscale(100%) contrast(1.05)",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
