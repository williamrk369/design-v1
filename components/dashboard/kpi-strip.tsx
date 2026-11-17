import { Card, CardContent } from "@/components/ui/card";
import type { Dashboard } from "@/lib/dashboard-data";
import { Meta, WidgetError } from "./states";

// One surface holding three figures. The reference's separate KPI tiles would be
// "three cards in a row", which DESIGN.md §6 forbids, so the figures share one card
// and are separated by space alone.
export function KpiStrip({ summary, rangeLabel }: { summary: Dashboard["summary"]; rangeLabel: string }) {
  if (summary.status === "error") {
    return (
      <Card role="region" aria-label="Summary">
        <CardContent>
          <WidgetError message={summary.message} detail={summary.detail} />
        </CardContent>
      </Card>
    );
  }

  const { hours, deltaHours, billableHours, tasksClosed } = summary.data;
  const empty = hours === 0;
  const pct = hours ? Math.round((billableHours / hours) * 100) : 0;

  const stats = [
    {
      label: `Logged · ${rangeLabel}`,
      value: hours,
      unit: "h",
      note: empty ? "Nothing logged yet" : `${deltaHours >= 0 ? "+" : "−"}${Math.abs(deltaHours)} h on the week before`,
    },
    {
      label: "Billable",
      value: billableHours,
      unit: "h",
      note: empty ? "Shows once you log client work" : `${pct}% of logged time`,
    },
    {
      label: "Tasks closed",
      value: tasksClosed,
      unit: "",
      note: empty ? "None yet" : "Across 3 client projects",
    },
  ];

  return (
    <Card role="region" aria-label="Summary">
      <CardContent className="grid gap-6 sm:grid-cols-3 sm:gap-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-2">
          <Meta>{s.label}</Meta>
          <p className={`font-display text-head-sm font-extrabold sm:text-head ${empty ? "text-muted-foreground" : ""}`}>
            {s.value}
            {s.unit ? <span className="font-sans text-body font-extrabold"> {s.unit}</span> : null}
          </p>
          <p className="text-muted-foreground">{s.note}</p>
        </div>
      ))}
      </CardContent>
    </Card>
  );
}
