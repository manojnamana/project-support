import * as React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import PageHeader from "@/components/PageHeader";
import EmergencyBanner from "@/components/EmergencyBanner";
import ScrollableAutocomplete, {
  type AutocompleteOption,
} from "@/components/ScrollableAutocomplete";
import Reveal from "@/components/Reveal";
import {
  CONCERN_PROMPTS,
  CONCERN_TYPES,
  EVIDENCE_TYPES,
  SCHOOLS,
  URGENCY_LEVELS,
  type Severity,
} from "@/data";

const STEPS = [
  "School",
  "Concern",
  "Urgency",
  "Details",
  "Evidence",
  "Contact",
];

const GradientConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}, &.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]:
    {
      backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 2,
    backgroundColor: theme.palette.divider,
    transition: "background .4s ease",
  },
}));

interface FormState {
  school: AutocompleteOption | null;
  otherLocation: string;
  concerns: string[];
  urgency: Severity | "";
  description: string;
  evidence: string[];
  name: string;
  email: string;
  phone: string;
  anonymous: boolean;
}

const schoolOptions: AutocompleteOption[] = SCHOOLS.map((s) => ({
  value: s.id,
  label: s.name,
  caption: s.district === "—" ? "Not listed" : s.district,
}));

function makeCaseNumber() {
  const n = 463 + Math.floor(Math.random() * 500);
  return `PSV-2026-${String(n).padStart(5, "0")}`;
}
function makePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function ReportPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [form, setForm] = React.useState<FormState>({
    school: null,
    otherLocation: "",
    concerns: [],
    urgency: "",
    description: "",
    evidence: [],
    name: "",
    email: "",
    phone: "",
    anonymous: true,
  });

  // Preselect anonymity based on the entry CTA (?mode=anonymous|contact).
  React.useEffect(() => {
    if (!router.isReady) return;
    if (router.query.mode === "contact") {
      setForm((f) => ({ ...f, anonymous: false }));
    }
  }, [router.isReady, router.query.mode]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleConcern = (id: string) =>
    setForm((f) => ({
      ...f,
      concerns: f.concerns.includes(id)
        ? f.concerns.filter((c) => c !== id)
        : [...f.concerns, id],
    }));

  const toggleEvidence = (id: string) =>
    setForm((f) => ({
      ...f,
      evidence: f.evidence.includes(id)
        ? f.evidence.filter((c) => c !== id)
        : [...f.evidence, id],
    }));

  const isOtherLocation =
    form.school?.value === "other-school" || form.school?.value === "other-area";

  const canContinue = () => {
    switch (activeStep) {
      case 0:
        return !!form.school && (!isOtherLocation || form.otherLocation.trim().length > 2);
      case 1:
        return form.concerns.length > 0;
      case 2:
        return form.urgency !== "";
      case 3:
        return form.description.trim().length >= 10;
      default:
        return true;
    }
  };

  const next = () => setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const caseNumber = makeCaseNumber();
    const pin = makePin();
    router.push({
      pathname: "/success",
      query: { case: caseNumber, pin, urgency: form.urgency },
    });
  };

  return (
    <Box sx={{ pb: 8 }}>
      <PageHeader
        eyebrow="Anonymous Reporting Portal"
        title="Report a Safety Concern"
        subtitle="No login required. Share only what you're comfortable with — you can stay completely anonymous."
      />

      <Container maxWidth="md" sx={{ mt: { xs: -4, md: -5 }, position: "relative" }}>
        <Reveal>
          <Box sx={{ mb: 3 }}>
            <EmergencyBanner dense />
          </Box>
        </Reveal>

        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<GradientConnector />}
            sx={{ mb: 4 }}
          >
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 320 }}>
            {/* Step 1: School */}
            {activeStep === 0 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="Select your school or location"
                    caption="Start typing to search. Only 4 options show at once — scroll to see more."
                  />
                  <ScrollableAutocomplete
                    label="School or program location"
                    value={form.school}
                    onChange={(v) => set("school", v)}
                    options={schoolOptions}
                    placeholder="Search schools…"
                    required
                    helperText="Choose the closest match, or pick an 'Other…' option."
                  />
                  {isOtherLocation && (
                    <Fade in>
                      <TextField
                        sx={{ mt: 2.5 }}
                        fullWidth
                        label="Describe the school or area"
                        placeholder="e.g. Community center on Lake St, or a school not listed"
                        value={form.otherLocation}
                        onChange={(e) => set("otherLocation", e.target.value)}
                      />
                    </Fade>
                  )}
                </Box>
              </Fade>
            )}

            {/* Step 2: Concern */}
            {activeStep === 1 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="What type of concern is this?"
                    caption="Select all that apply."
                  />
                  <Grid container spacing={1.5}>
                    {CONCERN_TYPES.map((c) => {
                      const checked = form.concerns.includes(c.id);
                      return (
                        <Grid size={{ xs: 12, sm: 6 }} key={c.id}>
                          <Card
                            onClick={() => toggleConcern(c.id)}
                            sx={{
                              cursor: "pointer",
                              borderColor: checked ? "primary.main" : "divider",
                              bgcolor: (t) =>
                                checked ? `${t.palette.primary.main}0A` : "transparent",
                              "&:hover": { borderColor: "primary.main" },
                            }}
                          >
                            <CardContent
                              sx={{ display: "flex", alignItems: "center", gap: 1, py: 1.25, "&:last-child": { pb: 1.25 } }}
                            >
                              <Checkbox checked={checked} tabIndex={-1} disableRipple />
                              <Box>
                                <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                  {c.label}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {c.description}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Fade>
            )}

            {/* Step 3: Urgency */}
            {activeStep === 2 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="How serious is this concern?"
                    caption="This helps us route your report to the right people quickly."
                  />
                  <Stack spacing={1.5}>
                    {URGENCY_LEVELS.map((u) => {
                      const selected = form.urgency === u.value;
                      return (
                        <Card
                          key={u.value}
                          onClick={() => set("urgency", u.value)}
                          sx={{
                            cursor: "pointer",
                            borderColor: selected ? `${u.color}.main` : "divider",
                            bgcolor: (t) =>
                              selected ? `${t.palette[u.color].main}0F` : "transparent",
                            "&:hover": { borderColor: `${u.color}.main` },
                          }}
                        >
                          <CardContent sx={{ display: "flex", gap: 1.5, py: 1.5, "&:last-child": { pb: 1.5 } }}>
                            <Radio checked={selected} color={u.color} tabIndex={-1} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontWeight: 700 }}>{u.title}</Typography>
                                <Chip label={u.helper} size="small" color={u.color} variant="outlined" />
                              </Stack>
                              <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1 }}>
                                {u.examples.map((ex) => (
                                  <Chip
                                    key={ex}
                                    label={ex}
                                    size="small"
                                    sx={{ bgcolor: "action.hover" }}
                                  />
                                ))}
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                  {form.urgency === "Emergency" && (
                    <Box sx={{ mt: 2 }}>
                      <EmergencyBanner />
                    </Box>
                  )}
                </Box>
              </Fade>
            )}

            {/* Step 4: Details */}
            {activeStep === 3 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="Describe what happened"
                    caption="Share as much detail as you can. Every detail helps."
                  />
                  <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2 }}>
                    {CONCERN_PROMPTS.map((q) => (
                      <Chip key={q} label={q} size="small" variant="outlined" color="primary" />
                    ))}
                  </Stack>
                  <TextField
                    fullWidth
                    multiline
                    minRows={7}
                    label="Details"
                    placeholder="Who is involved? What happened? When and where did it happen? Is anyone in danger?"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    helperText={`${form.description.length} characters — at least 10 required`}
                  />
                </Box>
              </Fade>
            )}

            {/* Step 5: Evidence */}
            {activeStep === 4 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="Upload evidence (optional)"
                    caption="Screenshots, photos, or other supporting information."
                  />
                  <Box
                    component="label"
                    sx={{
                      display: "block",
                      border: "2px dashed",
                      borderColor: "divider",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all .25s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: (t) => `${t.palette.primary.main}06`,
                      },
                    }}
                  >
                    <input
                      hidden
                      type="file"
                      multiple
                      onChange={(e) => {
                        const names = Array.from(e.target.files ?? []).map((f) => f.name);
                        if (names.length) set("evidence", [...form.evidence, ...names]);
                      }}
                    />
                    <CloudUploadRoundedIcon color="primary" sx={{ fontSize: 44 }} />
                    <Typography sx={{ fontWeight: 600, mt: 1 }}>
                      Click to upload or drag files here
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supported: {EVIDENCE_TYPES.join(", ")}
                    </Typography>
                  </Box>

                  {form.evidence.length > 0 && (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      {form.evidence.map((file, i) => (
                        <Stack
                          key={`${file}-${i}`}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{
                            p: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                          }}
                        >
                          <InsertDriveFileRoundedIcon color="action" fontSize="small" />
                          <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
                            {file}
                          </Typography>
                          <CloseRoundedIcon
                            fontSize="small"
                            sx={{ cursor: "pointer", color: "text.secondary" }}
                            onClick={() =>
                              set(
                                "evidence",
                                form.evidence.filter((_, idx) => idx !== i)
                              )
                            }
                          />
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Fade>
            )}

            {/* Step 6: Contact */}
            {activeStep === 5 && (
              <Fade in>
                <Box>
                  <StepHeading
                    title="Contact information (optional)"
                    caption="Leave your details if you'd like follow-up — or stay anonymous."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.anonymous}
                        onChange={(e) => set("anonymous", e.target.checked)}
                      />
                    }
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Remain anonymous</Typography>
                        <Typography variant="caption" color="text.secondary">
                          You'll still get a case number & PIN to follow up.
                        </Typography>
                      </Box>
                    }
                  />
                  <Grid container spacing={2} sx={{ mt: 0.5, opacity: form.anonymous ? 0.5 : 1, transition: "opacity .3s ease" }}>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        disabled={form.anonymous}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        disabled={form.anonymous}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        disabled={form.anonymous}
                      />
                    </Grid>
                  </Grid>

                  <ReviewSummary form={form} />
                </Box>
              </Fade>
            )}
          </Box>

          {/* Navigation */}
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
            <Button
              onClick={back}
              disabled={activeStep === 0}
              startIcon={<ArrowBackRoundedIcon />}
              color="inherit"
            >
              Back
            </Button>
            {activeStep < STEPS.length - 1 ? (
              <Button
                variant="contained"
                onClick={next}
                disabled={!canContinue()}
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={submit}
                endIcon={<SendRoundedIcon />}
              >
                Submit Report
              </Button>
            )}
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

