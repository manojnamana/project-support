import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { useRouter } from "next/router";

import Reveal from "@/components/Reveal";
import { AddOutlined, SportsKabaddiOutlined, VolunteerActivismOutlined } from "@mui/icons-material";

const TRUST_BADGES = [
  {
    icon: <VisibilityOffOutlinedIcon fontSize="small" />,
    title: "100% Anonymous",
    body: "No name required",
  },
  {
    icon: <LockOutlinedIcon fontSize="small" />,
    title: "100% Confidential",
    body: "Your privacy protected",
  },
  {
    icon: <VerifiedUserOutlinedIcon fontSize="small" />,
    title: "Safe & Secure",
    body: "Encrypted submissions",
  },
];

const HOW_STEPS = [
  {
    icon: <EditOutlinedIcon />,
    title: "Submit",
    body: "Share what you know.",
  },
  {
    icon: <MailOutlineRoundedIcon />,
    title: "Review",
    body: "Team reviews the report.",
  },
  {
    icon: <ShieldOutlinedIcon />,
    title: "Assess",
    body: "Evaluated by risk level.",
  },
  {
    icon: <GroupsOutlinedIcon />,
    title: "Take Action",
    body: "Staff are notified.",
  },
  {
    icon: <CheckCircleOutlineRoundedIcon />,
    title: "Follow Up",
    body: "Case is addressed.",
  },
];

const WHO_CAN_REPORT = [
  { icon: <SchoolOutlinedIcon />, label: "Students" },
  { icon: <FamilyRestroomOutlinedIcon />, label: "Parents / Guardians" },
  { icon: <BadgeOutlinedIcon />, label: "School Staff" },
  { icon: <PeopleOutlineRoundedIcon />, label: "Community Members" },
  { icon: <LocalPoliceOutlinedIcon />, label: "Law Enforcement" },
];

const REPORT_CATEGORIES = [
  { icon: <GroupsOutlinedIcon />, label: "Bullying", featured: true },
  { icon: <ReportProblemOutlinedIcon />, label: "Violence" },
  { icon: <GavelOutlinedIcon />, label: "Harassment" },
  { icon: <CrisisAlertOutlinedIcon />, label: "Gang Involvement" },
  { icon: <LanguageOutlinedIcon />, label: "Cyber Threats" },
  { icon: <SportsKabaddiOutlined />, label: "Violent Threats" },
  { icon: <FavoriteBorderRoundedIcon />, label: "Self-Harm" },
  { icon: <AddOutlined />, label: "Other concerns" },

];

const PRIVACY_CHECKS = [
  "No account required to submit",
  "We do not collect personal information",
  "Encrypted submissions end-to-end",
  "Secure two-way communication",
  "Your identity stays protected",
];

const STATS = [
  {
    icon: <AssessmentOutlinedIcon />,
    value: "12,842",
    label: "Reports Received",
  },
  {
    icon: <AccessTimeOutlinedIcon />,
    value: "18 hrs",
    label: "Average Response Time",
  },
  {
    icon: <ApartmentOutlinedIcon />,
    value: "365",
    label: "Schools Participating",
  },
  {
    icon: <HandshakeOutlinedIcon />,
    value: "120+",
    label: "Community Partners",
  },
];

const cardHover = {
  transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    // borderColor: "primary.main",
    boxShadow: "0 12px 36px rgba(15,23,42,.1)",
  },
};

