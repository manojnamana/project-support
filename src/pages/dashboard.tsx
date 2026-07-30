import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import StatCard from "@/components/StatCard";
import SeverityChip from "@/components/SeverityChip";
import StatusChip from "@/components/StatusChip";
import ScrollableSelect from "@/components/ScrollableSelect";
import {
  STATUS_FILTER_OPTIONS,
  SEVERITY_FILTER_OPTIONS,
  STAFF_STATUS_LABEL,
  type CaseStatus,
} from "@/lib/statusDisplay";
import {
  clearAuthSession,
  getStaffDisplayName,
  getStaffUser,
} from "@/services/auth";
import { GetDashboardData } from "@/services/getapis";
import { UpdateCaseStatus } from "@/services/putapis";
import type {
  CaseTypeEntry,
  DashboardCase,
  DashboardPagination,
  DashboardSummary,
  StaffUser,
} from "@/types/types";
import { useRouter } from "next/router";

function formatConcernType(entry: CaseTypeEntry): string {
  if (typeof entry === "string") return entry;
  return entry.other ? `Other (${entry.other})` : "Other";
}

const CASE_STATUS_OPTIONS = (Object.keys(STAFF_STATUS_LABEL) as CaseStatus[]).map(
  (value) => ({
    value,
    label: STAFF_STATUS_LABEL[value],
  })
);

const EMPTY_SUMMARY: DashboardSummary = {
  total_reports: 0,
  open_cases: 0,
  emergency_cases: 0,
  resolved_cases: 0,
};

