// src/components/resume/CertificationCard.jsx
// Small responsive card for a single certification.

import * as React from "react";
import { Card, Box, Stack, Typography, Link as MuiLink } from "@mui/material";

export default function CertificationCard({ title, issuer, year, logo, href }) {
  const content = (
    <Card
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {issuer}
          {year ? ` · ${year}` : null}
        </Typography>
      </Stack>

      {logo ? (
        <Box
          component="img"
          src={logo}
          alt={`${issuer} logo`}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            objectFit: "contain",
          }}
        />
      ) : null}
    </Card>
  );

  if (href) {
    return (
      <MuiLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{ display: "block" }}
      >
        {content}
      </MuiLink>
    );
  }

  return content;
}
