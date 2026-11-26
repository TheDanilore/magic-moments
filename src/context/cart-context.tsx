"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { products as catalogProducts } from "@/data/catalog"
import { buildCartLineKey, getDefaultProductOptions } from "@/lib/catalog"
import { evaluateCartShipping, type CartShippingEvaluation } from "@/lib/shipping"
import type {
  AddItemResult,
  CartItem,
  Product,
  ProductSelectionOptions,
} from "@/types/catalog"

export type { AddItemResult, CartItem }

const CART_STORAGE_KEY = "magic-moments-cart-v1"

interface StoredCart {
  items: CartItem[]
  orderNote: string
}

const EMPTY_CART: StoredCart = { items: [], orderNote: "" }
const listeners = new Set<() => void>()
let cachedRaw: string | null = null
let cachedSnapshot: StoredCart = EMPTY_CART

function readCartSnapshot(): StoredCart {
  if (typeof window === "undefined") return EMPTY_CART
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (raw === cachedRaw) return cachedSnapshot
    cachedRaw = raw
    if (!raw) {
      cachedSnapshot = EMPTY_CART
      return cachedSnapshot
    }
    const parsed = JSON.parse(raw) as Partial<StoredCart>
    const validItems = Array.isArray(parsed.items)
      ? parsed.items.filter(
          (item): item is CartItem =>
            Boolean(item?.lineKey && item?.product?.id && item?.options && item.quantity > 0)
        )
      : []
    cachedSnapshot = {
      items: validItems,
      orderNote: typeof parsed.orderNote === "string" ? parsed.orderNote : "",
    }
    return cachedSnapshot
  } catch {
    return EMPTY_CART
  }
}

function writeCartSnapshot(updater: (prev: StoredCart) => StoredCart) {
  const prev = readCartSnapshot()
  const next = updater(prev)
  try {
    const raw = JSON.stringify(next)
    cachedRaw = raw
    cachedSnapshot = next
    window.localStorage.setItem(CART_STORAGE_KEY, raw)
  } catch {
    cachedSnapshot = next
  }
  for (const listener of listeners) {
    listener()
  }
}

function subscribeCart(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) listener()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

