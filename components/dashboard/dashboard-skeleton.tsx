import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the populated layout block for block, so nothing jumps when data lands.
const BAR_HEIGHTS = ["h-24", "h-32", "h-40", "h-16", "h-32", "h-8", "h-6"];

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]" aria-busy aria-label="Loading dashboard">
      <div className="flex min-w-0 flex-col gap-4">
        <Card>
          <CardContent className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-7 items-end gap-2 sm:gap-4">
            {BAR_HEIGHTS.map((h, i) => (
              <div key={i} className="flex h-48 flex-col items-center justify-end gap-2">
                <Skeleton className={`${h} w-full max-w-12`} />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex flex-col">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex h-12 items-center gap-4 border-b border-border last:border-b-0">
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="hidden h-4 w-32 md:block" />
                <Skeleton className="hidden h-4 w-16 md:block" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:flex xl:flex-col">
        <Card>
          <CardContent className="flex flex-col gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-6">
          <Skeleton className="h-6 w-32" />
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardContent className="flex flex-col gap-6">
          <Skeleton className="h-6 w-32" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid grid-cols-[64px_1fr] gap-4">
              <Skeleton className="h-12 w-12" />
              <div className="flex flex-col gap-2 pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
