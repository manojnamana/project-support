// Central dummy-data module for Project SUPPORT.
// All data here is fictional and for demonstration purposes only.

export type Severity = "Low" | "Moderate" | "High" | "Emergency";
export type ReportStatus =
  | "Open"
  | "Under Review"
  | "Referred"
  | "Action Taken"
  | "Resolved"
  | "Closed";

export interface SchoolOption {
  id: string;
  name: string;
  district: string;
}

export interface ConcernType {
  id: string;
  label: string;
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
  status: ReportStatus;
  submitted: string;
  anonymous: boolean;
  summary: string;
  assignedTo: string;
  timeline: TimelineEntry[];
  messages: CaseMessage[];
}

// A deliberately long list so the "show 4, scroll the rest" dropdown behavior is visible.
export const SCHOOLS: SchoolOption[] = [
  { id: "mnprep", name: "MN Prep Academy", district: "Minneapolis" },
  { id: "north", name: "North Star High School", district: "Minneapolis" },
  { id: "lakeside", name: "Lakeside Middle School", district: "St. Paul" },
  { id: "riverbend", name: "Riverbend Elementary", district: "St. Paul" },
  { id: "cedar", name: "Cedar Ridge High School", district: "Bloomington" },
  { id: "maplewood", name: "Maplewood Community School", district: "Maplewood" },
  { id: "harborview", name: "Harborview Academy", district: "Duluth" },
  { id: "summit", name: "Summit Charter School", district: "Rochester" },
  { id: "willow", name: "Willow Creek Middle School", district: "Edina" },
  { id: "prairie", name: "Prairie View High School", district: "Eagan" },
  { id: "brooklyn", name: "Brooklyn Park STEM Academy", district: "Brooklyn Park" },
  { id: "hmong", name: "Hmong Culture Charter School", district: "St. Paul" },
  { id: "communityhub", name: "Twin Cities Community Learning Hub", district: "Metro" },
  { id: "other-school", name: "Other participating school…", district: "—" },
  { id: "other-area", name: "Other Twin Cities area (outside a school)…", district: "—" },
];

export const CONCERN_TYPES: ConcernType[] = [
  { id: "bullying", label: "Bullying", description: "Repeated intimidation or exclusion" },
  { id: "cyberbullying", label: "Cyberbullying", description: "Online harassment or threats" },
  { id: "harassment", label: "Harassment", description: "Unwanted, targeting behavior" },
  { id: "hate-bias", label: "Hate / Bias Incident", description: "Motivated by identity or bias" },
  { id: "fight-assault", label: "Fight or Assault", description: "Physical altercation" },
  { id: "threat-violence", label: "Threat of Violence", description: "Verbal or written threat" },
  { id: "weapon", label: "Weapon Concern", description: "Weapon seen or referenced" },
  { id: "gang", label: "Gang Activity", description: "Suspected gang involvement" },
  { id: "self-harm", label: "Self-Harm Concern", description: "Signs of self-injury" },
  { id: "suicide", label: "Suicide Concern", description: "Suicidal statements or signs" },
  { id: "social-media", label: "Social Media Threat", description: "Threat posted online" },
  { id: "other", label: "Other", description: "A concern not listed above" },
];

export const URGENCY_LEVELS: UrgencyLevel[] = [
  {
    value: "Low",
    title: "Low",
    color: "success",
    helper: "Not an immediate concern",
    examples: ["Ongoing bullying", "Harassment", "Rumors", "Non-immediate concerns"],
  },
  {
    value: "Moderate",
    title: "Moderate",
    color: "info",
    helper: "Should be reviewed soon",
    examples: ["Threatening statements", "Escalating conflicts", "Repeated targeting"],
  },
  {
    value: "High",
    title: "High",
    color: "warning",
    helper: "Needs prompt attention",
    examples: ["Specific threat", "Weapon mentioned", "Physical assault", "Suicide threat"],
  },
  {
    value: "Emergency",
    title: "Emergency",
    color: "error",
    helper: "Happening right now — call 911",
    examples: ["Violence happening now", "Weapon present now", "Active threat"],
  },
];

