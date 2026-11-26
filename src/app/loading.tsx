import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton"

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      {/* Obsidian Hero Skeleton */}
      <div
        data-surface="obsidian"
        className="bg-[var(--surface-obsidian)] pt-8 pb-14 md:pt-12 md:pb-20"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5 lg:pt-8">
            <div className="h-14 w-3/4 rounded-2xl bg-white/10" />
            <div className="h-14 w-2/3 rounded-2xl bg-white/10" />
            <div className="mt-4 h-5 w-full max-w-sm rounded-full bg-white/8" />
            <div className="h-12 w-48 rounded-full bg-[var(--color-cta-primary)]/40" />
          </div>
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full rounded-[var(--radius-stage)] bg-white/8" />
          </div>
        </div>
      </div>

      {/* Category + Grid Skeleton matching ProductCard geometry */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="mb-8 flex gap-2 overflow-hidden">
          <div className="h-12 w-28 shrink-0 rounded-full bg-[var(--surface-card)]" />
          <div className="h-12 w-28 shrink-0 rounded-full bg-[var(--surface-card)]" />
          <div className="h-12 w-28 shrink-0 rounded-full bg-[var(--surface-card)]" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((slot) => (
            <ProductCardSkeleton key={slot} />
          ))}
        </div>
      </div>
    </div>
  )
}
