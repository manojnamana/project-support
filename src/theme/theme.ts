import { createTheme } from "@mui/material/styles";

// ————————————————————————————————————————————————————————————————
// Project SUPPORT theme — spruce + amber.
// The whole point of this file: every surface color has a correct
// contrastText so components can use `*.contrastText` and never hardcode
// common.white / text.primary on a colored background again.
// ————————————————————————————————————————————————————————————————

const SPRUCE = "#16332C";       // primary
const SPRUCE_DARK = "#0E241E";
const SPRUCE_LIGHT = "#24473E";
const AMBER = "#E8A13D";        // secondary / calls to action
const AMBER_DARK = "#C9821B";
const AMBER_LIGHT = "#F2C078";
const SAGE = "#DCE7DF";
const PAPER = "#FFFFFF";
const CANVAS = "#F7F5F0";       // warm off-white page background
const INK = "#1E2422";
const INK_SOFT = "#5C6662";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: SPRUCE,
      dark: SPRUCE_DARK,
      light: SPRUCE_LIGHT,
      contrastText: "#FFFFFF",     // white reads on spruce — use this, not common.white
    },
    secondary: {
      main: AMBER,
      dark: AMBER_DARK,
      light: AMBER_LIGHT,
      contrastText: SPRUCE,        // dark text reads on amber, NOT white
    },
    error:   { main: "#B93A2B", light: "#E4A79F", contrastText: "#FFFFFF" },
    warning: { main: "#C9821B", light: "#F2C078", contrastText: "#1E2422" },
    info:    { main: "#3E6B7E", light: "#AEC6D0", contrastText: "#FFFFFF" },
    success: { main: "#3E6B54", light: "#B7CFC0", contrastText: "#FFFFFF" },
    background: { default: CANVAS, paper: PAPER },
    text: { primary: INK, secondary: INK_SOFT },
    divider: "#E3E0D8",
    action: { hover: "rgba(22,51,44,0.04)", selected: "rgba(22,51,44,0.08)" },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
    overline: { fontWeight: 700, letterSpacing: "0.12em" },
  },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, paddingTop: 10, paddingBottom: 10 },
        containedSecondary: { color: SPRUCE },   // amber button, spruce label
      },
    },
    MuiCard: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          borderRadius: 16,
          borderColor: "#E3E0D8",
          transition: "border-color .2s ease, box-shadow .2s ease",
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: "none" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});

export default theme;
