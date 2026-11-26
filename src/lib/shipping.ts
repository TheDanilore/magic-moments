import type { Product, ProductDimensionsCm } from "@/types/catalog"

export type ShalomPackageTierId = "XXS" | "XS" | "S" | "M" | "L" | "CUSTOM"

export interface ShalomPackageTier {
  id: Exclude<ShalomPackageTierId, "CUSTOM">
  label: string
  /** Dimensiones principales de caja en cm [L, W, H] */
  dimensionsCm: [number, number, number]
  /** Dimensiones alternativas (ej. caja plana Shalom XS 32 x 28 x 4 cm) */
  altDimensionsCm?: [number, number, number]
  maxWeightGrams: number
  maxVolumeCm3: number
  priceCents: number
  dimensionsLabel: string
}

/**
 * Tarifario referencial Shalom (agencia a agencia) según dimensiones y peso máximo.
 */
export const SHALOM_PACKAGE_TIERS: readonly ShalomPackageTier[] = [
  {
    id: "XXS",
    label: "Paquete XXS",
    dimensionsCm: [15, 10, 10],
    maxWeightGrams: 250,
    maxVolumeCm3: 15 * 10 * 10,
    priceCents: 800,
    dimensionsLabel: "15 × 10 × 10 cm",
  },
  {
    id: "XS",
    label: "Paquete XS",
    dimensionsCm: [20, 15, 12],
    altDimensionsCm: [32, 28, 4],
    maxWeightGrams: 500,
    maxVolumeCm3: 20 * 15 * 12,
    priceCents: 1000,
    dimensionsLabel: "20 × 15 × 12 cm",
  },
  {
    id: "S",
    label: "Paquete S",
    dimensionsCm: [30, 20, 12],
    maxWeightGrams: 2000,
    maxVolumeCm3: 30 * 20 * 12,
    priceCents: 1200,
    dimensionsLabel: "30 × 20 × 12 cm",
  },
  {
    id: "M",
    label: "Paquete M",
    dimensionsCm: [30, 24, 20],
    maxWeightGrams: 5000,
    maxVolumeCm3: 30 * 24 * 20,
    priceCents: 1500,
    dimensionsLabel: "30 × 24 × 20 cm",
  },
  {
    id: "L",
    label: "Paquete L",
    dimensionsCm: [42, 30, 23],
    maxWeightGrams: 10000,
    maxVolumeCm3: 42 * 30 * 23,
    priceCents: 1800,
    dimensionsLabel: "42 × 30 × 23 cm",
  },
] as const

export const SHALOM_XXS_TIER = SHALOM_PACKAGE_TIERS[0]
export const FREE_SHIPPING_THRESHOLD_CENTS = 15000

const PACKING_FILL_RATIO = 0.85

export interface CartShippingEvaluation {
  isEmpty: boolean
  totalWeightGrams: number
  totalVolumeCm3: number
  fitsInXXS: boolean
  xxsBlockReason: "weight" | "dimensions" | "volume" | null
  xxsStatusSummary: string
  remainingXXSGrams: number
  oversizedXXSProductNames: string[]
  tier: ShalomPackageTierId
  tierLabel: string
  rawShippingCents: number | null
  qualifiesFreeShipping: boolean
  remainingForFreeShippingCents: number
  shippingCents: number | null
  maxWeightGrams: number | null
  boxDimensionsLabel: string
}

export interface SingleProductShippingEstimate {
  tier: ShalomPackageTierId
  tierLabel: string
  priceCents: number | null
  fitsInXXS: boolean
  weightGrams: number
}

function sortDesc(triple: [number, number, number]): [number, number, number] {
  return [...triple].sort((a, b) => b - a) as [number, number, number]
}

function itemFitsBoxDimensions(dims: ProductDimensionsCm, boxDims: [number, number, number]): boolean {
  const [i1, i2, i3] = sortDesc([dims.length, dims.width, dims.height])
  const [b1, b2, b3] = sortDesc(boxDims)
  return i1 <= b1 && i2 <= b2 && i3 <= b3
}

function itemFitsTierDimensions(dims: ProductDimensionsCm, tier: ShalomPackageTier): boolean {
  if (itemFitsBoxDimensions(dims, tier.dimensionsCm)) return true
  if (tier.altDimensionsCm && itemFitsBoxDimensions(dims, tier.altDimensionsCm)) return true
  return false
}

function getEffectiveTierMaxVolume(tier: ShalomPackageTier): number {
  return tier.maxVolumeCm3 * PACKING_FILL_RATIO
}

/**
 * Formatea gramos en gramos ("250 g") o kilogramos ("1.25 kg").
 */
export function formatWeightLabel(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000
    return `${kg.toLocaleString("es-PE", {
      minimumFractionDigits: kg % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })} kg`
  }
  return `${Math.round(grams)} g`
}

/**
 * Evalúa el tramo de envío Shalom para una unidad individual de producto.
 */
export function evaluateSingleProductShipping(
  product: Pick<Product, "weightGrams" | "dimensionsCm">
): SingleProductShippingEstimate {
  const { weightGrams, dimensionsCm } = product
  const volume = dimensionsCm.length * dimensionsCm.width * dimensionsCm.height

  for (const tier of SHALOM_PACKAGE_TIERS) {
    if (
      weightGrams <= tier.maxWeightGrams &&
      itemFitsTierDimensions(dimensionsCm, tier) &&
      volume <= tier.maxVolumeCm3
    ) {
      return {
        tier: tier.id,
        tierLabel: tier.label,
        priceCents: tier.priceCents,
        fitsInXXS: tier.id === "XXS",
        weightGrams,
      }
    }
  }

  return {
    tier: "CUSTOM",
    tierLabel: "Carga mayor",
    priceCents: null,
    fitsInXXS: false,
    weightGrams,
  }
}

