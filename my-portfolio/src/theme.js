// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      background: {
        default: mode === "light" ? "#f7f8fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "'Inter', system-ui, sans-serif",
      h2: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      body1: { lineHeight: 1.7 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 200ms ease, color 200ms ease",
          },
        },
      },
    },
  });
