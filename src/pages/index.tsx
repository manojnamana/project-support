import * as React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import Reveal from "@/components/Reveal";
import StatCard from "@/components/StatCard";
import { CONCERN_HIGHLIGHTS, HOW_TO_STEPS } from "@/data";

const PROMISES = [
  {
    icon: <VisibilityOffRoundedIcon />,
    title: "Completely anonymous",
    body: "No login required. Report without ever giving your name.",
  },
  {
    icon: <LockRoundedIcon />,
    title: "Safe & confidential",
    body: "Reviewed only by trained school officials and partners.",
  },
  {
    icon: <ForumRoundedIcon />,
    title: "Two-way follow-up",
    body: "Use your case number & PIN to answer questions anonymously.",
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          background: (t) =>
            `radial-gradient(1000px 500px at 85% -10%, ${t.palette.secondary.main}66, transparent), radial-gradient(900px 500px at 0% 20%, ${t.palette.primary.light}44, transparent), linear-gradient(135deg, ${t.palette.primary.dark}, ${t.palette.primary.main})`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal>
                <Chip
                  label="See Something. Say Something."
                  sx={{
                    bgcolor: "rgba(255,255,255,0.16)",
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2.5,
                    backdropFilter: "blur(6px)",
                  }}
                />
                <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" } }}>
                  Report a school safety concern
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mt: 2, maxWidth: 560, fontWeight: 400, opacity: 0.92 }}
                >
                  A safe, confidential way for students, families, staff, and community
                  members to report bullying, threats, or other concerns — anonymously.
                </Typography>
              </Reveal>

              <Reveal delay={120}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ mt: 4 }}
                >
                  <Button
                    component={Link}
                    href="/report?mode=anonymous"
                    size="large"
                    variant="contained"
                    startIcon={<CampaignRoundedIcon />}
                    sx={{
                      bgcolor: "#fff",
                      color: "primary.main",
                      "&:hover": { bgcolor: "#F1F5FF" },
                    }}
                  >
                    Submit Anonymous Report
                  </Button>
                  <Button
                    component={Link}
                    href="/report?mode=contact"
                    size="large"
                    variant="outlined"
                    startIcon={<ContactMailRoundedIcon />}
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.6)",
                      "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                    }}
                  >
                    Report with Contact Info
                  </Button>
                </Stack>
              </Reveal>

              <Reveal delay={220}>
                <Button
                  href="tel:911"
                  startIcon={<LocalPhoneRoundedIcon />}
                  sx={{ mt: 2, color: "#fff", opacity: 0.9 }}
                >
                  Emergency? Call 911 immediately
                </Button>
              </Reveal>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal delay={160}>
                <Card
                  sx={{
                    bgcolor: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(10px)",
                    color: "#fff",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {PROMISES.map((p) => (
                        <Stack key={p.title} direction="row" spacing={1.5} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              display: "grid",
                              placeItems: "center",
                              bgcolor: "rgba(255,255,255,0.16)",
                              flexShrink: 0,
                            }}
                          >
                            {p.icon}
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.85 }}>
                              {p.body}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Concern types */}
      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -8 }, position: "relative" }}>
        <Reveal>
          <Card sx={{ p: { xs: 2.5, md: 4 } }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
              What you can report
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Concerns that help keep schools safe
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.2}>
              {CONCERN_HIGHLIGHTS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  variant="outlined"
                  sx={{
                    borderColor: "divider",
                    fontWeight: 600,
                    transition: "all .25s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      bgcolor: (t) => `${t.palette.primary.main}0A`,
                    },
                  }}
                />
              ))}
            </Stack>
          </Card>
        </Reveal>
      </Container>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal>
              <StatCard icon={<GroupsRoundedIcon />} value="13+" label="Partner schools" />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={80}>
              <StatCard
                icon={<VisibilityOffRoundedIcon />}
                value="100%"
                label="Anonymous option"
                color="secondary.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={160}>
              <StatCard
                icon={<VerifiedUserRoundedIcon />}
                value="24/7"
                label="Always available"
                color="success.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={240}>
              <StatCard
                icon={<ForumRoundedIcon />}
                value="Same-day"
                label="Urgent routing"
                color="warning.main"
              />
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      {/* How to use */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 10 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700 }}>
                How it works
              </Typography>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                Reporting takes just a few minutes
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Follow six simple steps. You stay in control of how much you share and
                whether you remain anonymous.
              </Typography>
              <Button
                component={Link}
                href="/report"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Start a report
              </Button>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={1.5}>
              {HOW_TO_STEPS.map((step, i) => (
                <Reveal key={step} delay={i * 70}>
                  <Card sx={{ "&:hover": { borderColor: "primary.main" } }}>
                    <CardContent
                      sx={{ display: "flex", alignItems: "center", gap: 2, py: 2, "&:last-child": { pb: 2 } }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          color: "#fff",
                          background: (t) =>
                            `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <Typography sx={{ fontWeight: 500 }}>{step}</Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Closing CTA */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 10 } }}>
        <Reveal>
          <Card
            sx={{
              overflow: "hidden",
              color: "#fff",
              border: "none",
              background: (t) =>
                `linear-gradient(120deg, ${t.palette.primary.dark}, ${t.palette.secondary.dark})`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                  <Typography variant="h4">
                    Together, we can build safer schools.
                  </Typography>
                  <Typography sx={{ mt: 1, opacity: 0.9 }}>
                    Recognize warning signs early, report concerns responsibly, and help
                    every student feel safe.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Stack spacing={1.5}>
                    <Button
                      component={Link}
                      href="/report"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{ bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#F1F5FF" } }}
                    >
                      Report a concern
                    </Button>
                    <Button
                      component={Link}
                      href="/status"
                      variant="outlined"
                      fullWidth
                      sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)" }}
                    >
                      Check report status
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Reveal>
        <Divider sx={{ mt: 6, opacity: 0 }} />
      </Container>
    </Box>
  );
}
