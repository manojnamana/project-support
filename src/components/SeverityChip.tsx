import * as React from "react";
import { Chip, type ChipProps } from "@mui/material";
import type { Severity } from "@/data";

const MAP: Record<Severity, { color: ChipProps["color"] }> = {
  Low: { color: "success" },
  Moderate: { color: "info" },
  High: { color: "warning" },
  Emergency: { color: "error" },
};

interface SeverityChipProps {
  severity: Severity;
  size?: ChipProps["size"];
}

export default function SeverityChip({ severity, size = "small" }: SeverityChipProps) {
  const { color } = MAP[severity];
  return (
    <Chip
      label={severity}
      color={color}
      size={size}
      variant={severity === "Emergency" ? "filled" : "outlined"}
      sx={{
        ...(severity === "Emergency" && {
          animation: "ps-pulse 1.8s ease-in-out infinite",
          "@keyframes ps-pulse": {
            "0%, 100%": { boxShadow: "0 0 0 0 rgba(220,38,38,0.5)" },
            "50%": { boxShadow: "0 0 0 6px rgba(220,38,38,0)" },
          },
        }),
      }}
    />
  );
}
