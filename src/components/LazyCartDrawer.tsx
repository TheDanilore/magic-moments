"use client"

import { lazy, Suspense } from "react"
import { useCart } from "@/context/cart-context"

const CartDrawer = lazy(() =>
  import("@/components/CartDrawer").then((mod) => ({
    default: mod.CartDrawer,
  }))
)

/**
 * Difiere la descarga del bundle de CartDrawer hasta que el usuario abra su pedido por primera vez.
 */
export function LazyCartDrawer() {
  const { hasOpenedDrawer, isDrawerOpen } = useCart()

  if (!hasOpenedDrawer && !isDrawerOpen) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <CartDrawer />
    </Suspense>
  )
}
