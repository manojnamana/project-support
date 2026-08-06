import { createTheme } from "@mui/material/styles";

// Project SUPPORT — trust-forward green + navy palette.
// Soft greens for calm/safety; navy for emergency/footer; red for urgency only.

const PRIMARY_DARK = "#1F5E4E";
const PRIMARY = "#2F7D5A";
const PRIMARY_LIGHT = "#3D9A70";
const LIGHT_GREEN = "#EAF5EF";
const BACKGROUND = "#FAFBFA";
const PAPER = "#FFFFFF";
const DARK_TEXT = "#1E293B";
const SECONDARY_TEXT = "#64748B";
const BORDER = "#E5E7EB";
const NAVY = "#163B6D";
const FOOTER = "#0F2F52";
const DANGER = "#DC2626";
const WARNING = "#F59E0B";
const SUCCESS = "#22C55E";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY,
      dark: PRIMARY_DARK,
      light: PRIMARY_LIGHT,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: NAVY,
      dark: FOOTER,
      light: "#F3F7FC",
      contrastText: "#FFFFFF",
    },
    error: { main: DANGER, light: "#FECACA", contrastText: "#FFFFFF" },
    warning: { main: WARNING, light: "#FDE68A", contrastText: DARK_TEXT },
    info: { main: NAVY, light: "#BFDBFE", contrastText: "#FFFFFF" },
    success: { main: SUCCESS, light: LIGHT_GREEN, contrastText: "#FFFFFF" },
    background: { default: BACKGROUND, paper: PAPER },
    text: { primary: DARK_TEXT, secondary: SECONDARY_TEXT },
    divider: BORDER,
    action: {
      hover: "rgba(47,125,90,0.06)",
      selected: "rgba(47,125,90,0.10)",
    },
  },

  shape: { borderRadius: 18 },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h2: { fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 },
    h4: { fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.25 },
    h5: { fontWeight: 700, lineHeight: 1.3 },
    h6: { fontWeight: 600, lineHeight: 1.35 },
    button: { fontWeight: 500, textTransform: "none" },
    overline: { fontWeight: 700, letterSpacing: "0.1em" },
    body1: { fontWeight: 400, lineHeight: 1.6 },
    body2: { fontWeight: 400, lineHeight: 1.55 },
  },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingTop: 10,
          paddingBottom: 10,
          fontWeight: 500,
          transition: "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
          "&:hover": { transform: "scale(1.02)" },
        },
        containedPrimary: {
          backgroundColor: PRIMARY_DARK,
          "&:hover": { backgroundColor: PRIMARY },
        },
        outlinedPrimary: {
          borderColor: PRIMARY,
          color: PRIMARY_DARK,
          backgroundColor: PAPER,
          "&:hover": {
            borderColor: PRIMARY_DARK,
            backgroundColor: LIGHT_GREEN,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: 18,
          borderColor: BORDER,
          boxShadow: "0 8px 30px rgba(15,23,42,.06)",
          transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 36px rgba(15,23,42,.1)",
          },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: "none" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default theme;
