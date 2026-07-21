import * as React from "react";
import { Alert, AlertColor, Snackbar, SnackbarOrigin } from "@mui/material";

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
}

export default function AppSnackbar({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="standard"
        sx={{ width: "100%", }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
