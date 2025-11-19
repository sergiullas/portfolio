// src/components/Section.jsx
import * as React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const BG_MAP = {
  white: "background.default",
  soft: "background.soft",
  dark: "background.paper",
};

export default function Section({
  id,
  title,
  children,
  variant = "white",
  as = "section",
  align = "left",
  fullHeight = false,
  layout = "stack", // "stack" | "split"
}) {
  return (
    <Box
      id={id}
      component={as}
      sx={(theme) => ({
        bgcolor: BG_MAP[variant] ?? "transparent",
        color:
          variant === "dark"
            ? theme.palette.common.white
            : theme.palette.text.primary,
        minHeight: fullHeight ? "100vh" : "auto",
        display: "flex",
        alignItems: fullHeight ? "center" : "flex-start",
        overflow: "visible", // required for sticky
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 10, md: 16 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {layout === "split" ? (
          <Grid container spacing={6}>
            {/* LEFT STICKY TITLE COLUMN */}
            <Grid
              item
              xs={12}
              md={4}
              sx={(theme) => ({
                position: { md: "sticky" },
                top: { md: theme.spacing(12) },
                alignSelf: "flex-start",
              })}
            >
              {title && (
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  {title}
                </Typography>
              )}
            </Grid>

            {/* RIGHT CONTENT COLUMN */}
            <Grid item xs={12} md={8}>
              <Box sx={{ maxWidth: "65ch" }}>{children}</Box>
            </Grid>
          </Grid>
        ) : (
          // DEFAULT STACK LAYOUT (hero)
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: align === "center" ? "center" : "flex-start",
            }}
          >
            {title && (
              <Typography
                variant="h2"
                component="h2"
                sx={{ mb: 3, fontWeight: 500 }}
              >
                {title}
              </Typography>
            )}

            {children}
          </Box>
        )}
      </Container>
    </Box>
  );
}
