import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <div className="mb-8 space-y-2">
        <div className="skeleton-shimmer h-9 w-64 rounded-lg" />
        <div className="skeleton-shimmer h-5 w-80 rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}
