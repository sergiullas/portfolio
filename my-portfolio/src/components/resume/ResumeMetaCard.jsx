// src/components/resume/ResumeMetaCard.jsx
import * as React from "react";
import { Box, Grid, Stack } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";

import MetaRow from "./shared/MetaRow.jsx";
import { META } from "../../content/resumeData.js";
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { computeTimeDiff } from "../../utils/timeZone.js";

export default function ResumeMetaCard() {
  const localTime = useLocalTime();
  const timeDiff = React.useMemo(() => computeTimeDiff("America/New_York"), []);
  const timeSecondary =
    timeDiff === "Same time"
      ? "Same time — Eastern Time (ET)"
      : `${timeDiff} — Eastern Time (ET)`;

  return (
    <Box
      sx={(t) => ({
        borderRadius: 2,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor: t.palette.background.paper,
        boxShadow: t.shadows[0],
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 2.5 },
      })}
    >
      <Grid
        container
        columnSpacing={{ xs: 2, md: 4 }}
        rowSpacing={{ xs: 1.5, md: 1.5 }}
      >
        {/* LEFT COLUMN */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            <MetaRow
              icon={<WorkOutlineIcon fontSize="small" />}
              primary={META.title}
              secondary={META.subtitle}
            />

            <MetaRow
              icon={<WorkOutlineIcon fontSize="small" />}
              primary={META.openTo}
            />

            <MetaRow
              icon={<FlagIcon fontSize="small" />}
              primary={META.location}
            />

            <MetaRow
              icon={<AccessTimeIcon fontSize="small" />}
              primary={localTime}
              secondary={timeSecondary}
            />
          </Stack>
        </Grid>

        {/* RIGHT COLUMN */}
        <Grid item xs={12} md={6}>
          <Stack spacing={1.5}>
            <MetaRow
              icon={<EmailIcon fontSize="small" />}
              primary={META.email}
              href={`mailto:${META.email}`}
            />

            <MetaRow
              icon={<LanguageIcon fontSize="small" />}
              primary={META.linkedinLabel}
              href={META.linkedin}
            />

            <MetaRow
              icon={<LanguageIcon fontSize="small" />}
              primary={META.githubLabel}
              href={META.github}
            />

            <MetaRow
              icon={<WcIcon fontSize="small" />}
              primary={META.pronouns}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
