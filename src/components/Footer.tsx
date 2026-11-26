import Link from "next/link"
import { Facebook, Gift, Instagram, Twitter } from "lucide-react"
import { buildWhatsAppUrl, getWhatsAppDisplayPhone } from "@/lib/whatsapp"

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl("Hola Magic Moments, deseo hacer un pedido o consulta.")
  const whatsappPhone = getWhatsAppDisplayPhone()

  return (
    <footer
      data-surface="obsidian"
      className="safe-bottom-pad w-full border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian)] py-10 text-[var(--text-secondary-on-dark)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-8 md:flex-row md:justify-between">
        {/* Logo and About */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2">
            <Gift className="h-5 w-5 text-[var(--color-cta-primary)]" aria-hidden="true" />
            <span className="font-display text-xl font-bold text-[var(--text-on-dark)]">
              Magic Moments
            </span>
          </Link>

          <p className="text-sm text-[var(--text-muted-on-dark)]">
            Detalles personalizados · Perú · S/ PEN
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[var(--text-accent-on-dark)]">
            <span>WhatsApp / Pedidos:</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[var(--text-on-dark)]"
            >
              {whatsappPhone}
            </a>
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Productos
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/productos?categoria=cajas-sorpresa"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Cajas Sorpresa
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=llaveros"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Llaveros Personalizados
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?categoria=tarjetas"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Tarjetas
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Nosotros
            </h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  href="/nosotros"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto#preguntas-frecuentes"
                  className="inline-flex min-h-9 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Síguenos
            </h3>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-on-dark)] text-[var(--text-on-dark)] transition-colors hover:bg-white/10"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-on-dark)] text-[var(--text-on-dark)] transition-colors hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-on-dark)] text-[var(--text-on-dark)] transition-colors hover:bg-white/10"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-[var(--border-on-dark)] px-4 pt-6 sm:px-8">
        <p className="text-center text-xs text-[var(--text-muted-on-dark)]">
          © {new Date().getFullYear()} Magic Moments. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
