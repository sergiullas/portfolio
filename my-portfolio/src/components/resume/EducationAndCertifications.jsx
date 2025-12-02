// src/components/resume/EducationAndCertifications.jsx
// Education + Certifications section with small cards.

// Updated: 2025-12-01

import * as React from "react";
import { Stack, Typography, Grid } from "@mui/material";

import { EDUCATION, CERTIFICATIONS } from "../../content/educationData.js";
import EducationCard from "./EducationCard.jsx";
import CertificationCard from "./CertificationCard.jsx";

export default function EducationAndCertifications() {
  const hasEducation = EDUCATION && EDUCATION.length > 0;
  const hasCerts = CERTIFICATIONS && CERTIFICATIONS.length > 0;

  if (!hasEducation && !hasCerts) return null;

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "72ch" }}>
        Selected formal education and professional credentials relevant to product, UX, and systems
        work.
      </Typography>

      {/* Education */}
      {hasEducation && (
        <Stack spacing={1.5}>
          <Typography
            variant="overline"
            component="h3"
            sx={{ letterSpacing: 1, color: "text.secondary" }}
          >
            Education
          </Typography>

          <Grid container spacing={2}>
            {EDUCATION.map((item) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={item.id}
              >
                <EducationCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}

      {/* Certifications */}
      {hasCerts && (
        <Stack spacing={1.5}>
          <Typography
            variant="overline"
            component="h3"
            sx={{ letterSpacing: 1, color: "text.secondary" }}
          >
            Certifications
          </Typography>

          <Grid container spacing={2}>
            {CERTIFICATIONS.map((cert) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={cert.id}
              >
                <CertificationCard {...cert} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
