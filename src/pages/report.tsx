import * as React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
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
import AppSnackbar from "@/utils/AppSnackbar";
import ScrollableAutocomplete, {
  type AutocompleteOption,
} from "@/components/ScrollableAutocomplete";
import Reveal from "@/components/Reveal";
import {
  EVIDENCE_TYPES,
  URGENCY_LEVELS,
} from "@/data";
import { ConcernQuestion, ConcernType, SchoolOption, Severity } from "@/types/types";
import {
  GetPublicConcerns,
  GetPublicSchools,
  GetQuestionsBasedOnConcern,
} from "@/services/getapis";

const STEPS = [
  "School",
  "Concern",
  "Urgency",
  "Details",
  "Evidence",
  "Contact",
];

const OTHER_CONCERN: ConcernType = {
  id: "other",
  name: "Other",
  slug: "other",
  description: "A concern not listed above",
};

function normalizeConcernText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Returns a listed concern type when free-text matches its label (excluding "Other"). */
function findMatchingConcernType(text: string, concerns: ConcernType[]) {
  const normalized = normalizeConcernText(text);
  if (!normalized) return null;
  return (
    concerns.find(
      (c) => c.slug !== "other" && normalizeConcernText(c.name) === normalized
    ) ?? null
  );
}

/** Map form concern slugs to API question query slugs (`other` alone → `others`). */
function toQuestionSlugs(concernSlugs: string[]): string[] {
  const selected = concernSlugs.filter(Boolean);
  const hasOther = selected.includes("other");
  const regular = selected.filter((slug) => slug !== "other");

  // Only "Other" selected → request questions with slug=others
  if (hasOther && regular.length === 0) return ["others"];
  return regular;
}

function normalizeQuestions(payload: unknown): ConcernQuestion[] {
  const list = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  const seen = new Set<string>();
  const questions: ConcernQuestion[] = [];

  list.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const row = item as Record<string, unknown>;
    const questionText = [row.question, row.text, row.prompt, row.label, row.title]
      .find((v) => typeof v === "string" && v.trim())
      ?.toString()
      .trim();
    if (!questionText) return;

    const fieldKey =
      typeof row.field_key === "string" && row.field_key.trim()
        ? row.field_key.trim()
        : `field_${index}`;
    if (seen.has(fieldKey)) return;
    seen.add(fieldKey);

    const id =
      typeof row.id === "string" || typeof row.id === "number"
        ? String(row.id)
        : fieldKey;

    questions.push({
      id,
      question: questionText,
      field_key: fieldKey,
      field_type:
        typeof row.field_type === "string" && row.field_type.trim()
          ? row.field_type.trim()
          : "text",
      is_required: Boolean(row.is_required),
      display_order:
        typeof row.display_order === "number" ? row.display_order : index + 1,
      is_common: Boolean(row.is_common),
    });
  });

  return questions.sort((a, b) => a.display_order - b.display_order);
}

const SolidConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}, &.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]:
    {
      backgroundColor: theme.palette.primary.main,
    },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 2,
    backgroundColor: theme.palette.divider,
    transition: "background-color .3s ease",
  },
}));

