import type { Metadata } from "next"
import { ProductsCatalogClient } from "@/components/ProductsCatalogClient"

export const metadata: Metadata = {
  title: "Productos",
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>
}) {
  const { categoria, q } = await searchParams

  return <ProductsCatalogClient initialCategory={categoria} initialQuery={q ?? ""} />
}
