import * as React from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

export default function EmergencyBanner({ dense = false }: { dense?: boolean }) {
  return (
    <Alert
      severity="error"
      icon={false}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "error.light",
        bgcolor: (t) => `${t.palette.error.main}0F`,
        py: dense ? 1 : 1.5,
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
          <Typography sx={{ fontWeight: 700, color: "error.main" }}>
            Is this an emergency happening right now?
          </Typography>
          {!dense && (
            <Typography variant="body2" color="text.secondary">
              If someone is in immediate danger, do not use this form.
            </Typography>
          )}
        </Box>
        <Button
          href="tel:911"
          color="error"
          variant="contained"
          startIcon={<LocalPhoneRoundedIcon />}
          sx={{ flexShrink: 0 }}
        >
          Call 911 Immediately
        </Button>
      </Stack>
    </Alert>
  );
}
