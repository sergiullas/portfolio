// -----------------------------------------------------------------------------
// components/CaseStudyCard.jsx
// Card component to showcase a case study/portfolio item.
//
// - Receives data (title, summary, tags, links) and renders a clickable card.
// - Stateless aside from hover/focus styling handled by the parent or theme.
//
// Accessibility
// - Card uses semantic headings and links; ensure the entire card is reachable by
//   keyboard and has discernible link text.
// - Provide alt text for thumbnails and aria-labels for icon links.

// How to customize
// - Add metrics, status badges, or interaction states (selected/featured).
// - Configure layout (vertical/horizontal) via props for different grids.
// -----------------------------------------------------------------------------
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
