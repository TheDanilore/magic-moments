"use client"

import { useCallback, useSyncExternalStore } from "react"

/**
 * Suscripción SSR-safe a media queries mediante useSyncExternalStore.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {}
      const mediaQueryList = window.matchMedia(query)
      mediaQueryList.addEventListener("change", onStoreChange)
      return () => mediaQueryList.removeEventListener("change", onStoreChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return defaultValue
    return window.matchMedia(query).matches
  }, [query, defaultValue])

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
