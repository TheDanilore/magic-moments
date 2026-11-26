"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Eye, MessageCircle, Plus, SlidersHorizontal } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities"
import { getDefaultProductOptions } from "@/lib/catalog"
import { formatPEN } from "@/lib/format"
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
  const isOutOfStock = product.stock <= 0
  const isAtStockLimit = !isOutOfStock && inBagTotalQty >= product.stock

  const hasDiscount =
    typeof product.compareAtCents === "number" && product.compareAtCents > product.priceCents
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtCents! - product.priceCents) / product.compareAtCents!) * 100)
    : 0

  const primarySrc = product.image
  const hoverSrc = product.images.find((img) => img !== primarySrc)

  const handleQuickAdd = () => {
    if (isOutOfStock || isAtStockLimit) {
      toast.info(`Stock referencial máximo en carrito (${product.stock} unidades)`)
      return
    }

    const result = addItem(product, selectedOptions, 1, false)
    if (!result.added) {
      toast.info(`Stock referencial máximo en carrito (${product.stock} unidades)`)
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
    `Hola Magic Moments, deseo consultar disponibilidad de "${product.name}".`
  )
  const quickInquiryUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product, selectedOptions, 1)
  )

  return (
    <article className="group flex h-full flex-col rounded-[calc(var(--radius-card)+0.25rem)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 shadow-sm transition-shadow hover:shadow-md">
      {/* Frame + badges */}
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-blush)]">
          <Link
            href={`/productos/${product.id}`}
            aria-label={`Ver detalles de ${product.name}`}
            className="relative block h-full w-full"
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

          <div className="pointer-events-none absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {isOutOfStock ? (
              <span className="rounded-full bg-[var(--badge-oos-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--badge-oos-text)]">
                Agotado
              </span>
            ) : product.badge ? (
              <span className="rounded-full bg-[var(--badge-editorial-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--badge-editorial-text)]">
                {product.badge}
              </span>
            ) : null}
            {hasDiscount ? (
              <span className="rounded-full bg-[var(--badge-discount-bg)] px-2.5 py-1 text-[11px] font-bold text-[var(--badge-discount-text)] tabular-nums">
                -{discountPercent}%
              </span>
            ) : null}
          </div>

          {inBagTotalQty > 0 ? (
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Abrir pedido: ${inBagTotalQty} unidades de ${product.name}`}
              className="absolute top-2.5 right-2.5 z-20 min-h-9 cursor-pointer touch-manipulation rounded-full bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--text-primary)] tabular-nums shadow-sm transition-colors hover:bg-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-ink)]"
            >
              En pedido · {inBagTotalQty}
            </button>
          ) : null}

          {!isOutOfStock && onInspect && canHoverFine ? (
            <button
              type="button"
              onClick={() => onInspect(product, selectedColor)}
              aria-label={`Vista rápida de ${product.name}`}
              className="studio-light-pill absolute bottom-2.5 left-2.5 z-20 inline-flex min-h-10 translate-y-2 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3.5 text-xs font-semibold text-[var(--text-primary)] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Vista rápida</span>
            </button>
          ) : null}
        </div>

        {/* Blush Shelf Plinth */}
        <div className="relative mx-3 mt-2 h-1 overflow-hidden rounded-full bg-[var(--surface-shelf-ledge)]">
          {canHoverFine ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-center scale-x-0 rounded-full bg-[var(--color-cta-primary)] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
            />
          ) : null}
        </div>
      </div>

      {/* Product Info + Clean Action */}
      <div className="mt-4 flex flex-1 flex-col px-1 pb-1">
        <h3 className="font-display text-base leading-snug font-bold tracking-tight text-[var(--text-primary)]">
          <Link href={`/productos/${product.id}`} className="line-clamp-2 hover:underline">
            {product.name}
          </Link>
        </h3>

        <p className="text-pretty mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
          {product.subtitle}
        </p>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-[var(--text-accent-accessible)] tabular-nums">
            {formatPEN(product.priceCents)}
          </span>
          {hasDiscount ? (
            <span className="text-xs text-[var(--text-secondary)] line-through tabular-nums">
              {formatPEN(product.compareAtCents!)}
            </span>
          ) : null}
          <span className="ml-auto text-[11px] font-medium text-[var(--text-secondary)]">
            {product.options.colors.length} colores
          </span>
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
              <span>Consultar por WhatsApp</span>
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
              {onInspect ? (
                <button
                  type="button"
                  onClick={() => onInspect(product, selectedColor)}
                  className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-1.5 rounded-full bg-[var(--color-cta-primary)] px-4 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Personalizar</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isAtStockLimit}
                  onClick={handleQuickAdd}
                  className={`inline-flex min-h-12 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${
                    isAtStockLimit
                      ? "cursor-not-allowed border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)]"
                      : "cursor-pointer bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
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
              )}

              <a
                href={quickInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Cotizar ${product.name} por WhatsApp`}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-page)] text-[var(--color-whatsapp)] transition-colors hover:border-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp)] hover:text-[var(--color-whatsapp-ink)]"
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
