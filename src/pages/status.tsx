import * as React from "react";
import { useRouter } from "next/router";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SeverityChip from "@/components/SeverityChip";
import StatusChip from "@/components/StatusChip";
import {
  INVESTIGATION_STEPS,
  STATUS_STEP_INDEX,
} from "@/lib/statusDisplay";
import {
  type CaseMessage,
  type CaseStatusData,
  type CaseTypeEntry,
} from "@/types/types";
import { GetCaseStatus } from "@/services/getapis";
import { DeletePublicCase } from "@/services/deleteapi";
import AppSnackbar from "@/utils/AppSnackbar";

function formatCaseType(entry: CaseTypeEntry): string {
  if (typeof entry === "string") return entry;
  return entry.other ? `Other (${entry.other})` : "Other";
}

function mapCaseStatus(data: CaseStatusData) {
  return {
    id: data.id,
    caseNumber: data.case_number,
    school: data.school,
    types: (data.types ?? []).map(formatCaseType),
    severity: data.severity,
    status: data.status,
    submitted: data.submitted,
    anonymous: Boolean(data.anonymous),
    summary: data.summary?.trim() || "",
    assignedTo: data.assignedTo || "Unassigned",
    timeline: data.timeline ?? [],
    messages: data.messages ?? [],
  };
}

type StatusReport = ReturnType<typeof mapCaseStatus>;

