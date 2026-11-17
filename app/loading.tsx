import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { Shell } from "@/components/dashboard/shell";

export default function Loading() {
  return (
    <Shell>
      <DashboardSkeleton />
    </Shell>
  );
}
