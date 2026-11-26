"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility"
import { useMediaQuery } from "@/hooks/use-media-query"
import { usePointerCapabilities } from "@/hooks/use-pointer-capabilities"

interface AdaptiveSheetProps {
  isOpen: boolean
  onClose: () => void
  ariaLabelledBy?: string
  ariaLabel?: string
  desktopMode?: "drawer" | "modal"
  maxWidthClass?: string
  surfaceClassName?: string
  zIndexClass?: string
  children: ReactNode
}

const SheetDragContext = createContext<{
  onPointerDown: (e: PointerEvent<HTMLElement>) => void
  onPointerMove: (e: PointerEvent<HTMLElement>) => void
  onPointerUp: (e: PointerEvent<HTMLElement>) => void
  onPointerCancel: () => void
} | null>(null)

export function useSheetHeaderDrag() {
  return useContext(SheetDragContext)
}

/**
 * Primitiva de overlay camaleónica:
 * - Móvil (< 768px): Bottom Sheet deslizable con arrastre táctil y safe-area-inset-bottom.
 * - Tablet/Desktop (>= 768px): Drawer lateral derecho o Modal editorial centrado.
 */
export function AdaptiveSheet({
  isOpen,
  onClose,
  ariaLabelledBy,
  ariaLabel,
  desktopMode = "drawer",
  maxWidthClass = "max-w-md",
  surfaceClassName = "bg-[var(--surface-page)] text-[var(--text-primary)]",
  zIndexClass = "z-50",
  children,
}: AdaptiveSheetProps) {
  const [mounted, setMounted] = useState(false)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const isTabletOrDesktop = useMediaQuery("(min-width: 768px)", true)
  const { prefersReducedMotion } = usePointerCapabilities()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartYRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setDragOffsetY(0)
      setIsDragging(false)
      dragStartYRef.current = null
    }
  }, [isOpen])

  useDialogAccessibility(isOpen, onClose, containerRef)

  if (!mounted || !isOpen || typeof document === "undefined") {
    return null
  }

  const isBottomSheet = !isTabletOrDesktop

  const handlePointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!isBottomSheet) return
    dragStartYRef.current = e.clientY
    setIsDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // ignore if capture unavailable
    }
  }

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!isBottomSheet || dragStartYRef.current === null) return
    const delta = Math.max(0, e.clientY - dragStartYRef.current)
    setDragOffsetY(delta)
  }

  const resetDrag = () => {
    dragStartYRef.current = null
    setIsDragging(false)
    setDragOffsetY(0)
  }

  const handlePointerUp = (e: PointerEvent<HTMLElement>) => {
    if (!isBottomSheet || dragStartYRef.current === null) return
    const delta = Math.max(0, e.clientY - dragStartYRef.current)
    resetDrag()
    if (delta > 90) {
      onClose()
    }
  }

  const wrapperLayoutClass = isBottomSheet
    ? "items-end justify-center"
    : desktopMode === "drawer"
      ? "items-stretch justify-end"
      : "items-center justify-center p-4 lg:p-8"

  const panelLayoutClass = isBottomSheet
    ? "w-full max-h-[90dvh] rounded-t-2xl border-t border-[var(--border-subtle)] shadow-[0_-18px_50px_rgba(0,0,0,0.28)]"
    : desktopMode === "drawer"
      ? `h-dvh w-full ${maxWidthClass} border-l border-[var(--border-subtle)] shadow-[-20px_0_60px_rgba(0,0,0,0.28)]`
      : `w-full ${maxWidthClass} max-h-[90dvh] rounded-3xl border border-[var(--border-subtle)] shadow-[0_32px_90px_rgba(0,0,0,0.45)]`

  const dragHandlers = isBottomSheet
    ? {
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: resetDrag,
      }
    : null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={`fixed inset-0 ${zIndexClass} flex ${wrapperLayoutClass}`}
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[var(--surface-scrim)] backdrop-blur-[2px]"
      />

      {/* Adaptive Panel */}
      <div
        ref={containerRef}
        style={
          isBottomSheet && dragOffsetY > 0
            ? { transform: `translate3d(0, ${dragOffsetY}px, 0)` }
            : undefined
        }
        className={`relative z-10 flex flex-col overflow-hidden ${
          !isDragging && !prefersReducedMotion
            ? "transition-transform duration-200 ease-out"
            : ""
        } ${panelLayoutClass} ${surfaceClassName}`}
      >
        {isBottomSheet ? (
          <div
            aria-hidden="true"
            {...dragHandlers}
            className="flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-1.5 active:cursor-grabbing"
          >
            <span className="h-1.5 w-11 rounded-full bg-current/25" />
          </div>
        ) : null}

        <SheetDragContext.Provider value={dragHandlers}>{children}</SheetDragContext.Provider>
      </div>
    </div>,
    document.body
  )
}
