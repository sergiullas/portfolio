import * as React from "react";
import { Card, CardContent, Typography, Stack, Chip, Grid } from "@mui/material";

export default function SkillGroup({ title, skills }) {
  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}