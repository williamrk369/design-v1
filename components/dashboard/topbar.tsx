import { Bell, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MobileNav } from "./mobile-nav";

// Reference: greeting on the left. Segmented control, search, notifications and date on the right.
export function Topbar({ firstName, rangeLabel, empty }: { firstName?: string; rangeLabel?: string; empty?: boolean }) {
  return (
    <header className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-4 lg:hidden">
        <MobileNav />
        <span className="font-display text-head-sm font-extrabold">Lowtide</span>
      </div>

      <div className="order-last w-full min-w-0 xl:order-none xl:mr-auto xl:w-auto">
        {firstName ? (
          <>
            <h1 className="font-display text-head-sm font-extralight tracking-[-0.02em] sm:text-head">
              Hi, {firstName}.
            </h1>
            <p className="text-muted-foreground">
              {empty ? "Nothing logged yet for " : "Here's where last week's hours went, "}
              <span className="whitespace-nowrap">{rangeLabel}</span>.
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-2" aria-busy>
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2 xl:ml-0">
        <div className="hidden items-center bg-card md:flex" role="group" aria-label="View">
          <Button variant="default" aria-pressed="true">
            Overview
          </Button>
          <Button variant="ghost">
            <Plus strokeWidth={1.5} />
            Log time
          </Button>
        </div>

        <label className="relative hidden sm:block">
          <span className="sr-only">Search entries and projects</span>
          <Search className="pointer-events-none absolute top-4 left-4 size-4 text-muted-foreground" strokeWidth={1.5} />
          <Input type="search" placeholder="Search entries, projects" className="w-64 border-transparent pl-12" />
        </label>

        <Button variant="surface" size="icon" className="relative">
          <Bell className="size-6" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-foreground" aria-hidden />
          <span className="sr-only">Notifications, 2 unread</span>
        </Button>

        <div className="hidden h-12 flex-col justify-center bg-card px-4 xl:flex">
          <span className="font-mono text-meta font-extrabold uppercase tracking-[0.08em]">Tue 17 Nov</span>
          <span className="font-mono text-meta uppercase tracking-[0.08em] text-muted-foreground">Week 47</span>
        </div>
      </div>
    </header>
  );
}