interface FormState {
  school: AutocompleteOption | null;
  otherLocation: string;
  concerns: string[];
  otherConcern: string;
  urgency: Severity | "";
  answers: Record<string, string>;
  evidence: string[];
  name: string;
  email: string;
  phone: string;
  anonymous: boolean;
}



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
    otherConcern: "",
    urgency: "",
    answers: {},
    evidence: [],
    name: "",
    email: "",
    phone: "",
    anonymous: true,
  });
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });
  const [publicSchools, setPublicSchools] = React.useState<SchoolOption[]>([]);
  const [loadingSchools, setLoadingSchools] = React.useState(false);
  const [publicConcerns, setPublicConcerns] = React.useState<ConcernType[]>([]);
  const [loadingConcerns, setLoadingConcerns] = React.useState(true);
  const [questions, setQuestions] = React.useState<ConcernQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = React.useState(false);

  const schoolOptions: AutocompleteOption[] = publicSchools.map((s) => ({
    value: s.id,
    label: s.name,
    caption: s.city === "—" ? "Not listed" : s.city,
  }));

  const concernOptions = React.useMemo(() => {
    const hasOther = publicConcerns.some((c) => c.slug === "other");
    return hasOther ? publicConcerns : [...publicConcerns, OTHER_CONCERN];
  }, [publicConcerns]);

  const fetchPublicSchools = async ()=>{
    setLoadingSchools(true);
    try{
      const response = await GetPublicSchools();
      if((response as any).status === 200 || (response as any).status === 201){
        setPublicSchools((response as any).data as SchoolOption[]);
      }
      else{
        setSnackbar({
          open: true,
          message: (response as any).data.message as string,
        });
      }
    }
    catch(error){
      console.log(error);
      setSnackbar({
        open: true,
        message: "Error fetching public schools",
      });
    }
    finally{
      setLoadingSchools(false);
    }
  }
  const fetchPublicConcerns = async ()=>{
    setLoadingConcerns(true);
    try{
      const response = await GetPublicConcerns();
      if((response as any).status === 200 || (response as any).status === 201){
        setPublicConcerns((response as any).data as ConcernType[]);
      }
      else{
        setSnackbar({
          open: true,
          message: (response as any).data.message as string,
        });
      }
    }
    catch(error){
      console.log(error);
      setSnackbar({
        open: true,
        message: "Error fetching public concerns",
      });
    }
    finally{
      setLoadingConcerns(false);
    }
  }

  const fetchQuestionsForConcerns = async (concernSlugs: string[]) => {
    const slugs = toQuestionSlugs(concernSlugs);
    if (!slugs.length) {
      setQuestions([]);
      return;
    }

    setLoadingQuestions(true);
    try {
      const response = await GetQuestionsBasedOnConcern(slugs);
      const axiosRes = response as { status?: number; data?: unknown };
      if (axiosRes.status === 200 || axiosRes.status === 201) {
        const nextQuestions = normalizeQuestions(axiosRes.data);
        setQuestions(nextQuestions);
        setForm((f) => {
          const nextAnswers: Record<string, string> = {};
          nextQuestions.forEach((q) => {
            if (f.answers[q.field_key]) {
              nextAnswers[q.field_key] = f.answers[q.field_key];
            }
          });
          return { ...f, answers: nextAnswers };
        });
      } else {
        setQuestions([]);
        setSnackbar({
          open: true,
          message: "Error fetching concern questions",
        });
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Error fetching concern questions",
      });
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  React.useEffect(()=>{
    fetchPublicConcerns()

    fetchPublicSchools();
  }, []);

  // Load concern-specific questions when the Details step is shown.
  React.useEffect(() => {
    if (activeStep !== 3) return;
    void fetchQuestionsForConcerns(form.concerns);
  }, [activeStep, form.concerns]);

  // Preselect anonymity based on the entry CTA (?mode=anonymous|contact).
  React.useEffect(() => {
    if (!router.isReady) return;
    if (router.query.mode === "contact") {
      setForm((f) => ({ ...f, anonymous: false }));
    }
  }, [router.isReady, router.query.mode]);

  const detailQuestions = questions;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setAnswer = (fieldKey: string, value: string) =>
    setForm((f) => ({
      ...f,
      answers: { ...f.answers, [fieldKey]: value },
    }));

  const closeSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  const handleOtherConcernChange = (value: string) => {
    set("otherConcern", value);
    const match = findMatchingConcernType(value, concernOptions);
    if (match) {
      setSnackbar({
        open: true,
        message: `"${match.name}" is already listed. Please select it from the options above instead of Other.`,
      });
    }
  };

  const toggleConcern = (id: string) =>
    setForm((f) => {
      const removing = f.concerns.includes(id);
      const concerns = removing
        ? f.concerns.filter((c) => c !== id)
        : [...f.concerns, id];
      return {
        ...f,
        concerns,
        otherConcern: id === "other" && removing ? "" : f.otherConcern,
      };
    });

  const toggleEvidence = (id: string) =>
    setForm((f) => ({
      ...f,
      evidence: f.evidence.includes(id)
        ? f.evidence.filter((c) => c !== id)
        : [...f.evidence, id],
    }));

  const isOtherLocation =
    form.school?.value === "other-school" || form.school?.value === "other-area";
  const isOtherConcern = form.concerns.includes("other");
  const otherConcernMatchesExisting = Boolean(
    isOtherConcern && findMatchingConcernType(form.otherConcern, concernOptions)
  );

  const canContinue = () => {
    switch (activeStep) {
      case 0:
        return !!form.school && (!isOtherLocation || form.otherLocation.trim().length > 2);
      case 1:
        return (
          form.concerns.length > 0 &&
          (!isOtherConcern || form.otherConcern.trim().length > 2) &&
          !otherConcernMatchesExisting
        );
      case 2:
        return form.urgency !== "";
      case 3:
        return (
          !loadingQuestions &&
          detailQuestions.length > 0 &&
          detailQuestions.every((q) => {
            const value = (form.answers[q.field_key] ?? "").trim();
            if (q.is_required) return value.length > 0;
            return value.length > 0;
          })
        );
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
            connector={<SolidConnector />}
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
                    loading={loadingSchools}
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
                    {loadingConcerns ? (
                      <Typography variant="body2" color="text.secondary">
                        Loading concerns...
                      </Typography>
                    ) : (
                      concernOptions.map((c) => {
                        const checked = form.concerns.includes(c.slug);
                        return (
                          <Grid size={{ xs: 12, sm: 6 }} key={c.slug}>
                            <Card
                              onClick={() => toggleConcern(c.slug)}
                              sx={{
                                cursor: "pointer",
                                borderColor: checked ? "primary.main" : "divider",
                                bgcolor: (t) =>
                                  checked ? `${t.palette.primary.main}0A` : "transparent",
                                "&:hover": { borderColor: "primary.main" },
                              }}
                            >
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  py: 1.25,
                                  "&:last-child": { pb: 1.25 },
                                }}
                              >
                                <Checkbox checked={checked} tabIndex={-1} disableRipple />
                                <Box>
                                  <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                    {c.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {c.description}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })
                    )}
                  </Grid>
                  {isOtherConcern && (
                    <Fade in>
                      <TextField
                        sx={{ mt: 2.5 }}
                        fullWidth
                        required
                        label="Describe the concern"
                        placeholder="Briefly describe the concern not listed above"
                        value={form.otherConcern}
                        onChange={(e) => handleOtherConcernChange(e.target.value)}
                        helperText={
                          otherConcernMatchesExisting
                            ? "This concern already exists in the list above. Select it instead."
                            : "Required when Other is selected."
                        }
                        error={otherConcernMatchesExisting}
                      />
                    </Fade>
                  )}
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
                              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{xs: "flex-start",sm:"center"}}>
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
                  {form.urgency === "emergency" && (
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
                    caption="Answer each question below. Every detail helps."
                  />
                  {loadingQuestions ? (
                    <Stack alignItems="center" spacing={1.5} sx={{ py: 4 }}>
                      <CircularProgress size={28} />
                      <Typography variant="body2" color="text.secondary">
                        Loading questions…
                      </Typography>
                    </Stack>
                  ) : detailQuestions.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No questions available for the selected concern(s).
                    </Typography>
                  ) : (
                    <Stack spacing={2.5}>
                      {detailQuestions.map((q) => {
                        const value = form.answers[q.field_key] ?? "";
                        const label = q.question;

                        if (q.field_type === "boolean") {
                          return (
                            <Box key={q.id}>
                              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                                {label}
                                {q.is_required ? " *" : ""}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                {["Yes", "No"].map((option) => {
                                  const optionValue = option.toLowerCase();
                                  const selected = value === optionValue;
                                  return (
                                    <Chip
                                      key={option}
                                      label={option}
                                      clickable
                                      color={selected ? "primary" : "default"}
                                      variant={selected ? "filled" : "outlined"}
                                      onClick={() => setAnswer(q.field_key, optionValue)}
                                    />
                                  );
                                })}
                              </Stack>
                            </Box>
                          );
                        }

                        if (q.field_type === "date") {
                          return (
                            <TextField
                              key={q.id}
                              fullWidth
                              type="date"
                              required={q.is_required}
                              label={label}
                              value={value}
                              onChange={(e) => setAnswer(q.field_key, e.target.value)}
                              InputLabelProps={{ shrink: true }}
                            />
                          );
                        }

                        if (q.field_type === "textarea") {
                          return (
                            <TextField
                              key={q.id}
                              fullWidth
                              multiline
                              minRows={3}
                              required={q.is_required}
                              label={label}
                              placeholder="Type your answer…"
                              value={value}
                              onChange={(e) => setAnswer(q.field_key, e.target.value)}
                            />
                          );
                        }

                        return (
                          <TextField
                            key={q.id}
                            fullWidth
                            required={q.is_required}
                            label={label}
                            placeholder="Type your answer…"
                            value={value}
                            onChange={(e) => setAnswer(q.field_key, e.target.value)}
                          />
                        );
                      })}
                    </Stack>
                  )}
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

                  <ReviewSummary form={form} concerns={concernOptions} />
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

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity="warning"
        onClose={closeSnackbar}
      />
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

function ReviewSummary({ form, concerns }: { form: FormState; concerns: ConcernType[] }) {
  const concernLabels = concerns
    .filter((c) => form.concerns.includes(c.slug))
    .map((c) =>
      c.slug === "other" && form.otherConcern.trim()
        ? `Other (${form.otherConcern.trim()})`
        : c.name
    );
  const rows: { label: string; value: string }[] = [
    {
      label: "Location",
      value:
        (form.school?.value ?? "—") +
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
