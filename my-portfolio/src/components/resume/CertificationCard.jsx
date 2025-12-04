// src/components/resume/CertificationCard.jsx

import * as React from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function CertificationCard({ item }) {
  const theme = useTheme();
  const { title, issuer, logoSrc, year, verifyUrl, institutionUrl } = item || {};

  const isVerifiable = Boolean(verifyUrl);

  const WrapperComponent = isVerifiable ? "a" : "div";
  const wrapperProps = isVerifiable
    ? {
        href: verifyUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `View verification for ${title}`,
      }
    : {};

  const LogoWrapperComponent = !isVerifiable && institutionUrl ? "a" : "div";
  const logoWrapperProps =
    !isVerifiable && institutionUrl
      ? {
          href: institutionUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `Visit ${issuer}`,
        }
      : {};

  return (
    <Box
      component={WrapperComponent}
      {...wrapperProps}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 1.5,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: isVerifiable
          ? theme.palette.success.light
          : alpha(theme.palette.divider, 0.9),
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        transition: "all 0.2s ease",
        "&:hover": isVerifiable
          ? {
              borderColor: theme.palette.success.main,
              backgroundColor: alpha(theme.palette.success.light, 0.14),
              transform: "translateY(-1px)",
              boxShadow: theme.shadows[2],
            }
          : {
              borderColor: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
            },
        "&:focus-visible": isVerifiable
          ? {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2,
            }
          : undefined,
      }}
    >
      <Stack spacing={0.25} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {issuer}
            {year ? ` · ${year}` : null}
          </Typography>
          {isVerifiable && (
            <Tooltip title="View online verification">
              <VerifiedOutlinedIcon
                fontSize="small"
                sx={{ ml: 0.25, color: theme.palette.success.main }}
              />
            </Tooltip>
          )}
        </Box>
      </Stack>

      {logoSrc && (
        <Box
          component={LogoWrapperComponent}
          {...logoWrapperProps}
          sx={{ display: "inline-flex", ml: 2 }}
        >
          <Avatar
            src={logoSrc}
            alt={issuer || title}
            variant="rounded"
            sx={{ width: 40, height: 40, borderRadius: 2 }}
          />
        </Box>
      )}
    </Box>
  );
}
