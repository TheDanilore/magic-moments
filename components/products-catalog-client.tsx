"use client"

import { lazy, Suspense, useEffect, useMemo, useState, useTransition } from "react"
import { Filter, Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { AdaptiveSheet } from "@/components/ui/adaptive-sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { getCategoryBySlug, productCategories, products, type Product } from "@/lib/products"

const ProductQuickViewModal = lazy(() =>
  import("@/components/product-quick-view-modal").then((mod) => ({
    default: mod.ProductQuickViewModal,
  }))
)

interface ProductsCatalogClientProps {
  initialCategory?: string
  initialQuery?: string
}

type PriceRangeId = "under-20" | "20-40" | "40-60" | "over-60"
type SortOption = "featured" | "price-low" | "price-high" | "newest"

const PRICE_RANGES: Array<{
  id: PriceRangeId
  label: string
  matches: (priceCents: number) => boolean
}> = [
  { id: "under-20", label: "Menos de S/ 20", matches: (c) => c < 2000 },
  { id: "20-40", label: "S/ 20 - S/ 40", matches: (c) => c >= 2000 && c <= 4000 },
  { id: "40-60", label: "S/ 40 - S/ 60", matches: (c) => c > 4000 && c <= 6000 },
  { id: "over-60", label: "Más de S/ 60", matches: (c) => c > 6000 },
]

export function ProductsCatalogClient({
  initialCategory,
  initialQuery = "",
}: ProductsCatalogClientProps) {
  const normalizedInitialCategory = getCategoryBySlug(initialCategory)?.slug ?? "all"

  const [selectedCategory, setSelectedCategory] = useState<string>(normalizedInitialCategory)
  const [query, setQuery] = useState<string>(initialQuery)
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRangeId[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [inspecting, setInspecting] = useState<{ product: Product; color?: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setSelectedCategory(getCategoryBySlug(initialCategory)?.slug ?? "all")
  }, [initialCategory])

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const activeCategory = getCategoryBySlug(selectedCategory)

  const handleSelectCategory = (slug: string) => {
    startTransition(() => {
      setSelectedCategory(slug)
    })
  }

  const togglePriceRange = (rangeId: PriceRangeId) => {
    startTransition(() => {
      setSelectedPriceRanges((prev) =>
        prev.includes(rangeId) ? prev.filter((item) => item !== rangeId) : [...prev, rangeId]
      )
    })
  }

  const resetFilters = () => {
    startTransition(() => {
      setSelectedCategory("all")
      setQuery("")
      setSelectedPriceRanges([])
      setSortBy("featured")
    })
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const list = products.filter((product) => {
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false
      }

      if (normalizedQuery) {
        const haystack = `${product.name} ${product.subtitle} ${product.description} ${product.category} ${product.sku}`.toLowerCase()
        if (!haystack.includes(normalizedQuery)) {
          return false
        }
      }

      if (selectedPriceRanges.length > 0) {
        const matchesAnyRange = selectedPriceRanges.some((rangeId) => {
          const def = PRICE_RANGES.find((item) => item.id === rangeId)
          return def ? def.matches(product.priceCents) : false
        })
        if (!matchesAnyRange) {
          return false
        }
      }

      return true
    })

    const sorted = [...list]
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.priceCents - b.priceCents)
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.priceCents - a.priceCents)
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => b.id - a.id)
    } else {
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.id - b.id)
    }

    return sorted
  }, [selectedCategory, query, selectedPriceRanges, sortBy])

  const hasActiveFilters =
    selectedCategory !== "all" || query.trim() !== "" || selectedPriceRanges.length > 0

  const renderFilterControls = (onAfterSelect?: () => void) => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-base font-bold text-[var(--text-primary)]">
          Categorías
        </h3>
        <ul className="space-y-1.5 text-sm">
          <li>
            <button
              type="button"
              onClick={() => {
                handleSelectCategory("all")
                onAfterSelect?.()
              }}
              className={`flex min-h-11 w-full cursor-pointer items-center rounded-xl px-3 text-left font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-card)] hover:text-[var(--text-primary)]"
              }`}
            >
              Todas
            </button>
          </li>
          {productCategories.map((category) => (
            <li key={category.slug}>
              <button
                type="button"
                onClick={() => {
                  handleSelectCategory(category.slug)
                  onAfterSelect?.()
                }}
                className={`flex min-h-11 w-full cursor-pointer items-center rounded-xl px-3 text-left font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-card)] hover:text-[var(--text-primary)]"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-display text-base font-bold text-[var(--text-primary)]">
          Precio
        </h3>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <div key={range.id} className="flex min-h-10 items-center space-x-2.5">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={() => togglePriceRange(range.id)}
              />
              <Label htmlFor={`price-${range.id}`} className="cursor-pointer text-sm">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-display text-base font-bold text-[var(--text-primary)]">
          Ordenar por
        </h3>
        <Select
          value={sortBy}
          onValueChange={(val) =>
            startTransition(() => {
              setSortBy(val as SortOption)
            })
          }
        >
          <SelectTrigger className="min-h-11 rounded-xl">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="newest">Más Recientes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="w-full py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                {activeCategory ? activeCategory.name : "Nuestros Productos"}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <p className="text-sm text-[var(--text-secondary)]">
                  {activeCategory
                    ? activeCategory.subtitle
                    : "Detalles personalizados listos para coordinar por WhatsApp"}
                </p>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card)] px-3 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                  >
                    <span>Limpiar filtros</span>
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-initial">
                <Search
                  className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 text-[var(--text-secondary)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  aria-label="Buscar productos"
                  className="h-11 w-full rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] md:w-[240px] lg:w-[300px]"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                aria-label="Abrir filtros"
                className="inline-flex h-11 shrink-0 cursor-pointer touch-manipulation items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold text-[var(--text-primary)] md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span>Filtros</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block">{renderFilterControls()}</aside>

            {/* Product Grid */}
            <div className="md:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[var(--radius-stage)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 py-16 text-center">
                  <Filter className="h-8 w-8 text-[var(--text-secondary)]" aria-hidden="true" />
                  <p className="mt-3 font-display text-xl font-bold text-[var(--text-primary)]">
                    No encontramos coincidencias
                  </p>
                  <p className="mt-1 max-w-md text-sm text-[var(--text-secondary)]">
                    Prueba limpiando los filtros activos o explora nuestros productos más solicitados.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 inline-flex min-h-12 cursor-pointer items-center rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                  >
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <div
                  className={`grid grid-cols-1 gap-6 transition-opacity duration-150 sm:grid-cols-2 lg:grid-cols-3 ${
                    isPending ? "opacity-65" : "opacity-100"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onInspect={(prod, color) => setInspecting({ product: prod, color })}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Sheet Filters */}
      <AdaptiveSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        desktopMode="drawer"
        ariaLabel="Filtros de productos"
      >
        <div className="safe-bottom-pad flex max-h-[82dvh] flex-col overflow-y-auto px-5 pt-2 pb-6">
          <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              Filtrar catálogo
            </h2>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              aria-label="Cerrar filtros"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {renderFilterControls(() => setIsMobileFilterOpen(false))}
        </div>
      </AdaptiveSheet>

      {inspecting ? (
        <Suspense fallback={null}>
          <ProductQuickViewModal
            product={inspecting.product}
            initialColor={inspecting.color}
            onClose={() => setInspecting(null)}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
