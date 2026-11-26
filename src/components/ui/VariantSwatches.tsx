"use client"

import { getColorSwatchHex } from "@/lib/catalog"

interface VariantSwatchesProps {
  productName: string
  colors: string[]
  selectedColor: string
  onSelect: (color: string) => void
  limit?: number
}

/**
 * Selector de colores con apariencia compacta y hit-area táctil mínima
 * de 48×48px (HIG / WCAG) para uso cómodo con el pulgar.
 */
export function VariantSwatches({
  productName,
  colors,
  selectedColor,
  onSelect,
  limit = 4,
}: VariantSwatchesProps) {
  return (
    <div
      role="group"
      aria-label={`Elegir color de ${productName}`}
      className="-mr-2 flex items-center"
    >
      {colors.slice(0, limit).map((colorName) => {
        const isSelected = selectedColor === colorName
        return (
          <button
            key={colorName}
            type="button"
            onClick={() => onSelect(colorName)}
            aria-label={`Color ${colorName}`}
            aria-pressed={isSelected}
            className="touch-target-48 group/swatch -ml-2 inline-flex cursor-pointer touch-manipulation items-center justify-center rounded-full first:ml-0"
          >
            <span
              className={`h-4 w-4 rounded-full border border-[var(--border-strong)] transition-transform ${
                isSelected
                  ? "scale-110 ring-2 ring-[var(--color-cta-primary)] ring-offset-2 ring-offset-[var(--surface-elevated)]"
                  : "group-hover/swatch:scale-110"
              }`}
              style={{ backgroundColor: getColorSwatchHex(colorName) }}
            />
          </button>
        )
      })}
    </div>
  )
}

