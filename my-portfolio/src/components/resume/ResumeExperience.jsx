// src/components/resume/ResumeExperience.jsx
import * as React from "react";
import {
  Box,
  Typography,
  Chip,
  Collapse,
  Stack,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { EXPERIENCE } from "../../content/resumeData.js";

function EraItem({ era, open, onToggle, isLast }) {
  const theme = useTheme();
  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.divider;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        pb: isLast ? 0 : 3,
        position: "relative",
        "&:hover .era-icon-box": {
          borderColor: open ? activeColor : theme.palette.text.primary,
          transform: "scale(1.05)",
        },
      }}
    >
      {/* Left Column: Icon + Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 32,
        }}
      >
        <Box
          className="era-icon-box"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: open ? activeColor : inactiveColor,
            color: open ? activeColor : theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            transition: "all 0.25s ease-out",
            boxShadow: open ? `0 0 0 4px ${alpha(activeColor, 0.16)}` : "none",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: "1.1rem" }} />
        </Box>

        {!isLast && (
          <Box
            sx={{
              width: 2,
              bgcolor: open ? alpha(activeColor, 0.4) : inactiveColor,
              flexGrow: 1,
              mt: -0.5,
              transition: "background-color 0.25s ease-out",
            }}
          />
        )}
      </Box>

      {/* Right Column */}
      <Box sx={{ flexGrow: 1, pt: 0.5 }}>
        <Box
          component="button"
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${era.id}-content`}
          aria-label={`${era.title} details`}
          sx={{
            width: "100%",
            border: "none",
            background: "none",
            padding: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                color: open ? activeColor : "text.primary",
                transition: "color 0.2s ease-out",
              }}
            >
              {era.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {era.subtitle}
            </Typography>
          </Box>

          <Box sx={{ color: "text.secondary", mt: 0.25 }}>
            {open ? "▲" : "▼"}
          </Box>
        </Box>

        <Collapse in={open}>
          <Box id={`${era.id}-content`}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: "70ch" }}
            >
              {era.intro}
            </Typography>
            <Box
              component="ul"
              sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
            >
              {era.bullets.map((item) => (
                <li key={item}>
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>

            {era.tags?.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.75, flexWrap: "wrap", gap: 1 }}
              >
                {era.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}

export default function ResumeExperience() {
  const [openEras, setOpenEras] = React.useState(() => {
    const initial = {};
    EXPERIENCE.eras.forEach((era) => {
      initial[era.id] = era.id === "era4"; // keep current era open by default
    });
    return initial;
  });

  const toggleEra = (id) => {
    setOpenEras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {EXPERIENCE.company}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {EXPERIENCE.tenure}
      </Typography>

      <Box sx={{ mt: 1.5 }}>
        <Chip
          label={EXPERIENCE.currentEraLabel}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box sx={{ mt: 2.5 }}>
        {EXPERIENCE.eras.map((era, index) => (
          <EraItem
            key={era.id}
            era={era}
            open={openEras[era.id]}
            onToggle={() => toggleEra(era.id)}
            isLast={index === EXPERIENCE.eras.length - 1}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Key federal programs (selected)
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
        >
          {EXPERIENCE.keyPrograms.map((item) => (
            <li key={item.org}>
              <Typography variant="body2" color="text.secondary">
                <strong>{item.org}:</strong> {item.programs}
              </Typography>
            </li>
          ))}
        </Box>
      </Box>
    </>
  );
}
