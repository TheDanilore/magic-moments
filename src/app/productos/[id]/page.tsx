import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "@/components/ProductDetailClient"
import { getProductById, getRelatedProducts } from "@/lib/catalog"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  return {
    title: product ? product.name : "Producto no encontrado",
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
