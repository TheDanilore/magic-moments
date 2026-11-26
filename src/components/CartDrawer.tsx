"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  MessageCircle,
  Package,
  RotateCcw,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { AdaptiveSheet, useSheetHeaderDrag } from "@/components/ui/AdaptiveSheet"
import { QuantityStepper } from "@/components/ui/QuantityStepper"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { useCart, type CartItem } from "@/context/cart-context"
import { formatPEN } from "@/lib/format"
import { formatWeightLabel } from "@/lib/shipping"
import { buildCartOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

interface UndoSnapshot {
  message: string
  items: CartItem[]
  orderNote: string
}

function CartDrawerContent() {
  const dragHandlers = useSheetHeaderDrag()
  const {
    items,
    orderNote,
    setOrderNote,
    totalCount,
    subtotalCents,
    shipping,
    finalTotalCents,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    clearCart,
    restoreSnapshot,
  } = useCart()

  const copyTimerRef = useRef<number | null>(null)
  const undoTimerRef = useRef<number | null>(null)
  const liveTimerRef = useRef<number | null>(null)

  const [confirmClear, setConfirmClear] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const [liveStatus, setLiveStatus] = useState("")
  const [undoState, setUndoState] = useState<UndoSnapshot | null>(null)

  useEffect(() => {
    if (!isDrawerOpen) {
      setConfirmClear(false)
      setCopyStatus("idle")
    }
  }, [isDrawerOpen])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current)
      if (undoTimerRef.current !== null) window.clearTimeout(undoTimerRef.current)
      if (liveTimerRef.current !== null) window.clearTimeout(liveTimerRef.current)
    }
  }, [])

  const announceLive = (msg: string) => {
    setLiveStatus(msg)
    if (liveTimerRef.current !== null) window.clearTimeout(liveTimerRef.current)
    liveTimerRef.current = window.setTimeout(() => setLiveStatus(""), 2400)
  }

  const queueUndoSnapshot = (message: string) => {
    setUndoState({
      message,
      items: items.map((line) => ({ ...line })),
      orderNote,
    })
    if (undoTimerRef.current !== null) window.clearTimeout(undoTimerRef.current)
    undoTimerRef.current = window.setTimeout(() => setUndoState(null), 7000)
  }

  const handleUndo = () => {
    if (!undoState) return
    restoreSnapshot(undoState.items, undoState.orderNote)
    setUndoState(null)
    if (undoTimerRef.current !== null) window.clearTimeout(undoTimerRef.current)
    announceLive("Pedido restaurado")
    toast.success("Pedido restaurado")
  }

  const handleRemoveLine = (item: CartItem) => {
    queueUndoSnapshot(`${item.product.name} quitado`)
    removeItem(item.lineKey)
    announceLive(`${item.product.name} quitado de tu pedido.`)
  }

  const handleDecrementLine = (item: CartItem) => {
    if (item.quantity <= 1) {
      queueUndoSnapshot(`${item.product.name} quitado`)
      announceLive(`${item.product.name} quitado de tu pedido.`)
    } else {
      announceLive(`Cantidad de ${item.product.name}: ${item.quantity - 1}`)
    }
    updateQuantity(item.lineKey, -1)
  }

  const handleConfirmClearCart = () => {
    queueUndoSnapshot("Pedido vaciado")
    clearCart()
    setConfirmClear(false)
    setDetailsOpen(false)
    announceLive("Pedido vaciado. Puedes deshacer esta acción.")
  }

  const orderSummaryText = useMemo(
    () =>
      buildCartOrderMessage({
        items,
        subtotalCents,
        shipping,
        finalTotalCents,
        orderNote,
      }),
    [items, subtotalCents, shipping, finalTotalCents, orderNote]
  )

  const whatsappUrl = useMemo(() => buildWhatsAppUrl(orderSummaryText), [orderSummaryText])

  const handleCopySummary = async () => {
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current)
    }
    try {
      await navigator.clipboard.writeText(orderSummaryText)
      setCopyStatus("copied")
      announceLive("Resumen de pedido copiado al portapapeles.")
      toast.success("Resumen copiado al portapapeles")
      copyTimerRef.current = window.setTimeout(() => setCopyStatus("idle"), 1800)
    } catch {
      setCopyStatus("error")
      setDetailsOpen(true)
      announceLive("No se pudo copiar automáticamente; confirma directo por WhatsApp.")
      copyTimerRef.current = window.setTimeout(() => setCopyStatus("idle"), 3500)
    }
  }

  const countLabel = totalCount === 1 ? "1 detalle" : `${totalCount} detalles`

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden md:h-dvh">
      <div role="status" aria-live="polite" className="sr-only">
        {liveStatus}
      </div>

      {/* Header */}
      <div
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button, a, input, select, textarea")) return
          dragHandlers?.onPointerDown(e)
        }}
        onPointerMove={dragHandlers?.onPointerMove}
        onPointerUp={dragHandlers?.onPointerUp}
        onPointerCancel={dragHandlers?.onPointerCancel}
        className="flex shrink-0 touch-pan-y items-center justify-between gap-2 border-b border-[var(--border-subtle)] px-5 py-3.5 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <ShoppingBag className="h-4 w-4 shrink-0 text-[var(--color-cta-primary)]" aria-hidden="true" />
          <h2 id="bag-drawer-title" className="font-display text-lg font-bold tracking-tight">
            Tu pedido
          </h2>
          <span className="rounded-full bg-[var(--surface-card)] px-2.5 py-0.5 text-xs font-semibold tabular-nums">
            {totalCount}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {items.length > 0 ? (
            confirmClear ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="min-h-11 cursor-pointer touch-manipulation rounded-full border border-[var(--border-strong)] px-3 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-card)]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClearCart}
                  className="min-h-11 cursor-pointer touch-manipulation rounded-full bg-[var(--color-cta-primary)] px-3.5 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                >
                  Confirmar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="min-h-11 cursor-pointer touch-manipulation rounded-full px-3 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-card)] hover:text-[var(--text-primary)]"
              >
                Vaciar
              </button>
            )
          ) : null}

          <ShortcutTooltip label="Cerrar pedido" shortcut="Esc">
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Cerrar pedido"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors hover:bg-[var(--color-cta-dark)] hover:text-[var(--color-cta-dark-ink)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>
        </div>
      </div>

      {/* Scrollable Items Area */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
        {undoState ? (
          <div
            role="status"
            className="mb-3.5 flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-card)] px-3.5 py-2 text-xs text-[var(--text-primary)]"
          >
            <span className="font-medium">{undoState.message}</span>
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex min-h-11 shrink-0 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full bg-[var(--color-cta-dark)] px-3.5 text-xs font-semibold text-[var(--color-cta-dark-ink)]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Deshacer</span>
            </button>
          </div>
        ) : null}

        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-card)]">
              <ShoppingBag className="h-6 w-6 text-[var(--text-secondary)]" aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
              Tu pedido está vacío
            </p>
            <p className="mt-1.5 max-w-xs text-sm text-[var(--text-secondary)]">
              Explora nuestras categorías de detalles personalizados y coordina tu entrega por WhatsApp.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/productos?categoria=cajas-sorpresa"
                onClick={closeDrawer}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
              >
                Cajas Personalizadas
              </Link>
              <Link
                href="/productos?categoria=cuadros-3d-led"
                onClick={closeDrawer}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
              >
                Cuadros 3D LED
              </Link>
              <Link
                href="/productos?categoria=llaveros"
                onClick={closeDrawer}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
              >
                Llaveros Acrílicos
              </Link>
              <Link
                href="/promociones"
                onClick={closeDrawer}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
              >
                Lotes y Pedidos
              </Link>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              className="mt-5 min-h-12 cursor-pointer rounded-full bg-[var(--color-cta-dark)] px-6 py-2.5 text-xs font-semibold text-[var(--color-cta-dark-ink)]"
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              const otherLinesQty = items
                .filter((line) => line.product.id === item.product.id && line.lineKey !== item.lineKey)
                .reduce((sum, line) => sum + line.quantity, 0)
              const maxForThisLine = Math.max(1, item.product.stock - otherLinesQty)
              const atStockMax = item.quantity >= maxForThisLine
              return (
                <li
                  key={item.lineKey}
                  className="flex gap-3.5 border-b border-[var(--border-subtle)] pb-4 last:border-b-0 last:pb-1"
                >
                  <Link
                    href={`/productos/${item.product.id}`}
                    onClick={closeDrawer}
                    aria-label={`Ver ficha de ${item.product.name}`}
                    className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="80px"
                      className="studio-photo-adapt object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/productos/${item.product.id}`}
                          onClick={closeDrawer}
                          className="block truncate font-display text-sm font-semibold text-[var(--text-primary)] hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                          {item.options.color} · {item.options.size} · {item.options.theme}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveLine(item)}
                        aria-label={`Quitar ${item.product.name}`}
                        className="inline-flex h-12 w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-card)] hover:text-[var(--text-primary)]"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <QuantityStepper
                          quantity={item.quantity}
                          maxStock={maxForThisLine}
                          itemName={item.product.name}
                          onDecrement={() => handleDecrementLine(item)}
                          onIncrement={() => {
                            updateQuantity(item.lineKey, 1)
                            announceLive(`Cantidad de ${item.product.name}: ${item.quantity + 1}`)
                          }}
                        />

                        {atStockMax ? (
                          <span className="text-xs font-semibold text-[var(--text-accent-accessible)] tabular-nums">
                            Máx. {item.product.stock}
                          </span>
                        ) : null}
                      </div>

                      <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
                        {formatPEN(item.product.priceCents * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Sticky Checkout Footer */}
      {items.length > 0 ? (
        <div className="safe-bottom-pad shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 pt-3.5 sm:px-6">
          {/* Shalom Shipping Evaluation */}
          <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-2.5 text-xs">
            <Package
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 leading-snug">
              <p className="font-semibold text-[var(--text-primary)]">
                {shipping.qualifiesFreeShipping
                  ? "¡Envío Shalom gratis aplicado!"
                  : shipping.fitsInXXS
                    ? "Califica para envío Shalom de S/ 8.00"
                    : shipping.shippingCents !== null
                      ? `${shipping.tierLabel} · ${formatPEN(shipping.shippingCents)}`
                      : "Supera Paquete L (10 kg) · Cotizar por WhatsApp"}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--text-secondary)] tabular-nums">
                {shipping.qualifiesFreeShipping
                  ? `Envío sin costo (${shipping.tierLabel} · ${formatWeightLabel(shipping.totalWeightGrams)})`
                  : `${shipping.xxsStatusSummary} · Te faltan ${formatPEN(shipping.remainingForFreeShippingCents)} para envío gratis`}
              </p>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-[var(--text-secondary)]">
              <span>Subtotal productos</span>
              <span className="tabular-nums">{formatPEN(subtotalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-[var(--text-secondary)]">
              <span>
                Envío Shalom ({shipping.tierLabel} · {formatWeightLabel(shipping.totalWeightGrams)})
              </span>
              <span className="font-semibold text-[var(--text-primary)] tabular-nums">
                {shipping.qualifiesFreeShipping
                  ? "Gratis"
                  : shipping.shippingCents !== null
                    ? `+${formatPEN(shipping.shippingCents)}`
                    : "Por cotizar"}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1 text-sm font-bold text-[var(--text-primary)]">
              <span>
                {shipping.shippingCents !== null
                  ? `Total estimado (${countLabel})`
                  : `Subtotal (${countLabel})`}
              </span>
              <span className="font-display text-lg tabular-nums">
                {formatPEN(shipping.shippingCents !== null ? finalTotalCents : subtotalCents)}
              </span>
            </div>
          </div>

          {/* Note / Delivery Disclosure & Copy Button */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDetailsOpen((prev) => !prev)}
              aria-expanded={detailsOpen}
              className="inline-flex min-h-11 flex-1 cursor-pointer touch-manipulation items-center justify-between gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
            >
              <span>{orderNote.trim() ? "Nota adjunta · Envío" : "Nota / dedicatoria y envío"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  detailsOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex min-h-11 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
            >
              {copyStatus === "copied" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[var(--color-whatsapp)]" aria-hidden="true" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copiar resumen</span>
                </>
              )}
            </button>
          </div>

          {detailsOpen ? (
            <div className="mt-2.5 space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3">
              <div>
                <label
                  htmlFor="cart-order-note"
                  className="block text-xs font-medium text-[var(--text-primary)]"
                >
                  Dedicatoria o nota personalizada (opcional)
                </label>
                <input
                  id="cart-order-note"
                  type="text"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  data-hotkey-ignore="true"
                  maxLength={200}
                  placeholder="Ej. Tarjeta para mamá: ¡Feliz cumpleaños!"
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-page)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                />
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Envíos nacionales vía Shalom (2–4 días hábiles, agencia a agencia) o delivery local coordinado por WhatsApp. Envío gratis desde S/ 150.00.
              </p>
            </div>
          ) : null}

          {copyStatus === "error" ? (
            <p
              role="alert"
              className="mt-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-2 text-xs font-medium text-[var(--text-accent-accessible)]"
            >
              No se pudo copiar automáticamente; confirma tu pedido directo por WhatsApp.
            </p>
          ) : null}

          {/* Primary WhatsApp Checkout CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 py-3 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Confirmar pedido por WhatsApp</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />
          </a>

          <p className="mt-2 text-center text-xs text-[var(--text-secondary)]">
            Pagos por Yape · Plin · Transferencia
          </p>
        </div>
      ) : null}
    </div>
  )
}

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer } = useCart()

  return (
    <AdaptiveSheet
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      desktopMode="drawer"
      maxWidthClass="max-w-md"
      ariaLabelledBy="bag-drawer-title"
      zIndexClass="z-[60]"
    >
      <CartDrawerContent />
    </AdaptiveSheet>
  )
}
