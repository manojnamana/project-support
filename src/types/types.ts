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