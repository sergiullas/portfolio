// src/components/Header.jsx
import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({ mode, setMode, scrollToId }) {
  const [scrolled, setScrolled] = React.useState(false);

  // Detect whether the user has scrolled down
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 3 : 0}
      sx={{
        backdropFilter: "blur(12px)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? scrolled
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(255, 255, 255, 0.6)"
            : scrolled
              ? "rgba(18, 18, 18, 0.85)"
              : "rgba(18, 18, 18, 0.6)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT NAV */}
        <Stack direction="row" spacing={2}>
          {["about", "case-studies", "skills", "contact"].map((section) => (
            <Button
              key={section}
              onClick={() => scrollToId(section)}
              size="small"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {section.replace("-", " ").toUpperCase()}
            </Button>
          ))}
        </Stack>

        {/* CENTER NAME */}
        <Typography
          variant="h6"
          color="text.primary"            // 👈 force proper text color
          sx={{
            fontWeight: 700,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            userSelect: "none",
          }}
        >
          Sergio Antezana
        </Typography>

        {/* RIGHT THEME TOGGLE */}
        <Box>
          <IconButton
            onClick={() =>
              setMode((prev) => (prev === "light" ? "dark" : "light"))
            }
            aria-label="Toggle light/dark mode"
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
