import { createTheme } from "@mui/material/styles";

// Project SUPPORT — palette drawn from the hero illustration.
// Leaf green for primary; backpack orange for secondary; cream sky for calm;
// sun yellow for warnings; red for urgency only.

const PRIMARY_DARK = "#1B5E32";
const PRIMARY = "#2F8A3E";
const PRIMARY_LIGHT = "#4CAD4F";
const LIGHT_GREEN = "#EAF5EF";
const BACKGROUND = "#F8F6EE";
const PAPER = "#FFFFFF";
const DARK_TEXT = "#1A2E24";
const SECONDARY_TEXT = "#5C6B62";
const BORDER = "#E8E4D6";
const ORANGE = "#E25A0C";
const ORANGE_DARK = "#D4440BD3";
const DANGER = "#DC2626";
const WARNING = "#D97706";
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
      main: ORANGE,
      dark: ORANGE_DARK,
      light: "#FFEFE0",
      contrastText: "#FFFFFF",
    },
    error: { main: DANGER, light: "#FECACA", contrastText: "#FFFFFF" },
    warning: { main: WARNING, light: "#FDE9A8", contrastText: DARK_TEXT },
    info: { main: "#1A8FA8", light: "#C5EBF3", contrastText: "#FFFFFF" },
    success: { main: SUCCESS, light: LIGHT_GREEN, contrastText: "#FFFFFF" },
    background: { default: BACKGROUND, paper: PAPER },
    text: { primary: DARK_TEXT, secondary: SECONDARY_TEXT },
    divider: BORDER,
    action: {
      hover: "rgba(47,138,62,0.06)",
      selected: "rgba(47,138,62,0.10)",
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
          color: "#FFFFFF",
          "&:hover": { backgroundColor: PRIMARY, color: "#FFFFFF" },
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
        containedSecondary: {
          backgroundColor: ORANGE_DARK,
          "&:hover": { backgroundColor: ORANGE },
        },
      },
    },
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: 18,
          borderColor: BORDER,
          boxShadow: "0 8px 30px rgba(27,94,50,.06)",
          transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 36px rgba(226,90,12,.12)",
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
