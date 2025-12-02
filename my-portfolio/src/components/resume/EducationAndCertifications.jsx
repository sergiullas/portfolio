// src/components/resume/EducationAndCertifications.jsx
// Education + Certifications section with small cards.

// Updated: 2025-12-01

import * as React from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";

import { EDUCATION, CERTIFICATIONS } from "../../content/educationData.js";
import EducationCard from "./EducationCard.jsx";
import CertificationCard from "./CertificationCard.jsx";

export default function EducationAndCertifications() {
  const hasEducation = EDUCATION && EDUCATION.length > 0;
  const hasCerts = CERTIFICATIONS && CERTIFICATIONS.length > 0;

  if (!hasEducation && !hasCerts) return null;

  return (
    <Box
      component="section"
      id="education-certifications"
      aria-labelledby="education-certifications-heading"
      sx={{ mt: 6 }}
    >
      <Stack spacing={3}>
        {/* Section Heading */}
        <Box>
          <Typography
            id="education-certifications-heading"
            variant="h4"
            component="h2"
            gutterBottom
          >
            Education &amp; Certifications
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Selected formal education and professional credentials relevant to product, UX, and
            systems work.
          </Typography>
        </Box>

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
    </Box>
  );
}
