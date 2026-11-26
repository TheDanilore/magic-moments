"use client"

import { lazy, Suspense, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import { featuredProducts } from "@/data/catalog"
import type { Product } from "@/types/catalog"

const ProductQuickViewModal = lazy(() =>
  import("@/components/ProductQuickViewModal").then((mod) => ({
    default: mod.ProductQuickViewModal,
  }))
)

export default function FeaturedProducts() {
  const [inspecting, setInspecting] = useState<{
    product: Product
    color?: string
  } | null>(null)

  return (
    <section className="w-full bg-[var(--surface-blush)]/45 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Detalles Destacados
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Piezas listas para personalizar con tus fotos, colores, frase especial y envío coordinado por WhatsApp.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--text-accent-accessible)] underline underline-offset-4 hover:opacity-80"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={(prod, color) => setInspecting({ product: prod, color })}
            />
          ))}
        </div>
      </div>

      {inspecting ? (
        <Suspense fallback={null}>
          <ProductQuickViewModal
            product={inspecting.product}
            initialColor={inspecting.color}
            onClose={() => setInspecting(null)}
          />
        </Suspense>
      ) : null}
    </section>
  )
}
