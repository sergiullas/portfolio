// src/components/Section.jsx
import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Section({ id, title, children }) {
  return (
    <Box id={id} sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        {title && (
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
