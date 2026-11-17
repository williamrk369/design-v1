"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

// Below 1024px the rail collapses into this sheet.
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="surface" size="icon" className="lg:hidden">
          <Menu className="size-6" strokeWidth={1.5} />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-none bg-primary p-6 text-primary-foreground">
        <SheetTitle className="font-display text-head-sm font-extrabold text-primary-foreground">Lowtide</SheetTitle>
        <SheetDescription className="sr-only">Main navigation</SheetDescription>
        <nav aria-label="Main" className="flex flex-col gap-2">
          {navItems.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-12 items-center gap-4 rounded-control px-4 font-extrabold",
                active ? "bg-primary-foreground text-primary" : "hover:bg-primary-foreground/10",
              )}
            >
              <Icon className="size-6" strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
