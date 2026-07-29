import * as React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  AUTHORIZED_ROLES,
  INVESTIGATION_STEPS,
  ROUTING_RULES,
  URGENCY_LEVELS,
} from "@/data";

export default function HowItWorks() {
  return (
    <Box sx={{ pb: 2 }}>
      <PageHeader
        eyebrow="About the process"
        title="How Project SUPPORT works"
        subtitle="Every report is reviewed by trained staff and routed to the right people based on the type and urgency of the concern."
      />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Urgency levels */}
        <Reveal>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Levels of urgency
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You choose how serious the concern is — this drives how quickly it's handled.
          </Typography>
        </Reveal>
        <Grid container spacing={2.5}>
          {URGENCY_LEVELS.map((u, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={u.value}>
              <Reveal delay={i * 80}>
                <Card
                  sx={{
                    minHeight: "210px",
                    maxHeight: "210px",
                    borderTop: "4px solid",
                    borderTopColor: `${u.color}.main`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{u.title}</Typography>
                    <Chip
                      label={u.helper}
                      size="small"
                      color={u.color}
                      variant="outlined"
                      sx={{ my: 1 }}
                    />
                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                      {u.examples.map((ex) => (
                        <Typography key={ex} variant="body2" color="text.secondary">
                          • {ex}
                        </Typography>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Routing logic */}
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <RouteRoundedIcon color="primary" />
              <Typography variant="h5">Automated routing</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Reports reach the right responders automatically, with clear response targets.
            </Typography>
          </Reveal>
          <Grid container spacing={2.5}>
            {ROUTING_RULES.map((r, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={r.category}>
                <Reveal delay={i * 80}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1.5 }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>{r.category}</Typography>
                        <Chip
                          label={r.target}
                          size="small"
                          color={r.color}
                          sx={{ fontWeight: 700 }}
                        />
                      </Stack>
                      <Stack direction="row" flexWrap="wrap" gap={0.75}>
                        {r.routesTo.map((role) => (
                          <Chip
                            key={role}
                            label={role}
                            size="small"
                            variant="outlined"
                            sx={{ bgcolor: "action.hover" }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Investigation workflow */}
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <TimelineRoundedIcon color="primary" />
              <Typography variant="h5">Investigation workflow</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Each case follows a consistent path from submission to resolution.
            </Typography>
          </Reveal>
          <Reveal>
            <Card>
              <CardContent sx={{ overflowX: "auto" }}>
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  sx={{ minWidth: "max-content" }}
                >
                  {INVESTIGATION_STEPS.map((step, i) => (
                    <Stack key={step} direction="row" alignItems="center">
                      <Stack alignItems="center" spacing={1} sx={{ width: 130 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            color: "common.white",
                            fontWeight: 800,
                            bgcolor: "primary.main",
                          }}
                        >
                          {i + 1}
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "center", fontWeight: 600, px: 0.5 }}
                        >
                          {step}
                        </Typography>
                      </Stack>
                      {i < INVESTIGATION_STEPS.length - 1 && (
                        <ArrowForwardRoundedIcon color="disabled" sx={{ mx: -1 }} />
                      )}
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Reveal>
        </Box>

        {/* Who reviews */}
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Card
              sx={{
                color: "text.primary",
                bgcolor: "primary.main",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" color="common.white">Who reviews reports?</Typography>
                    <Typography color="common.white" sx={{ mt: 1 }}>
                      Only authorized personnel can access reports through the secure
                      administrative dashboard.
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                      {AUTHORIZED_ROLES.map((role) => (
                        <Chip
                          key={role}
                          label={role}
                          sx={{ bgcolor: "secondary.main", color: "text.primary" }}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Button
                      component={Link}
                      href="/report"
                      variant="contained"
                      fullWidth
                      size="large"
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{
                        bgcolor: "background.paper",
                        color: "text.primary",
                        "&:hover": { bgcolor: "secondary.main" },
                      }}
                    >
                      Report a concern
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
