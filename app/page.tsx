import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { EntriesTable } from "@/components/dashboard/entries-table";
import { HoursChart } from "@/components/dashboard/hours-chart";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { BillableRatio, BudgetAlert, Deadlines } from "@/components/dashboard/rail";
import { Shell } from "@/components/dashboard/shell";
import { getDashboard, type DashboardState } from "@/lib/dashboard-data";

// `?state=` previews each state: populated (default), loading, empty, error.
const STATES = ["populated", "loading", "empty", "error"] as const;

export default async function Page({ searchParams }: PageProps<"/">) {
  const raw = (await searchParams).state;
  const state = STATES.find((s) => s === raw) ?? "populated";

  if (state === "loading") {
    return (
      <Shell>
        <DashboardSkeleton />
      </Shell>
    );
  }

  const d = getDashboard(state as DashboardState);

  return (
    <Shell firstName={d.person.first} initials={d.person.initials} rangeLabel={d.range.label} empty={state === "empty"}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="flex min-w-0 flex-col gap-4">
          <KpiStrip summary={d.summary} rangeLabel={d.range.label} />
          <HoursChart week={d.week} rangeLabel={d.range.label} />
          <EntriesTable entries={d.entries} />
        </main>
        <aside className="grid content-start gap-4 md:grid-cols-2 xl:flex xl:flex-col" aria-label="Budget and deadlines">
          <BudgetAlert budget={d.budget} />
          <BillableRatio months={d.billable} />
          <div className="md:col-span-2">
            <Deadlines items={d.deadlines} />
          </div>
        </aside>
      </div>
    </Shell>
  );
}
