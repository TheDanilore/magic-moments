import Image from "next/image"
import Link from "next/link"
import { Instagram, MapPin, MessageCircle } from "lucide-react"
import { productCategories } from "@/data/catalog"
import { buildWhatsAppUrl, getWhatsAppDisplayPhone } from "@/lib/whatsapp"

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl("Hola Magic Moments, deseo hacer un pedido o consulta.")
  const whatsappPhone = getWhatsAppDisplayPhone()

  return (
    <footer
      data-surface="obsidian"
      className="safe-bottom-pad w-full border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian)] pt-12 pb-24 text-[var(--text-secondary-on-dark)] md:pb-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-8 lg:flex-row lg:justify-between">
        {/* Brand Emblem & Location */}
        <div className="flex max-w-sm flex-col gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--border-on-dark)] bg-[var(--surface-blush)]">
              <Image
                src="/images/logo-magic-moments.jpg"
                alt="Logo Magic Moments"
                fill
                loading="lazy"
                decoding="async"
                sizes="48px"
                className="object-cover"
              />
            </span>
            <div>
              <span className="block font-display text-xl font-bold text-[var(--text-on-dark)]">
                Magic Moments
              </span>
              <span className="block text-xs text-[var(--text-muted-on-dark)]">
                Detalles y regalos personalizados
              </span>
            </div>
          </Link>

          <p className="text-sm leading-relaxed text-[var(--text-secondary-on-dark)]">
            Convertimos tus momentos especiales en recuerdos inolvidables. Regalos hechos a mano en{" "}
            <strong className="font-semibold text-[var(--text-on-dark)]">
              Chimbote y Nuevo Chimbote
            </strong>{" "}
            con envíos a todo el Perú.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-[var(--text-accent-on-dark)] underline underline-offset-4 hover:text-[var(--text-on-dark)]"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>WhatsApp: {whatsappPhone}</span>
            </a>
            <span className="inline-flex items-center gap-1 text-[var(--text-muted-on-dark)]">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Chimbote · Nuevo Chimbote</span>
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Categorías
            </h3>
            <ul className="space-y-1 text-sm">
              {productCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/productos?categoria=${category.slug}`}
                    className="inline-flex min-h-10 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Tienda
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/promociones"
                  className="inline-flex min-h-10 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Promociones
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="inline-flex min-h-10 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="inline-flex min-h-10 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto#preguntas-frecuentes"
                  className="inline-flex min-h-10 items-center text-[var(--text-muted-on-dark)] transition-colors hover:text-[var(--text-on-dark)]"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <h3 className="font-display text-base font-semibold text-[var(--text-on-dark)]">
              Redes Oficiales
            </h3>
            <a
              href="https://www.instagram.com/magic_moments050/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 self-start rounded-full border border-[var(--border-on-dark)] bg-white/10 px-4 text-xs font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-white/20"
            >
              <Instagram className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]" aria-hidden="true" />
              <span>@magic_moments050</span>
            </a>

            <p className="text-pretty text-xs leading-relaxed text-[var(--text-muted-on-dark)]">
              Entregas diarias, clientes y envíos reales en nuestras historias destacadas.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--border-on-dark)] px-4 pt-6 sm:px-8">
        <p className="text-pretty text-center text-xs text-[var(--text-muted-on-dark)]">
          © {new Date().getFullYear()} Magic Moments · Chimbote y Nuevo Chimbote, Perú · S/&nbsp;PEN.
        </p>
      </div>
    </footer>
  )
}
