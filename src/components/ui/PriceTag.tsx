import { formatPEN } from "@/lib/format"

interface PriceTagProps {
  priceCents: number
  compareAtCents?: number
  size?: "sm" | "md" | "lg"
  tone?: "light" | "dark"
  align?: "left" | "right"
}

/**
 * Etiqueta de precio en Soles peruanos con numerales tabulares,
 * precio comparativo tachado y badge de descuento de alto contraste.
 */
export function PriceTag({
  priceCents,
  compareAtCents,
  size = "md",
  tone = "light",
  align = "left",
}: PriceTagProps) {
  const hasDiscount =
    typeof compareAtCents === "number" && compareAtCents > priceCents
  const discountPercent = hasDiscount
    ? Math.round(((compareAtCents - priceCents) / compareAtCents) * 100)
    : 0

  const priceSizeClass =
    size === "lg"
      ? "text-2xl sm:text-3xl"
      : size === "sm"
        ? "text-base"
        : "text-lg"

  const priceColorClass =
    tone === "dark" ? "text-[var(--text-on-dark)]" : "text-[var(--text-primary)]"
  const mutedColorClass =
    tone === "dark"
      ? "text-[var(--text-muted-on-dark)]"
      : "text-[var(--text-secondary)]"

  return (
    <div
      className={`flex flex-wrap items-baseline gap-2 ${
        align === "right" ? "justify-end text-right" : "justify-start"
      }`}
    >
      <span
        className={`font-display font-bold tracking-tight tabular-nums ${priceSizeClass} ${priceColorClass}`}
      >
        {formatPEN(priceCents)}
      </span>

      {hasDiscount ? (
        <>
          <span className={`text-xs line-through tabular-nums ${mutedColorClass}`}>
            {formatPEN(compareAtCents)}
          </span>
          <span className="rounded-md bg-[var(--badge-discount-bg)] px-2 py-0.5 text-xs font-semibold tabular-nums text-[var(--badge-discount-text)]">
            -{discountPercent}%
          </span>
        </>
      ) : null}
    </div>
  )
}
