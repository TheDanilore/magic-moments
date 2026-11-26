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
