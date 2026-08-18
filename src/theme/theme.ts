import { createTheme } from "@mui/material/styles";

// Project SUPPORT — palette drawn from the hero illustration.
// Sun yellow for primary; backpack orange for secondary; cream sky for calm;
// leaf green for success; red for urgency only.

const PRIMARY_DARK = "#C7800D";
const PRIMARY = "#E8A817";
const PRIMARY_LIGHT = "#F7CF0F";
const LIGHT_YELLOW = "#FFF6D6";
const BACKGROUND = "#F8F6EE";
const PAPER = "#FFFFFF";
const DARK_TEXT = "#1C1408";
const SECONDARY_TEXT = "#6B5E4A";
const BORDER = "#E8E4D6";
const ORANGE = "#E25A0C";
const ORANGE_DARK = "#D4440BD3";
const DANGER = "#DC2626";
const WARNING = "#D97706";
const SUCCESS = "#3A8A3E";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY,
      dark: PRIMARY_DARK,
      light: PRIMARY_LIGHT,
      contrastText: DARK_TEXT,
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
    success: { main: SUCCESS, light: LIGHT_YELLOW, contrastText: "#FFFFFF" },
    background: { default: BACKGROUND, paper: PAPER },
    text: { primary: DARK_TEXT, secondary: SECONDARY_TEXT },
    divider: BORDER,
    action: {
      hover: "rgba(232,168,23,0.10)",
      selected: "rgba(232,168,23,0.16)",
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
          backgroundColor: PRIMARY,
          color: DARK_TEXT,
          "&:hover": { backgroundColor: PRIMARY_LIGHT, color: DARK_TEXT },
        },
        outlinedPrimary: {
          borderColor: PRIMARY,
          color: PRIMARY_DARK,
          backgroundColor: PAPER,
          "&:hover": {
            borderColor: PRIMARY_DARK,
            backgroundColor: LIGHT_YELLOW,
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
          boxShadow: "0 8px 30px rgba(138,88,8,.06)",
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
