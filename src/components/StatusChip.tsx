import * as React from "react";
import { Chip, type ChipProps } from "@mui/material";
import type { ReportStatus } from "@/data";

const MAP: Record<ReportStatus, ChipProps["color"]> = {
  Open: "default",
  "Under Review": "info",
  Referred: "warning",
  "Action Taken": "secondary",
  Resolved: "success",
  Closed: "default",
};

export default function StatusChip({
  status,
  size = "small",
}: {
  status: ReportStatus;
  size?: ChipProps["size"];
}) {
  return (
    <Chip
      label={status}
      color={MAP[status]}
      size={size}
      variant="filled"
      sx={{
        bgcolor: (t) =>
          MAP[status] === "default"
            ? t.palette.action.selected
            : undefined,
      }}
    />
  );
}
