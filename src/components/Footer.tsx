import * as React from "react";
import Link from "next/link";
import { Box, Container, Divider, Grid, Link as MuiLink, Stack, Typography } from "@mui/material";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 6,
        pb: 4,
        bgcolor: "text.primary",
        color: "rgba(255,255,255,0.8)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Logo onDark />
            <Typography variant="body2" sx={{ mt: 2, maxWidth: 380, color: "rgba(255,255,255,0.7)" }}>
              A school violence prevention initiative led by Asian Media Access and the
              Multi-Cultural Community Alliance (MCCA). Working with students, families,
              schools, and community partners to keep schools safe.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2" sx={{ color: "#fff", mb: 1.5 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/report" color="inherit">
                Report a Concern
              </MuiLink>
              <MuiLink component={Link} href="/status" color="inherit">
                Check Report Status
              </MuiLink>
              <MuiLink component={Link} href="/how-it-works" color="inherit">
                How It Works
              </MuiLink>
              <MuiLink component={Link} href="/resources" color="inherit">
                Resources
              </MuiLink>
              <MuiLink component={Link} href="/dashboard" color="inherit">
                Admin Dashboard
              </MuiLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ color: "#fff", mb: 1.5 }}>
              In an Emergency
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#fff" }}>
              <PhoneInTalkRoundedIcon fontSize="small" />
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Call 911
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1, color: "rgba(255,255,255,0.7)" }}>
              If someone is in immediate danger or a violent incident is occurring right now,
              call 911 immediately.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.12)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            © {new Date().getFullYear()} Project SUPPORT. This is a demonstration interface.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Confidential · Anonymous · Community-Led
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
