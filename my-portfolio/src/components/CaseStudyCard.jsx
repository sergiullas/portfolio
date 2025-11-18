// src/components/CaseStudyCard.jsx
import * as React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function CaseStudyCard({ title, problem, role, outcomes }) {
  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Problem:</strong> {problem}
            <br />
            <strong>Role:</strong> {role}
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Outcomes
          </Typography>

          <Box component="ul" sx={{ pl: 3 }}>
            {outcomes.map((o) => (
              <li key={o}>
                <Typography color="text.secondary">{o}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
