import { createTheme, alpha } from "@mui/material/styles";

// Centralized, calm and trustworthy palette suited to a school-safety context.
const BRAND = {
  primary: "#2563EB", // confident blue
  primaryDark: "#1E40AF",
  secondary: "#0D9488", // supportive teal
  ink: "#0F172A", // slate-900 text
  muted: "#64748B", // slate-500
  surface: "#F6F8FC", // page background
  paper: "#FFFFFF",
  border: "#E2E8F0",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: BRAND.primary,
      dark: BRAND.primaryDark,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: BRAND.secondary,
      contrastText: "#FFFFFF",
    },
    success: { main: "#16A34A" },
    warning: { main: "#D97706" },
    error: { main: "#DC2626" },
    info: { main: "#0284C7" },
    background: {
      default: BRAND.surface,
      paper: BRAND.paper,
    },
    text: {
      primary: BRAND.ink,
      secondary: BRAND.muted,
    },
    divider: BRAND.border,
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  transitions: {
    // Slightly slower, smoother easing across the app.
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": { boxSizing: "border-box" },
        "html, body, #__next": { height: "100%" },
        "::selection": {
          background: alpha(BRAND.primary, 0.16),
        },
        // Custom slim scrollbars used within scrollable dropdowns and content.
        "*::-webkit-scrollbar": { width: 8, height: 8 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(BRAND.muted, 0.35),
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: alpha(BRAND.muted, 0.55),
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 20,
          paddingBlock: 10,
          transition:
            "transform .2s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease, background-color .2s ease",
          "&:hover": { transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
        },
        containedPrimary: {
          boxShadow: `0 8px 20px -8px ${alpha(BRAND.primary, 0.7)}`,
          "&:hover": {
            boxShadow: `0 12px 26px -8px ${alpha(BRAND.primary, 0.8)}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        outlined: { borderColor: BRAND.border },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0, variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: 18,
          transition:
            "transform .3s cubic-bezier(0.16,1,0.3,1), box-shadow .3s ease, border-color .3s ease",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "box-shadow .2s ease, border-color .2s ease",
          "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(BRAND.primary, 0.12)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
    },
    MuiLink: {
      defaultProps: { underline: "hover" },
    },
  },
});

export default theme;
