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
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { FEATURED_RESOURCES, LATEST_RESOURCES } from "@/data/resources";

export default function ResourcesPage() {
  return (
    <Box sx={{ pb: 2 }}>
      <PageHeader
        eyebrow="Guides & research"
        title="Resources"
        subtitle="Evidence-based guides, briefs, and videos to support safer schools, positive behavior systems, and student wellness."
      />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Featured */}
        <Reveal>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <MenuBookRoundedIcon color="primary" />
            <Typography variant="h5">Featured resources</Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Start with these foundational publications and video highlights.
          </Typography>
        </Reveal>

        <Grid container spacing={2.5}>
          {FEATURED_RESOURCES.map((resource, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resource.id}>
              <Reveal delay={i * 70}>
                <MuiLink
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ display: "block", height: "100%" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 280, md: 300 },
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundImage: `url(${resource.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .35s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 16px 40px rgba(22,51,44,0.18)",
                        "& .resource-overlay": {
                          bgcolor: "rgba(14,36,30,0.82)",
                        },
                      },
                    }}
                  >
                    <Box
                      className="resource-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 2.5,
                        bgcolor: "rgba(22,51,44,0.72)",
                        transition: "background-color .3s ease",
                      }}
                    >
                      <Chip
                        size="small"
                        icon={
                          resource.kind === "video" ? (
                            <PlayCircleOutlineRoundedIcon sx={{ fontSize: 16 }} />
                          ) : (
                            <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
                          )
                        }
                        label={resource.kind === "video" ? "Video" : "Resource"}
                        sx={{
                          alignSelf: "flex-start",
                          mb: 1.25,
                          bgcolor: "secondary.main",
                          color: "secondary.contrastText",
                          fontWeight: 700,
                          "& .MuiChip-icon": { color: "secondary.contrastText" },
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "common.white",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {resource.title}
                      </Typography>
                      {resource.description ? (
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.75,
                            color: "rgba(255,255,255,0.82)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {resource.description}
                        </Typography>
                      ) : null}
                    </Box>
                  </Box>
                </MuiLink>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Latest */}
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Latest resources
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Recently published guides and tools for educators and leaders.
            </Typography>
          </Reveal>

          <Reveal>
            <Card>
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />}>
                  {LATEST_RESOURCES.map((item) => (
                    <MuiLink
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{
                        display: "block",
                        px: { xs: 2, md: 3 },
                        py: 2.25,
                        transition: "background-color .2s ease",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 0.75, sm: 2 }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            minWidth: 88,
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            color: "primary.dark",
                          }}
                        >
                          {item.date}
                        </Typography>
                        <Typography
                          sx={{
                            flex: 1,
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <OpenInNewRoundedIcon
                          sx={{
                            fontSize: 18,
                            color: "text.secondary",
                            display: { xs: "none", sm: "block" },
                          }}
                        />
                      </Stack>
                    </MuiLink>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Reveal>
        </Box>

        {/* CTA */}
        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Card
              sx={{
                bgcolor: "primary.main",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" sx={{ color: "primary.contrastText" }}>
                      See something that needs attention?
                    </Typography>
                    <Typography sx={{ mt: 1, color: "primary.contrastText", opacity: 0.9 }}>
                      Use these resources to strengthen prevention — and report concerns early
                      through Project SUPPORT.
                    </Typography>
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
                        "&:hover": { bgcolor: "success.light" },
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
