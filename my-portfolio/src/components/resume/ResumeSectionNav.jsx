// src/components/resume/ResumeSectionNav.jsx
import * as React from "react";
import { Box, Stack } from "@mui/material";

export default function ResumeSectionNav({
  items,
  activeSection,
  onNavClick,
}) {
  return (
    <Box
      component="nav"
      aria-label="Resume sections"
      sx={(t) => ({
        display: { xs: "none", sm: "block" },
        position: { xs: "static", md: "sticky" },
        top: { md: 88 },
        zIndex: 1,
        mb: { xs: 2, md: 3 },
        pb: 1,
        borderBottom: {
          xs: `1px solid ${t.palette.divider}`,
          md: "none",
        },
        backgroundColor:
          t.palette.mode === "dark"
            ? t.palette.grey[900]
            : t.palette.background.paper,
        boxShadow: t.palette.mode === "dark" ? t.shadows[3] : t.shadows[1],
        borderRadius: 1,
      })}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{
          overflowX: "auto",
          py: 0.5,
        }}
      >
        {items.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => onNavClick?.(id)}
              aria-current={isActive ? "true" : undefined}
              sx={(t) => {
                const isDark = t.palette.mode === "dark";
                const activeBg = isDark
                  ? t.palette.grey[800]
                  : t.palette.common.white;

                return {
                  border: "none",
                  backgroundColor: isActive ? activeBg : "transparent",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  cursor: "pointer",
                  outlineOffset: 2,
                  transition:
                    "background-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease",
                  opacity: isActive ? 1 : 0.85,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? t.palette.getContrastText(activeBg)
                    : t.palette.text.secondary,
                  ...(isActive
                    ? { boxShadow: t.shadows[1] }
                    : {
                        "&:hover": {
                          backgroundColor: isDark
                            ? t.palette.grey[800]
                            : t.palette.action.hover,
                        },
                      }),
                };
              }}
            >
              {label}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
