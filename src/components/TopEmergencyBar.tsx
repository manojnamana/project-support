import * as React from "react";
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

function quickExit() {
  // Clears the current page from history and leaves immediately.
  window.location.replace("https://www.google.com");
}

export default function TopEmergencyBar() {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") quickExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "secondary.dark",
        color: "common.white",
        py: 1.5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.25}
        >
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <VerifiedUserRoundedIcon sx={{ fontSize: 16, opacity: 0.9 }} />
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
              A safe place to speak up. 100% Anonymous. 100% Confidential.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            <MuiLink
              href="tel:911"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                color: "rgba(255,255,255,0.95)",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              <LocalPhoneRoundedIcon sx={{ fontSize: 15, color: "common.white" }} />
              In immediate danger? Call 911
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
