"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Eye, MessageCircle, Plus } from "lucide-react"
import { toast } from "sonner"
import { PriceTag } from "@/components/ui/PriceTag"
import { useCart } from "@/context/cart-context"
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities"
import { getDefaultProductOptions } from "@/lib/catalog"
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Product } from "@/types/catalog"

interface ProductCardProps {
  product: Product
  onInspect?: (product: Product, selectedColor: string) => void
}

export function ProductCard({ product, onInspect }: ProductCardProps) {
  const { items, addItem, updateQuantity, openDrawer } = useCart()
  const { canHoverFine } = usePointerCapabilities()

  const defaultOptions = getDefaultProductOptions(product)
  const [selectedColor, setSelectedColor] = useState(defaultOptions.color)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [lastAddedLineKey, setLastAddedLineKey] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const inBagTotalQty = items
    .filter((item) => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0)

  const selectedOptions = {
    ...defaultOptions,
    color: selectedColor,
  }

  const lineKey = `${product.id}::${selectedOptions.color}::${selectedOptions.size}::${selectedOptions.theme}`
  const inBagSelectedQty =
    items.find((item) => item.lineKey === lineKey)?.quantity ?? 0

  const isOutOfStock = product.stock <= 0
  const isLowStock = !isOutOfStock && product.stock <= 8
  const isAtStockLimit = !isOutOfStock && inBagSelectedQty >= product.stock

  const primarySrc = product.image
  const hoverSrc = product.images.find((img) => img !== primarySrc)

  const handleQuickAdd = () => {
    if (isOutOfStock || isAtStockLimit) {
      toast.info(`Stock máximo alcanzado (${product.stock} disponibles)`)
      return
    }

    const result = addItem(product, selectedOptions, 1, false)
    if (!result.added) {
      toast.info(`Stock máximo alcanzado (${product.stock} disponibles)`)
      return
    }

    setLastAddedLineKey(lineKey)
    setAddedFeedback(true)
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setAddedFeedback(false), 2400)
  }

  const handleUndo = () => {
    if (!lastAddedLineKey) return
    updateQuantity(lastAddedLineKey, -1)
    setAddedFeedback(false)
    setLastAddedLineKey(null)
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
  }

  const soldOutWhatsappUrl = buildWhatsAppUrl(
    `Hola Magic Moments, deseo que me avisen cuando vuelva a estar disponible "${product.name}".`
  )
  const quickInquiryUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product, selectedOptions, 1)
  )

  return (
    <article className="group flex h-full flex-col">
      {/* Frame + interactive pills */}
      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
          <Link
            href={`/productos/${product.id}`}
            aria-label={`Ver detalles de ${product.name}`}
            className="block h-full w-full"
          >
            <Image
              src={primarySrc}
              alt={product.name}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`studio-photo-adapt object-cover ${
                isOutOfStock ? "opacity-60" : ""
              } ${
                canHoverFine
                  ? "transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  : ""
              }`}
            />
            {canHoverFine && hoverSrc && !isOutOfStock ? (
              <Image
                src={hoverSrc}
                alt=""
                aria-hidden="true"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="studio-photo-adapt pointer-events-none object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              />
            ) : null}
          </Link>

          {isOutOfStock ? (
            <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-[var(--badge-oos-bg)] px-2.5 py-1 text-xs font-medium text-[var(--badge-oos-text)]">
              Agotado
            </span>
          ) : product.badge ? (
            <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-[var(--badge-editorial-bg)] px-2.5 py-1 text-xs font-medium text-[var(--badge-editorial-text)]">
              {product.badge}
            </span>
          ) : null}

          {inBagTotalQty > 0 ? (
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Abrir pedido: ${inBagTotalQty} unidades de ${product.name}`}
              className="absolute top-3 right-3 z-20 min-h-9 cursor-pointer touch-manipulation rounded-full bg-[var(--surface-page)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] tabular-nums shadow-sm transition-colors hover:bg-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-ink)]"
            >
              En pedido · {inBagTotalQty}
            </button>
          ) : null}

          {!isOutOfStock && onInspect ? (
            <button
              type="button"
              onClick={() => onInspect(product, selectedColor)}
              aria-label={`Vista rápida de ${product.name}`}
              className={`studio-light-pill absolute bottom-3 left-3 z-20 inline-flex min-h-10 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3.5 text-xs font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-300 ${
                canHoverFine
                  ? "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
                  : "opacity-95"
              }`}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Vista rápida</span>
            </button>
          ) : null}
        </div>

        {/* Architectural Shelf Plinth */}
        <div className="relative mx-4 mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--surface-shelf-ledge)]">
          {canHoverFine ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-center scale-x-0 rounded-full bg-[var(--color-cta-primary)] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
            />
          ) : null}
        </div>
      </div>

      {/* Product Info + Variant Chips + Action */}
      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex min-h-[2.75rem] items-start justify-between gap-2.5">
          <h3 className="min-w-0 flex-1 font-display text-base leading-snug font-semibold tracking-tight text-[var(--text-primary)]">
            <Link href={`/productos/${product.id}`} className="line-clamp-2 hover:underline">
              {product.name}
            </Link>
          </h3>
          <div className="shrink-0">
            <PriceTag
              priceCents={product.priceCents}
              compareAtCents={product.compareAtCents}
              size="sm"
              align="right"
            />
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-[var(--text-secondary)]">{product.subtitle}</p>
          {isLowStock ? (
            <span className="shrink-0 text-xs font-semibold text-[var(--text-accent-accessible)] tabular-nums">
              {product.stock} disp.
            </span>
          ) : null}
        </div>

        {/* Quick Color Selection Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.options.colors.slice(0, 3).map((color) => {
            const active = selectedColor === color
            return (
              <button
                key={color}
                type="button"
                onClick={() => {
                  setSelectedColor(color)
                  setAddedFeedback(false)
                }}
                aria-pressed={active}
                className={`min-h-9 cursor-pointer touch-manipulation rounded-full border px-3 text-xs font-medium transition-colors ${
                  active
                    ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                }`}
              >
                {color}
              </button>
            )
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3.5">
          {isOutOfStock ? (
            <a
              href={soldOutWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Avísame por WhatsApp</span>
            </a>
          ) : addedFeedback ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={openDrawer}
                className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-1.5 rounded-full bg-[var(--color-cta-primary)] px-4 text-xs font-semibold text-[var(--color-cta-primary-ink)]"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Ver pedido</span>
              </button>
              <button
                type="button"
                onClick={handleUndo}
                className="inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-strong)] px-3.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
              >
                Deshacer
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isAtStockLimit}
                onClick={handleQuickAdd}
                className={`inline-flex min-h-12 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${
                  isAtStockLimit
                    ? "cursor-not-allowed border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)]"
                    : "cursor-pointer bg-[var(--color-cta-dark)] text-[var(--color-cta-dark-ink)] hover:bg-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-ink)]"
                }`}
              >
                {isAtStockLimit ? (
                  <span className="tabular-nums">Máx. {product.stock}</span>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Agregar</span>
                  </>
                )}
              </button>

              <a
                href={quickInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pedir ${product.name} por WhatsApp`}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--color-whatsapp)] transition-colors hover:border-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)] hover:text-[var(--color-whatsapp-ink)]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {addedFeedback ? `${product.name} agregado a tu pedido.` : ""}
      </span>
    </article>
  )
}
