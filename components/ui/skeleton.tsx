// shadcn/ui radix-nova `skeleton`, restyled to DESIGN.md tokens.
// Changes from upstream: rounded-control; ink at 10% so it shows on paper cards
// (upstream's bg-muted is nearly invisible against paper).
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-control bg-foreground/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
