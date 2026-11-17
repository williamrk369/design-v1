import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDuration, type Dashboard, type EntryStatus } from "@/lib/dashboard-data";
import { EmptyNote, Meta, WidgetError } from "./states";

const STATUS: Record<EntryStatus, { label: string; variant: "default" | "outline" | "muted" }> = {
  approved: { label: "Approved", variant: "default" },
  "in-review": { label: "In review", variant: "outline" },
  draft: { label: "Draft", variant: "muted" },
  "non-billable": { label: "Non-billable", variant: "muted" },
};

export function EntriesTable({ entries }: { entries: Dashboard["entries"] }) {
  return (
    <Card aria-labelledby="entries-title">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Meta>{entries.status === "ok" && entries.data.length ? "5 of 23 last week" : "Last week"}</Meta>
          <CardTitle id="entries-title">Recent time entries</CardTitle>
        </div>
        {entries.status === "ok" && entries.data.length ? (
          <Button variant="outline" size="sm">
            Full timesheet
          </Button>
        ) : null}
      </CardHeader>

      {entries.status === "error" ? (
        <WidgetError message={entries.message} detail={entries.detail} />
      ) : entries.data.length === 0 ? (
        <EmptyNote
          title="No time entries yet"
          body="Start the timer or use Log time. Entries show up here as soon as they're saved."
          action={
            <Button>
              <Plus strokeWidth={1.5} />
              Log your first entry
            </Button>
          }
        />
      ) : (
        <>
          {/* ≥768px: the reference's table, 48px rows. */}
          <Table className="hidden table-fixed md:table">
            <colgroup>
              <col />
              <col className="w-48" />
              <col className="w-24" />
              <col className="w-36" />
              <col className="w-24" />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>Entry</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.data.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="py-2">
                    <p className="truncate" title={e.task}>
                      {e.task}
                    </p>
                    {e.ref ? (
                      <p className="truncate font-mono text-meta text-muted-foreground" title={e.ref}>
                        {e.ref}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="truncate text-muted-foreground" title={e.project}>
                    {e.project}
                  </TableCell>
                  <TableCell className="font-mono text-meta uppercase tracking-[0.08em]">{e.date}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS[e.status].variant}>{STATUS[e.status].label}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{formatDuration(e.minutes)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* <768px: each row reflows into a two-line list item. */}
          <ul className="flex flex-col md:hidden">
            {entries.data.map((e) => (
              <li key={e.id} className="flex flex-col gap-2 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <p className="line-clamp-3 min-w-0">{e.task}</p>
                  <span className="shrink-0 font-mono tabular-nums">{formatDuration(e.minutes)}</span>
                </div>
                {e.ref ? <p className="truncate font-mono text-meta text-muted-foreground">{e.ref}</p> : null}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={STATUS[e.status].variant}>{STATUS[e.status].label}</Badge>
                  <Meta className="min-w-0 truncate">
                    {e.project} · {e.date}
                  </Meta>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
