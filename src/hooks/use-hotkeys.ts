"use client"

import { useEffect, useRef } from "react"

export interface HotkeyBinding {
  key: string
  handler: (event: KeyboardEvent) => void
  enabled?: boolean
  preventDefault?: boolean
  allowInInput?: boolean
  ignoreRepeat?: boolean
}

function isEditableContext(target: EventTarget | null): boolean {
  const candidates = [
    target instanceof HTMLElement ? target : null,
    typeof document !== "undefined" && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  ]

  return candidates.some((el) => {
    if (!el) return false
    if (el.isContentEditable) return true
    if (el.closest('[data-hotkey-ignore="true"]')) return true
    const tag = el.tagName
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT"
  })
}

/**
 * Escucha global de atajos de teclado silenciosos que se desactiva
 * automáticamente durante composición IME, repetición sostenida o cuando el foco
 * está dentro de controles de texto o personalización.
 */
export function useHotkeys(bindings: HotkeyBinding[]) {
  const bindingsRef = useRef(bindings)

  useEffect(() => {
    bindingsRef.current = bindings
  }, [bindings])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.metaKey || event.ctrlKey || event.altKey) return
      const pressedKey = event.key.toLowerCase()

      for (const binding of bindingsRef.current) {
        if (binding.enabled === false) continue
        if (binding.ignoreRepeat !== false && event.repeat) continue
        if (binding.key.toLowerCase() !== pressedKey) continue

        if (!binding.allowInInput && isEditableContext(event.target)) {
          return
        }

        if (binding.preventDefault !== false) {
          event.preventDefault()
        }
        binding.handler(event)
        return
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])
}
