import { productCategories, products } from "@/data/catalog"
import type { Product, ProductCategory, ProductSelectionOptions } from "@/types/catalog"

/**
 * Devuelve las opciones iniciales por defecto de un producto.
 */
export function getDefaultProductOptions(product: Product): ProductSelectionOptions {
  const middleSizeIndex = product.options.sizes.length > 1 ? 1 : 0
  return {
    color: product.options.colors[0] ?? "Estándar",
    size: product.options.sizes[middleSizeIndex] ?? product.options.sizes[0] ?? "Estándar",
    theme: product.options.themes[0] ?? "Personalizado",
  }
}

/**
 * Genera una clave única para agrupar líneas del carrito por producto y opciones elegidas.
 */
export function buildCartLineKey(productId: number, options: ProductSelectionOptions): string {
  return `${productId}::${options.color}::${options.size}::${options.theme}`
}

/**
 * Busca un producto por su ID numérico estricto.
 */
export function getProductById(id: string | number): Product | undefined {
  const numericId =
    typeof id === "number"
      ? id
      : /^\d+$/.test(id.trim())
        ? Number.parseInt(id.trim(), 10)
        : Number.NaN

  if (!Number.isInteger(numericId)) {
    return undefined
  }

  return products.find((product) => product.id === numericId)
}

/**
 * Obtiene la categoría correspondiente a un slug, si existe.
 */
export function getCategoryBySlug(slug?: string): ProductCategory | undefined {
  if (!slug) {
    return undefined
  }

  return productCategories.find((category) => category.slug === slug)
}

/**
 * Filtra los productos por slug de categoría; si no coincide o no se indica, devuelve todos.
 */
export function getProductsByCategory(categorySlug?: string): Product[] {
  const category = getCategoryBySlug(categorySlug)
  if (!category) {
    return products
  }

  return products.filter((product) => product.categorySlug === category.slug)
}

/**
 * Devuelve productos relacionados excluyendo el producto actual.
 */
export function getRelatedProducts(productId: number, limit = 3): Product[] {
  return products.filter((product) => product.id !== productId).slice(0, limit)
}

const COLOR_HEX_MAP: Record<string, string> = {
  "rosa pétalo": "#f4a7c1",
  "rosa suave": "#f7bfd2",
  "frambuesa": "#b03658",
  "vino frambuesa": "#6d1e3b",
  "amarillo girasol": "#f4b41a",
  "amarillo": "#f4b41a",
  "azul rey": "#1d4ed8",
  "azul marino": "#1e3a8a",
  "azul rey & rosa": "#1d4ed8",
  "negro & azul rey": "#18181b",
  "negro & rojo": "#18181b",
  "azul & dorado": "#1d4ed8",
  "rojo racing": "#dc2626",
  "rojo pasión": "#dc2626",
  "rojo": "#dc2626",
  "negro": "#1f1f23",
  "lila": "#c084fc",
  "lavanda": "#c4b5fd",
  "menta": "#6ee7b7",
  "celeste": "#7dd3fc",
  "dorado": "#d4af37",
  "champagne": "#e5d3b3",
  "oro rosa": "#e0a9a0",
  "plateado": "#cbd5e1",
  "crema": "#f5ebd6",
  "crema & dorado": "#f5ebd6",
  "marfil": "#faf3e0",
  "blanco": "#ffffff",
  "transparente": "#f1f5f9",
  "lazo rojo": "#dc2626",
  "lazo azul rey": "#1d4ed8",
  "lazo rosa": "#f472b6",
  "madera natural": "#c8a477",
  "verde salvia": "#84a98c",
  "personalizado": "#b03658",
  "rosa nube": "#fde2e4",
  "medianoche velvet": "#2b1f2b",
  "dorado champagne": "#e9cca4",
  "rosa pastel": "#f8bbd0",
  "vainilla": "#f7ece1",
  "miel": "#c68b59",
  "celeste hielo": "#b5e2fa",
  "cacao": "#4e342e",
  "rojo carmesí": "#b71c1c",
  "ámbar cálido": "#f59e0b",
  "negro & dorado": "#1f1f23",
}

/**
 * Devuelve un hex aproximado para mostrar muestras de color en la UI.
 */
export function getColorSwatchHex(colorName: string): string {
  const key = colorName.trim().toLowerCase()
  return COLOR_HEX_MAP[key] ?? "#d8a9bb"
}
