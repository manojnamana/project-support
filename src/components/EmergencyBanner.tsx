import * as React from "react";
import {  Box, Button, Paper, Stack, Typography } from "@mui/material";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

export default function EmergencyBanner({ dense = false }: { dense?: boolean }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "error.light",
        bgcolor: "error.main",
        p: 1.5,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, color: "common.white" }}>
            Is this an emergency happening right now?
          </Typography>
          {!dense && (
            <Typography variant="body2" color="common.white">
              If someone is in immediate danger, do not use this form.
            </Typography>
          )}
        </Box>
        <Button
          href="tel:911"
          color="inherit"
          variant="contained"
          startIcon={<LocalPhoneRoundedIcon />}
          sx={{ flexShrink: 0, backgroundColor: "common.white",color: "error.main" }}
        >
          Call 911 Immediately
        </Button>
      </Stack>
    </Paper>
  );
}
