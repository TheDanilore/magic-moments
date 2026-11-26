"use client"

import { Minus, Plus } from "lucide-react"

interface QuantityStepperProps {
  quantity: number
  maxStock: number
  minQuantity?: number
  itemName: string
  tone?: "light" | "dark"
  onDecrement: () => void
  onIncrement: () => void
}

/**
 * Selector de cantidad táctil accesible con targets mínimos de 48×48px
 * y numerales tabulares.
 */
export function QuantityStepper({
  quantity,
  maxStock,
  minQuantity = 0,
  itemName,
  tone = "light",
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  const isDark = tone === "dark"
  const atMin = quantity <= minQuantity
  const atMax = maxStock > 0 && quantity >= maxStock

  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        isDark
          ? "border-[var(--border-on-dark)] bg-white/5 text-[var(--text-on-dark)]"
          : "border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)]"
      }`}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={atMin}
        aria-label={`Disminuir cantidad de ${itemName}`}
        className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-current/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>

      <span
        className="min-w-8 text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={atMax}
        aria-label={`Aumentar cantidad de ${itemName}`}
        className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-current/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
