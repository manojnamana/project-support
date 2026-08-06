import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { ShieldRounded } from "@mui/icons-material";

interface LogoProps {
  compact?: boolean;
  onDark?: boolean;
}

export default function Logo({ compact = false, onDark = false }: LogoProps) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: onDark ? "rgba(255,255,255,0.12)" : "success.light",
          color: onDark ? "#fff" : "primary.dark",
          border: "1.5px solid",
          borderColor: onDark ? "rgba(255,255,255,0.25)" : "primary.main",
        }}
      >
        <ShieldRounded sx={{ fontSize: 20 }} />
      </Box>
      {!compact && (
        <Box sx={{ lineHeight: 1.15 }}>
          <Typography
            component="span"
            sx={{
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: onDark ? "#fff" : "primary.dark",
              display: "block",
            }}
          >
            Project SUPPORT
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: onDark ? "rgba(255,255,255,0.75)" : "text.secondary",
            }}
          >
            School Safety. Together.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
