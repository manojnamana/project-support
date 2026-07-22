import * as React from "react";
import { Chip, type ChipProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SEVERITY_LABEL, SEVERITY_COLOR, type Severity } from "@/lib/statusDisplay";

interface SeverityChipProps {
  severity: Severity;
  size?: ChipProps["size"];
}

export default function SeverityChip({ severity, size = "small" }: SeverityChipProps) {
  const color = SEVERITY_COLOR[severity];
  const label = SEVERITY_LABEL[severity];
  if (!label || !color) return null;
  const isEmergency = severity === "emergency";
  return (
    <Chip
      label={label}
      color={color}
      size={size}
      variant={isEmergency ? "filled" : "outlined"}
      sx={
        isEmergency
          ? (t) => ({
              animation: "ps-pulse 1.8s ease-in-out infinite",
              "@keyframes ps-pulse": {
                "0%, 100%": {
                  boxShadow: `0 0 0 0 ${alpha(t.palette.error.main, 0.5)}`,
                },
                "50%": { boxShadow: `0 0 0 6px ${alpha(t.palette.error.main, 0)}` },
              },
            })
          : (t) => ({
            textAlign: "center",
            pt:0.4
          })
      }
    />
  );
}
