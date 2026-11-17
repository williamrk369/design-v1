import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dashboard, DayHours } from "@/lib/dashboard-data";
import { EmptyNote, Meta, WidgetError } from "./states";

// Reference: stacked hour blocks per weekday, the top block filled and labelled,
// with a trend line drawn over them. Here 1 block = 2 hours and the line is the
// week before, for comparison.
const BLOCK = 24; // px
const GAP = 8; // px
const PX_PER_HOUR = (BLOCK + GAP) / 2; // 16px
const AREA = 160; // px, fits 10 h

function Column({ d }: { d: DayHours }) {
  const blocks = Math.ceil(d.hours / 2);
  return (
    <li className="flex flex-col items-center gap-2">
      <div className="flex h-40 w-full flex-col-reverse items-center gap-2">
        {Array.from({ length: blocks }, (_, i) => {
          const top = i === blocks - 1;
          return (
            <div
              key={i}
              className={`flex h-6 w-full max-w-12 items-center justify-center rounded-control border border-foreground ${
                top ? "bg-foreground text-background" : "bg-card"
              }`}
            >
              {top ? <span className="font-mono text-meta font-extrabold">{d.hours}h</span> : null}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-meta uppercase tracking-[0.08em] text-muted-foreground">{d.day}</span>
    </li>
  );
}

function PreviousWeekLine({ days }: { days: DayHours[] }) {
  const w = 700;
  const pts = days.map((d, i) => [(i + 0.5) * (w / days.length), AREA - d.previous * PX_PER_HOUR] as const);
  // Smooth with a Catmull-Rom to Bezier conversion, like the reference's wave.
  let path = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    path += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${AREA}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full overflow-visible"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2}
        strokeDasharray="6 6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function HoursChart({ week, rangeLabel }: { week: Dashboard["week"]; rangeLabel: string }) {
  const total = week.status === "ok" ? week.data.reduce((s, d) => s + d.hours, 0) : 0;

  return (
    <Card aria-labelledby="hours-title">
      <CardHeader className="flex-wrap">
        <div className="flex flex-col gap-2">
          <Meta>Week 46 · {rangeLabel}</Meta>
          <CardTitle id="hours-title">Hours by day</CardTitle>
        </div>
        {week.status === "ok" && total > 0 ? (
          <ul className="flex items-center gap-6 font-mono text-meta uppercase tracking-[0.08em] text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-4 rounded-control bg-foreground" aria-hidden /> This week
            </li>
            <li className="flex items-center gap-2">
              <span className="h-0 w-6 border-t-2 border-dashed border-primary" aria-hidden /> Week before
            </li>
          </ul>
        ) : null}
      </CardHeader>

      {week.status === "error" ? (
        <WidgetError message={week.message} detail={week.detail} />
      ) : total === 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex h-40 items-end border-b border-dashed border-foreground/40 pb-6">
            <EmptyNote
              title={`No hours logged for ${rangeLabel}`}
              body="Each day fills in as you log time: one block per two hours, so a full day stacks four high."
            />
          </div>
          <ol className="grid grid-cols-7 gap-2" aria-hidden>
            {week.data.map((d) => (
              <li key={d.day} className="text-center font-mono text-meta uppercase tracking-[0.08em] text-muted-foreground">
                {d.day}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <figure className="flex flex-col gap-2">
          <div className="relative">
            <PreviousWeekLine days={week.data} />
            <ol className="relative grid grid-cols-7 gap-2 sm:gap-4">
              {week.data.map((d) => (
                <Column key={d.day} d={d} />
              ))}
            </ol>
          </div>
          <figcaption className="sr-only">
            Hours logged per day, {rangeLabel}:{" "}
            {week.data.map((d) => `${d.day} ${d.hours} hours (week before ${d.previous})`).join(", ")}.
          </figcaption>
        </figure>
      )}
    </Card>
  );
}
