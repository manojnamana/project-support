import type { CaseStatus, Severity } from "@/lib/statusDisplay";

export type { CaseStatus, Severity };

export interface SchoolOption {
  id: string;
  name: string;
  school_code: string;
  state: string;
  city: string;
}

export interface ConcernType {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export type ConcernQuestionFieldType = "text" | "textarea" | "boolean" | "date" | string;

export interface ConcernQuestion {
  id: string;
  question: string;
  field_key: string;
  field_type: ConcernQuestionFieldType;
  is_required: boolean;
  display_order: number;
  is_common: boolean;
}

export interface UrgencyLevel {
  value: Severity;
  title: string;
  color: "success" | "warning" | "error" | "info";
  examples: string[];
  helper: string;
}

export interface RoutingRule {
  category: string;
  routesTo: string[];
  target: string;
  color: "success" | "warning" | "error" | "info";
}

export interface TimelineEntry {
  label: string;
  timestamp: string;
  note: string;
  actor: string;
}

export interface CaseMessage {
  from: "Investigator" | "Reporter";
  author: string;
  timestamp: string;
  text: string;
}

/** Concern type entries from the case status API — plain slug or an "other" object. */
export type CaseTypeEntry = string | { other: string };

export interface CaseStatusData {
  id: string;
  case_number: string;
  schoolId: string;
  school: string;
  types: CaseTypeEntry[];
  severity: Severity;
  status: CaseStatus;
  submitted: string;
  anonymous: boolean;
  summary: string;
  assignedTo: string;
  timeline: TimelineEntry[];
  messages: CaseMessage[];
}

export interface Report {
  id: string;
  caseNumber: string;
  pin: string;
  schoolId: string;
  school: string;
  types: string[];
  severity: Severity;
  status: CaseStatus;
  submitted: string;
  anonymous: boolean;
  summary: string;
  assignedTo: string;
  referredToLe?: boolean;
  hasIntervention?: boolean;
  timeline: TimelineEntry[];
  messages: CaseMessage[];
}

export interface StaffSchool {
  id: number;
  name: string;
  school_code: string;
}

export interface StaffPermissions {
  is_staff: boolean;
  is_superuser: boolean;
  is_response_team: boolean;
  is_clinical_reviewer: boolean;
}

export interface StaffUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  designation: string;
  role: string;
  school: StaffSchool | null;
  permissions: StaffPermissions;
}

export interface StaffAuthTokens {
  refresh: string;
  access: string;
}

export interface StaffLoginResponse {
  success: boolean;
  message: string;
  tokens: StaffAuthTokens;
  user: StaffUser;
}

export interface DashboardSummary {
  total_reports: number;
  open_cases: number;
  emergency_cases: number;
  resolved_cases: number;
}

export interface DashboardPagination {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  page_size: number;
  total_pages: number;
}

export interface DashboardCase {
  id: string;
  case_number: string;
  school: string;
  concern_types: CaseTypeEntry[];
  severity: Severity;
  status: CaseStatus;
  submitted: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  pagination: DashboardPagination;
  cases: DashboardCase[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}