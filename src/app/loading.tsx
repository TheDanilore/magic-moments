import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton"

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]" aria-busy="true">
      {/* Blush Hero Skeleton aligned 1:1 with Home Hero */}
      <div className="w-full bg-[var(--surface-blush)] pt-24 pb-10 md:pt-28 md:pb-16">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-8 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="space-y-4 md:col-span-6 lg:col-span-5">
            <div className="skeleton-shimmer h-7 w-64 rounded-full" />
            <div className="space-y-2.5">
              <div className="skeleton-shimmer h-10 w-full rounded-2xl sm:h-12" />
              <div className="skeleton-shimmer h-10 w-4/5 rounded-2xl sm:h-12" />
              <div className="skeleton-shimmer h-5 w-full max-w-md rounded-full" />
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <div className="skeleton-shimmer h-12 w-full rounded-full sm:w-44" />
              <div className="skeleton-shimmer h-12 w-full rounded-full sm:w-44" />
            </div>
            <div className="flex gap-4 border-t border-[var(--border-subtle)] pt-3.5">
              <div className="skeleton-shimmer h-4 w-28 rounded-full" />
              <div className="skeleton-shimmer h-4 w-28 rounded-full" />
              <div className="skeleton-shimmer h-4 w-28 rounded-full" />
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-7">
            <div className="rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 sm:p-2.5">
              <div className="skeleton-shimmer aspect-[4/3] w-full rounded-[calc(var(--radius-stage)-0.35rem)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Skeleton */}
      <div className="border-y border-[var(--border-subtle)] bg-[var(--surface-page)] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="skeleton-shimmer h-8 w-56 rounded-xl" />
          <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {[0, 1, 2, 3, 4, 5].map((slot) => (
              <div
                key={slot}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2.5"
              >
                <div className="skeleton-shimmer aspect-[4/3] w-full rounded-[calc(var(--radius-card)-0.3rem)]" />
                <div className="mt-2.5 space-y-1.5 px-0.5">
                  <div className="skeleton-shimmer h-4 w-4/5 rounded-md" />
                  <div className="skeleton-shimmer h-3 w-1/2 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Grid Skeleton */}
      <div className="bg-[var(--surface-blush)] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((slot) => (
              <ProductCardSkeleton key={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
