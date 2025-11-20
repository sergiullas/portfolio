// src/components/PageContainer.jsx
import * as React from "react";
import { Container } from "@mui/material";

function PageContainer({ children, ...props }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, sm: 8, md: 10 },
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default PageContainer;
