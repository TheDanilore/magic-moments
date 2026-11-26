"use client"

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactElement,
} from "react"
import { createPortal } from "react-dom"
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities"

interface ShortcutTooltipProps {
  label: string
  shortcut?: string
  placement?: "top" | "bottom"
  children: ReactElement<Record<string, unknown>>
}

/**
 * Revela atajos de teclado silenciosos exclusivamente dentro de un tooltip portaleado
 * al hacer hover o foco visible en escritorio, manteniendo la interfaz limpia de texto de atajos.
 */
export function ShortcutTooltip({
  label,
  shortcut,
  placement = "bottom",
  children,
}: ShortcutTooltipProps) {
  const { canHoverFine } = usePointerCapabilities()
  const tooltipId = useId()
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)

  if (!canHoverFine || !isValidElement(children)) {
    return children
  }

  const show = (target: HTMLElement) => {
    const rect = target.getBoundingClientRect()
    const clampedLeft = Math.min(Math.max(rect.left + rect.width / 2, 72), window.innerWidth - 72)
    setPosition({
      top: placement === "top" ? rect.top - 8 : rect.bottom + 8,
      left: clampedLeft,
    })
  }

  const hide = () => setPosition(null)

  const origMouseEnter = children.props.onMouseEnter as
    | ((e: MouseEvent<HTMLElement>) => void)
    | undefined
  const origMouseLeave = children.props.onMouseLeave as
    | ((e: MouseEvent<HTMLElement>) => void)
    | undefined
  const origFocus = children.props.onFocus as ((e: FocusEvent<HTMLElement>) => void) | undefined
  const origBlur = children.props.onBlur as ((e: FocusEvent<HTMLElement>) => void) | undefined

  return (
    <>
      {cloneElement(children, {
        "aria-describedby": position ? tooltipId : undefined,
        onMouseEnter: (e: MouseEvent<HTMLElement>) => {
          show(e.currentTarget)
          origMouseEnter?.(e)
        },
        onMouseLeave: (e: MouseEvent<HTMLElement>) => {
          hide()
          origMouseLeave?.(e)
        },
        onFocus: (e: FocusEvent<HTMLElement>) => {
          let isFocusVisible = false
          try {
            isFocusVisible = e.currentTarget.matches(":focus-visible")
          } catch {
            isFocusVisible = false
          }
          if (isFocusVisible) {
            show(e.currentTarget)
          }
          origFocus?.(e)
        },
        onBlur: (e: FocusEvent<HTMLElement>) => {
          hide()
          origBlur?.(e)
        },
      })}

      {position && typeof document !== "undefined"
        ? createPortal(
            <span
              id={tooltipId}
              role="tooltip"
              style={{ top: position.top, left: position.left }}
              className={`pointer-events-none fixed z-[90] -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border-on-dark)] bg-[var(--surface-obsidian)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-on-dark)] shadow-[0_10px_28px_rgba(0,0,0,0.35)] ${
                placement === "top" ? "-translate-y-full" : ""
              }`}
            >
              <span>{label}</span>
              {shortcut ? (
                <kbd className="ml-1.5 rounded border border-[var(--border-on-dark)] bg-white/10 px-1.5 py-0.5 font-mono text-xs font-semibold text-[var(--text-accent-on-dark)]">
                  {shortcut}
                </kbd>
              ) : null}
            </span>,
            document.body
          )
        : null}
    </>
  )
}
