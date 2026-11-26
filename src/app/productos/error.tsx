"use client"

import { useEffect } from "react"
import { RouteErrorFallback } from "@/components/ui/RouteErrorFallback"

interface ProductosErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductosError({ error, reset }: ProductosErrorProps) {
  useEffect(() => {
    console.error("Error cargando /productos:", error)
  }, [error])

  return (
    <RouteErrorFallback
      tone="light"
      heading="No pudimos cargar el catálogo en este momento"
      description="Ocurrió un inconveniente temporal al consultar los detalles disponibles. Intenta recargar o vuelve al inicio."
      retryLabel="Reintentar catálogo"
      secondaryHref="/"
      secondaryLabel="Volver al inicio"
      onRetry={reset}
    />
  )
}
