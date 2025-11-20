// src/components/LayoutShell.jsx
import * as React from "react";
import { Box, Link as MuiLink } from "@mui/material";
import Header from "./Header.jsx";

function LayoutShell({ mode, setMode, children }) {
  return (
    <>
      {/* Skip link for keyboard users */}
      <MuiLink
        href="#main"
        sx={(t) => ({
          position: "fixed",
          left: t.spacing(2),
          top: t.spacing(2),
          zIndex: t.zIndex.tooltip + 1,
          transform: "translateY(-200%)",
          "&:focus-visible": {
            transform: "translateY(0)",
            backgroundColor: t.palette.background.paper,
            padding: t.spacing(0.5, 1.5),
            borderRadius: 999,
            boxShadow: t.shadows[2],
          },
        })}
      >
        Skip to main content
      </MuiLink>

      <Header mode={mode} setMode={setMode} />

      <Box
        component="main"
        id="main"
        sx={{
          pt: { xs: 8, sm: 2 }, // pushes content below fixed header
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default LayoutShell;
