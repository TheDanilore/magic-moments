export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3"
    >
      <div className="skeleton-shimmer aspect-square w-full rounded-[calc(var(--radius-card)-0.25rem)]" />
      <div className="mt-3 space-y-2.5 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="skeleton-shimmer h-5 w-3/5 rounded-md" />
          <div className="skeleton-shimmer h-5 w-16 rounded-md" />
        </div>
        <div className="skeleton-shimmer h-4 w-4/5 rounded-md" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton-shimmer h-12 flex-1 rounded-full" />
          <div className="skeleton-shimmer h-12 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}