function StepHeading({ title, caption }: { title: string; caption: string }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {caption}
      </Typography>
    </Box>
  );
}

function ReviewSummary({ form }: { form: FormState }) {
  const concernLabels = CONCERN_TYPES.filter((c) => form.concerns.includes(c.id)).map(
    (c) => c.label
  );
  const rows: { label: string; value: string }[] = [
    {
      label: "Location",
      value:
        (form.school?.label ?? "—") +
        (form.otherLocation ? ` · ${form.otherLocation}` : ""),
    },
    { label: "Concern(s)", value: concernLabels.join(", ") || "—" },
    { label: "Urgency", value: form.urgency || "—" },
    { label: "Evidence", value: form.evidence.length ? `${form.evidence.length} file(s)` : "None" },
    { label: "Follow-up", value: form.anonymous ? "Anonymous" : form.name || "Contact provided" },
  ];
  return (
    <Card variant="outlined" sx={{ mt: 3, bgcolor: "background.default" }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <CheckCircleRoundedIcon color="success" fontSize="small" />
          <Typography sx={{ fontWeight: 700 }}>Review before submitting</Typography>
        </Stack>
        <Stack spacing={1}>
          {rows.map((r) => (
            <Stack
              key={r.label}
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography variant="body2" color="text.secondary">
                {r.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right" }}>
                {r.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
