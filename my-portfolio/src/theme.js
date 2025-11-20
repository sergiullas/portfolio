// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        // ⭐ Required for visible focus ring
        main: mode === "light" ? "#1a73e8" : "#8AB4FF",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#191917",
        paper: mode === "light" ? "#FFFFFF" : "#2C2C2C",
        soft: mode === "light" ? "#F3F3F3" : "#111111",

        // ⭐ Add this — dedicated dark background for dark sections
        dark: mode === "light" ? "#111111" : "#000000",
      },
      text: {
        primary: mode === "light" ? "#191917" : "#FFFFFF",
        secondary: mode === "light" ? "#555555" : "#C7C7C7",
      },
    },

    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontWeight: 500,
        fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontWeight: 500,
        fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
      },
      h3: {
        fontWeight: 500,
        fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      body1: {
        fontSize: "1.05rem",
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "0.95rem",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        letterSpacing: "0.04em",
      },
    },

    spacing: 8,

    components: {
      // ⭐ Global WCAG-compliant focus ring
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focusVisible": {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 3,
            },
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: ({ theme }) => ({
            // Apply high contrast text only in dark sections
            '[data-section-variant="dark"] &': {
              color: theme.palette.grey[200], // or theme.palette.text.primary
            },
          }),
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "lg",
        },
        styleOverrides: {
          root: {
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          },
        },
      },
    },
  });
