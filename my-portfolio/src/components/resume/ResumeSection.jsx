// src/components/resume/ResumeSection.jsx
import * as React from "react";
import { Box, Divider, Typography, Link as MuiLink } from "@mui/material";

export default function ResumeSection({ id, label, children }) {
  const headingId = `${id}-heading`;

  const handleCopyLink = () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard?.writeText(url);
    } catch {
      // ignore
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
