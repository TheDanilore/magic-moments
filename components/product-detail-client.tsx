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
  MessageCircle,
  Package,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { AdaptiveSheet } from "@/components/ui/adaptive-sheet"
import { PriceTag } from "@/components/ui/price-tag"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { ShortcutTooltip } from "@/components/ui/shortcut-tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { formatPEN } from "@/lib/format"
import { getDefaultProductOptions, type Product } from "@/lib/products"
import { evaluateSingleProductShipping } from "@/lib/shipping"
import {
  buildProductInquiryMessage,
  buildWhatsAppUrl,
  getWhatsAppDisplayPhone,
} from "@/lib/whatsapp"

const FAVORITES_STORAGE_KEY = "magic-moments-favorites-v1"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const defaultOptions = useMemo(() => getDefaultProductOptions(product), [product])
  const { orderNote, setOrderNote, totalCount, isDrawerOpen, addItem, openDrawer } = useCart()

  const [activeImageIndex, setActiveImageIndex] = useState(0)
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
    const result = addItem(product, selectedOptions, quantity, false)
    if (!result.added) {
      toast.info(`Stock máximo alcanzado (${product.stock} disponibles)`)
      setLiveStatus(`Stock máximo alcanzado (${product.stock} disponibles).`)
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
      enabled: !isDrawerOpen && !isMobileVariantSheetOpen && product.stock > 0,
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

  const renderVariantSelectors = (tone: "dark" | "light") => {
    const isDark = tone === "dark"
    const labelColor = isDark ? "text-[var(--text-muted-on-dark)]" : "text-[var(--text-secondary)]"
    const valueColor = isDark ? "text-[var(--text-on-dark)]" : "text-[var(--text-primary)]"
    const unselectedBtn = isDark
      ? "border-[var(--border-on-dark)] bg-white/5 text-[var(--text-on-dark)] hover:border-white/40"
      : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)] hover:border-[var(--border-strong)]"

    return (
      <div className="space-y-4">
        <div>
          <p className={`mb-2 text-xs font-medium ${labelColor}`}>
            Color: <span className={`font-semibold ${valueColor}`}>{selectedColor}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.options.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-pressed={selectedColor === color}
                className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-4 text-xs font-medium transition-colors ${
                  selectedColor === color
                    ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                    : unselectedBtn
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 text-xs font-medium ${labelColor}`}>
            Tamaño: <span className={`font-semibold ${valueColor}`}>{selectedSize}</span>
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
                    : unselectedBtn
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`mb-2 text-xs font-medium ${labelColor}`}>
            Temática: <span className={`font-semibold ${valueColor}`}>{selectedTheme}</span>
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
                    : unselectedBtn
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label
            htmlFor={`pdp-note-${tone}`}
            className={`block text-xs font-medium ${labelColor}`}
          >
            Nota o dedicatoria para tu pedido (opcional)
          </Label>
          <Input
            id={`pdp-note-${tone}`}
            type="text"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            data-hotkey-ignore="true"
            maxLength={200}
            placeholder="Ej. Nombre en la caja, colores o dedicatoria..."
            className={
              isDark
                ? "mt-2 min-h-11 rounded-xl border-[var(--border-on-dark)] bg-white/5 text-sm text-[var(--text-on-dark)] placeholder:text-[var(--text-muted-on-dark)]"
                : "mt-2 min-h-11 rounded-xl"
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)] pb-24 md:pb-0">
      <div role="status" aria-live="polite" className="sr-only">
        {liveStatus}
      </div>

      {/* Top Obsidian Split-View Showcase Band */}
      <section
        data-surface="obsidian"
        className="w-full bg-[var(--surface-obsidian)] pt-6 pb-12 text-[var(--text-on-dark)] md:pt-8 md:pb-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <nav
            aria-label="Ruta de navegación"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted-on-dark)]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/productos"
                className="inline-flex min-h-11 items-center gap-1.5 text-[var(--text-on-dark)] hover:opacity-80"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Productos</span>
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/productos?categoria=${product.categorySlug}`}
                className="inline-flex min-h-11 items-center hover:text-[var(--text-on-dark)]"
              >
                {product.category}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--text-accent-on-dark)]">{product.name}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex min-h-11 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-on-dark)] bg-white/5 px-4 text-xs font-semibold text-[var(--text-on-dark)] hover:bg-white/10"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Compartir</span>
            </button>
          </nav>

          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
            {/* Left Sticky Interactive Gallery */}
            <div className="space-y-3 md:sticky md:top-24 md:col-span-6">
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)]">
                <Image
                  src={product.images[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {product.images.length > 1 ? (
                  <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex(
                          (idx) => (idx - 1 + product.images.length) % product.images.length
                        )
                      }
                      aria-label="Imagen anterior"
                      className="studio-pill pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border-on-dark)] text-[var(--text-on-dark)] hover:bg-white/15"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((idx) => (idx + 1) % product.images.length)
                      }
                      aria-label="Imagen siguiente"
                      className="studio-pill pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border-on-dark)] text-[var(--text-on-dark)] hover:bg-white/15"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                      activeImageIndex === index
                        ? "border-[var(--text-accent-on-dark)] ring-2 ring-[var(--text-accent-on-dark)]/40"
                        : "border-[var(--border-on-dark)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Vista ${index + 1}`}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Configuration & Conversion Column */}
            <div className="space-y-6 md:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted-on-dark)]">
                  <span className="font-semibold text-[var(--text-accent-on-dark)]">
                    {product.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>SKU: {product.sku}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Package className="h-3.5 w-3.5" aria-hidden="true" />
                    {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
                  </span>
                </div>

                <h1 className="mt-2 font-display text-3xl leading-[0.98] font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex" aria-label="4 de 5 estrellas">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 4
                            ? "fill-[var(--text-accent-on-dark)] text-[var(--text-accent-on-dark)]"
                            : "text-[var(--text-muted-on-dark)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-muted-on-dark)] tabular-nums">
                    4.0 ({product.reviews.length} reseñas)
                  </span>
                </div>

                <div className="mt-4">
                  <PriceTag
                    priceCents={product.priceCents}
                    compareAtCents={product.compareAtCents}
                    size="lg"
                    tone="dark"
                  />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary-on-dark)] sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-[var(--border-on-dark)] pt-5">
                {renderVariantSelectors("dark")}
              </div>

              {/* Quantity & Purchase Controls */}
              <div className="space-y-3 border-t border-[var(--border-on-dark)] pt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <QuantityStepper
                    tone="dark"
                    quantity={quantity}
                    maxStock={product.stock}
                    minQuantity={1}
                    itemName={product.name}
                    onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                    onIncrement={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  />

                  <ShortcutTooltip label="Agregar al pedido" shortcut="A">
                    <button
                      type="button"
                      disabled={product.stock <= 0}
                      onClick={handleAddToCart}
                      className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          <span>Añadido al Pedido</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                          <span>Añadir al Pedido</span>
                        </>
                      )}
                    </button>
                  </ShortcutTooltip>

                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                    aria-pressed={isFavorite}
                    className="inline-flex h-12 w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-white/5 text-[var(--text-on-dark)] hover:bg-white/10"
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

                {totalCount > 0 ? (
                  <button
                    type="button"
                    onClick={openDrawer}
                    className="inline-flex min-h-12 w-full cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full border border-[var(--border-on-dark)] bg-white/10 px-5 text-xs font-semibold text-[var(--text-on-dark)] tabular-nums hover:bg-white/15"
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
                  <span>Pedir o consultar por WhatsApp ({getWhatsAppDisplayPhone()})</span>
                </a>

                <ul
                  aria-label="Beneficios y métodos de pago"
                  className="grid grid-cols-1 gap-2 rounded-2xl border border-[var(--border-on-dark)] bg-white/5 p-3.5 text-xs text-[var(--text-secondary-on-dark)] sm:grid-cols-3"
                >
                  <li className="flex items-center gap-2">
                    <ShieldCheck
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]"
                      aria-hidden="true"
                    />
                    <span>Yape · Plin · Transferencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]"
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
                      className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]"
                      aria-hidden="true"
                    />
                    <span>Personalización artesanal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description, Reviews & Related Products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description" className="min-h-10">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="reviews" className="min-h-10">
              Reseñas ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div
              className="prose max-w-3xl text-[var(--text-primary)]"
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review) => (
                <Card key={review.id} className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                          {review.user}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= review.rating
                                ? "fill-[var(--color-cta-primary)] text-[var(--color-cta-primary)]"
                                : "text-[var(--text-secondary)]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                  <div className="relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] bg-[var(--surface-card)]">
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
                    <span className="shrink-0 text-sm font-bold text-[var(--text-primary)] tabular-nums">
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
      <div className="safe-bottom-pad fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian)]/96 px-4 pt-2.5 text-[var(--text-on-dark)] backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMobileVariantSheetOpen(true)}
            aria-label="Cambiar opciones o agregar nota"
            className="flex min-h-12 max-w-[46%] min-w-0 cursor-pointer touch-manipulation flex-col justify-center rounded-2xl border border-[var(--border-on-dark)] bg-white/5 px-3 text-left"
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
            disabled={product.stock <= 0}
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

          {renderVariantSelectors("light")}

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
