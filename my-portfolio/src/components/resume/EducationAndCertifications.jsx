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
        <Stack spacing={3}>
          {/* AI & Emerging Tech */}
          <Stack spacing={1.5}>
            <Typography variant="overline" sx={{ letterSpacing: 1, color: "text.secondary" }}>
              AI & Emerging Technology
            </Typography>

            <Grid container spacing={2}>
              {CERTIFICATIONS.filter((c) => c.category === "AI").map((cert) => (
                <Grid item xs={12} sm={6} md={4} key={cert.id}>
                  <CertificationCard {...cert} />
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* UX / HCI / Accessibility */}
          <Stack spacing={1.5}>
            <Typography variant="overline" sx={{ letterSpacing: 1, color: "text.secondary" }}>
              UX, Human Factors & Accessibility
            </Typography>

            <Grid container spacing={2}>
              {CERTIFICATIONS.filter((c) => ["UX", "Human Factors", "Accessibility"].includes(c.category))
                .map((cert) => (
                  <Grid item xs={12} sm={6} md={4} key={cert.id}>
                    <CertificationCard {...cert} />
                  </Grid>
                ))}
            </Grid>
          </Stack>

          {/* Agile & Coaching */}
          <Stack spacing={1.5}>
            <Typography variant="overline" sx={{ letterSpacing: 1, color: "text.secondary" }}>
              Agile & Coaching
            </Typography>

            <Grid container spacing={2}>
              {CERTIFICATIONS.filter((c) => c.category === "Agile").map((cert) => (
                <Grid item xs={12} sm={6} md={4} key={cert.id}>
                  <CertificationCard {...cert} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
