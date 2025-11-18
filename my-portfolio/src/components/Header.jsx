import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

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
  Menu,
  MenuItem,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SECTIONS = ["about", "portfolio", "skills", "contact"];

export default function Header({ mode, setMode, scrollToId }) {
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Detect scroll to add shadow
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleNavClick = (section) => {
    closeMenu();
    scrollToId(section);
  };

  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={scrolled ? 3 : 0}
      sx={{
        backdropFilter: "blur(12px)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: (t) =>
          t.palette.mode === "light"
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
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* LEFT: NAV (desktop) or MENU ICON (mobile) */}
        {isDesktop ? (
          <Stack direction="row" spacing={2}>
            {/* ABOUT / SKILLS / CONTACT scroll on home, go home on other pages */}
            {["about", "skills", "contact"].map((section) => (
              <Button
                key={section}
                size="small"
                sx={{
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate(`/#${section}`);
                  } else {
                    scrollToId(section);
                  }
                }}
              >
                {section.toUpperCase()}
              </Button>
            ))}

            {/* Portfolio is its own page */}
            <Button
              component={RouterLink}
              to="/portfolio"
              size="small"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                "&:hover": { textDecoration: "underline" },
              }}
            >
             Portfolio
            </Button>
          </Stack>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open navigation menu"
            aria-controls={menuAnchor ? "main-nav-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuAnchor ? "true" : undefined}
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* CENTER: NAME */}
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            flexGrow: isDesktop ? 0 : 1,
            position: isDesktop ? "absolute" : "static",
            left: isDesktop ? "50%" : "auto",
            transform: isDesktop ? "translateX(-50%)" : "none",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          Sergio Antezana
        </Typography>

        {/* RIGHT: THEME TOGGLE */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() =>
              setMode((prev) => (prev === "light" ? "dark" : "light"))
            }
            aria-label={
              mode === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            aria-pressed={mode === "dark"}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* MOBILE NAV MENU */}
      {!isDesktop && (
        <Menu
          id="main-nav-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
          keepMounted
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {SECTIONS.map((section) => (
            <MenuItem
              key={section}
              onClick={() => handleNavClick(section)}
            >
              <Typography textTransform="uppercase">
                {section.replace("-", " ")}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </AppBar>
  );
}
