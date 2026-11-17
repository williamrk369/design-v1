"use client";

import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

// Whole-route failure. Widget-level failures are handled inside each widget.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-dvh flex-col items-start justify-center gap-6 bg-muted p-8 sm:p-24">
      <span className="flex items-center gap-2 font-mono text-meta font-extrabold uppercase tracking-[0.08em]">
        <TriangleAlert className="size-4" strokeWidth={1.5} />
        Dashboard unavailable
      </span>
      <h1 className="max-w-[12ch] font-display text-head-sm font-extralight sm:text-head">The dashboard didn&apos;t load.</h1>
      <p className="max-w-[65ch] text-muted-foreground">
        Your logged time is safe. Reload to try again. If it keeps happening, send this reference to the studio
        admin: <span className="font-mono text-foreground">{error.digest ?? "no reference"}</span>
      </p>
      <Button onClick={reset}>Reload dashboard</Button>
    </main>
  );
}
