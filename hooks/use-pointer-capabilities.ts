"use client"

import { useMediaQuery } from "@/hooks/use-media-query"

export interface PointerCapabilities {
  canHoverFine: boolean
  prefersReducedMotion: boolean
}

/**
 * Detecta si el dispositivo soporta hover preciso (escritorio/trackpad)
 * y si el usuario prefiere movimiento reducido.
 */
export function usePointerCapabilities(): PointerCapabilities {
  const canHoverFine = useMediaQuery("(hover: hover) and (pointer: fine)", false)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false)

  return { canHoverFine, prefersReducedMotion }
}
