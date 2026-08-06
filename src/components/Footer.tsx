import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 0 }}>
      {/* Main footer */}
      <Box
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 5 },
          bgcolor: "#F3F4F6",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Logo />
              <Typography
                variant="body2"
                sx={{ mt: 2, maxWidth: 340, color: "text.secondary", lineHeight: 1.7 }}
              >
                A school violence prevention initiative led by Asian Media Access and the
                Multi-Cultural Community Alliance (MCCA). Working with students, families,
                schools, and community partners to keep schools safe.
              </Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "primary.dark", mb: 1.5, fontWeight: 700 }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.1}>
                {[
                  { label: "Report a Concern", href: "/report" },
                  { label: "Check Status", href: "/status" },
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "Resources", href: "/resources" },
                ].map((l) => (
                  <MuiLink
                    key={l.href}
                    component={Link}
                    href={l.href}
                    underline="hover"
                    sx={{ color: "text.secondary", fontSize: "0.9rem", fontWeight: 500 }}
                  >
                    {l.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, md: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "primary.dark", mb: 1.5, fontWeight: 700 }}
              >
                Information
              </Typography>
              <Stack spacing={1.1}>
                {[
                  { label: "Admin Dashboard", href: "/dashboard" },
                  { label: "Resources", href: "/resources" },
                  { label: "How It Works", href: "/how-it-works" },
                ].map((l) => (
                  <MuiLink
                    key={l.label}
                    component={Link}
                    href={l.href}
                    underline="hover"
                    sx={{ color: "text.secondary", fontSize: "0.9rem", fontWeight: 500 }}
                  >
                    {l.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "primary.dark", mb: 1.5, fontWeight: 700 }}
              >
                Get Help
              </Typography>
              <Stack direction="column" spacing={1}>
                <Box
                  sx={{
                    flex: 1,
                    p:1,
                    borderRadius:0.5,
                    border: "1px solid",
                    width: "fit-content",
                    borderColor: "error.main",
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack direction="row"  alignItems="center" >
                    {/* <PhoneInTalkRoundedIcon sx={{ fontSize: 18, color: "error.main" }} /> */}
                    <Typography sx={{ fontWeight: 700, color: "error.main", fontSize: "0.9rem" }}>
                      Emergency? Call 911
                    </Typography>
                  </Stack>
                  
                </Box>
                <Typography variant="caption" color="text.secondary">
                    Crisis Text: HOME to 741741
                    <br />
                    
                    <span style={{ marginTop: 10 }}>Suicide & Crisis: Call/Text 988</span>
                  </Typography>
                {/* <Box
                  sx={{
                    p: 2,
                    // borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 110,
                    boxShadow: "0 8px 30px rgba(15,23,42,.06)",
                  }}
                >
                  <VerifiedUserOutlinedIcon sx={{ color: "primary.main", mb: 1, fontSize: 28 }} />
                  <Typography sx={{ fontWeight: 700, color: "primary.dark", fontSize: "0.8rem" }}>
                    Available 24/7
                  </Typography>
                </Box> */}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom bar */}
      <Box sx={{ bgcolor: "secondary.dark", py: 2 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
          >
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)" }}>
              © {new Date().getFullYear()} Project SUPPORT. Confidential · Anonymous · Community-Led
            </Typography>
            <Stack direction="row" spacing={2.5}>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)" }}>
                Accessibility
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)" }}>
                Privacy
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
