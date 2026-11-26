"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface LazyWorkshopVideoProps {
  src: string
  poster: string
  ariaLabel: string
}

/**
 * Difiere la carga del elemento <video> hasta que entra cerca del viewport,
 * mostrando el póster optimizado para evitar descargas innecesarias y CLS.
 */
export function LazyWorkshopVideo({ src, poster, ariaLabel }: LazyWorkshopVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

  useEffect(() => {
    const target = containerRef.current
    if (!target || shouldLoadVideo) return

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: "240px 0px" }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [shouldLoadVideo])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] max-h-[380px] w-full overflow-hidden bg-[var(--surface-obsidian)]"
    >
      {shouldLoadVideo ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          muted
          loop
          preload="metadata"
          aria-label={ariaLabel}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={poster}
          alt={ariaLabel}
          fill
          loading="lazy"
          decoding="async"
          sizes="290px"
          className="studio-photo-adapt object-cover"
        />
      )}
    </div>
  )
}

