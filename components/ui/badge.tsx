import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-control px-2 font-mono text-meta uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-foreground text-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
