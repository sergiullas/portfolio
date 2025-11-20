// src/components/Section.jsx
import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

/**
 * Section
 *
 * Props:
 * - variant: "white" | "soft" | "dark"
 * - fullHeight: boolean → min-height: 100vh + vertical centering
 * - layout: "stack" | "split"
 *    - "stack": title above content (default)
 *    - "split": sticky title in left column, content in right
 */

const BG_MAP = {
  white: "background.default",
  soft: "background.soft",
  dark: "background.dark",
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
      data-section-variant={variant}
      sx={(theme) => ({
        bgcolor: BG_MAP[variant] ?? "transparent",
        color: "inherit",
        minHeight: fullHeight ? "100vh" : "auto",
        display: "flex",
        alignItems: fullHeight ? "center" : "flex-start",
        overflow: "visible",
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
          <Box
            sx={(theme) => ({
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(12rem, 16rem) minmax(0, 1fr)",
              },
              columnGap: { xs: 4, md: 8 },
              rowGap: { xs: 4, md: 0 },
            })}
          >
            <Box
              sx={(theme) => ({
                position: { md: "sticky" },
                top: { md: theme.spacing(12) },
                alignSelf: "flex-start",
                mb: { xs: 2, md: 0 },
              })}
            >
              {title && (
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 500,
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                maxWidth: "65ch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                "& > *": {
                  width: "100%",
                },
              }}
            >
              {children}
            </Box>
          </Box>
        ) : (
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