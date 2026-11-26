"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, MessageCircle, ShoppingBag, X } from "lucide-react"
import { toast } from "sonner"
import { AdaptiveSheet } from "@/components/ui/adaptive-sheet"
import { PriceTag } from "@/components/ui/price-tag"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { useCart } from "@/context/cart-context"
import { getDefaultProductOptions, type Product } from "@/lib/products"
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

interface ProductQuickViewModalProps {
  product: Product | null
  initialColor?: string
  onClose: () => void
}

export function ProductQuickViewModal({
  product,
  initialColor,
  onClose,
}: ProductQuickViewModalProps) {
  const { addItem, openDrawer } = useCart()

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

  if (!product) {
    return null
  }

  const whatsappUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product, selectedOptions, quantity)
  )

  const handleAdd = () => {
    const result = addItem(product, selectedOptions, quantity, false)
    if (!result.added) {
      toast.info(`Stock máximo alcanzado (${product.stock} disponibles)`)
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

  return (
    <AdaptiveSheet
      isOpen={Boolean(product)}
      onClose={onClose}
      desktopMode="modal"
      maxWidthClass="max-w-3xl"
      ariaLabelledBy="quick-view-title"
    >
      <div className="safe-bottom-pad flex max-h-[88dvh] flex-col overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 pb-4">
          <div>
            <p className="text-xs font-semibold text-[var(--text-accent-accessible)]">
              {product.category} · {product.sku}
            </p>
            <h2
              id="quick-view-title"
              className="mt-0.5 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {product.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista rápida"
            className="inline-flex h-12 w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <Image
                src={product.images[activeImage] ?? product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="studio-photo-adapt object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  aria-label={`Ver vista ${idx + 1}`}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition-all ${
                    activeImage === idx
                      ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]/40"
                      : "border-[var(--border-subtle)] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} vista ${idx + 1}`}
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

          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <PriceTag
                priceCents={product.priceCents}
                compareAtCents={product.compareAtCents}
                size="lg"
              />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
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
                      className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-3.5 text-xs font-medium transition-colors ${
                        selectedColor === color
                          ? "border-[var(--color-cta-primary)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                          : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-[var(--text-primary)]">
                  Tamaño: <span className="font-normal text-[var(--text-secondary)]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-3.5 text-xs font-medium transition-colors ${
                        selectedSize === size
                          ? "border-[var(--color-cta-dark)] bg-[var(--color-cta-dark)] text-[var(--color-cta-dark-ink)]"
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
                      className={`min-h-11 cursor-pointer touch-manipulation rounded-full border px-3.5 text-xs font-medium transition-colors ${
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
            </div>

            <div className="space-y-2.5 border-t border-[var(--border-subtle)] pt-4">
              <div className="flex items-center gap-3">
                <QuantityStepper
                  quantity={quantity}
                  maxStock={product.stock}
                  minQuantity={1}
                  itemName={product.name}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  onIncrement={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                />

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className="inline-flex min-h-12 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Agregado</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      <span>Agregar al pedido</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 text-xs font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Pedir por WhatsApp</span>
                </a>
                <Link
                  href={`/productos/${product.id}`}
                  onClick={onClose}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-strong)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
                >
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdaptiveSheet>
  )
}
