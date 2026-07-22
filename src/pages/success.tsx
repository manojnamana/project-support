import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { alpha } from "@mui/material/styles";

import { ROUTING_RULES } from "@/data";

const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
      <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" sx={{ fontFamily: "monospace", letterSpacing: "0.04em" }}>
            {value}
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy"}>
            <IconButton onClick={copy} size="small" color={copied ? "success" : "default"}>
              {copied ? <DoneRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function SuccessPage() {
  const router = useRouter();
  // Real submissions pass ?case & ?pin. Fall back to demo values only in demo mode.
  const caseNumber = (router.query.case as string) || (DEMO ? "PSV-2026-00457" : "");
  const pin = (router.query.pin as string) || (DEMO ? "7821" : "");

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Zoom in>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              mx: "auto",
              display: "grid",
              placeItems: "center",
              color: "success.main",
              bgcolor: (t) => alpha(t.palette.success.main, 0.12),
              mb: 2,
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 52 }} />
          </Box>
          <Typography variant="h4">Report submitted</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Thank you for helping keep your school community safe. Save the details below to check status or answer
            follow-up questions.
          </Typography>
        </Box>
      </Zoom>

      <Card sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 7 }}>
            <CopyField label="Case number" value={caseNumber} />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <CopyField label="PIN" value={pin} />
          </Grid>
        </Grid>

        <Alert severity="warning" sx={{ mt: 2.5, borderRadius: 2 }}>
          Save your case number and PIN now — for your safety we can't show them again. Together they let you check
          status and respond to investigators while staying anonymous.
        </Alert>

        <Divider sx={{ my: 3 }} />

        <Typography sx={{ fontWeight: 700, mb: 1.5 }}>What happens next</Typography>
        <Stack spacing={1}>
          {ROUTING_RULES.map((r) => (
            <Stack
              key={r.category}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ p: 1.25, border: "1px solid", borderColor: "divider", borderRadius: 2 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {r.category}
              </Typography>
              <Typography variant="caption" color={`${r.color}.main`} sx={{ fontWeight: 700 }}>
                {r.target}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
          <Button
            component={Link}
            href={`/status?case=${encodeURIComponent(caseNumber)}`}
            variant="contained"
            fullWidth
            startIcon={<SearchRoundedIcon />}
          >
            Check status
          </Button>
          <Button component={Link} href="/" variant="outlined" fullWidth startIcon={<HomeRoundedIcon />}>
            Back to home
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
