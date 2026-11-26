/**
 * Skeleton estructuralmente alineado 1:1 con ProductCard para evitar CLS.
 */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col rounded-[calc(var(--radius-card)+0.25rem)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3"
    >
      <div className="skeleton-shimmer aspect-[4/3] w-full rounded-[var(--radius-card)]" />
      <div className="mx-3 mt-2 h-1 rounded-full bg-[var(--surface-shelf-ledge)]" />

      <div className="mt-3.5 flex flex-1 flex-col space-y-2.5 px-1 pb-1">
        <div className="skeleton-shimmer h-5 w-4/5 rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-full rounded-md" />

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="skeleton-shimmer h-6 w-20 rounded-md" />
          <div className="flex items-center gap-2">
            <div className="skeleton-shimmer h-4 w-4 rounded-full" />
            <div className="skeleton-shimmer h-4 w-4 rounded-full" />
            <div className="skeleton-shimmer h-4 w-4 rounded-full" />
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <div className="skeleton-shimmer h-12 flex-1 rounded-full" />
          <div className="skeleton-shimmer h-12 w-12 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  )
}
