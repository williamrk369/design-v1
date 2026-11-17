import Link from "next/link";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

// Reference: the dark vertical rail. Logo on top, icon nav, avatar and sign-out at the bottom.
export function Sidebar({ initials }: { initials?: string }) {
  return (
    <aside className="sticky top-6 hidden h-[calc(100dvh-48px)] w-16 shrink-0 flex-col items-center gap-8 bg-primary py-4 text-primary-foreground lg:flex">
      <Link
        href="/"
        className="flex size-12 items-center justify-center rounded-control bg-primary-foreground font-display text-head-sm font-extrabold text-primary"
      >
        L<span className="sr-only">owtide home</span>
      </Link>

      <nav aria-label="Main" className="flex flex-1 flex-col items-center gap-2">
        {navItems.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            title={label}
            className={cn(
              "flex size-12 items-center justify-center rounded-control transition-colors",
              active ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/10",
            )}
          >
            <Icon className="size-6" strokeWidth={1.5} />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarFallback>{initials ?? ""}</AvatarFallback>
        </Avatar>
        <button
          type="button"
          title="Sign out"
          className="flex size-12 items-center justify-center rounded-control hover:bg-primary-foreground/10"
        >
          <LogOut className="size-6" strokeWidth={1.5} />
          <span className="sr-only">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
