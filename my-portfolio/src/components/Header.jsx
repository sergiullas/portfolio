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
import { Link as RouterLink } from "react-router-dom";

const PRIMARY_SECTIONS = [
  { id: "about", label: "About", to: "/#about" },
  { id: "skills", label: "Skills", to: "/#skills" },
  { id: "contact", label: "Contact", to: "/#contact" },
];

export default function Header({ mode, setMode }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // scroll shadow/blur
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const isMenuOpen = Boolean(menuAnchor);

  // clicking the name ➝ scroll to top if already on "/", otherwise just let RouterLink navigate
  const handleNameClick = (event) => {
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar
      component="header"
      position="fixed"
      elevation={scrolled ? 3 : 0}
      color="transparent"
      sx={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
        transition:
          "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        backgroundColor: (t) =>
          scrolled
            ? t.palette.mode === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(10,10,10,0.9)"
            : "transparent",
        color: (t) => t.palette.text.primary,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, sm: 4 },
          minHeight: { xs: 56, sm: 72 },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT: primary nav (desktop) or placeholder (mobile) */}
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={3}
            component="nav"
            sx={{ flex: 1 }}
          >
            {PRIMARY_SECTIONS.map((item) => (
              <Button
                key={item.id}
                component={RouterLink}
                to={item.to}
                color="inherit"
                size="small"
                disableRipple
                sx={{
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "0.25em",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}

        {/* CENTER: name (desktop only) */}
        {isDesktop && (
          <Box sx={{ px: 2 }}>
            <Typography
              component={RouterLink}
              to="/"
              onClick={handleNameClick}
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "text.primary",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sergio Antezana
            </Typography>
          </Box>
        )}

        {/* RIGHT: portfolio link + theme toggle + menu on mobile */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {isDesktop && (
            <Button
              component={RouterLink}
              to="/portfolio"
              color="inherit"
              size="small"
              disableRipple
              sx={{
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "0.25em",
                  backgroundColor: "transparent",
                },
              }}
            >
              Portfolio
            </Button>
          )}

          <IconButton
            color="inherit"
            onClick={toggleMode}
            aria-label="Toggle light and dark mode"
            sx={{ ml: 0.5 }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Mobile hamburger */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              aria-label="Open navigation"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile nav menu */}
      {!isDesktop && (
        <Menu
          anchorEl={menuAnchor}
          open={isMenuOpen}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {PRIMARY_SECTIONS.map((item) => (
            <MenuItem
              key={item.id}
              component={RouterLink}
              to={item.to}
              onClick={() => setMenuAnchor(null)}
            >
              <Typography
                textTransform="uppercase"
                sx={{
                  letterSpacing: "0.12em",
                  fontSize: "0.8rem",
                }}
              >
                {item.label}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem
            component={RouterLink}
            to="/portfolio"
            onClick={() => setMenuAnchor(null)}
          >
            <Typography
              textTransform="uppercase"
              sx={{
                letterSpacing: "0.12em",
                fontSize: "0.8rem",
              }}
            >
              Portfolio
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
}
