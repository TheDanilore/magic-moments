"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Gift, Menu, MessageCircle, Moon, Search, ShoppingBag, Sun, X } from "lucide-react"
import { AdaptiveSheet } from "@/components/ui/adaptive-sheet"
import { ShortcutTooltip } from "@/components/ui/shortcut-tooltip"
import { useCart } from "@/context/cart-context"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const SearchOverlay = lazy(() =>
  import("@/components/search-overlay").then((mod) => ({
    default: mod.SearchOverlay,
  }))
)

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/promociones", label: "Promociones" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const

export default function Header() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const { totalCount, openDrawer, toggleDrawer, isDrawerOpen } = useCart()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isOverDark, setIsOverDark] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let rafId: number | null = null

    const probeSurface = () => {
      rafId = null
      const probeY = 36
      const darkSections = document.querySelectorAll<HTMLElement>('[data-surface="obsidian"]')
      let overObsidian = false
      for (const section of darkSections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom > probeY) {
          overObsidian = true
          break
        }
      }
      setIsOverDark((prev) => (prev === overObsidian ? prev : overObsidian))
    }

    const scheduleProbe = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(probeSurface)
    }

    scheduleProbe()
    window.addEventListener("scroll", scheduleProbe, { passive: true })
    window.addEventListener("resize", scheduleProbe, { passive: true })
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", scheduleProbe)
      window.removeEventListener("resize", scheduleProbe)
    }
  }, [pathname])

  const openSearch = () => {
    setHasOpenedSearch(true)
    setIsSearchOpen(true)
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Atajos de teclado silenciosos (revelados únicamente en ShortcutTooltip)
  useHotkeys([
    {
      key: "/",
      enabled: !isDrawerOpen && !isMobileMenuOpen && !isSearchOpen,
      handler: () => {
        if (document.querySelector('[role="dialog"]')) return
        openSearch()
      },
    },
    {
      key: "b",
      enabled: !isMobileMenuOpen && !isSearchOpen,
      handler: () => {
        if (document.querySelector('[role="dialog"]') && !isDrawerOpen) return
        toggleDrawer()
      },
    },
    {
      key: "t",
      enabled: !isDrawerOpen && !isMobileMenuOpen && !isSearchOpen,
      handler: () => {
        if (document.querySelector('[role="dialog"]')) return
        toggleTheme()
      },
    },
  ])

  const whatsappDirectUrl = buildWhatsAppUrl(
    "Hola Magic Moments, quiero consultar sobre sus detalles personalizados."
  )

  const shellClass = isOverDark
    ? "studio-pill border-[var(--border-on-dark)] text-[var(--text-on-dark)]"
    : "studio-light-pill border-[var(--border-subtle)] text-[var(--text-primary)]"

  const isDarkTheme = mounted && resolvedTheme === "dark"

  return (
    <>
      <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-6">
        <div
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 rounded-full border px-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-colors duration-200 sm:px-4 ${shellClass}`}
        >
          {/* Left: Mobile Menu Trigger + Brand */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="inline-flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-current/10 md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-display text-base font-bold tracking-tight sm:text-lg"
            >
              <Gift
                className="h-5 w-5 shrink-0 text-[var(--color-cta-primary)]"
                aria-hidden="true"
              />
              <span>Magic Moments</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                      : "hover:bg-current/10"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: Search, Theme, WhatsApp & Order Bag */}
          <div className="flex items-center gap-1">
            <ShortcutTooltip label="Buscar detalles" shortcut="/">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Buscar detalles"
                className="inline-flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-current/10"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip label="Cambiar tema" shortcut="T">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDarkTheme ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                className="inline-flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-current/10"
              >
                {isDarkTheme ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </ShortcutTooltip>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[var(--color-whatsapp)] transition-colors hover:bg-current/10 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>

            <ShortcutTooltip label="Tu pedido" shortcut="B">
              <button
                type="button"
                onClick={openDrawer}
                aria-label={totalCount > 0 ? `Abrir pedido (${totalCount})` : "Abrir pedido"}
                className="inline-flex h-11 cursor-pointer touch-manipulation items-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-3.5 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Pedido</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black/20 px-1.5 text-[11px] font-bold tabular-nums">
                  {totalCount}
                </span>
              </button>
            </ShortcutTooltip>
          </div>
        </div>
      </header>

      {/* Mobile Navigation AdaptiveSheet (Bottom Sheet on mobile) */}
      <AdaptiveSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        desktopMode="drawer"
        ariaLabel="Menú de navegación"
      >
        <div className="safe-bottom-pad flex flex-col gap-4 px-5 pt-2 pb-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <span className="font-display text-lg font-bold text-[var(--text-primary)]">
              Magic Moments
            </span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menú móvil" className="flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex min-h-12 items-center rounded-2xl px-4 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                      : "text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </AdaptiveSheet>

      {/* Lazy Search Overlay */}
      {hasOpenedSearch ? (
        <Suspense fallback={null}>
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      ) : null}
    </>
  )
}
