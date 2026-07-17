# Project SUPPORT — Anonymous School Safety Reporting

A clean, multi-page demo UI for **Project SUPPORT** (Supporting Under-served Populations
through Partnership, Opportunities, Resources & Technology) — a school violence prevention
initiative. It provides a safe, confidential way for students, families, staff, and
community members to report safety concerns, plus an administrative dashboard for
authorized personnel.

Built with **Next.js (Pages Router)**, **TypeScript**, and **Material UI (MUI)** — no
Tailwind. Styling uses a centralized MUI theme with smooth transitions throughout.

## Features

- **Home** (`/`) — landing page with anonymous / contact reporting entry points.
- **Report a Concern** (`/report`) — a 6-step guided form:
  1. Select school/location · 2. Type of concern · 3. Urgency · 4. Details ·
  5. Evidence upload · 6. Contact info (with "remain anonymous").
- **Success** (`/success`) — generates a case number & PIN with copy-to-clipboard.
- **Check Status** (`/status`) — anonymous two-way follow-up using case number + PIN.
- **How It Works** (`/how-it-works`) — urgency levels, automated routing, workflow.
- **Admin Dashboard** (`/dashboard`) — login gate, stats, filterable reports queue,
  and a case detail drawer with timeline.

### Reusable components

`Layout`, `Navbar`, `Footer`, `Logo`, `PageHeader`, `Reveal` (scroll animation),
`StatCard`, `SeverityChip`, `StatusChip`, `EmergencyBanner`, and two dropdown
components that **show only 4 options at a time and scroll the rest**:
`ScrollableSelect` and `ScrollableAutocomplete`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo credentials

- **Check status** — case `PSV-2026-00458`, PIN `3049`.
- **Admin dashboard** — any email/password grants access (demo mode).

## Notes

All data in `src/data/index.ts` is fictional and for demonstration only. Report
submissions are not persisted or sent anywhere.
