import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
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
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import StatCard from "@/components/StatCard";
import SeverityChip from "@/components/SeverityChip";
import StatusChip from "@/components/StatusChip";
import ScrollableSelect from "@/components/ScrollableSelect";
import { REPORTS, SCHOOLS, type Report } from "@/data";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "Open", label: "Open" },
  { value: "Under Review", label: "Under Review" },
  { value: "Referred", label: "Referred" },
  { value: "Action Taken", label: "Action Taken" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
];

const SEVERITY_OPTIONS = [
  { value: "all", label: "All severities" },
  { value: "Low", label: "Low" },
  { value: "Moderate", label: "Moderate" },
  { value: "High", label: "High" },
  { value: "Emergency", label: "Emergency" },
];

const schoolFilterOptions = [
  { value: "all", label: "All schools" },
  ...SCHOOLS.filter((s) => s.district !== "—").map((s) => ({
    value: s.id,
    label: s.name,
    caption: s.district,
  })),
];

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = React.useState("coordinator@projectsupport.org");
  const [password, setPassword] = React.useState("");
  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Reveal>
        <Card sx={{ p: { xs: 3, md: 4 } }}>
          <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                color: "text.primary",
                bgcolor: "primary.main",
              }}
            >
              <LockRoundedIcon />
            </Box>
            <Typography variant="h5">Administrative Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Restricted access for authorized personnel only.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <TextField
              label="Work email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              placeholder="Enter any password to preview"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<LoginRoundedIcon />}
              onClick={onLogin}
            >
              Sign in
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2, textAlign: "center" }}>
            Demo mode — any password grants access.
          </Typography>
        </Card>
      </Reveal>
    </Container>
  );
}

export default function DashboardPage() {
  const [authed, setAuthed] = React.useState(false);
  const [school, setSchool] = React.useState("all");
  const [status, setStatus] = React.useState("all");
  const [severity, setSeverity] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Report | null>(null);

  const filtered = React.useMemo(() => {
    return REPORTS.filter((r) => {
      if (school !== "all" && r.schoolId !== school) return false;
      if (status !== "all" && r.status !== status) return false;
      if (severity !== "all" && r.severity !== severity) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          r.caseNumber.toLowerCase().includes(q) ||
          r.school.toLowerCase().includes(q) ||
          r.types.join(" ").toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [school, status, severity, query]);

  const stats = React.useMemo(
    () => ({
      total: REPORTS.length,
      open: REPORTS.filter((r) => r.status === "Open" || r.status === "Under Review").length,
      emergency: REPORTS.filter((r) => r.severity === "Emergency").length,
      resolved: REPORTS.filter((r) => r.status === "Resolved" || r.status === "Closed").length,
    }),
    []
  );

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;

  return (
    <Box sx={{ pb: 6 }}>
      <PageHeader
        eyebrow="Project SUPPORT Administrator"
        title="Incoming Reports Queue"
        subtitle="Review, triage, and act on incoming safety reports."
        action={
          <Button
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => setAuthed(false)}
            sx={{ color: "text.primary", borderColor: "text.primary" }}
          >
            Sign out
          </Button>
        }
      />

      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -5 }, position: "relative" }}>
        {/* Stats */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal>
              <StatCard icon={<InboxRoundedIcon />} value={stats.total} label="Total reports" />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={70}>
              <StatCard
                icon={<PendingActionsRoundedIcon />}
                value={stats.open}
                label="Open / reviewing"
                color="info.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={140}>
              <StatCard
                icon={<ReportProblemRoundedIcon />}
                value={stats.emergency}
                label="Emergency"
                color="error.main"
              />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Reveal delay={210}>
              <StatCard
                icon={<TaskAltRoundedIcon />}
                value={stats.resolved}
                label="Resolved / closed"
                color="success.main"
              />
            </Reveal>
          </Grid>
        </Grid>

        {/* Filters */}
        <Reveal>
          <Card sx={{ p: { xs: 2, md: 2.5 }, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }}>
                <ScrollableSelect
                  id="school-filter"
                  label="School"
                  value={school}
                  onChange={setSchool}
                  options={schoolFilterOptions}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 2.5 }}>
                <ScrollableSelect
                  id="status-filter"
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={STATUS_OPTIONS}
                />
              </Grid>
              <Grid size={{ xs: 6, md: 2.5 }}>
                <ScrollableSelect
                  id="severity-filter"
                  label="Severity"
                  value={severity}
                  onChange={setSeverity}
                  options={SEVERITY_OPTIONS}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  placeholder="Search case #, type, summary…"
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

        {/* Table */}
        <Reveal>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: 700, bgcolor: "background.default" } }}>
                    <TableCell>Case</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submitted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow
                      key={r.id}
                      hover
                      onClick={() => setSelected(r)}
                      sx={{ cursor: "pointer", transition: "background .2s ease" }}
                    >
                      <TableCell sx={{ fontFamily: "monospace" }}>{r.caseNumber}</TableCell>
                      <TableCell>{r.school}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                          {r.types.map((t) => (
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
                      <TableCell sx={{ whiteSpace: "nowrap", color: "text.secondary" }}>
                        {new Date(r.submitted).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
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
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Reveal>
      </Container>

      {/* Detail drawer */}
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
                {selected.caseNumber}
              </Typography>
              <IconButton onClick={() => setSelected(null)} size="small">
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography variant="h6">{selected.school}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
              <SeverityChip severity={selected.severity} />
              <StatusChip status={selected.status} />
              <Chip
                label={selected.anonymous ? "Anonymous" : "Contact provided"}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Field label="Concern types" value={selected.types.join(", ")} />
            <Field label="Assigned to" value={selected.assignedTo} />
            <Field
              label="Submitted"
              value={new Date(selected.submitted).toLocaleString()}
            />
            <Box sx={{ mt: 1.5 }}>
              <Typography variant="caption" color="text.secondary">
                Summary
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {selected.summary}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Case timeline</Typography>
            <Stack spacing={0}>
              {selected.timeline.map((entry, i) => (
                <Stack key={i} direction="row" spacing={1.5}>
                  <Stack alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "primary.main", mt: 0.6 }} />
                    {i < selected.timeline.length - 1 && (
                      <Box sx={{ width: 2, flexGrow: 1, bgcolor: "divider", my: 0.5 }} />
                    )}
                  </Stack>
                  <Box sx={{ pb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {entry.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entry.timestamp} · {entry.actor}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.25 }}>
                      {entry.note}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth>
                Update status
              </Button>
              <Button variant="outlined" fullWidth>
                Assign
              </Button>
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
