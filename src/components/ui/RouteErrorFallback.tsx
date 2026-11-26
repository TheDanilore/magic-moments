"use client"

import Link from "next/link"
import { RotateCcw } from "lucide-react"

interface RouteErrorFallbackProps {
  heading: string
  description: string
  retryLabel: string
  secondaryHref: string
  secondaryLabel: string
  tone?: "light" | "dark"
  onRetry: () => void
}

/**
 * Pantalla recuperable compartida para límites de error en rutas de la tienda.
 */
export function RouteErrorFallback({
  heading,
  description,
  retryLabel,
  secondaryHref,
  secondaryLabel,
  tone = "light",
  onRetry,
}: RouteErrorFallbackProps) {
  const isDark = tone === "dark"

  return (
    <div
      data-surface={isDark ? "obsidian" : undefined}
      role="alert"
      className={`flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6 ${
        isDark
          ? "bg-[var(--surface-obsidian)] text-[var(--text-on-dark)]"
          : "bg-[var(--surface-page)] text-[var(--text-primary)]"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-3xl border p-7 text-center sm:p-10 ${
          isDark
            ? "border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)]"
            : "border-[var(--border-subtle)] bg-[var(--surface-elevated)]"
        }`}
      >
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
        </h1>
        <p
          className={`mt-2.5 text-sm leading-relaxed ${
            isDark
              ? "text-[var(--text-muted-on-dark)]"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)] lg:min-h-11"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>{retryLabel}</span>
          </button>

          <Link
            href={secondaryHref}
            className={`inline-flex min-h-12 items-center justify-center rounded-full border px-5 text-xs font-semibold transition-colors lg:min-h-11 ${
              isDark
                ? "border-[var(--border-on-dark)] text-[var(--text-on-dark)] hover:border-[var(--color-cta-primary)]"
                : "border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-current/8"
            }`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
