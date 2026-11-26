"use client"

import { useEffect, useId, type RefObject } from "react"

const activeDialogStack: string[] = []
let scrollLockCount = 0
let previousBodyOverflow = ""

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ")

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null
  )
}

/**
 * Gestiona focus trap, cierre por Escape en pila de modales,
 * bloqueo de scroll del body y restauración del foco al cerrar.
 */
export function useDialogAccessibility(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>
) {
  const dialogId = useId()

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return

    const previouslyFocused = document.activeElement as HTMLElement | null
    activeDialogStack.push(dialogId)

    if (scrollLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
    }
    scrollLockCount += 1

    const focusTimer = window.setTimeout(() => {
      const container = containerRef.current
      if (!container) return
      const focusables = getFocusableElements(container)
      if (focusables.length > 0) {
        focusables[0].focus()
      } else {
        container.setAttribute("tabindex", "-1")
        container.focus()
      }
    }, 20)

    const onKeyDown = (event: KeyboardEvent) => {
      const isTopmost = activeDialogStack[activeDialogStack.length - 1] === dialogId
      if (!isTopmost) return

      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "Tab" && containerRef.current) {
        const focusables = getFocusableElements(containerRef.current)
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement

        if (event.shiftKey && active === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", onKeyDown)

      const stackIndex = activeDialogStack.lastIndexOf(dialogId)
      if (stackIndex >= 0) {
        activeDialogStack.splice(stackIndex, 1)
      }

      scrollLockCount = Math.max(0, scrollLockCount - 1)
      if (scrollLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow
      }

      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus()
      }
    }
  }, [isOpen, onClose, containerRef, dialogId])
}
