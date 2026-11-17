import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { BudgetAlert as Budget, Deadline, MonthRatio } from "@/lib/dashboard-data";
import { EmptyNote, Meta } from "./states";

// Reference: the orange promo card. Here it is the one thing that needs attention,
// and the only Signal element on the screen (DESIGN.md §2).
export function BudgetAlert({ budget }: { budget: Budget | null }) {
  if (!budget) {
    return (
      <Card aria-label="Project budget">
        <Meta>Project budget</Meta>
        <EmptyNote title="No projects assigned yet" body="Budgets appear here once a project lead adds you to a project." />
      </Card>
    );
  }
  const pct = Math.round((budget.used / budget.budget) * 100);
  return (
    <Card aria-label="Budget alert" className="bg-accent text-accent-foreground">
      <CardHeader>
        <span className="font-mono text-meta font-extrabold uppercase tracking-[0.08em]">Budget alert</span>
        <Button variant="outline" size="icon-sm" aria-label="Open project budget">
          <ArrowUpRight strokeWidth={1.5} />
        </Button>
      </CardHeader>
      <div className="flex flex-col gap-2">
        <p className="font-display text-head font-extrabold">{pct}%</p>
        <p>
          of the {budget.budget} h budget for <strong className="font-extrabold">{budget.client}</strong> ·{" "}
          {budget.project} is used.
        </p>
      </div>
      <div className="h-2 w-full bg-foreground/15" role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Budget used">
        <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
      </div>
      <p className="font-mono text-meta uppercase tracking-[0.08em]">
        {budget.budget - budget.used} h left · {budget.daysLeft} days to the {budget.handoff} handoff
      </p>
    </Card>
  );
}

// Reference: "Completed task statistics", month rows filled to their value.
export function BillableRatio({ months }: { months: MonthRatio[] }) {
  const target = 75;
  return (
    <Card aria-labelledby="billable-title">
      <div className="flex flex-col gap-2">
        <Meta>Target {target}%</Meta>
        <CardTitle id="billable-title">Billable ratio</CardTitle>
      </div>
      {months.length === 0 ? (
        <EmptyNote title="Not enough time logged" body="Your billable ratio appears after your first full week of logged time." />
      ) : (
        <ul className="flex flex-col gap-2">
          {months.map((m) => (
            <li key={m.month} className="relative flex h-12 items-center justify-between overflow-hidden rounded-control bg-muted px-4">
              <div
                className={`absolute inset-y-0 left-0 ${m.current ? "bg-primary/25" : "bg-foreground/10"}`}
                style={{ width: `${m.billable}%` }}
                aria-hidden
              />
              <div className="absolute inset-y-2 w-px bg-foreground" style={{ left: `${target}%` }} aria-hidden />
              <span className={`relative ${m.current ? "font-extrabold" : ""}`}>
                {m.month}
                {m.current ? <span className="sr-only"> (month to date)</span> : null}
              </span>
              <span className="relative font-mono tabular-nums">{m.billable}%</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

// Reference: "My Events". Big date numerals carry the hierarchy, not boxes.
export function Deadlines({ items }: { items: Deadline[] }) {
  return (
    <Card aria-labelledby="deadlines-title">
      <div className="flex flex-col gap-2">
        <Meta>Nov 17 – 30</Meta>
        <CardTitle id="deadlines-title">Next deadlines</CardTitle>
      </div>
      {items.length === 0 ? (
        <EmptyNote title="Nothing due in the next 14 days" body="Deadlines from your projects appear here two weeks ahead." />
      ) : (
        <ol className="flex flex-col gap-6">
          {items.map((d) => (
            <li key={d.id} className="grid grid-cols-[64px_1fr] gap-4">
              <div className="flex flex-col">
                <span className="font-display text-head font-extralight">{d.date}</span>
                <Meta>{d.weekday}</Meta>
              </div>
              <div className="flex min-w-0 flex-col gap-2 pt-2">
                <Meta>{d.kind}</Meta>
                <p>{d.title}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