export const CONCERN_PROMPTS = [
  "Who is involved?",
  "What happened?",
  "When did it happen?",
  "Where did it happen?",
  "Is anyone in danger?",
];

export const EVIDENCE_TYPES = [
  "Screenshot",
  "Photo",
  "Video",
  "Social media image",
];

export const ROUTING_RULES: RoutingRule[] = [
  {
    category: "Bullying / Harassment",
    routesTo: ["School Counselor", "Project SUPPORT Coordinator"],
    target: "24–48 hours",
    color: "info",
  },
  {
    category: "Self-Harm / Suicide Concern",
    routesTo: ["School Counselor", "Mental Health Specialist — MCCA Partners"],
    target: "Same day",
    color: "warning",
  },
  {
    category: "Violence Threat",
    routesTo: ["Principal"],
    target: "Immediate review",
    color: "error",
  },
  {
    category: "Weapons / Active Threat",
    routesTo: ["Law Enforcement", "Principal"],
    target: "Immediate",
    color: "error",
  },
];

export const INVESTIGATION_STEPS = [
  "New Report",
  "Safety Review",
  "Risk Classification",
  "School Action / Law Enforcement Referral",
  "Case Documentation",
  "Resolution",
  "Closed",
];

export const CONCERN_HIGHLIGHTS = [
  "Bullying",
  "Threats",
  "Harassment",
  "Hate-motivated behavior",
  "Weapons",
  "Planned violence",
  "Self-harm or suicide concerns",
  "Social media threats",
];

export const HOW_TO_STEPS = [
  "Select your school or program location.",
  "Choose the type of safety concern you wish to report.",
  "Indicate the level of urgency.",
  "Provide details about what happened, where, and who may be involved.",
  "Upload screenshots, photos, or other supporting information if available.",
  "Submit anonymously or provide contact info for follow-up.",
];

export const AUTHORIZED_ROLES = [
  "School Safety Coordinator",
  "Principal / Assistant Principal",
  "School Resource Officer",
  "Law Enforcement Liaison",
  "Project SUPPORT Administrator",
];