interface CartContextValue {
  items: CartItem[]
  orderNote: string
  setOrderNote: (note: string) => void
  totalCount: number
  subtotalCents: number
  shipping: CartShippingEvaluation
  shippingCents: number
  finalTotalCents: number
  isDrawerOpen: boolean
  hasOpenedDrawer: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  addItem: (
    product: Product,
    options?: ProductSelectionOptions,
    quantity?: number,
    openBag?: boolean
  ) => AddItemResult
  updateQuantity: (lineKey: string, delta: number) => void
  removeItem: (lineKey: string) => void
  clearCart: () => void
  restoreSnapshot: (items: CartItem[], orderNote?: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

const catalogById = new Map(catalogProducts.map((product) => [product.id, product]))

export function CartProvider({ children }: { children: ReactNode }) {
  const { items: rawItems, orderNote } = useSyncExternalStore(
    subscribeCart,
    readCartSnapshot,
    () => EMPTY_CART
  )

  // Rehidrata los productos almacenados con el catálogo actual y valida stock acumulado por producto
  const items = useMemo(() => {
    if (rawItems.length === 0) return rawItems
    const remainingByProduct = new Map<number, number>()
    const next: CartItem[] = []
    for (const item of rawItems) {
      const fresh = catalogById.get(item.product.id)
      if (!fresh || fresh.stock <= 0) continue
      const remaining = remainingByProduct.get(fresh.id) ?? fresh.stock
      if (remaining <= 0) continue
      const clampedQty = Math.min(Math.max(1, item.quantity), remaining)
      remainingByProduct.set(fresh.id, remaining - clampedQty)
      next.push({
        ...item,
        product: fresh,
        quantity: clampedQty,
      })
    }
    return next
  }, [rawItems])

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [hasOpenedDrawer, setHasOpenedDrawer] = useState(false)

  const openDrawer = useCallback(() => {
    setHasOpenedDrawer(true)
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => {
      const next = !prev
      if (next) setHasOpenedDrawer(true)
      return next
    })
  }, [])

  const setOrderNote = useCallback((note: string) => {
    writeCartSnapshot((prev) => ({
      ...prev,
      orderNote: note.slice(0, 200),
    }))
  }, [])

  const addItem = useCallback(
    (
      product: Product,
      options?: ProductSelectionOptions,
      quantity = 1,
      openBag = false
    ): AddItemResult => {
      const freshProduct = catalogById.get(product.id) ?? product
      const maxStock = Math.max(0, freshProduct.stock)
      if (maxStock <= 0) {
        return { added: false, atLimit: true }
      }

      const selectedOptions = options ?? getDefaultProductOptions(freshProduct)
      const lineKey = buildCartLineKey(freshProduct.id, selectedOptions)
      const safeQty = Math.max(1, Math.floor(quantity))

      const snapshotItems = readCartSnapshot().items
      const currentLineQty =
        snapshotItems.find((item) => item.lineKey === lineKey)?.quantity ?? 0
      const currentProductTotalQty = snapshotItems
        .filter((item) => item.product.id === freshProduct.id)
        .reduce((sum, item) => sum + item.quantity, 0)
      const availableForProduct = Math.max(0, maxStock - currentProductTotalQty)

      if (availableForProduct <= 0) {
        return { added: false, atLimit: true }
      }

      const addedQty = Math.min(safeQty, availableForProduct)
      const nextQty = currentLineQty + addedQty

      writeCartSnapshot((prev) => {
        const idx = prev.items.findIndex((item) => item.lineKey === lineKey)
        if (idx >= 0) {
          const nextItems = [...prev.items]
          nextItems[idx] = {
            ...nextItems[idx],
            product: freshProduct,
            quantity: nextQty,
          }
          return { ...prev, items: nextItems }
        }
        return {
          ...prev,
          items: [
            ...prev.items,
            {
              lineKey,
              product: freshProduct,
              options: selectedOptions,
              quantity: addedQty,
            },
          ],
        }
      })

      if (openBag) {
        setHasOpenedDrawer(true)
        setIsDrawerOpen(true)
      }

      return { added: true, atLimit: currentProductTotalQty + addedQty >= maxStock }
    },
    []
  )

  const updateQuantity = useCallback((lineKey: string, delta: number) => {
    writeCartSnapshot((prev) => {
      const target = prev.items.find((item) => item.lineKey === lineKey)
      if (!target) return prev
      const fresh = catalogById.get(target.product.id) ?? target.product
      const maxStock = Math.max(0, fresh.stock)
      const otherLinesQty = prev.items
        .filter((item) => item.product.id === target.product.id && item.lineKey !== lineKey)
        .reduce((sum, item) => sum + item.quantity, 0)
      const maxForThisLine = Math.max(0, maxStock - otherLinesQty)

      return {
        ...prev,
        items: prev.items
          .map((item) => {
            if (item.lineKey !== lineKey) return item
            const nextQty = item.quantity + delta
            if (nextQty <= 0) return null
            return {
              ...item,
              product: fresh,
              quantity: maxStock > 0 ? Math.min(nextQty, maxForThisLine) : nextQty,
            }
          })
          .filter((item): item is CartItem => item !== null),
      }
    })
  }, [])

  const removeItem = useCallback((lineKey: string) => {
    writeCartSnapshot((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.lineKey !== lineKey),
    }))
  }, [])

  const clearCart = useCallback(() => {
    writeCartSnapshot(() => EMPTY_CART)
  }, [])

  const restoreSnapshot = useCallback((nextItems: CartItem[], nextOrderNote?: string) => {
    writeCartSnapshot((prev) => ({
      items: nextItems,
      orderNote: typeof nextOrderNote === "string" ? nextOrderNote : prev.orderNote,
    }))
  }, [])

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const subtotalCents = useMemo(
    () => items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0),
    [items]
  )

  const shipping = useMemo(
    () => evaluateCartShipping(items, subtotalCents),
    [items, subtotalCents]
  )

  const shippingCents = items.length > 0 ? (shipping.shippingCents ?? 0) : 0
  const finalTotalCents = subtotalCents + shippingCents

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      orderNote,
      setOrderNote,
      totalCount,
      subtotalCents,
      shipping,
      shippingCents,
      finalTotalCents,
      isDrawerOpen,
      hasOpenedDrawer,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      restoreSnapshot,
    }),
    [
      items,
      orderNote,
      setOrderNote,
      totalCount,
      subtotalCents,
      shipping,
      shippingCents,
      finalTotalCents,
      isDrawerOpen,
      hasOpenedDrawer,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      restoreSnapshot,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart debe utilizarse dentro de CartProvider")
  }
  return ctx
}
