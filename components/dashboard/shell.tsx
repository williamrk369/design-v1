import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

// Reference structure: rail on the left, top bar above a two-column body.
// The canvas is muted and the cards are paper, so surfaces separate by background only.
export function Shell({
  children,
  firstName,
  initials,
  rangeLabel,
  empty,
}: {
  children: React.ReactNode;
  firstName?: string;
  initials?: string;
  rangeLabel?: string;
  empty?: boolean;
}) {
  return (
    <div className="flex min-h-dvh gap-6 bg-muted p-4 lg:p-6">
      <Sidebar initials={initials} />
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <Topbar firstName={firstName} rangeLabel={rangeLabel} empty={empty} />
        {children}
      </div>
    </div>
  );
}