export default function StatusPage() {
  const router = useRouter();
  const [caseNumber, setCaseNumber] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [report, setReport] = React.useState<StatusReport | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [thread, setThread] = React.useState<CaseMessage[]>([]);
  const [reply, setReply] = React.useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });

  React.useEffect(() => {
    if (router.isReady && router.query.case) {
      setCaseNumber(String(router.query.case));
    }
  }, [router.isReady, router.query.case]);

  const lookup = async () => {
    if (!caseNumber.trim() || !pin.trim()) {
      setError("Enter both case number and PIN.");
      setReport(null);
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);
    setThread([]);

    try {
      const response = await GetCaseStatus(caseNumber.trim(), pin.trim());
      const axiosRes = response as {
        status?: number;
        data?: { success?: boolean; message?: string; data?: CaseStatusData };
        response?: { data?: { message?: string } };
      };

      if (axiosRes.status === 200 || axiosRes.status === 201) {
        const body = axiosRes.data;
        if (body?.success && body.data) {
          const mapped = mapCaseStatus(body.data);
          setReport(mapped);
          setThread(mapped.messages);
        } else {
          setError(body?.message || "No report matches that case number and PIN.");
        }
      } else {
        setError(
          axiosRes.response?.data?.message ||
            "No report matches that case number and PIN. Please check and try again."
        );
      }
    } catch {
      setError("Unable to look up case status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  const handleDeleteCase = async () => {
    if (!report || !pin.trim()) return;

    setDeleting(true);

    try {
      const response = await DeletePublicCase(report.id.toString(), pin.trim());
      const axiosRes = response as {
        status?: number;
        data?: { success?: boolean; message?: string };
        response?: { data?: { message?: string; detail?: string }; status?: number };
      };

      if (axiosRes.status === 200 || axiosRes.status === 201 || axiosRes.status === 204) {
        const message =
          axiosRes.data?.message || "Case deleted successfully.";
        setSnackbar({ open: true, message, severity: "success" });
        setConfirmDeleteOpen(false);
        setReport(null);
        setThread([]);
        setPin("");
      } else {
        const message =
          axiosRes.response?.data?.message ||
          axiosRes.response?.data?.detail ||
          axiosRes.data?.message ||
          "Unable to delete case.";
        setSnackbar({ open: true, message, severity: "error" });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Unable to delete case. Please try again.",
        severity: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const sendReply = () => {
    if (!reply.trim()) return;
    setThread((t) => [
      ...t,
      {
        from: "Reporter",
        author: "Anonymous reporter",
        timestamp: new Date().toLocaleString(),
        text: reply.trim(),
      },
    ]);
    setReply("");
  };

  const activeStepIndex = report ? STATUS_STEP_INDEX[report.status] : 0;

  return (
    <Box sx={{ pb: 6 }}>
      <PageHeader
        eyebrow="Anonymous Follow-Up"
        title="Check your report status"
        subtitle="Enter your case number and PIN to view progress and respond to investigators - without revealing who you are."
      />

      <Container maxWidth="md" sx={{ mt: { xs: -4, md: -5 }, position: "relative" }}>
        <Reveal>
          <Card sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <LockOpenRoundedIcon color="primary" />
              <Typography sx={{ fontWeight: 700 }}>Secure lookup</Typography>
            </Stack>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  label="Case number"
                  placeholder="CASE-05ODQ2W2"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void lookup();
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="PIN"
                  placeholder="0000"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void lookup();
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => void lookup()}
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <SearchRoundedIcon />
                    )
                  }
                  sx={{ height: 56 }}
                >
                  {loading ? "Looking up…" : "Look up"}
                </Button>
              </Grid>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
          </Card>
        </Reveal>

        {loading && (
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack alignItems="center" spacing={2}>
              <CircularProgress size={36} />
              <Typography variant="body2" color="text.secondary">
                Retrieving case status…
              </Typography>
            </Stack>
          </Card>
        )}

        {report && !loading && (
          <Fade in>
            <Box sx={{ mt: 3 }}>
              <Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      {report.caseNumber}
                    </Typography>
                    <Typography variant="h6">{report.school}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                      {report.types.map((t) => (
                        <Chip key={t} label={t} size="small" variant="outlined" />
                      ))}
                      <Chip
                        label={report.anonymous ? "Anonymous" : "Contact provided"}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </Box>
                  <Stack spacing={1} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
                    <StatusChip status={report.status} audience="public" />
                    <SeverityChip severity={report.severity} />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={deleting}
                      startIcon={<DeleteOutlineRoundedIcon />}
                      onClick={() => setConfirmDeleteOpen(true)}
                    >
                      Delete case
                    </Button>
                  </Stack>
                </Stack>

                {report.summary && (
                  <>
                    <Divider sx={{ my: 2.5 }} />
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>Summary</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
                      {report.summary}
                    </Typography>
                  </>
                )}

                <Divider sx={{ my: 2.5 }} />

                <Stack spacing={1} sx={{ mb: 2.5 }}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      Submitted
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {new Date(report.submitted).toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      Assigned to
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {report.assignedTo}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography sx={{ fontWeight: 700, mb: 2 }}>Investigation progress</Typography>
                <Stepper activeStep={activeStepIndex} alternativeLabel sx={{ mb: 1 }}>
                  {INVESTIGATION_STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel>
                        <Typography variant="caption">{label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Divider sx={{ my: 2.5 }} />

                <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Timeline</Typography>
                {(report.timeline?.length ?? 0) === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No timeline events yet.
                  </Typography>
                ) : (
                  <Stack spacing={0}>
                    {report.timeline.map((entry, i) => (
                      <Stack key={`${entry.label}-${entry.timestamp}-${i}`} direction="row" spacing={2}>
                        <Stack alignItems="center">
                          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "primary.main", mt: 0.5 }} />
                          {i < report.timeline.length - 1 && (
                            <Box sx={{ width: 2, flexGrow: 1, bgcolor: "divider", my: 0.5 }} />
                          )}
                        </Stack>
                        <Box sx={{ pb: 2 }}>
                          <Typography sx={{ fontWeight: 600 }}>{entry.label}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {entry.timestamp} · {entry.actor}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {entry.note}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Card>

              <Card sx={{ p: { xs: 2, md: 3 } }}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Messages from investigators</Typography>
                {thread.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No messages yet. If an investigator has a question, it will appear here.
                  </Typography>
                ) : (
                  <Stack spacing={1.5}>
                    {thread.map((m, i) => {
                      const mine = m.from === "Reporter";
                      return (
                        <Stack key={i} alignItems={mine ? "flex-end" : "flex-start"}>
                          <Box
                            sx={{
                              maxWidth: "80%",
                              px: 2,
                              py: 1.25,
                              borderRadius: 3,
                              borderTopRightRadius: mine ? 4 : 12,
                              borderTopLeftRadius: mine ? 12 : 4,
                              bgcolor: mine ? "primary.main" : "action.hover",
                              color: mine ? "primary.contrastText" : "text.primary",
                            }}
                          >
                            <Typography variant="caption" sx={{ opacity: 0.8, display: "block", mb: 0.25 }}>
                              {m.author} · {m.timestamp}
                            </Typography>
                            <Typography variant="body2">{m.text}</Typography>
                          </Box>
                        </Stack>
                      );
                    })}
                  </Stack>
                )}

                {/* <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Reply anonymously…"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendReply();
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={sendReply}
                    endIcon={<SendRoundedIcon />}
                    disabled={!reply.trim()}
                  >
                    Send
                  </Button>
                </Stack> */}
              </Card>
            </Box>
          </Fade>
        )}
      </Container>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => {
          if (!deleting) setConfirmDeleteOpen(false);
        }}
      >
        <DialogTitle>Delete this case?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete case{" "}
            <strong>{report?.caseNumber}</strong>? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmDeleteOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={deleting}
            onClick={() => void handleDeleteCase()}
            startIcon={
              deleting ? <CircularProgress size={16} color="inherit" /> : undefined
            }
          >
            {deleting ? "Deleting…" : "OK"}
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </Box>
  );
}
