"use client"

import { useEffect } from "react"
import { RouteErrorFallback } from "@/components/ui/RouteErrorFallback"

interface ProductErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  useEffect(() => {
    console.error("Error cargando ficha de producto:", error)
  }, [error])

  return (
    <RouteErrorFallback
      tone="dark"
      heading="No pudimos cargar este detalle"
      description="Hubo un inconveniente temporal consultando la información del producto. Reintenta ahora o explora el catálogo disponible."
      retryLabel="Reintentar detalle"
      secondaryHref="/productos"
      secondaryLabel="Ver productos"
      onRetry={reset}
    />
  )
}
