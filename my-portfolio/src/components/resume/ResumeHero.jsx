// src/components/resume/ResumeHero.jsx
import * as React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import NameWithPronunciation from "./shared/NameWithPronunciation.jsx";
import { HERO } from "../../content/resumeData.js";
import headshot from "../../assets/headshot-sergio.png";

const ResumeHero = React.forwardRef(function ResumeHero(_props, ref) {
  return (
    <Box id="resume-hero" ref={ref}>
      <Typography
        variant="overline"
        sx={(t) => ({
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          opacity: 0.85,
          color: t.palette.primary.main,
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          "&::before": {
            content: '""',
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "999px",
            backgroundColor: t.palette.primary.main,
          },
        })}
      >
        {HERO.roleTag}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 1, flexWrap: "wrap" }}
      >
        <Avatar
          alt={HERO.name}
          src={headshot}
          sx={{ width: 150, height: 150 }}
        />

        <Box>
          <NameWithPronunciation
            name={HERO.name}
            pronouns={HERO.pronouns}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: "40rem" }}
          >
            {HERO.blurb[0]}
            <br />
            {HERO.blurb[1]}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
});

export default ResumeHero;
