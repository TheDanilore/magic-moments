"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronLeft, ChevronRight, MessageCircle, ShoppingBag, X } from "lucide-react"
import { toast } from "sonner"
import { AdaptiveSheet, useSheetHeaderDrag } from "@/components/ui/AdaptiveSheet"
import { PriceTag } from "@/components/ui/PriceTag"
import { QuantityStepper } from "@/components/ui/QuantityStepper"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { useCart } from "@/context/cart-context"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { getColorSwatchHex, getDefaultProductOptions } from "@/lib/catalog"
import { formatPEN } from "@/lib/format"
import { FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/shipping"
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp"
import type { Product } from "@/types/catalog"

interface ProductQuickViewModalProps {
  product: Product | null
  initialColor?: string
  onClose: () => void
}

const BATCH_PRESETS = [1, 6, 12] as const

export function ProductQuickViewModal({
  product,
  initialColor,
  onClose,
}: ProductQuickViewModalProps) {
  const dragHandlers = useSheetHeaderDrag()
  const { items, addItem, openDrawer } = useCart()

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!product) return
    const defaults = getDefaultProductOptions(product)
    setActiveImage(0)
    setSelectedColor(initialColor || defaults.color)
    setSelectedSize(defaults.size)
    setSelectedTheme(defaults.theme)
    setQuantity(1)
    setAdded(false)
  }, [product, initialColor])

  const selectedOptions = useMemo(
    () => ({
      color: selectedColor,
      size: selectedSize,
      theme: selectedTheme,
    }),
    [selectedColor, selectedSize, selectedTheme]
  )

  const inBagTotalQty = useMemo(() => {
    if (!product) return 0
    return items
      .filter((item) => item.product.id === product.id)
      .reduce((sum, item) => sum + item.quantity, 0)
  }, [items, product])

  const availableStock = product ? Math.max(0, product.stock - inBagTotalQty) : 0
  const imagesCount = product?.images.length ?? 0

  const handleAdd = () => {
    if (!product) return
    if (availableStock <= 0) {
      toast.info(`Ya tienes el máximo referencial en tu pedido (${product.stock} u.)`)
      return
    }
    const result = addItem(product, selectedOptions, quantity, false)
    if (!result.added) {
      toast.info(`Stock referencial alcanzado (${product.stock} disponibles)`)
      return
    }
    setAdded(true)
    toast.success(`${product.name} añadido a tu pedido`, {
      action: {
        label: "Ver pedido",
        onClick: () => {
          onClose()
          openDrawer()
        },
      },
    })
  }

  useHotkeys([
    {
      key: "a",
      enabled: Boolean(product) && availableStock > 0,
      handler: handleAdd,
    },
    {
      key: "ArrowLeft",
      enabled: Boolean(product) && imagesCount > 1,
      handler: () => setActiveImage((idx) => (idx - 1 + imagesCount) % imagesCount),
    },
    {
      key: "ArrowRight",
      enabled: Boolean(product) && imagesCount > 1,
      handler: () => setActiveImage((idx) => (idx + 1) % imagesCount),
    },
  ])

  if (!product) {
    return null
  }

  const showBatchPresets =
    product.categorySlug === "llaveros" || product.categorySlug === "tarjetas"

  const whatsappUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product, selectedOptions, quantity)
  )

  return (
    <AdaptiveSheet
      isOpen={Boolean(product)}
      onClose={onClose}
      desktopMode="modal"
      maxWidthClass="max-w-3xl"
      ariaLabelledBy="quick-view-title"
    >
      <div className="flex max-h-[90dvh] flex-col overflow-hidden">
        {/* Sticky Header (draggable on mobile) */}
        <header
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button, a")) return
            dragHandlers?.onPointerDown(e)
          }}
          onPointerMove={dragHandlers?.onPointerMove}
          onPointerUp={dragHandlers?.onPointerUp}
          onPointerCancel={dragHandlers?.onPointerCancel}
          className="flex shrink-0 touch-pan-y items-start justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-3.5 sm:px-6"
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--text-accent-accessible)]">
              {product.category} · {product.sku}
            </p>
            <h2
              id="quick-view-title"
              className="mt-0.5 truncate font-display text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl"
            >
              {product.name}
            </h2>
          </div>

          <ShortcutTooltip label="Cerrar vista rápida" shortcut="Esc">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar vista rápida"
              className="touch-target-48 inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-blush)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>
        </header>

        {/* Scrollable Middle Region (Split View on Tablet/Desktop) */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-blush)]">
                <Image
                  src={product.images[activeImage] ?? product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="studio-photo-adapt object-cover"
                />

                {product.images.length > 1 ? (
                  <div className="pointer-events-none absolute inset-x-2.5 top-1/2 flex -translate-y-1/2 justify-between">
                    <ShortcutTooltip label="Vista anterior" shortcut="←">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage((idx) => (idx - 1 + imagesCount) % imagesCount)
                        }
                        aria-label="Vista anterior"
                        className="studio-light-pill pointer-events-auto inline-flex h-10 w-10 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm hover:border-[var(--color-cta-primary)]"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </ShortcutTooltip>
                    <ShortcutTooltip label="Vista siguiente" shortcut="→">
                      <button
                        type="button"
                        onClick={() => setActiveImage((idx) => (idx + 1) % imagesCount)}
                        aria-label="Vista siguiente"
                        className="studio-light-pill pointer-events-auto inline-flex h-10 w-10 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm hover:border-[var(--color-cta-primary)]"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </ShortcutTooltip>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    aria-label={`Ver vista ${idx + 1}`}
                    aria-pressed={activeImage === idx}
                    className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all ${
                      activeImage === idx
                        ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]/40"
                        : "border-[var(--border-subtle)] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="90px"
                      loading="lazy"
                      decoding="async"
                      className="studio-photo-adapt object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <PriceTag
                priceCents={product.priceCents}
                compareAtCents={product.compareAtCents}
                size="lg"
              />
              <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
                {product.description}
              </p>

              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--text-primary)]">
                  Color: <span className="font-normal text-[var(--text-secondary)]">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.options.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={selectedColor === color}
                      className={`inline-flex min-h-12 cursor-pointer touch-manipulation items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-colors md:min-h-11 ${
                        selectedColor === color
                          ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                          : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 shrink-0 rounded-full border border-[var(--border-strong)]"
                        style={{ backgroundColor: getColorSwatchHex(color) }}
                      />
                      <span>{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--text-primary)]">
                  Modelo / Tamaño: <span className="font-normal text-[var(--text-secondary)]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`min-h-12 cursor-pointer touch-manipulation rounded-full border px-3.5 text-xs font-medium transition-colors md:min-h-11 ${
                        selectedSize === size
                          ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                          : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--text-primary)]">Temática</p>
                <div className="flex flex-wrap gap-2">
                  {product.options.themes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setSelectedTheme(theme)}
                      aria-pressed={selectedTheme === theme}
                      className={`min-h-12 cursor-pointer touch-manipulation rounded-full border px-3.5 text-xs font-medium transition-colors md:min-h-11 ${
                        selectedTheme === theme
                          ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                          : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)]"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {showBatchPresets ? (
                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-[var(--text-secondary)]">Cantidad rápida:</span>
                    {BATCH_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        disabled={availableStock > 0 && preset > availableStock}
                        onClick={() => setQuantity(preset)}
                        className={`min-h-12 cursor-pointer rounded-full border px-3.5 font-semibold tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-40 md:min-h-11 ${
                          quantity === preset
                            ? "border-[var(--color-cta-primary)] bg-[var(--surface-blush)] text-[var(--text-accent-accessible)]"
                            : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                        }`}
                      >
                        {preset === 1 ? "1 unidad" : `${preset} u.`}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {product.priceCents * quantity >= FREE_SHIPPING_THRESHOLD_CENTS ? (
                <p className="text-xs font-medium text-[var(--text-whatsapp-accessible)] tabular-nums">
                  ¡Califica para envío Shalom gratis (desde {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)})!
                </p>
              ) : product.priceCents * quantity >= 10000 ? (
                <p className="rounded-xl bg-[var(--surface-warm-sun)] px-3 py-2 text-xs font-medium text-[var(--badge-discount-text)] tabular-nums dark:text-[var(--text-accent-on-dark)]">
                  ¡Estás a solo{" "}
                  <strong>
                    {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS - product.priceCents * quantity)}
                  </strong>{" "}
                  de envío Shalom gratis ({formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)})!
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Sticky Thumb-Zone Footer */}
        <footer className="sticky-thumb-bar shrink-0 space-y-2.5 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 pt-3 sm:px-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <QuantityStepper
              quantity={quantity}
              maxStock={Math.max(1, availableStock || product.stock)}
              minQuantity={1}
              itemName={product.name}
              allowDirectInput
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
              onIncrement={() =>
                setQuantity((q) => Math.min(Math.max(1, availableStock || product.stock), q + 1))
              }
              onQuantityChange={(next) => setQuantity(next)}
            />

            <ShortcutTooltip label="Agregar al pedido" shortcut="A" placement="top">
              <button
                type="button"
                onClick={handleAdd}
                disabled={availableStock <= 0}
                className="touch-target-48 inline-flex flex-1 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-4 text-sm font-semibold text-[var(--color-cta-primary-ink)] tabular-nums transition-colors hover:bg-[var(--color-cta-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Agregado</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    <span className="truncate">
                      {quantity > 1
                        ? `Agregar (${quantity}) · ${formatPEN(product.priceCents * quantity)}`
                        : `Agregar · ${formatPEN(product.priceCents)}`}
                    </span>
                  </>
                )}
              </button>
            </ShortcutTooltip>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target-48 inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-whatsapp)] px-3 text-xs font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Cotizar WhatsApp</span>
            </a>
            <Link
              href={`/productos/${product.id}`}
              onClick={onClose}
              className="touch-target-48 inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-blush)]"
            >
              Ver ficha completa
            </Link>
          </div>
        </footer>
      </div>
    </AdaptiveSheet>
  )
}
