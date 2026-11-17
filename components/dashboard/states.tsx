import Link from "next/link";
import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Meta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-meta uppercase tracking-[0.08em] text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}

export function WidgetError({ message, detail }: { message: string; detail: string }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-2">
      <span className="flex items-center gap-2 font-mono text-meta font-extrabold uppercase tracking-[0.08em]">
        <TriangleAlert className="size-4" strokeWidth={1.5} />
        Sync error
      </span>
      <p className="font-extrabold">{message}</p>
      <p className="max-w-[65ch] text-muted-foreground">{detail}</p>
      <Button asChild variant="outline" size="sm" className="mt-2">
        <Link href="/">Try again</Link>
      </Button>
    </div>
  );
}

export function EmptyNote({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="font-extrabold">{title}</p>
      <p className="max-w-[48ch] text-muted-foreground">{body}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
