import * as React from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import axios from "axios";

import Reveal from "@/components/Reveal";
import {
  loginStaffFun,
  saveAuthSession,
} from "@/services/auth";

const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState(
    DEMO ? "coordinator@projectsupport.org" : ""
  );
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const nextPath =
    typeof router.query.next === "string" && router.query.next.startsWith("/")
      ? router.query.next
      : "/dashboard";

  const redirectAfterLogin = (path: string) => {
    // Full navigation so middleware sees the freshly set auth cookies.
    // Soft client navigations can race and leave the user stuck on /login.
    window.location.assign(path);
  };

  const handleLogin = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your work email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (DEMO) {
        const saved = saveAuthSession({
          success: true,
          message: "Login successful.",
          tokens: { access: "demo-access", refresh: "demo-refresh" },
          user: {
            id: 0,
            first_name: "Demo",
            last_name: "Coordinator",
            email: email.trim() || "coordinator@projectsupport.org",
            phone_number: null,
            designation: "",
            role: "School Admin",
            school: {
              id: 0,
              name: "Demo School",
              school_code: "DEMO",
            },
            permissions: {
              is_staff: true,
              is_superuser: false,
              is_response_team: false,
              is_clinical_reviewer: false,
            },
          },
        });
        if (!saved) {
          setError("Unable to start demo session.");
          return;
        }
        redirectAfterLogin(nextPath);
        return;
      }

      const data = await loginStaffFun(email.trim(), password);

      if (!data?.success) {
        setError(data?.message || "Invalid email or password.");
        return;
      }

      const saved = saveAuthSession(data);
      if (!saved) {
        setError("Login succeeded but auth tokens were missing.");
        return;
      }

      redirectAfterLogin(nextPath);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          (err.response?.data as { message?: string; detail?: string } | undefined)
            ?.message ||
          (err.response?.data as { detail?: string } | undefined)?.detail ||
          "Invalid email or password.";
        setError(message);
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <LockRoundedIcon />
            </Box>
            <Typography variant="h5">Administrative Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Restricted access for authorized personnel only.
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Work email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <LoginRoundedIcon />
                  )
                }
              >
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </Stack>
          </Box>

          {DEMO && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2, textAlign: "center" }}
            >
              Demo mode — any password grants access.
            </Typography>
          )}
        </Card>
      </Reveal>
    </Container>
  );
}
