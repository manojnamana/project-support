import * as React from "react";
import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

interface StatCardProps {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  color?: string;
}

export default function StatCard({ icon, value, label, color = "primary.main" }: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color,
              bgcolor: (t) => `${t.palette.action.hover}`,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h5" sx={{ lineHeight: 1.1 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
