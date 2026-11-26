"use client"

import { Minus, Plus } from "lucide-react"

interface QuantityStepperProps {
  quantity: number
  maxStock: number
  minQuantity?: number
  itemName: string
  tone?: "light" | "dark"
  allowDirectInput?: boolean
  onDecrement: () => void
  onIncrement: () => void
  onQuantityChange?: (nextQuantity: number) => void
}

/**
 * Selector de cantidad táctil accesible con targets mínimos de 48×48px,
 * entrada numérica directa opcional y numerales tabulares.
 */
export function QuantityStepper({
  quantity,
  maxStock,
  minQuantity = 0,
  itemName,
  tone = "light",
  allowDirectInput = false,
  onDecrement,
  onIncrement,
  onQuantityChange,
}: QuantityStepperProps) {
  const isDark = tone === "dark"
  const atMin = quantity <= minQuantity
  const atMax = maxStock > 0 && quantity >= maxStock

  const handleInputChange = (rawValue: string) => {
    if (!onQuantityChange) return
    const parsed = Number.parseInt(rawValue.replace(/\D/g, ""), 10)
    if (Number.isNaN(parsed)) return
    const clampedMin = Math.max(minQuantity || 1, parsed)
    const clamped = maxStock > 0 ? Math.min(maxStock, clampedMin) : clampedMin
    onQuantityChange(clamped)
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        isDark
          ? "border-[var(--border-on-dark)] bg-white/10 text-[var(--text-on-dark)]"
          : "border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--text-primary)]"
      }`}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={atMin}
        aria-label={`Disminuir cantidad de ${itemName}`}
        className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/10"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>

      {allowDirectInput && onQuantityChange ? (
        <input
          name="quantity"
          type="number"
          inputMode="numeric"
          min={minQuantity || 1}
          max={maxStock > 0 ? maxStock : undefined}
          value={quantity}
          onChange={(e) => handleInputChange(e.target.value)}
          aria-label={`Cantidad de ${itemName}`}
          data-hotkey-ignore="true"
          className="h-10 w-12 bg-transparent text-center text-sm font-semibold tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      ) : (
        <span
          className="min-w-8 text-center text-sm font-semibold tabular-nums"
          aria-live="polite"
        >
          {quantity}
        </span>
      )}

      <button
        type="button"
        onClick={onIncrement}
        disabled={atMax}
        aria-label={`Aumentar cantidad de ${itemName}`}
        className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/10"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