export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 5, md: 8 },
          pb: { xs: 6, md: 10 },
          background: "linear-gradient(180deg, #FFFFFF 0%, #F8F6EE 55%, #EAF5EF 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal>
              <Typography
                  variant="h2"
                  sx={{
                    color: "secondary.main",
                    fontSize: { xs: "2.15rem", sm: "2.6rem", md: "3.1rem" },
                    fontWeight: 700,
                    mb:0
            
                  }}
                >
                  Your safety matters. Speak Up.
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: "primary.dark",
                    fontSize: { xs: "2.15rem", sm: "2.6rem", md: "3.1rem" },
                    fontWeight: 700,
                    lineHeight: 1.15,
                    mb: 2,
                  }}
                >
                  
                  We’ll Listen. We’ll Act.
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ maxWidth: 480, fontSize: "1.05rem", mb: 3 }}
                >
                  A safe, confidential way for students, families, staff, and community
                  members to report bullying, threats, or other concerns - completely
                  anonymously.
                </Typography>
              </Reveal>

              <Reveal delay={80}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 3.5 }}
                >
                  {TRUST_BADGES.map((b) => (
                    <Stack
                      key={b.title}
                      direction="row"
                      spacing={1.25}
                      alignItems="center"
                      sx={{ minWidth: 0 }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "success.light",
                          color: "primary.dark",
                          flexShrink: 0,
                        }}
                      >
                        {b.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "primary.dark" }}>
                          {b.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {b.body}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Reveal>

              <Reveal delay={140}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.75}
                  sx={{ mb: 2 }}
                >
                  <Button
                    component={Link}
                    href="/report?mode=anonymous"
                    size="large"
                    variant="contained"
                    sx={{
                      flex: 1,
                      justifyContent: "flex-start",
                      gap: 1.5,
                      py: 2,
                      px: 2.5,
                      color: "common.white",
                      // borderRadius: 3,
                      bgcolor: "primary.main",
                      boxShadow: "0 8px 24px rgba(47,138,62,.28)",
                      "&:hover": { bgcolor: "primary.dark", color: "common.white" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.15)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <EditOutlinedIcon />
                    </Box>
                    <Box sx={{ textAlign: "left", flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "inherit", lineHeight: 1.2 }}>
                        Start Anonymous Report
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", opacity: 0.85, fontWeight: 400 }}>
                        Share your concern
                      </Typography>
                    </Box>
                    <ArrowForwardRoundedIcon sx={{ opacity: 0.8 }} />
                  </Button>

                  <Button
                    component={Link}
                    href="/status"
                    size="large"
                    variant="outlined"
                    sx={{
                      flex: 1,
                      justifyContent: "flex-start",
                      gap: 1.5,
                      py: 2,
                      px: 2.5,
                     
                      borderWidth: 1.5,
                      bgcolor: "background.paper",
                      boxShadow: "0 8px 24px rgba(15,23,42,.06)",
                      "&:hover": { borderWidth: 1.5 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 2,
                        bgcolor: "success.light",
                        color: "primary.dark",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <SearchRoundedIcon />
                    </Box>
                    <Box sx={{ textAlign: "left", flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "primary.dark", lineHeight: 1.2 }}>
                        Check Report Status
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 400 }}>
                        Track an existing report
                      </Typography>
                    </Box>
                    <ArrowForwardRoundedIcon sx={{ color: "primary.main", opacity: 0.7 }} />
                  </Button>
                </Stack>
              </Reveal>

              <Reveal delay={200}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LockOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    We do not ask for your name. You can remain anonymous throughout the process.
                  </Typography>
                </Stack>
              </Reveal>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Reveal delay={100}>
                <Box
                  sx={{
                    position: "relative",
                    // borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(15,23,42,.12)",
                    // border: "1px solid",
                    borderColor: "divider",
                    aspectRatio: "4/3",
                    bgcolor: "#F3EFD9",
                  }}
                >
                  <Image
                    src="/Hero.png"
                    alt="Student looking toward a school campus — a calm, safe place to speak up"
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── How it works ─────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Typography
                variant="h3"
                sx={{ color: "secondary.main", fontSize: { xs: "1.75rem", md: "2.25rem" }, mb: 1 }}
              >
                How it works
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
                Simple. Safe. Effective.
              </Typography>
            </Box>
          </Reveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(5, 1fr)",
              },
              gap: { xs: 3, md: 2 },
              position: "relative",
            }}
          >
            {HOW_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <Stack alignItems="center" spacing={1.5} sx={{ textAlign: "center", position: "relative" }}>
                  {i < HOW_STEPS.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        top: 36,
                        left: "calc(50% + 40px)",
                        width: "calc(100% - 80px)",
                        borderTop: "2px dashed",
                        borderColor: "divider",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor:  "background.default",
                      color: "primary.dark",
                      border: "2px solid",
                      borderColor: "divider",
                      boxShadow:  "none",
                      position: "relative",
                      zIndex: 1,
                      transition: "all .3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "success.light",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: "primary.dark" }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 140 }}>
                    {step.body}
                  </Typography>
                </Stack>
              </Reveal>
            ))}
          </Box>

          <Reveal delay={200}>
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Typography
                component={Link}
                href="/how-it-works"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Unsure if this is the right place to report? Learn how it works →
              </Typography>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* ── Who / What / Privacy ─────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Who can report */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal>
                <Card sx={{ height: "100%", p: { xs: 2.5, md: 3 }, minHeight: {md:470,xs:"auto"}, bgcolor: "secondary.light","&:hover": { borderColor: "secondary.main" }, }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "secondary.main", mb: 2.5, fontWeight: 700 }}
                  >
                    Who can report?
                  </Typography>
                  <Stack spacing={1.75}>
                    {WHO_CAN_REPORT.map((item) => (
                      <Stack key={item.label} direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "common.white",
                            color: "secondary.main",
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Reveal>
            </Grid>

            {/* What can you report */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal delay={80}>
                <Card sx={{ height: "100%", p: { xs: 2.5, md: 3 }, bgcolor: "success.light","&:hover": { borderColor: "primary.dark" }, }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.dark", mb: 2.5, fontWeight: 700 }}
                  >
                    What can you report?
                  </Typography>
                  <Grid container spacing={1.25}>
                    {REPORT_CATEGORIES.map((cat) => ( 
                      <Grid key={cat.label} size={{ xs: 6 }}>
                        <Box
                        onClick={() => router.push(`/report`)}
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            border: "1.5px solid",
                            borderColor: "divider",
                            bgcolor:  "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.75,
                            minHeight: 48,
                            cursor: "pointer",
                            transition: "all .25s ease",
                            
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "success.light",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Stack direction="row" justifyContent="center" width="100%">
                            <Box sx={{ color: "primary.dark" }}>{cat.icon}</Box>
                           
                          </Stack>
                          <Typography sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
                            {cat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                   
                  </Grid>
                </Card>
              </Reveal>
            </Grid>

            {/* Privacy */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Reveal delay={160}>
                <Card
                  sx={{
                    height: "100%",
                    p: { xs: 2.5, md: 3 },
                    bgcolor: "secondary.light",
                    borderColor: "divider",
                    color: "secondary.main",
                    minHeight: {md:470,xs:"auto"},
                    ...cardHover,
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "secondary.main",
                      boxShadow: "0 12px 36px rgba(226,90,12,.28)",
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "secondary.main" }}>
                    Your privacy is our priority
                  </Typography>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "common.white",
                      mb: 2,
                    }}
                  >
                    <LockOutlinedIcon sx={{ fontSize: 28 }} />
                  </Box>

                  <Stack spacing={1.5}>
                    {PRIVACY_CHECKS.map((item) => (
                      <Stack key={item} direction="row" spacing={1.25} alignItems="flex-start">
                        <CheckCircleOutlineRoundedIcon
                          sx={{ fontSize: 20, color: "secondary.main", mt: 0.15, flexShrink: 0 }}
                        />
                        <Typography variant="body2" sx={{ color: "secondary.main" }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Crisis banner ────────────────────────────────────── */}
      <Box sx={{ py: { xs: 4, md: 5 }, bgcolor: "secondary.dark" }}>
        <Container maxWidth="lg">
          <Reveal>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "common.white",
                      flexShrink: 0,
                    }}
                  >
                    <VolunteerActivismOutlined />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ color: "common.white", fontWeight: 700, mb: 0.5 }}
                    >
                      You are not alone.
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem" }}>
                      If you are in crisis, free confidential support is available 24/7.
                      Help is always a message or call away.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                >
                  <Box
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 1,
                      bgcolor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.12)",
                        display: "grid",
                        placeItems: "center",
                        color: "common.white",
                      }}
                    >
                      <SmsOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                        Crisis Text Line
                      </Typography>
                      <Typography sx={{ color: "common.white", fontWeight: 700 }}>
                        Text HOME to 741741
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      p: 2.5,
                      borderRadius: 1,
                      bgcolor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.12)",
                        display: "grid",
                        placeItems: "center",
                        color: "common.white",
                      }}
                    >
                      <PhoneInTalkOutlinedIcon />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                        National Suicide Hotline
                      </Typography>
                      <Typography sx={{ color: "common.white", fontWeight: 700 }}>
                        Call or Text 988
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Reveal>
        </Container>
      </Box>

      {/* ── Statistics ───────────────────────────────────────── */}
      {/* <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2.5}>
            {STATS.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Reveal delay={i * 60}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: { xs: 2, md: 3 },
                      ...cardHover,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "success.light",
                        color: "primary.dark",
                        mx: "auto",
                        mb: 1.5,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "primary.dark",
                        fontWeight: 700,
                        fontSize: { xs: "1.5rem", md: "1.85rem" },
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}
    </Box>
  );
}
