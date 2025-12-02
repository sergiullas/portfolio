// src/components/resume/EducationCard.jsx

import * as React from "react";
import { Card, Stack, Typography, Box } from "@mui/material";

export default function EducationCard({
  degree,
  field,
  institution,
  location,
  startYear,
  endYear,
  notes,
  logo,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",          // ⬅️ force full width of Grid item
        boxSizing: "border-box",
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack spacing={0} sx={{ flexGrow: 1 }}>
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

      {logo && (
        <Box
          component="img"
          src={logo}
          alt={`${institution} logo`}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            objectFit: "contain",
          }}
        />
      )}
    </Card>
  );
}
