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
import {
  buildCartLineKey,
  getDefaultProductOptions,
  products as catalogProducts,
  type Product,
  type ProductSelectionOptions,
} from "@/lib/products"
import { evaluateCartShipping, type CartShippingEvaluation } from "@/lib/shipping"

const CART_STORAGE_KEY = "magic-moments-cart-v1"

export interface CartItem {
  lineKey: string
  product: Product
  options: ProductSelectionOptions
  quantity: number
}

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

export interface AddItemResult {
  added: boolean
  atLimit: boolean
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

  // Rehidrata los productos almacenados con el catálogo actual para mantener precios, stock y peso al día
  const items = useMemo(() => {
    if (rawItems.length === 0) return rawItems
    const next: CartItem[] = []
    for (const item of rawItems) {
      const fresh = catalogById.get(item.product.id)
      if (!fresh) continue
      const clampedQty = Math.min(Math.max(1, item.quantity), Math.max(1, fresh.stock))
      next.push({
        ...item,
        product: fresh,
        quantity: clampedQty,
      })
    }
    return next
  }, [rawItems])

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), [])

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

      const currentQty =
        readCartSnapshot().items.find((item) => item.lineKey === lineKey)?.quantity ?? 0

      if (currentQty >= maxStock) {
        return { added: false, atLimit: true }
      }

      const nextQty = Math.min(currentQty + safeQty, maxStock)

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
              quantity: Math.min(safeQty, maxStock),
            },
          ],
        }
      })

      if (openBag) {
        setIsDrawerOpen(true)
      }

      return { added: true, atLimit: nextQty >= maxStock }
    },
    []
  )

  const updateQuantity = useCallback((lineKey: string, delta: number) => {
    writeCartSnapshot((prev) => ({
      ...prev,
      items: prev.items
        .map((item) => {
          if (item.lineKey !== lineKey) return item
          const fresh = catalogById.get(item.product.id) ?? item.product
          const maxStock = Math.max(0, fresh.stock)
          const nextQty = item.quantity + delta
          if (nextQty <= 0) return null
          return {
            ...item,
            product: fresh,
            quantity: maxStock > 0 ? Math.min(nextQty, maxStock) : nextQty,
          }
        })
        .filter((item): item is CartItem => item !== null),
    }))
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
