// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        // ⭐ Required for visible focus ring
        main: mode === "light" ? "#1B4DD8" : "#8AB4FF",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#191917",
        paper: mode === "light" ? "#FFFFFF" : "#242423",
        soft: mode === "light" ? "#F3F3F3" : "#111111",
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
