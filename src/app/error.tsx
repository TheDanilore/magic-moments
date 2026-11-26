"use client"

import { useEffect } from "react"
import { RouteErrorFallback } from "@/components/ui/RouteErrorFallback"

interface RootErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("Magic Moments route error:", error)
  }, [error])

  return (
    <RouteErrorFallback
      tone="dark"
      heading="No pudimos cargar el atelier en este momento."
      description="Ocurrió un inconveniente al consultar el catálogo. Puedes reintentar ahora mismo o volver al inicio."
      retryLabel="Reintentar"
      secondaryHref="/"
      secondaryLabel="Ir al inicio"
      onRetry={reset}
    />
  )
}
