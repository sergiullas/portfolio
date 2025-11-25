// src/components/resume/shared/NameWithPronunciation.jsx
import * as React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const NAME_AUDIO_SRC = ""; // e.g. "/audio/sergio-antezana-name.mp3"

export default function NameWithPronunciation({ name, pronouns }) {
  const audioRef = React.useRef(null);

  const handlePlay = () => {
    if (audioRef.current && NAME_AUDIO_SRC) {
      audioRef.current.play().catch(() => {
        // fail silently if playback blocked
      });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>

      <Tooltip title='Pronounced "SEHR-hee-oh an-teh-ZAH-nah"'>
        <span>
          <IconButton
            size="small"
            onClick={handlePlay}
            aria-label={`Hear how to pronounce "${name}"`}
          >
            <VolumeUpIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      {pronouns && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "lowercase" }}
        >
          {pronouns}
        </Typography>
      )}

      {NAME_AUDIO_SRC && (
        <audio ref={audioRef} src={NAME_AUDIO_SRC} preload="none" />
      )}
    </Box>
  );
}
