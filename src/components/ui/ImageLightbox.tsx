"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility"

interface ImageLightboxProps {
  isOpen: boolean
  images: string[]
  activeIndex: number
  title: string
  onChangeIndex: (nextIndex: number) => void
  onClose: () => void
}

const MIN_SCALE = 1
const MAX_SCALE = 3
const SCALE_STEP = 0.75

/**
 * Visor de imágenes a pantalla completa portaleado a document.body con zoom interactivo,
 * arrastre (pan), tokens CSS semánticos y atajos silenciosos revelados vía tooltip.
 */
export function ImageLightbox({
  isOpen,
  images,
  activeIndex,
  title,
  onChangeIndex,
  onClose,
}: ImageLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null)
  const didDragRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useDialogAccessibility(isOpen, onClose, containerRef)

  const resetZoom = useCallback(() => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    resetZoom()
  }, [activeIndex, isOpen, resetZoom])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) return
      if (event.key === "ArrowLeft" && images.length > 1) {
        event.preventDefault()
        onChangeIndex((activeIndex - 1 + images.length) % images.length)
      } else if (event.key === "ArrowRight" && images.length > 1) {
        event.preventDefault()
        onChangeIndex((activeIndex + 1) % images.length)
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault()
        setScale((s) => Math.min(MAX_SCALE, Number((s + SCALE_STEP).toFixed(2))))
      } else if (event.key === "-") {
        event.preventDefault()
        setScale((s) => {
          const next = Math.max(MIN_SCALE, Number((s - SCALE_STEP).toFixed(2)))
          if (next === 1) setPan({ x: 0, y: 0 })
          return next
        })
      } else if (event.key === "0") {
        event.preventDefault()
        resetZoom()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, activeIndex, images.length, onChangeIndex, resetZoom])

  if (!mounted || !isOpen || images.length === 0 || typeof document === "undefined") {
    return null
  }

  const currentSrc = images[activeIndex] ?? images[0]

  const handleZoomIn = () => {
    setScale((s) => Math.min(MAX_SCALE, Number((s + SCALE_STEP).toFixed(2))))
  }

  const handleZoomOut = () => {
    setScale((s) => {
      const next = Math.max(MIN_SCALE, Number((s - SCALE_STEP).toFixed(2)))
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }

  const handleImageClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    if (scale > 1) {
      resetZoom()
    } else {
      setScale(2.25)
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return
    e.currentTarget.setPointerCapture(e.pointerId)
    didDragRef.current = false
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      originX: pan.x,
      originY: pan.y,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      didDragRef.current = true
    }
    const maxOffset = (scale - 1) * 260
    setPan({
      x: Math.max(-maxOffset, Math.min(maxOffset, dragStartRef.current.originX + dx)),
      y: Math.max(-maxOffset, Math.min(maxOffset, dragStartRef.current.originY + dy)),
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    setIsDragging(false)
    dragStartRef.current = null
  }

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista a pantalla completa de ${title}`}
      className="fixed inset-0 z-[70] flex h-dvh w-screen flex-col bg-[var(--surface-lightbox)] text-[var(--text-on-dark)] backdrop-blur-md select-none"
    >
      {/* Top Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border-on-dark)] px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-[var(--text-on-dark)] sm:text-base">
            {title}
          </p>
          <p className="text-xs text-[var(--text-muted-on-dark)] tabular-nums">
            Vista {activeIndex + 1} de {images.length} · Zoom {Math.round(scale * 100)}%
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ShortcutTooltip label="Alejar zoom" shortcut="-">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= MIN_SCALE}
              aria-label="Alejar zoom"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-white/10 text-[var(--text-on-dark)] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ZoomOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>

          <ShortcutTooltip label="Acercar zoom" shortcut="+">
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= MAX_SCALE}
              aria-label="Acercar zoom"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-white/10 text-[var(--text-on-dark)] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>

          {scale > 1 ? (
            <ShortcutTooltip label="Restablecer zoom" shortcut="0">
              <button
                type="button"
                onClick={resetZoom}
                aria-label="Restablecer zoom"
                className="inline-flex h-12 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full border border-[var(--border-on-dark)] bg-white/10 px-3.5 text-xs font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-white/20"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">100%</span>
              </button>
            </ShortcutTooltip>
          ) : null}

          <ShortcutTooltip label="Cerrar visor" shortcut="Esc">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar pantalla completa"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </ShortcutTooltip>
        </div>
      </div>

      {/* Fullscreen Zoomable Stage */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-3 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={handleImageClick}
          className={`relative flex h-full w-full items-center justify-center ${
            scale > 1
              ? isDragging
                ? "cursor-grabbing touch-none"
                : "cursor-grab touch-none"
              : "cursor-zoom-in"
          }`}
        >
          <div
            className={`relative h-full w-full ${
              isDragging ? "" : "transition-transform duration-200 ease-out"
            }`}
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
            }}
          >
            <Image
              src={currentSrc}
              alt={`${title} - Vista ampliada ${activeIndex + 1}`}
              fill
              priority
              sizes="100vw"
              draggable={false}
              className="object-contain"
            />
          </div>
        </div>

        {images.length > 1 ? (
          <>
            <ShortcutTooltip label="Imagen anterior" shortcut="←">
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex - 1 + images.length) % images.length)}
                aria-label="Imagen anterior"
                className="absolute top-1/2 left-3 z-20 inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-[var(--surface-lightbox-control)] text-[var(--text-on-dark)] shadow-lg transition-colors hover:bg-[var(--color-cta-primary)] sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            </ShortcutTooltip>
            <ShortcutTooltip label="Imagen siguiente" shortcut="→">
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
                aria-label="Imagen siguiente"
                className="absolute top-1/2 right-3 z-20 inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-[var(--surface-lightbox-control)] text-[var(--text-on-dark)] shadow-lg transition-colors hover:bg-[var(--color-cta-primary)] sm:right-6"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </ShortcutTooltip>
          </>
        ) : null}
      </div>

      {/* Bottom Thumbnails + Neutral Touch Hint (sin atajos literales) */}
      <div className="safe-bottom-pad flex shrink-0 flex-col items-center gap-2 border-t border-[var(--border-on-dark)] px-4 py-3">
        {images.length > 1 ? (
          <div className="no-scrollbar flex max-w-full items-center gap-2 overflow-x-auto py-0.5">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => onChangeIndex(idx)}
                aria-label={`Ver imagen ${idx + 1}`}
                aria-pressed={activeIndex === idx}
                className={`relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all sm:h-14 sm:w-14 ${
                  activeIndex === idx
                    ? "border-[var(--color-cta-primary)] ring-2 ring-[var(--color-cta-primary)]"
                    : "border-[var(--border-on-dark)] opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="56px"
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
        <p className="text-center text-xs text-[var(--text-muted-on-dark)]">
          {scale > 1
            ? "Arrastra para explorar el detalle · Toca para volver a 100%"
            : "Toca la imagen para acercar el detalle"}
        </p>
      </div>
    </div>,
    document.body
  )
}