/**
 * Evalúa el envío Shalom y el umbral de envío gratis para todo el carrito.
 */
export function evaluateCartShipping(
  items: Array<{ product: Product; quantity: number }>,
  subtotalCents = 0
): CartShippingEvaluation {
  const remainingForFreeShippingCents = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents)

  if (items.length === 0) {
    return {
      isEmpty: true,
      totalWeightGrams: 0,
      totalVolumeCm3: 0,
      fitsInXXS: true,
      xxsBlockReason: null,
      xxsStatusSummary: "Envío Shalom desde S/ 8.00 (Paquete XXS hasta 250 g)",
      remainingXXSGrams: SHALOM_XXS_TIER.maxWeightGrams,
      oversizedXXSProductNames: [],
      tier: "XXS",
      tierLabel: SHALOM_XXS_TIER.label,
      rawShippingCents: 0,
      qualifiesFreeShipping: false,
      remainingForFreeShippingCents,
      shippingCents: 0,
      maxWeightGrams: SHALOM_XXS_TIER.maxWeightGrams,
      boxDimensionsLabel: SHALOM_XXS_TIER.dimensionsLabel,
    }
  }

  let totalWeightGrams = 0
  let totalVolumeCm3 = 0

  for (const item of items) {
    const qty = Math.max(1, item.quantity)
    const dims = item.product.dimensionsCm
    totalWeightGrams += item.product.weightGrams * qty
    totalVolumeCm3 += dims.length * dims.width * dims.height * qty
  }

  const oversizedXXSProductNames = items
    .filter(({ product }) => !itemFitsTierDimensions(product.dimensionsCm, SHALOM_XXS_TIER))
    .map(({ product }) => product.name)

  let selectedTier: ShalomPackageTier | null = null
  for (const tier of SHALOM_PACKAGE_TIERS) {
    const weightOk = totalWeightGrams <= tier.maxWeightGrams
    const dimsOk = items.every(({ product }) => itemFitsTierDimensions(product.dimensionsCm, tier))
    const volumeOk = totalVolumeCm3 <= getEffectiveTierMaxVolume(tier)

    if (weightOk && dimsOk && volumeOk) {
      selectedTier = tier
      break
    }
  }

  const fitsInXXS = selectedTier?.id === "XXS"
  const remainingXXSGrams = Math.max(0, SHALOM_XXS_TIER.maxWeightGrams - totalWeightGrams)

  let xxsBlockReason: CartShippingEvaluation["xxsBlockReason"] = null
  let xxsStatusSummary = ""

  if (fitsInXXS) {
    xxsStatusSummary =
      remainingXXSGrams > 0
        ? `Todo cabe en Paquete XXS (S/ 8.00) · Quedan ${remainingXXSGrams} g disponibles`
        : "Todo cabe en Paquete XXS (S/ 8.00) · Límite exacto de 250 g"
  } else if (oversizedXXSProductNames.length > 0) {
    xxsBlockReason = "dimensions"
    xxsStatusSummary = selectedTier
      ? `Empaque asignado: ${selectedTier.label} (${selectedTier.dimensionsLabel})`
      : "Empaque especial por dimensiones: cotizar tramo en WhatsApp"
  } else if (totalWeightGrams > SHALOM_XXS_TIER.maxWeightGrams) {
    xxsBlockReason = "weight"
    xxsStatusSummary = selectedTier
      ? `Empaque asignado: ${selectedTier.label} · Peso total ${formatWeightLabel(totalWeightGrams)}`
      : `Peso total ${formatWeightLabel(totalWeightGrams)} · Cotizar carga en WhatsApp`
  } else {
    xxsBlockReason = "volume"
    xxsStatusSummary = selectedTier
      ? `Empaque asignado: ${selectedTier.label} (${selectedTier.dimensionsLabel})`
      : "Volumen combinado supera Paquete L · Cotizar en WhatsApp"
  }

  if (!selectedTier) {
    return {
      isEmpty: false,
      totalWeightGrams,
      totalVolumeCm3,
      fitsInXXS: false,
      xxsBlockReason,
      xxsStatusSummary,
      remainingXXSGrams: 0,
      oversizedXXSProductNames,
      tier: "CUSTOM",
      tierLabel: "Carga mayor (> Paquete L)",
      rawShippingCents: null,
      qualifiesFreeShipping: false,
      remainingForFreeShippingCents,
      shippingCents: null,
      maxWeightGrams: null,
      boxDimensionsLabel: "> 42 × 30 × 23 cm / 10 kg",
    }
  }

  const rawShippingCents = selectedTier.priceCents
  const qualifiesFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS

  return {
    isEmpty: false,
    totalWeightGrams,
    totalVolumeCm3,
    fitsInXXS,
    xxsBlockReason,
    xxsStatusSummary,
    remainingXXSGrams,
    oversizedXXSProductNames,
    tier: selectedTier.id,
    tierLabel: selectedTier.label,
    rawShippingCents,
    qualifiesFreeShipping,
    remainingForFreeShippingCents,
    shippingCents: qualifiesFreeShipping ? 0 : rawShippingCents,
    maxWeightGrams: selectedTier.maxWeightGrams,
    boxDimensionsLabel: selectedTier.dimensionsLabel,
  }
}
