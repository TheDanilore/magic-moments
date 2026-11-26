"use client"

import { useDeferredValue, useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Search, X } from "lucide-react"
import { AdaptiveSheet } from "@/components/ui/AdaptiveSheet"
import { PriceTag } from "@/components/ui/PriceTag"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { productCategories, products } from "@/data/catalog"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const deferredQuery = useDeferredValue(query)

  const matchingProducts = useMemo(() => {
    const trimmed = deferredQuery.trim().toLowerCase()
    if (!trimmed) {
      return products.filter((product) => product.featured).slice(0, 4)
    }

    return products
      .filter((product) => {
        const haystack =
          `${product.name} ${product.subtitle} ${product.category} ${product.description} ${product.sku}`.toLowerCase()
        return haystack.includes(trimmed)
      })
      .slice(0, 6)
  }, [deferredQuery])

  useEffect(() => {
    setActiveIndex(-1)
  }, [deferredQuery, isOpen])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (activeIndex >= 0 && matchingProducts[activeIndex]) {
      const selected = matchingProducts[activeIndex]
      onClose()
      router.push(`/productos/${selected.id}`)
      return
    }

    const trimmed = query.trim()
    onClose()
    if (trimmed) {
      router.push(`/productos?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push("/productos")
    }
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || matchingProducts.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % matchingProducts.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? matchingProducts.length - 1 : prev - 1))
    }
  }

  return (
    <AdaptiveSheet
      isOpen={isOpen}
      onClose={onClose}
      desktopMode="modal"
      maxWidthClass="max-w-2xl"
      ariaLabelledBy="search-overlay-title"
    >
      <div className="flex max-h-[82dvh] flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
          <h2
            id="search-overlay-title"
            className="font-display text-lg font-bold tracking-tight text-[var(--text-primary)]"
          >
            Buscar detalles
          </h2>
          <ShortcutTooltip label="Cerrar buscador" shortcut="Esc">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar buscador"
              className="touch-target-48 inline-flex cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-card)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>
        </div>

        <form onSubmit={handleSubmit} className="border-b border-[var(--border-subtle)] px-5 py-3.5">
          <div className="relative flex items-center gap-2">
            <Search
              className="pointer-events-none absolute left-3.5 h-4 w-4 text-[var(--text-secondary)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Buscar cajas, cuadros LED, ramos, llaveros..."
              aria-label="Buscar detalles en el catálogo"
              aria-activedescendant={
                activeIndex >= 0 && matchingProducts[activeIndex]
                  ? `search-result-${matchingProducts[activeIndex].id}`
                  : undefined
              }
              autoFocus
              className="h-12 w-full rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
            <button
              type="submit"
              className="touch-target-48 inline-flex shrink-0 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full bg-[var(--color-cta-primary)] px-5 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
            >
              <span>Buscar</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {productCategories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/productos?categoria=${category.slug}`}
                onClick={onClose}
                className="inline-flex min-h-12 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] md:min-h-10"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-3 text-xs font-medium text-[var(--text-secondary)]">
            {query.trim() ? "Resultados encontrados" : "Detalles destacados"}
          </p>

          {matchingProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border-strong)] p-8 text-center">
              <p className="font-display text-base font-semibold text-[var(--text-primary)]">
                Sin coincidencias para &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Explora todo nuestro catálogo de detalles personalizados o prueba con una categoría arriba.
              </p>
              <Link
                href="/productos"
                onClick={onClose}
                className="mt-4 inline-flex min-h-12 items-center rounded-full bg-[var(--color-cta-dark)] px-5 text-xs font-semibold text-[var(--color-cta-dark-ink)]"
              >
                Ver todo el catálogo
              </Link>
            </div>
          ) : (
            <ul role="listbox" aria-label="Resultados de búsqueda" className="space-y-2.5">
              {matchingProducts.map((product, index) => {
                const isHighlighted = index === activeIndex
                return (
                  <li key={product.id} id={`search-result-${product.id}`} role="option" aria-selected={isHighlighted}>
                    <Link
                      href={`/productos/${product.id}`}
                      onClick={onClose}
                      className={`flex items-center gap-3.5 rounded-2xl border bg-[var(--surface-elevated)] p-2.5 transition-colors ${
                        isHighlighted
                          ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]/30"
                          : "border-[var(--border-subtle)] hover:border-[var(--color-cta-primary)]"
                      }`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          loading="lazy"
                          decoding="async"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-semibold text-[var(--text-primary)]">
                          {product.name}
                        </p>
                        <p className="truncate text-xs text-[var(--text-secondary)]">
                          {product.category} · {product.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 pr-1">
                        <PriceTag
                          priceCents={product.priceCents}
                          compareAtCents={product.compareAtCents}
                          size="sm"
                          align="right"
                        />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </AdaptiveSheet>
  )
}
