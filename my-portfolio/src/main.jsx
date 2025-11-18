// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "./theme.js";
// if you already had: import "./index.css"; you can keep it

// Decide the initial theme mode:
// 1) use saved preference if present
// 2) else use system preference
// 3) else default to "light"
function getInitialMode() {
  if (typeof window === "undefined") return "light";

  // Saved preference
  const stored = window.localStorage.getItem("theme-mode");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // System preference
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function Root() {
  // controls the light/dark theme
  const [mode, setMode] = React.useState(getInitialMode);

  // build the theme once per mode change
  const appTheme = React.useMemo(() => getAppTheme(mode), [mode]);

  // keep user preference in localStorage
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App mode={mode} setMode={setMode} />
      {/* 👆 We pass theme state DOWN to App */}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
