"use client"

import { lazy, Suspense, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, MessageCircle, Moon, Search, ShoppingBag, Sun, X } from "lucide-react"
import { AdaptiveSheet } from "@/components/ui/AdaptiveSheet"
import { ShortcutTooltip } from "@/components/ui/ShortcutTooltip"
import { useCart } from "@/context/cart-context"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const SearchOverlay = lazy(() =>
  import("@/components/SearchOverlay").then((mod) => ({
    default: mod.SearchOverlay,
  }))
)

const NAV_LINKS = [
  { href: "/productos", label: "Catálogo" },
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
    "Hola Magic Moments, quiero cotizar un regalo personalizado o lote."
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
        <div className="studio-light-pill mx-auto flex h-14 max-w-7xl items-center justify-between gap-1 rounded-full border border-[var(--border-subtle)] px-2 text-[var(--text-primary)] shadow-[0_10px_28px_rgba(109,30,59,0.1)] transition-colors duration-200 sm:gap-2 sm:px-4">
          {/* Left: Mobile Menu Trigger + Illustrated Brand Emblem */}
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-blush)] md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              className="inline-flex min-h-11 min-w-0 shrink items-center gap-1.5 rounded-full pr-1.5 pl-0.5 font-display text-[15px] font-bold tracking-tight whitespace-nowrap sm:gap-2 sm:pr-2 sm:text-lg"
            >
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--surface-blush)] sm:h-9 sm:w-9">
                <Image
                  src="/images/logo-magic-moments.jpg"
                  alt=""
                  fill
                  priority
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="truncate">Magic Moments</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation (4 clear destinations) */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                      : "hover:bg-[var(--surface-blush)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: Search, Theme, WhatsApp & Order Bag */}
          <div className="flex shrink-0 items-center gap-1">
            <ShortcutTooltip label="Buscar detalles" shortcut="/">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Buscar detalles"
                className="inline-flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-blush)]"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
            </ShortcutTooltip>

            <ShortcutTooltip label="Cambiar tema" shortcut="T">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
                }
                className="hidden h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full transition-colors hover:bg-[var(--surface-blush)] sm:inline-flex"
              >
                <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
                <Moon className="block h-4 w-4 dark:hidden" aria-hidden="true" />
              </button>
            </ShortcutTooltip>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-[var(--text-whatsapp-accessible)] transition-colors hover:bg-[var(--surface-blush)] md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>

            <ShortcutTooltip label="Tu pedido" shortcut="B">
              <button
                type="button"
                onClick={openDrawer}
                aria-label={totalCount > 0 ? `Abrir pedido (${totalCount})` : "Abrir pedido"}
                className="inline-flex h-11 cursor-pointer touch-manipulation items-center gap-1.5 rounded-full bg-[var(--color-cta-primary)] px-3 text-xs font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)] sm:gap-2 sm:px-3.5"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Pedido</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--surface-badge-count)] px-1.5 text-[11px] font-bold tabular-nums">
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
        <div className="safe-bottom-pad flex flex-col gap-3.5 px-5 pt-2 pb-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--surface-blush)]">
                <Image
                  src="/images/logo-magic-moments.jpg"
                  alt="Magic Moments"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="font-display text-lg font-bold text-[var(--text-primary)]">
                Magic Moments
              </span>
            </div>
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex min-h-12 items-center rounded-2xl px-4 text-base font-semibold transition-colors ${
                pathname === "/"
                  ? "bg-[var(--color-cta-primary)] text-[var(--color-cta-primary-ink)]"
                  : "text-[var(--text-primary)] hover:bg-[var(--surface-card)]"
              }`}
            >
              Inicio
            </Link>
            {NAV_LINKS.map((item) => {
              const isActive = pathname.startsWith(item.href)
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

          <button
            type="button"
            onClick={toggleTheme}
            className="flex min-h-12 w-full cursor-pointer touch-manipulation items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
          >
            <span>Cambiar apariencia</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
              <Moon className="block h-4 w-4 dark:hidden" aria-hidden="true" />
              <span className="dark:hidden">Oscuro</span>
              <span className="hidden dark:inline">Claro</span>
            </span>
          </button>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Cotizar por WhatsApp</span>
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
