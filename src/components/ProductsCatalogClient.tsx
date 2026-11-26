"use client"

import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useState, useTransition } from "react"
import { FileDown, Filter, Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import { AdaptiveSheet } from "@/components/ui/AdaptiveSheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productCategories, products } from "@/data/catalog"
import { getCategoryBySlug } from "@/lib/catalog"
import type { Product } from "@/types/catalog"

const ProductQuickViewModal = lazy(() =>
  import("@/components/ProductQuickViewModal").then((mod) => ({
    default: mod.ProductQuickViewModal,
  }))
)

interface ProductsCatalogClientProps {
  initialCategory?: string
  initialQuery?: string
}

type PriceRangeId = "under-20" | "20-40" | "40-60" | "over-60"
type SortOption = "featured" | "price-low" | "price-high" | "newest"

const QUICK_THEMES = [
  "Hot Wheels",
  "Dragon Ball",
  "Clash Royale",
  "Bob Esponja",
  "Flores Amarillas",
  "Aniversario",
  "Spotify",
  "Girasoles",
] as const

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
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [inspecting, setInspecting] = useState<{ product: Product; color?: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(query)
  const isFiltering = isPending || deferredQuery !== query

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
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    const list = products.filter((product) => {
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false
      }

      if (normalizedQuery) {
        const haystack =
          `${product.name} ${product.subtitle} ${product.description} ${product.category} ${product.sku} ${product.options.themes.join(" ")}`.toLowerCase()
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
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    }

    return sorted
  }, [selectedCategory, deferredQuery, selectedPriceRanges, sortBy])

  const hasActiveFilters =
    selectedCategory !== "all" || query.trim() !== "" || selectedPriceRanges.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="w-full pt-22 pb-16 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                {activeCategory ? activeCategory.name : "Nuestros Productos"}
              </h1>
              <p className="text-pretty mt-1.5 text-sm text-[var(--text-secondary)]">
                {activeCategory
                  ? activeCategory.subtitle
                  : "Detalles hechos a mano · Precios referenciales sujetos a personalización por WhatsApp"}
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[240px] lg:w-[270px]">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar cajas, cuadros, ramos..."
                  aria-label="Buscar productos"
                  className="h-12 w-full rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                />
              </div>

              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
                <button
                  type="button"
                  onClick={() => setIsFilterSheetOpen(true)}
                  aria-label="Filtrar por precio"
                  className="inline-flex h-12 w-full shrink-0 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] sm:w-auto"
                >
                  <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Precio{selectedPriceRanges.length > 0 ? ` (${selectedPriceRanges.length})` : ""}
                  </span>
                </button>

                <Select
                  value={sortBy}
                  onValueChange={(val) =>
                    startTransition(() => {
                      setSortBy(val as SortOption)
                    })
                  }
                >
                  <SelectTrigger aria-label="Ordenar productos" className="h-12 w-full min-w-0 rounded-full border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold sm:w-auto sm:min-w-[175px]">
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
          </div>

          {/* Horizontal Category Pills + Results Count */}
          <div className="mt-4 flex flex-col gap-3 lg:mt-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="sr-only">Categorías y listado de detalles</h2>
            <div
              role="group"
              aria-label="Filtrar por categoría"
              className="no-scrollbar -mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            >
              <button
                type="button"
                onClick={() => handleSelectCategory("all")}
                aria-pressed={selectedCategory === "all"}
                className={`inline-flex min-h-11 shrink-0 cursor-pointer touch-manipulation items-center rounded-full border px-4 text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === "all"
                    ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                }`}
              >
                Todas
              </button>
              {productCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleSelectCategory(category.slug)}
                  aria-pressed={selectedCategory === category.slug}
                  className={`inline-flex min-h-11 shrink-0 cursor-pointer touch-manipulation items-center rounded-full border px-4 text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === category.slug
                      ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                      : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="font-medium tabular-nums" aria-live="polite">
                {isFiltering
                  ? "Actualizando..."
                  : `Mostrando ${filteredProducts.length} de ${products.length} detalles`}
              </span>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card)] px-3 font-semibold text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                >
                  <span>Limpiar</span>
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Quick theme tags + PDF Catalog banner for Llaveros */}
          <div className="no-scrollbar -mx-4 mt-3 flex flex-nowrap items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <span className="shrink-0 text-xs font-medium text-[var(--text-secondary)]">
              Temáticas:
            </span>
            {QUICK_THEMES.map((theme) => {
              const isActiveTheme = query.trim().toLowerCase() === theme.toLowerCase()
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setQuery(isActiveTheme ? "" : theme)}
                  aria-pressed={isActiveTheme}
                  className={`inline-flex min-h-12 shrink-0 cursor-pointer touch-manipulation items-center rounded-full border px-3.5 text-xs font-medium whitespace-nowrap transition-colors md:min-h-10 ${
                    isActiveTheme
                      ? "border-[var(--color-cta-primary)] bg-[var(--surface-blush)] text-[var(--text-accent-accessible)]"
                      : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--color-cta-primary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {theme}
                </button>
              )
            })}
          </div>

          {selectedCategory === "all" || selectedCategory === "llaveros" ? (
            <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-blush)] px-4 py-3 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                  Catálogo de Llaveros 2026 (16 páginas en PDF)
                </p>
                <p className="text-pretty text-xs text-[var(--text-secondary)]">
                  Explora todas las plantillas: Spotify, Calendario, Google, Goku & Milk, Spider-Man, Cars, Simpsons y más.
                </p>
              </div>
              <a
                href="/catalogos/catalogo-llaveros-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-4 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
              >
                <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Ver Catálogo PDF</span>
              </a>
            </div>
          ) : null}

          {/* Product Grid */}
          <div className="mt-6 sm:mt-8" aria-busy={isFiltering}>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[var(--radius-stage)] border border-dashed border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 py-16 text-center">
                <Filter className="h-8 w-8 text-[var(--text-secondary)]" aria-hidden="true" />
                <p className="mt-3 font-display text-xl font-bold text-[var(--text-primary)]">
                  No encontramos coincidencias
                </p>
                <p className="mt-1 max-w-md text-sm text-[var(--text-secondary)]">
                  Prueba limpiando los filtros activos o explora todos nuestros detalles personalizados.
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
                className={`grid grid-cols-1 gap-6 transition-opacity duration-150 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
                  isFiltering ? "opacity-65" : "opacity-100"
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
      </section>

      {/* Price Filter AdaptiveSheet */}
      <AdaptiveSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        desktopMode="drawer"
        ariaLabel="Filtrar por precio"
      >
        <div className="safe-bottom-pad flex max-h-[82dvh] flex-col overflow-y-auto px-5 pt-2 pb-6">
          <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              Rango de precio
            </h2>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              aria-label="Cerrar filtros"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-3">
            {PRICE_RANGES.map((range) => (
              <div key={range.id} className="flex min-h-12 items-center space-x-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5">
                <Checkbox
                  id={`price-${range.id}`}
                  checked={selectedPriceRanges.includes(range.id)}
                  onCheckedChange={() => togglePriceRange(range.id)}
                />
                <Label htmlFor={`price-${range.id}`} className="flex-1 cursor-pointer py-3 text-sm font-medium">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            {selectedPriceRanges.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelectedPriceRanges([])}
                className="min-h-12 flex-1 cursor-pointer rounded-full border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-primary)]"
              >
                Limpiar
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="min-h-12 flex-1 cursor-pointer rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)]"
            >
              Aplicar
            </button>
          </div>
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
