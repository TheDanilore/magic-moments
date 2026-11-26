"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  Instagram,
  MessageCircle,
  Package,
  Play,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { AdaptiveSheet } from "@/components/ui/AdaptiveSheet"
import { PriceTag } from "@/components/ui/PriceTag"
import { QuantityStepper } from "@/components/ui/QuantityStepper"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { getColorSwatchHex, getDefaultProductOptions } from "@/lib/catalog"
import { formatPEN } from "@/lib/format"
import {
  evaluateSingleProductShipping,
  FREE_SHIPPING_THRESHOLD_CENTS,
} from "@/lib/shipping"
import {
  buildProductInquiryMessage,
  buildWhatsAppUrl,
  getWhatsAppDisplayPhone,
} from "@/lib/whatsapp"
import type { Product } from "@/types/catalog"

const FAVORITES_STORAGE_KEY = "magic-moments-favorites-v1"
const BATCH_PRESETS = [1, 6, 12] as const

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const defaultOptions = useMemo(() => getDefaultProductOptions(product), [product])
  const { items, orderNote, setOrderNote, totalCount, isDrawerOpen, addItem, openDrawer } =
    useCart()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showingVideo, setShowingVideo] = useState(false)
  const [selectedColor, setSelectedColor] = useState(defaultOptions.color)
  const [selectedSize, setSelectedSize] = useState(defaultOptions.size)
  const [selectedTheme, setSelectedTheme] = useState(defaultOptions.theme)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMobileVariantSheetOpen, setIsMobileVariantSheetOpen] = useState(false)
  const [liveStatus, setLiveStatus] = useState("")
  const addTimerRef = useRef<number | null>(null)

  useEffect(() => {
    setActiveImageIndex(0)
    setShowingVideo(false)
    setSelectedColor(defaultOptions.color)
    setSelectedSize(defaultOptions.size)
    setSelectedTheme(defaultOptions.theme)
    setQuantity(1)
  }, [product.id, defaultOptions])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setIsFavorite(parsed.includes(product.id))
      }
    } catch {
      // ignore storage errors
    }
  }, [product.id])

  useEffect(() => {
    return () => {
      if (addTimerRef.current !== null) window.clearTimeout(addTimerRef.current)
    }
  }, [])

  const inBagTotalQty = useMemo(
    () =>
      items
        .filter((item) => item.product.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0),
    [items, product.id]
  )
  const availableStock = Math.max(0, product.stock - inBagTotalQty)
  const showBatchPresets =
    product.categorySlug === "llaveros" || product.categorySlug === "tarjetas"

  const selectedOptions = useMemo(
    () => ({
      color: selectedColor,
      size: selectedSize,
      theme: selectedTheme,
    }),
    [selectedColor, selectedSize, selectedTheme]
  )

  const shippingEstimate = useMemo(() => evaluateSingleProductShipping(product), [product])

  const whatsappDirectUrl = useMemo(
    () =>
      buildWhatsAppUrl(buildProductInquiryMessage(product, selectedOptions, quantity, orderNote)),
    [product, selectedOptions, quantity, orderNote]
  )

  const handleAddToCart = () => {
    if (availableStock <= 0) {
      toast.info(`Stock referencial alcanzado (${product.stock} en tu pedido)`)
      setLiveStatus(`Stock referencial alcanzado (${product.stock} en tu pedido).`)
      return
    }
    const result = addItem(product, selectedOptions, quantity, false)
    if (!result.added) {
      toast.info(`Stock referencial alcanzado (${product.stock} disponibles)`)
      setLiveStatus(`Stock referencial alcanzado (${product.stock} disponibles).`)
      return
    }

    setAdded(true)
    setLiveStatus(`${product.name} añadido a tu pedido.`)
    if (addTimerRef.current !== null) window.clearTimeout(addTimerRef.current)
    addTimerRef.current = window.setTimeout(() => setAdded(false), 1400)

    toast.success(`${product.name} añadido a tu pedido`, {
      action: {
        label: "Ver pedido",
        onClick: openDrawer,
      },
    })
  }

  // Atajos silenciosos en escritorio: A (agregar), ← / → (galería)
  useHotkeys([
    {
      key: "a",
      enabled: !isDrawerOpen && !isMobileVariantSheetOpen && availableStock > 0,
      handler: () => {
        if (document.querySelector('[role="dialog"]')) return
        handleAddToCart()
      },
    },
    {
      key: "ArrowLeft",
      enabled: !isDrawerOpen && !isMobileVariantSheetOpen && product.images.length > 1,
      handler: () => {
        if (document.querySelector('[role="dialog"]')) return
        setActiveImageIndex((idx) => (idx - 1 + product.images.length) % product.images.length)
      },
    },
    {
      key: "ArrowRight",
      enabled: !isDrawerOpen && !isMobileVariantSheetOpen && product.images.length > 1,
      handler: () => {
        if (document.querySelector('[role="dialog"]')) return
        setActiveImageIndex((idx) => (idx + 1) % product.images.length)
      },
    },
  ])

  const handleToggleFavorite = () => {
    const nextState = !isFavorite
    setIsFavorite(nextState)
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
      const list = raw ? (JSON.parse(raw) as number[]) : []
      const nextList = nextState
        ? Array.from(new Set([...list, product.id]))
        : list.filter((id) => id !== product.id)
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextList))
    } catch {
      // ignore storage errors
    }
    toast.success(nextState ? "Añadido a favoritos" : "Quitado de favoritos")
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${product.name} | Magic Moments`,
          text: product.description,
          url: shareUrl,
        })
        return
      }
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Enlace copiado para compartir")
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Enlace copiado para compartir")
      } catch {
        toast.error("No se pudo copiar el enlace")
      }
    }
  }

  const renderVariantSelectors = (idPrefix: string) => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
          Color: <span className="font-semibold text-[var(--text-primary)]">{selectedColor}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {product.options.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-pressed={selectedColor === color}
              className={`inline-flex min-h-11 cursor-pointer touch-manipulation items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors ${
                selectedColor === color
                  ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rounded-full border border-black/20"
                style={{ backgroundColor: getColorSwatchHex(color) }}
              />
              <span>{color}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
          Modelo / Tamaño:{" "}
          <span className="font-semibold text-[var(--text-primary)]">{selectedSize}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {product.options.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-4 text-xs font-medium transition-colors ${
                selectedSize === size
                  ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
          Temática: <span className="font-semibold text-[var(--text-primary)]">{selectedTheme}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {product.options.themes.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setSelectedTheme(theme)}
              aria-pressed={selectedTheme === theme}
              className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-4 text-xs font-medium transition-colors ${
                selectedTheme === theme
                  ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label
          htmlFor={`pdp-note-${idPrefix}`}
          className="block text-xs font-medium text-[var(--text-secondary)]"
        >
          Nota o dedicatoria para tu pedido (opcional)
        </Label>
        <Input
          id={`pdp-note-${idPrefix}`}
          type="text"
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          data-hotkey-ignore="true"
          maxLength={200}
          placeholder="Ej. Nombre en la caja, colores o dedicatoria..."
          className="mt-2 min-h-11 rounded-xl border-[var(--border-strong)] bg-[var(--surface-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)] pb-24 md:pb-0">
      <div role="status" aria-live="polite" className="sr-only">
        {liveStatus}
      </div>

      {/* Top Blush Showcase Band */}
      <section className="w-full border-b border-[var(--border-subtle)] bg-[var(--surface-blush)] pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <nav
            aria-label="Ruta de navegación"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/productos"
                className="inline-flex min-h-11 items-center gap-1.5 font-medium text-[var(--text-primary)] hover:text-[var(--text-accent-accessible)]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Catálogo</span>
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/productos?categoria=${product.categorySlug}`}
                className="inline-flex min-h-11 items-center hover:text-[var(--text-primary)]"
              >
                {product.category}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[var(--text-accent-accessible)]">{product.name}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex min-h-11 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-blush)]"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Compartir</span>
            </button>
          </nav>

          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
            {/* Left Sticky Interactive Gallery */}
            <div className="space-y-3 md:sticky md:top-24 md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-blush)]">
                  {showingVideo && product.video ? (
                    <video
                      src={product.video}
                      poster={product.image}
                      controls
                      autoPlay
                      playsInline
                      loop
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={product.images[activeImageIndex] || product.image}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="studio-photo-adapt object-cover"
                    />
                  )}
                </div>

                {!showingVideo && product.images.length > 1 ? (
                  <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex(
                          (idx) => (idx - 1 + product.images.length) % product.images.length
                        )
                      }
                      aria-label="Imagen anterior"
                      className="studio-light-pill pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--surface-elevated)]"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((idx) => (idx + 1) % product.images.length)
                      }
                      aria-label="Imagen siguiente"
                      className="studio-light-pill pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--surface-elevated)]"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setShowingVideo(false)
                      setActiveImageIndex(index)
                    }}
                    aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border bg-[var(--surface-elevated)] transition-all ${
                      !showingVideo && activeImageIndex === index
                        ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]/40"
                        : "border-[var(--border-subtle)] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Vista ${index + 1}`}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="120px"
                      className="studio-photo-adapt object-cover"
                    />
                  </button>
                ))}
                {product.video ? (
                  <button
                    type="button"
                    onClick={() => setShowingVideo(true)}
                    aria-label={`Ver video real de ${product.name}`}
                    className={`relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border bg-[var(--surface-obsidian)] text-[var(--text-on-dark)] transition-all ${
                      showingVideo
                        ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]/40"
                        : "border-[var(--border-subtle)] opacity-85 hover:opacity-100"
                    }`}
                  >
                    <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                    <span className="text-xs font-semibold">Video</span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Right Configuration & Conversion Column */}
            <div className="space-y-6 md:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="rounded-full bg-[var(--surface-elevated)] px-2.5 py-1 font-semibold text-[var(--text-accent-accessible)]">
                    {product.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>SKU: {product.sku}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Package className="h-3.5 w-3.5" aria-hidden="true" />
                    {availableStock > 0
                      ? `${availableStock} disp. (${product.stock} ref.)`
                      : "Máx. en carrito"}
                  </span>
                </div>

                <h1 className="mt-2.5 font-display text-3xl leading-[0.98] font-bold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-4">
                  <PriceTag
                    priceCents={product.priceCents}
                    compareAtCents={product.compareAtCents}
                    size="lg"
                  />
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Precio base referencial · Confirma detalles finales por WhatsApp
                  </p>
                </div>

                <p className="text-pretty mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-5">
                {renderVariantSelectors("desktop")}
              </div>

              {/* Quantity & Purchase Controls */}
              <div className="space-y-3 border-t border-[var(--border-subtle)] pt-5">
                {showBatchPresets ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-[var(--text-secondary)]">
                        Pedir por unidad o docena:
                      </span>
                      {BATCH_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          disabled={availableStock > 0 && preset > availableStock}
                          onClick={() => setQuantity(preset)}
                          className={`min-h-12 cursor-pointer rounded-full border px-4 font-semibold tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                            quantity === preset
                              ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                              : "border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--color-cta-primary)]"
                          }`}
                        >
                          {preset === 1 ? "1 unidad" : `${preset} unidades`}
                        </button>
                      ))}
                    </div>
                    {product.priceCents * quantity >= FREE_SHIPPING_THRESHOLD_CENTS ? (
                      <p className="text-xs font-medium text-[var(--text-whatsapp-accessible)] tabular-nums">
                        ¡Supera {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)}! Califica para envío Shalom gratis referencial.
                      </p>
                    ) : FREE_SHIPPING_THRESHOLD_CENTS - product.priceCents * quantity <= 2500 ? (
                      <p className="text-xs font-medium text-[var(--text-accent-accessible)] tabular-nums">
                        A solo {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS - product.priceCents * quantity)} del envío Shalom gratis ({formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)}).
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  <QuantityStepper
                    quantity={quantity}
                    maxStock={Math.max(1, availableStock || product.stock)}
                    minQuantity={1}
                    itemName={product.name}
                    allowDirectInput
                    onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrement={() =>
                      setQuantity((q) =>
                        Math.min(Math.max(1, availableStock || product.stock), q + 1)
                      )
                    }
                    onQuantityChange={(next) => setQuantity(next)}
                  />

                  <ShortcutTooltip label="Agregar al pedido" shortcut="A">
                    <button
                      type="button"
                      disabled={availableStock <= 0}
                      onClick={handleAddToCart}
                      className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] tabular-nums transition-colors hover:bg-[var(--color-cta-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          <span>Añadido al Pedido</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                          <span>
                            {quantity > 1
                              ? `Añadir (${quantity}) · ${formatPEN(product.priceCents * quantity)}`
                              : "Añadir al Pedido"}
                          </span>
                        </>
                      )}
                    </button>
                  </ShortcutTooltip>

                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                    aria-pressed={isFavorite}
                    className="inline-flex h-12 w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface-blush)]"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isFavorite
                          ? "fill-[var(--color-cta-primary)] text-[var(--color-cta-primary)]"
                          : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {product.priceCents * quantity >= 10000 &&
                product.priceCents * quantity < FREE_SHIPPING_THRESHOLD_CENTS ? (
                  <p className="rounded-xl bg-[var(--surface-warm-sun)] px-3.5 py-2.5 text-xs font-medium text-[var(--badge-discount-text)] tabular-nums dark:text-[var(--text-accent-on-dark)]">
                    ¡Estás a solo{" "}
                    <strong>
                      {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS - product.priceCents * quantity)}
                    </strong>{" "}
                    de alcanzar envío Shalom gratis (desde {formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)})!
                  </p>
                ) : null}

                {totalCount > 0 ? (
                  <button
                    type="button"
                    onClick={openDrawer}
                    className="inline-flex min-h-12 w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 text-xs font-semibold text-[var(--text-primary)] tabular-nums hover:bg-[var(--surface-blush)]"
                  >
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    <span>Ver pedido ({totalCount})</span>
                  </button>
                ) : null}

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Cotizar o pedir por WhatsApp ({getWhatsAppDisplayPhone()})</span>
                </a>

                <ul
                  aria-label="Beneficios y métodos de pago"
                  className="grid grid-cols-1 gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/90 p-3.5 text-xs text-[var(--text-secondary)] sm:grid-cols-3"
                >
                  <li className="flex items-center gap-2">
                    <ShieldCheck
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]"
                      aria-hidden="true"
                    />
                    <span>Yape · Plin · Transferencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]"
                      aria-hidden="true"
                    />
                    <span>
                      {shippingEstimate.priceCents !== null
                        ? `Shalom ${shippingEstimate.tier} · ${formatPEN(shippingEstimate.priceCents)}`
                        : "Envíos Shalom a todo el Perú"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]"
                      aria-hidden="true"
                    />
                    <span>Armado artesanal (2–4 días) · Envía tus fotos por WhatsApp</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description, Real Instagram Reference & Related Products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description" className="min-h-10">
              Detalles y Personalización
            </TabsTrigger>
            <TabsTrigger value="instagram" className="min-h-10">
              Trabajos en @magic_moments050
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div
              className="prose max-w-3xl text-[var(--text-primary)]"
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
          </TabsContent>
          <TabsContent value="instagram" className="mt-6">
            <Card className="max-w-2xl border-[var(--border-subtle)] bg-[var(--surface-blush)]/60">
              <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    Entregas y clientes reales en Instagram
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    Mira fotos, videos y la destacada &ldquo;Clientes ❤️&rdquo; directamente en nuestro perfil oficial.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/magic_moments050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span>Abrir @magic_moments050</span>
                </a>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            También te puede encantar
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <article key={relatedProduct.id} className="group flex flex-col">
                <Link
                  href={`/productos/${relatedProduct.id}`}
                  className="flex flex-1 flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 transition-colors hover:border-[var(--color-cta-primary)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] bg-[var(--surface-blush)]">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="studio-photo-adapt object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-2 px-1">
                    <h3 className="line-clamp-1 font-display text-base font-semibold text-[var(--text-primary)]">
                      {relatedProduct.name}
                    </h3>
                    <span className="shrink-0 text-sm font-bold text-[var(--text-accent-accessible)] tabular-nums">
                      {formatPEN(relatedProduct.priceCents)}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="safe-bottom-pad fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian)] px-4 pt-2.5 text-[var(--text-on-dark)] md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMobileVariantSheetOpen(true)}
            aria-label="Cambiar opciones o agregar nota"
            className="flex min-h-12 max-w-[46%] min-w-0 cursor-pointer touch-manipulation flex-col justify-center rounded-2xl border border-[var(--border-on-dark)] bg-white/10 px-3 text-left"
          >
            <span className="inline-flex items-center gap-1 truncate text-[11px] text-[var(--text-muted-on-dark)]">
              <span className="truncate">
                {selectedColor} · {selectedSize}
              </span>
              <ChevronUp className="h-3 w-3 shrink-0" aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-bold text-[var(--text-on-dark)] tabular-nums">
              {formatPEN(product.priceCents * quantity)}
            </span>
          </button>

          <button
            type="button"
            disabled={availableStock <= 0}
            onClick={handleAddToCart}
            className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-1.5 rounded-full bg-[var(--color-cta-primary)] px-4 text-sm font-semibold text-[var(--color-cta-primary-ink)] disabled:opacity-50"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Añadido</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Variant & Note Bottom Sheet */}
      <AdaptiveSheet
        isOpen={isMobileVariantSheetOpen}
        onClose={() => setIsMobileVariantSheetOpen(false)}
        desktopMode="modal"
        ariaLabel="Personalizar opciones del detalle"
      >
        <div className="safe-bottom-pad flex max-h-[85dvh] flex-col gap-5 overflow-y-auto px-5 pt-2 pb-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div>
              <p className="font-display text-base font-bold text-[var(--text-primary)]">
                {product.name}
              </p>
              <PriceTag priceCents={product.priceCents} size="sm" />
            </div>
            <button
              type="button"
              onClick={() => setIsMobileVariantSheetOpen(false)}
              aria-label="Cerrar selector"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {renderVariantSelectors("mobile")}

          <button
            type="button"
            onClick={() => setIsMobileVariantSheetOpen(false)}
            className="min-h-12 w-full cursor-pointer rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)]"
          >
            Listo
          </button>
        </div>
      </AdaptiveSheet>
    </div>
  )
}
