// Sample data for the time-analytics dashboard. Lowtide Studio and every client
// below are fictional. The shape mirrors what a timesheet API would return.

export type DayHours = { day: string; date: string; hours: number; previous: number };

export type EntryStatus = "approved" | "in-review" | "draft" | "non-billable";

export type TimeEntry = {
  id: string;
  task: string;
  project: string;
  ref?: string;
  date: string;
  status: EntryStatus;
  minutes: number;
};

export type Deadline = { id: string; date: string; weekday: string; kind: string; title: string };

export type BudgetAlert = {
  project: string;
  client: string;
  used: number;
  budget: number;
  handoff: string;
  daysLeft: number;
};

export type MonthRatio = { month: string; billable: number; current?: boolean };

export type Section<T> = { status: "ok"; data: T } | { status: "error"; message: string; detail: string };

export type Dashboard = {
  person: { first: string; full: string; initials: string; role: string };
  range: { label: string; week: string };
  summary: Section<{ hours: number; deltaHours: number; billableHours: number; tasksClosed: number }>;
  week: Section<DayHours[]>;
  entries: Section<TimeEntry[]>;
  budget: BudgetAlert | null;
  billable: MonthRatio[];
  deadlines: Deadline[];
};

const person = { first: "Adaeze", full: "Adaeze Okonkwo", initials: "AO", role: "Product designer" };
const range = { label: "Nov 9 – 15", week: "Week 46" };

const week: DayHours[] = [
  { day: "Mon", date: "Nov 9", hours: 6, previous: 7 },
  { day: "Tue", date: "Nov 10", hours: 8, previous: 7 },
  { day: "Wed", date: "Nov 11", hours: 9, previous: 8 },
  { day: "Thu", date: "Nov 12", hours: 4, previous: 6 },
  { day: "Fri", date: "Nov 13", hours: 7, previous: 6 },
  { day: "Sat", date: "Nov 14", hours: 2, previous: 0 },
  { day: "Sun", date: "Nov 15", hours: 0, previous: 0 },
];

const entries: TimeEntry[] = [
  {
    id: "te_4812",
    task: "Onboarding flow: KYC document upload, retry and timeout states",
    project: "Harbor Credit Union",
    date: "Nov 13",
    status: "approved",
    minutes: 210,
  },
  {
    id: "te_4809",
    task: "Kiosk search results grid for 1024×768 touch screens",
    project: "Pell County Library",
    date: "Nov 12",
    status: "in-review",
    minutes: 135,
  },
  {
    id: "te_4801",
    task:
      "Accessibility remediation for the checkout and account-recovery flows, including focus order, screen-reader labels for all 14 address-form fields, inline error summaries, and a contrast pass on disabled button states requested by the client's audit vendor",
    project: "Marlow & Finch Outfitters",
    ref: "MF-a11y-remediation-checkout-and-account-recovery-2026Q4",
    date: "Nov 11",
    status: "draft",
    minutes: 285,
  },
  {
    id: "te_4797",
    task: "Weekly studio critique",
    project: "Lowtide internal",
    date: "Nov 10",
    status: "non-billable",
    minutes: 60,
  },
  {
    id: "te_4790",
    task: "Usability test script, 6 participants",
    project: "Harbor Credit Union",
    date: "Nov 9",
    status: "approved",
    minutes: 120,
  },
];

const deadlines: Deadline[] = [
  { id: "d1", date: "19", weekday: "Thu", kind: "Readout", title: "Usability test findings for Harbor mobile onboarding" },
  { id: "d2", date: "23", weekday: "Mon", kind: "Design QA", title: "Pell County Library kiosk search, build 0.9" },
  { id: "d3", date: "26", weekday: "Thu", kind: "Handoff", title: "Harbor onboarding v1 specs and redlines to engineering" },
];

const billable: MonthRatio[] = [
  { month: "September", billable: 71 },
  { month: "October", billable: 74 },
  { month: "November", billable: 78, current: true },
];

const budget: BudgetAlert = {
  project: "Mobile onboarding",
  client: "Harbor Credit Union",
  used: 147,
  budget: 160,
  handoff: "Nov 26",
  daysLeft: 9,
};

const total = week.reduce((s, d) => s + d.hours, 0);
const previousTotal = week.reduce((s, d) => s + d.previous, 0);

export type DashboardState = "populated" | "empty" | "error";

export function getDashboard(state: DashboardState): Dashboard {
  if (state === "empty") {
    return {
      person,
      range,
      summary: { status: "ok", data: { hours: 0, deltaHours: 0, billableHours: 0, tasksClosed: 0 } },
      week: { status: "ok", data: week.map((d) => ({ ...d, hours: 0, previous: 0 })) },
      entries: { status: "ok", data: [] },
      budget: null,
      billable: [],
      deadlines: [],
    };
  }

  const detail =
    "The timesheet service didn't respond (503) at 10:42. Nothing you logged is lost. This only affects what the dashboard can show.";
  const failed = (message: string) => ({ status: "error" as const, message, detail });

  return {
    person,
    range,
    summary:
      state === "error"
        ? failed("Last week's totals are unavailable")
        : { status: "ok", data: { hours: total, deltaHours: total - previousTotal, billableHours: 28, tasksClosed: 11 } },
    week: state === "error" ? failed("Couldn't load hours by day") : { status: "ok", data: week },
    entries: state === "error" ? failed("Couldn't load time entries") : { status: "ok", data: entries },
    budget,
    billable,
    deadlines,
  };
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${String(m).padStart(2, "0")}m`;
}
