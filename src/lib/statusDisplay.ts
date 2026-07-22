// ————————————————————————————————————————————————————————————————
// Project SUPPORT — status & severity display layer.
// Canonical values are the backend BTAM enums. The UI never hardcodes
// status strings; it renders through these maps. See Status Alignment doc.
// ————————————————————————————————————————————————————————————————

export type CaseStatus =
  | "received"
  | "triage"
  | "assessment"
  | "management"
  | "monitoring"
  | "resolved"
  | "closed"
  | "inactive";

export type Severity = "low" | "moderate" | "high" | "emergency";

// What staff see in the dashboard.
export const STAFF_STATUS_LABEL: Record<CaseStatus, string> = {
  received: "Received",
  triage: "Triage",
  assessment: "Assessment",
  management: "Management",
  monitoring: "Monitoring",
  resolved: "Resolved",
  closed: "Closed",
  inactive: "Inactive",
};

// Reduced vocabulary an anonymous reporter is allowed to see. Internal BTAM
// stage names never cross the anonymity boundary.
export const PUBLIC_STATUS_LABEL: Record<CaseStatus, string> = {
  received: "Received",
  triage: "Being reviewed",
  assessment: "Being reviewed",
  management: "In progress",
  monitoring: "In progress",
  resolved: "Resolved",
  closed: "Resolved",
  inactive: "Closed",
};

// MUI Chip color per status.
export const STATUS_COLOR: Record<
  CaseStatus,
  "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error"
> = {
  received: "default",
  triage: "info",
  assessment: "info",
  management: "secondary",
  monitoring: "primary",
  resolved: "success",
  closed: "default",
  inactive: "default",
};

// Ordered stages for the progress stepper (6 visible; closed/inactive collapse
// onto the final node). Fixes the old skipped-index bug.
export const INVESTIGATION_STEPS = [
  "Received",
  "Triage",
  "Assessment",
  "Management",
  "Monitoring",
  "Resolved",
] as const;

export const STATUS_STEP_INDEX: Record<CaseStatus, number> = {
  received: 0,
  triage: 1,
  assessment: 2,
  management: 3,
  monitoring: 4,
  resolved: 5,
  closed: 5,
  inactive: 5,
};

// Severity labels + chip color.
export const SEVERITY_LABEL: Record<Severity, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  emergency: "Emergency",
};

export const SEVERITY_COLOR: Record<
  Severity,
  "success" | "info" | "warning" | "error"
> = {
  low: "success",
  moderate: "info",
  high: "warning",
  emergency: "error",
};

// Buckets used by dashboard filters → API params.
export const OPEN_STATUSES: CaseStatus[] = [
  "received",
  "triage",
  "assessment",
  "management",
  "monitoring",
];

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...(Object.keys(STAFF_STATUS_LABEL) as CaseStatus[]).map((v) => ({
    value: v,
    label: STAFF_STATUS_LABEL[v],
  })),
];

export const SEVERITY_FILTER_OPTIONS = [
  { value: "all", label: "All severities" },
  ...(Object.keys(SEVERITY_LABEL) as Severity[]).map((v) => ({
    value: v,
    label: SEVERITY_LABEL[v],
  })),
];
