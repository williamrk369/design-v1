// shadcn/ui radix-nova `input`, restyled to DESIGN.md tokens.
// Changes from upstream: 48px tall, 16px side padding, rounded-control, paper fill
// so it reads on the muted canvas, one text size at every breakpoint.
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-control border border-input bg-card px-4 text-body transition-colors outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-body file:font-extrabold file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
