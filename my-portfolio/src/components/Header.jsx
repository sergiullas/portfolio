// Updated: 2025-11-29 ·  // Saturday, November 29, 2025

// -----------------------------------------------------------------------------
// components/Header.jsx
// Site header with navigation and theme controls.
//
// - Receives `mode`, `setMode`, active section info, and scroll handlers from
//   LayoutShell/App.
// - Manages small local state for menus or responsive toggles (e.g., drawer).
//
// Accessibility
// - Uses nav landmarks and lists for links; ensures focusable elements for menu
//   toggles.
// - Theme switch and nav links include aria-labels and keyboard support.
//
// How to customize
// - Add nav items, social links, or secondary actions.
// - Swap menu patterns (mega menu, dropdown) while keeping aria-expanded/controls
//   wired correctly.
// -----------------------------------------------------------------------------
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
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";

const PRIMARY_SECTIONS = [
  { id: "about", label: "About", to: "/" },
  { id: "resume", label: "Resume", to: "/resume" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "contact", label: "Contact", to: "/#contact" },
];

export default function Header({ mode, setMode }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { showName } = useHeaderNameVisibility();
  const location = useLocation();
  const navigate = useNavigate();

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
  const mobileMenuId = "primary-navigation-menu";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // clicking the name → scroll to top of current page
  const handleNameClick = (event) => {
    event.preventDefault(); // always prevent route change
    scrollToTop();
  };

  // handle primary nav clicks
  const handlePrimaryClick = (event, item) => {
    if (item.id === "about") {
      // About should always take user to "/" and scroll to top
      event.preventDefault();

      const doScroll = () => {
        // allow React to finish navigation/render first
        setTimeout(scrollToTop, 0);
      };

      if (location.pathname !== "/") {
        navigate("/");
        doScroll();
      } else {
        scrollToTop();
      }
    }
    // other items use normal RouterLink navigation
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
        {/* LEFT: desktop nav OR spacer */}
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={3}
            component="nav"
            aria-label="Primary"
            sx={{ flex: 1 }}
          >
            {PRIMARY_SECTIONS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                size="small"
                disableRipple
                sx={(t) => ({
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "0.25em",
                    backgroundColor: "transparent",
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${t.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                })}
                component={RouterLink}
                to={item.to}
                onClick={(event) => handlePrimaryClick(event, item)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}

        {/* ⭐ NAME – visibility controlled by HeaderNameVisibilityContext */}
        <Box sx={{ px: 2 }}>
          {showName && (
            <Box
              component={RouterLink}
              to="/"
              onClick={handleNameClick}
              aria-label="Scroll to top"
              sx={(t) => ({
                display: "flex",
                alignItems: "center",
                padding: t.spacing(0.75, 1.5),
                borderRadius: "999px",
                background: "transparent",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: t.palette.text.primary,
                outline: "none",
                "&:hover": {
                  backgroundColor: t.palette.action.hover,
                },
                "&:focus-visible": {
                  outline: `2px solid ${t.palette.primary.main}`,
                  outlineOffset: 3,
                },
              })}
            >
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ fontWeight: 600 }}
              >
                Sergio Antezana
              </Typography>
            </Box>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
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
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? mobileMenuId : undefined}
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
          id={mobileMenuId}
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
              onClick={(event) => {
                setMenuAnchor(null);
                handlePrimaryClick(event, item);
              }}
            >
              <Typography
                textTransform="uppercase"
                sx={{ letterSpacing: "0.12em", fontSize: "0.8rem" }}
              >
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </AppBar>
  );
}
