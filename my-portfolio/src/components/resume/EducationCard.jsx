// src/components/resume/EducationCard.jsx
// Card for a single degree.

import * as React from "react";
import { Card, Stack, Typography } from "@mui/material";

export default function EducationCard({
  degree,
  field,
  institution,
  location,
  startYear,
  endYear,
  notes,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={600}>
          {degree}
          {field ? `, ${field}` : null}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {institution}
          {location ? ` · ${location}` : null}
        </Typography>

        {(startYear || endYear) && (
          <Typography variant="body2" color="text.secondary">
            {startYear && endYear ? `${startYear} – ${endYear}` : startYear || endYear}
          </Typography>
        )}

        {notes && (
          <Typography variant="body2" color="text.secondary">
            {notes}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}
