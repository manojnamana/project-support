import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";

interface LogoProps {
  compact?: boolean;
  onDark?: boolean;
}

export default function Logo({ compact = false, onDark = false }: LogoProps) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          background: (t) =>
            `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          boxShadow: (t) => `0 8px 18px -8px ${t.palette.primary.main}`,
        }}
      >
        <ShieldRoundedIcon fontSize="small" />
      </Box>
      {!compact && (
        <Box sx={{ lineHeight: 1 }}>
          <Typography
            component="span"
            sx={{
              fontWeight: 800,
              fontSize: "1.05rem",
              letterSpacing: "-0.02em",
              color: onDark ? "#fff" : "text.primary",
              display: "block",
            }}
          >
            Project SUPPORT
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: onDark ? "rgba(255,255,255,0.75)" : "text.secondary",
            }}
          >
            Safer Schools Initiative
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
