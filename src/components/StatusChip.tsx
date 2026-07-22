import * as React from "react";
import { Chip, type ChipProps } from "@mui/material";
import {
  STAFF_STATUS_LABEL,
  PUBLIC_STATUS_LABEL,
  STATUS_COLOR,
  type CaseStatus,
} from "@/lib/statusDisplay";

interface StatusChipProps {
  status: CaseStatus;
  size?: ChipProps["size"];
  /** Use the reduced public vocabulary a reporter is allowed to see. */
  audience?: "staff" | "public";
}

export default function StatusChip({
  status,
  size = "small",
  audience = "staff",
}: StatusChipProps) {
  const label =
    audience === "public"
      ? PUBLIC_STATUS_LABEL[status]
      : STAFF_STATUS_LABEL[status];
  const color = STATUS_COLOR[status] ?? "default";
  if (!label) return null;
  return (
    <Chip
      label={label}
      color={color}
      size={size}
      variant="filled"
      sx={(t) => ({
        bgcolor: color === "default" ? t.palette.action.selected : undefined,
        textAlign: "center",
        pt:0.4
      })}
    />
  );
}
