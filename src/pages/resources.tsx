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
  InputAdornment,
  Link as MuiLink,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  COMMUNITY_RESOURCES,
  FEATURED_RESOURCES,
  LATEST_RESOURCES,
  RESOURCE_TYPES,
  type CommunityResource,
  type ResourceKind,
} from "@/data/resources";

function typeIcon(kind: ResourceKind) {
  switch (kind) {
    case "Webinar / Video":
      return <PlayCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />;
    case "Website":
      return <LanguageRoundedIcon sx={{ fontSize: 18 }} />;
    case "Online Tool / Dashboard":
      return <DashboardOutlinedIcon sx={{ fontSize: 18 }} />;
    case "Academic Article / Report":
      return <ArticleOutlinedIcon sx={{ fontSize: 18 }} />;
    case "Toolkit / White Paper":
      return <MenuBookRoundedIcon sx={{ fontSize: 18 }} />;
    default:
      return <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />;
  }
}

function yearSortValue(year: string) {
  if (year === "Live") return 9999;
  const n = Number(year);
  return Number.isFinite(n) ? n : 0;
}

const PAGE_SIZE = 10;

const RESOURCE_YEARS = Array.from(new Set(COMMUNITY_RESOURCES.map((r) => r.year))).sort(
  (a, b) => yearSortValue(b) - yearSortValue(a)
);

function matchesQuery(resource: CommunityResource, query: string) {
  if (!query) return true;
  const haystack = [
    resource.title,
    resource.organization,
    resource.type,
    resource.year,
    ...resource.topics,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export default function ResourcesPage() {
  const [query, setQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<ResourceKind | "All">("All");
  const [yearFilter, setYearFilter] = React.useState<string>("All");
  const [page, setPage] = React.useState(1);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = React.useMemo(
    () =>
      COMMUNITY_RESOURCES.filter((resource) => {
        if (typeFilter !== "All" && resource.type !== typeFilter) return false;
        if (yearFilter !== "All" && resource.year !== yearFilter) return false;
        return matchesQuery(resource, normalizedQuery);
      }),
    [normalizedQuery, typeFilter, yearFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

  React.useEffect(() => {
    setPage(1);
  }, [normalizedQuery, typeFilter, yearFilter]);

  return (
    <Box sx={{ pb: 2 }}>
      <PageHeader
        eyebrow="Guides & research"
        title="Resources"
        subtitle="Evidence-based guides, briefs, and videos to support safer schools, positive behavior systems, and student wellness - plus community safety literature from the CICS resource library."
      />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
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

        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              Resource library
            </Typography>
  
          </Reveal>

          <Reveal>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by title, organization, or topic"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
              <Chip
                label="All types"
                clickable
                color={typeFilter === "All" ? "primary" : "default"}
                variant={typeFilter === "All" ? "filled" : "outlined"}
                onClick={() => setTypeFilter("All")}
              />
              {RESOURCE_TYPES.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  clickable
                  color={typeFilter === type ? "primary" : "default"}
                  variant={typeFilter === type ? "filled" : "outlined"}
                  onClick={() => setTypeFilter(type)}
                />
              ))}
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              <Chip
                label="All years"
                clickable
                color={yearFilter === "All" ? "secondary" : "default"}
                variant={yearFilter === "All" ? "filled" : "outlined"}
                onClick={() => setYearFilter("All")}
              />
              {RESOURCE_YEARS.map((year) => (
                <Chip
                  key={year}
                  label={year}
                  clickable
                  color={yearFilter === year ? "secondary" : "default"}
                  variant={yearFilter === year ? "filled" : "outlined"}
                  onClick={() => setYearFilter(year)}
                />
              ))}
            </Stack>
          </Reveal>

          <Reveal>
            <Card>
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                {filtered.length === 0 ? (
                  <Typography sx={{ px: 3, py: 4 }} color="text.secondary">
                    No resources match those filters. Try a different search or clear a chip.
                  </Typography>
                ) : (
                  <>
                    <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: "divider" }} />}>
                      {paged.map((item) => (
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
                                minWidth: 56,
                                fontWeight: 700,
                                letterSpacing: "0.04em",
                                color: "primary.dark",
                              }}
                            >
                              {item.year}
                            </Typography>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                                {item.organization}
                              </Typography>
                              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 0.75 }}>
                                <Chip size="small" icon={typeIcon(item.type)} label={item.type} />
                                {item.topics.map((topic) => (
                                  <Chip key={topic} size="small" label={topic} variant="outlined" />
                                ))}
                              </Stack>
                            </Box>
                            <OpenInNewRoundedIcon
                              sx={{
                                fontSize: 18,
                                color: "text.secondary",
                                display: { xs: "none", sm: "block" },
                                flexShrink: 0,
                              }}
                            />
                          </Stack>
                        </MuiLink>
                      ))}
                    </Stack>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1.5}
                      sx={{ px: 2.5, py: 2, borderTop: "1px solid", borderColor: "divider" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Showing {rangeStart}–{rangeEnd} of {filtered.length}
                      </Typography>
                      <Pagination
                        color="primary"
                        page={currentPage}
                        count={totalPages}
                        disabled={totalPages <= 1}
                        onChange={(_, nextPage) => setPage(nextPage)}
                      />
                    </Stack>
                  </>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </Box>

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