export const REPORTS: Report[] = [
  {
    id: "457",
    caseNumber: "PSV-2026-00457",
    pin: "7821",
    schoolId: "mnprep",
    school: "MN Prep Academy",
    types: ["Bullying"],
    severity: "Low",
    status: "Open",
    submitted: "2026-07-14T09:12:00",
    anonymous: true,
    summary:
      "A group of 10th graders has been repeatedly mocking another student in the cafeteria and posting about it in a group chat.",
    assignedTo: "Unassigned",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-14 09:12",
        note: "Anonymous report received via public portal.",
        actor: "System",
      },
      {
        label: "Queued for safety review",
        timestamp: "2026-07-14 09:12",
        note: "Auto-routed to School Counselor & Project SUPPORT Coordinator.",
        actor: "System",
      },
    ],
    messages: [],
  },
  {
    id: "458",
    caseNumber: "PSV-2026-00458",
    pin: "3049",
    schoolId: "mnprep",
    school: "MN Prep Academy",
    types: ["Threat of Violence", "Social Media Threat"],
    severity: "High",
    status: "Under Review",
    submitted: "2026-07-15T14:40:00",
    anonymous: false,
    summary:
      "A student posted a vague threat referencing 'making everyone pay on Friday' on a social platform. Screenshot attached.",
    assignedTo: "A. Reyes (Principal)",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-15 14:40",
        note: "Reporter provided contact information.",
        actor: "System",
      },
      {
        label: "Safety review started",
        timestamp: "2026-07-15 15:02",
        note: "Escalated to Principal for immediate review.",
        actor: "A. Reyes",
      },
      {
        label: "Follow-up question sent",
        timestamp: "2026-07-15 15:20",
        note: "Requested exact username and post time from reporter.",
        actor: "A. Reyes",
      },
    ],
    messages: [
      {
        from: "Investigator",
        author: "A. Reyes",
        timestamp: "2026-07-15 15:20",
        text: "Thank you for reporting. Can you share the exact username and the time the post appeared?",
      },
      {
        from: "Reporter",
        author: "Anonymous reporter",
        timestamp: "2026-07-15 16:05",
        text: "Username is @j_marks_44, posted around 2:15 PM today.",
      },
    ],
  },
  {
    id: "459",
    caseNumber: "PSV-2026-00459",
    pin: "1150",
    schoolId: "mnprep",
    school: "MN Prep Academy",
    types: ["Weapon Concern"],
    severity: "Emergency",
    status: "Referred",
    submitted: "2026-07-16T08:05:00",
    anonymous: true,
    summary:
      "A student was seen showing what looked like a knife near the east entrance before first period.",
    assignedTo: "Officer T. Nguyen (SRO)",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-16 08:05",
        note: "Flagged EMERGENCY by reporter.",
        actor: "System",
      },
      {
        label: "Immediate escalation",
        timestamp: "2026-07-16 08:06",
        note: "Routed to Law Enforcement & Principal.",
        actor: "System",
      },
      {
        label: "Referred to law enforcement",
        timestamp: "2026-07-16 08:11",
        note: "SRO dispatched to east entrance.",
        actor: "Officer T. Nguyen",
      },
    ],
    messages: [],
  },
  {
    id: "460",
    caseNumber: "PSV-2026-00460",
    pin: "6602",
    schoolId: "north",
    school: "North Star High School",
    types: ["Self-Harm Concern"],
    severity: "High",
    status: "Action Taken",
    submitted: "2026-07-13T11:25:00",
    anonymous: false,
    summary:
      "A friend has been posting concerning messages about not wanting to be here anymore and showing marks on their arm.",
    assignedTo: "M. Osei (Counselor)",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-13 11:25",
        note: "Routed same-day to Counselor & MCCA Mental Health Specialist.",
        actor: "System",
      },
      {
        label: "Wellness check completed",
        timestamp: "2026-07-13 12:40",
        note: "Student connected with counselor and MCCA partner.",
        actor: "M. Osei",
      },
    ],
    messages: [],
  },
  {
    id: "461",
    caseNumber: "PSV-2026-00461",
    pin: "9987",
    schoolId: "cedar",
    school: "Cedar Ridge High School",
    types: ["Cyberbullying", "Harassment"],
    severity: "Moderate",
    status: "Resolved",
    submitted: "2026-07-10T15:55:00",
    anonymous: true,
    summary:
      "Repeated harassing messages sent to a student in a class group chat over two weeks.",
    assignedTo: "L. Park (Counselor)",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-10 15:55",
        note: "Routed to Counselor & Project SUPPORT Coordinator.",
        actor: "System",
      },
      {
        label: "Mediation completed",
        timestamp: "2026-07-12 10:00",
        note: "Restorative conversation held; group chat monitored.",
        actor: "L. Park",
      },
      {
        label: "Case resolved",
        timestamp: "2026-07-12 14:30",
        note: "No further incidents reported.",
        actor: "L. Park",
      },
    ],
    messages: [],
  },
  {
    id: "462",
    caseNumber: "PSV-2026-00462",
    pin: "4413",
    schoolId: "willow",
    school: "Willow Creek Middle School",
    types: ["Hate / Bias Incident"],
    severity: "Moderate",
    status: "Under Review",
    submitted: "2026-07-16T13:10:00",
    anonymous: true,
    summary:
      "Graffiti with a slur was found in a second-floor restroom. Photo attached.",
    assignedTo: "R. Kaur (Safety Coordinator)",
    timeline: [
      {
        label: "Report submitted",
        timestamp: "2026-07-16 13:10",
        note: "Photo evidence attached.",
        actor: "System",
      },
      {
        label: "Under review",
        timestamp: "2026-07-16 13:35",
        note: "Facilities notified; camera footage requested.",
        actor: "R. Kaur",
      },
    ],
    messages: [],
  },
];

export function getReportByCase(caseNumber: string, pin: string): Report | undefined {
  const normalized = caseNumber.trim().toUpperCase();
  return REPORTS.find(
    (r) => r.caseNumber.toUpperCase() === normalized && r.pin === pin.trim()
  );
}
