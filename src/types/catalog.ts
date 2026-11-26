export interface ProductReview {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

export interface ProductCategory {
  slug: string
  name: string
  subtitle: string
  image: string
}

export interface ProductDimensionsCm {
  length: number
  width: number
  height: number
}

export interface ProductSelectionOptions {
  color: string
  size: string
  theme: string
}

export interface Product {
  id: number
  sku: string
  name: string
  subtitle: string
  badge?: string
  description: string
  longDescription: string
  priceCents: number
  compareAtCents?: number
  stock: number
  weightGrams: number
  dimensionsCm: ProductDimensionsCm
  category: string
  categorySlug: string
  featured?: boolean
  image: string
  images: string[]
  video?: string
  options: {
    colors: string[]
    sizes: string[]
    themes: string[]
  }
  reviews: ProductReview[]
}

export interface CartItem {
  lineKey: string
  product: Product
  options: ProductSelectionOptions
  quantity: number
}

export interface AddItemResult {
  added: boolean
  atLimit: boolean
}
