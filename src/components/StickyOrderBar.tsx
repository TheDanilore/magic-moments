"use client"

import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { formatPEN } from "@/lib/format"

/**
 * Barra fija en la thumb-zone móvil para acceso inmediato al pedido y progreso de envío gratis.
 * Se oculta automáticamente en la ficha de producto (/productos/[id]) donde ya existe barra contextual.
 */
export function StickyOrderBar() {
  const pathname = usePathname()
  const { totalCount, subtotalCents, shipping, openDrawer, isDrawerOpen } = useCart()

  const isProductDetail = /^\/productos\/\d+/.test(pathname)
  if (totalCount === 0 || isDrawerOpen || isProductDetail) {
    return null
  }

  return (
    <aside
      aria-label="Resumen rápido de tu pedido"
      className="sticky-thumb-bar fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian)] px-4 pt-2.5 text-[var(--text-on-dark)] md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-sm font-bold tabular-nums">
            {totalCount} {totalCount === 1 ? "detalle" : "detalles"} · {formatPEN(subtotalCents)}
          </p>
          <p className="truncate text-[11px] text-[var(--text-muted-on-dark)] tabular-nums">
            {shipping.qualifiesFreeShipping
              ? "Envío Shalom gratis aplicado"
              : `Te faltan ${formatPEN(shipping.remainingForFreeShippingCents)} para envío gratis`}
          </p>
        </div>

        <button
          type="button"
          onClick={openDrawer}
          className="touch-target-48 inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-5 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
        >
          <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Ver pedido</span>
        </button>
      </div>
    </aside>
  )
}