const EMPTY_PAGINATION: DashboardPagination = {
  count: 0,
  next: null,
  previous: null,
  current_page: 1,
  page_size: 10,
  total_pages: 1,
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<StaffUser | null>(null);
  const [status, setStatus] = React.useState("all");
  const [severity, setSeverity] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [cases, setCases] = React.useState<DashboardCase[]>([]);
  const [summary, setSummary] = React.useState<DashboardSummary>(EMPTY_SUMMARY);
  const [pagination, setPagination] =
    React.useState<DashboardPagination>(EMPTY_PAGINATION);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [selected, setSelected] = React.useState<DashboardCase | null>(null);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [updateStatus, setUpdateStatus] = React.useState<CaseStatus>("received");
  const [remarks, setRemarks] = React.useState("");
  const [updatingStatus, setUpdatingStatus] = React.useState(false);
  const [updateError, setUpdateError] = React.useState("");
  const [updateSuccess, setUpdateSuccess] = React.useState("");

  React.useEffect(() => {
    setUser(getStaffUser());
  }, []);

  React.useEffect(() => {
    if (!selected) {
      setUpdateStatus("received");
      setRemarks("");
      setUpdateError("");
      setUpdateSuccess("");
      return;
    }
    setUpdateStatus(selected.status);
    setRemarks("");
    setUpdateError("");
    setUpdateSuccess("");
  }, [selected]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = query.trim();
      setDebouncedQuery((prev) => {
        if (prev !== next) setPage(1);
        return next;
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [query]);

  React.useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await GetDashboardData(
          status,
          severity,
          page,
          debouncedQuery
        );
        const axiosRes = response as {
          status?: number;
          data?: {
            success?: boolean;
            message?: string;
            data?: {
              summary?: DashboardSummary;
              pagination?: DashboardPagination;
              cases?: DashboardCase[];
            };
          };
          response?: { data?: { message?: string }; status?: number };
        };

        if (cancelled) return;

        if (axiosRes.status === 200 || axiosRes.status === 201) {
          const body = axiosRes.data;
          if (body?.success && body.data) {
            setSummary(body.data.summary ?? EMPTY_SUMMARY);
            setPagination(body.data.pagination ?? EMPTY_PAGINATION);
            setCases(body.data.cases ?? []);
          } else {
            setCases([]);
            setSummary(EMPTY_SUMMARY);
            setPagination(EMPTY_PAGINATION);
            setError(body?.message || "Unable to load dashboard data.");
          }
        } else if (axiosRes.response?.status === 401) {
          clearAuthSession();
          void router.replace("/login");
        } else {
          setCases([]);
          setSummary(EMPTY_SUMMARY);
          setPagination(EMPTY_PAGINATION);
          setError(
            axiosRes.response?.data?.message ||
              "Unable to load dashboard data. Please try again."
          );
        }
      } catch {
        if (!cancelled) {
          setCases([]);
          setSummary(EMPTY_SUMMARY);
          setPagination(EMPTY_PAGINATION);
          setError("Unable to load dashboard data. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadDashboard();
    return () => {
      cancelled = true;
    };
  }, [status, severity, page, debouncedQuery, router, refreshKey]);

  const handleLogout = () => {
    clearAuthSession();
    void router.replace("/login");
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleSeverityChange = (value: string) => {
    setSeverity(value);
    setPage(1);
  };

  const handleUpdateCaseStatus = async () => {
    if (!selected) return;
    if (!updateStatus) {
      setUpdateError("Select a status.");
      return;
    }
    if (!remarks.trim()) {
      setUpdateError("Add a remark before updating status.");
      return;
    }

    setUpdatingStatus(true);
    setUpdateError("");
    setUpdateSuccess("");

    try {
      const response = await UpdateCaseStatus(
        selected.id.toString(),
        updateStatus,
        remarks.trim()
      );
      const axiosRes = response as {
        status?: number;
        data?: { success?: boolean; message?: string };
        response?: { data?: { message?: string }; status?: number };
      };

      if (axiosRes.status === 200 || axiosRes.status === 201) {
        const message =
          axiosRes.data?.message || "Case status updated successfully.";
        setUpdateSuccess(message);
        setSelected((prev) =>
          prev ? { ...prev, status: updateStatus } : prev
        );
        setCases((prev) =>
          prev.map((c) =>
            c.id === selected.id ? { ...c, status: updateStatus } : c
          )
        );
        setRefreshKey((k) => k + 1);
      } else if (axiosRes.response?.status === 401) {
        clearAuthSession();
        void router.replace("/login");
      } else {
        setUpdateError(
          axiosRes.response?.data?.message ||
            axiosRes.data?.message ||
            "Unable to update case status."
        );
      }
    } catch {
      setUpdateError("Unable to update case status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const displayName = getStaffDisplayName(user);
  const roleLabel = user?.role || "Administrator";
  const schoolLabel = user?.school?.name;
  const totalPages = Math.max(1, pagination.total_pages || 1);

  return (
    <Box sx={{ pb: 6 }}>
      <PageHeader
        eyebrow={roleLabel}
        title="Incoming Reports Queue"
        subtitle={
          schoolLabel
            ? `${displayName} · ${schoolLabel}`
            : `Signed in as ${displayName}. Review, triage, and act on incoming safety reports.`
        }
        action={
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "primary.contrastText" }}
              >
                {displayName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "primary.contrastText", opacity: 0.8 }}
              >
                {user?.email || roleLabel}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
              }}
            >
              Sign out
            </Button>
          </Stack>
        }
      />

      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -5 }, position: "relative" }}>
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal>
              <StatCard
                icon={<InboxRoundedIcon />}
                value={summary.total_reports}
                label="Total reports"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={70}>
              <StatCard
                icon={<PendingActionsRoundedIcon />}
                value={summary.open_cases}
                label="Open cases"
                color="info.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={140}>
              <StatCard
                icon={<ReportProblemRoundedIcon />}
                value={summary.emergency_cases}
                label="Emergency"
                color="error.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={210}>
              <StatCard
                icon={<TaskAltRoundedIcon />}
                value={summary.resolved_cases}
                label="Resolved / closed"
                color="success.main"
              />
            </Reveal>
          </Grid>
        </Grid>

        <Reveal>
          <Card sx={{ p: { xs: 2, md: 2.5 }, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 6, md: 3 }}>
                <ScrollableSelect
                  id="status-filter"
                  label="Status"
                  value={status}
                  onChange={handleStatusChange}
                  options={STATUS_FILTER_OPTIONS}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <ScrollableSelect
                  id="severity-filter"
                  label="Severity"
                  value={severity}
                  onChange={handleSeverityChange}
                  options={SEVERITY_FILTER_OPTIONS}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search case #, school, type…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Reveal>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Reveal>
          <Card sx={{ position: "relative" }}>
            {loading && (
              <Stack
                alignItems="center"
                justifyContent="center"
                spacing={1.5}
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.72)",
                }}
              >
                <CircularProgress size={32} />
                <Typography variant="body2" color="text.secondary">
                  Loading reports…
                </Typography>
              </Stack>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{ "& th": { fontWeight: 700, bgcolor: "background.default" } }}
                  >
                    <TableCell>Case</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submitted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cases.map((r) => {
                    const types = (r.concern_types ?? []).map(formatConcernType);
                    return (
                      <TableRow
                        key={r.id}
                        hover
                        onClick={() => setSelected(r)}
                        sx={{ cursor: "pointer", transition: "background .2s ease" }}
                      >
                        <TableCell sx={{ fontFamily: "monospace" }}>
                          {r.case_number}
                        </TableCell>
                        <TableCell>{r.school}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {types.map((t) => (
                              <Chip key={t} label={t} size="small" variant="outlined" />
                            ))}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <SeverityChip severity={r.severity} />
                        </TableCell>
                        <TableCell>
                          <StatusChip status={r.status} />
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: "nowrap", color: "text.secondary" }}
                        >
                          {new Date(r.submitted).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {!loading && cases.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box sx={{ py: 5, textAlign: "center" }}>
                          <Typography color="text.secondary">
                            No reports match your filters.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                  {loading && cases.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box sx={{ py: 8 }} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={1.5}
              sx={{ px: 2.5, py: 2, borderTop: "1px solid", borderColor: "divider" }}
            >
              <Typography variant="body2" color="text.secondary">
                {pagination.count
                  ? `Showing page ${pagination.current_page} of ${totalPages} · ${pagination.count} total`
                  : "No results"}
              </Typography>
              <Pagination
                color="primary"
                page={pagination.current_page || page}
                count={totalPages}
                disabled={loading || totalPages <= 1}
                onChange={(_, nextPage) => setPage(nextPage)}
              />
            </Stack>
          </Card>
        </Reveal>
      </Container>

      <Drawer
        anchor="right"
        open={!!selected}
        onClose={() => setSelected(null)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 460 }, p: 3 } }}
      >
        {selected && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="overline" color="text.secondary">
                {selected.case_number}
              </Typography>
              <IconButton onClick={() => setSelected(null)} size="small">
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography variant="h6">{selected.school}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap" useFlexGap>
              <SeverityChip severity={selected.severity} />
              <StatusChip status={selected.status} />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Field
              label="Concern types"
              value={(selected.concern_types ?? []).map(formatConcernType).join(", ") || "—"}
            />
            <Field
              label="Submitted"
              value={new Date(selected.submitted).toLocaleString()}
            />

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Update status</Typography>
            <Stack spacing={2}>
              <ScrollableSelect
                id="case-status-update"
                label="Status"
                value={updateStatus}
                onChange={(value) => setUpdateStatus(value as CaseStatus)}
                options={CASE_STATUS_OPTIONS}
                required
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                required
                label="Remarks"
                placeholder="e.g. Assigned to school counselor."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={updatingStatus}
              />
              {updateError && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {updateError}
                </Alert>
              )}
              {updateSuccess && (
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  {updateSuccess}
                </Alert>
              )}
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={updatingStatus}
                  onClick={() => void handleUpdateCaseStatus()}
                  startIcon={
                    updatingStatus ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : undefined
                  }
                >
                  {updatingStatus ? "Updating…" : "Update status"}
                </Button>
                <Button variant="outlined" fullWidth disabled>
                  Assign
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ mb: 1.25 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}
