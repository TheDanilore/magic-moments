import Link from "next/link"
import Image from "next/image"
import { ArrowRight, HeartHandshake, Instagram, MapPin, MessageCircle, Package, Sparkles, Truck } from "lucide-react"
import FeaturedProducts from "@/components/FeaturedProducts"
import ProductCategories from "@/components/ProductCategories"
import PromoSection from "@/components/PromoSection"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Elige tu detalle o lote",
    description:
      "Explora cajas temáticas, cuadros 3D con luces LED, ramos eternos o llaveros acrílicos por unidad y por docena.",
  },
  {
    step: "2",
    title: "Personaliza fotos y mensaje",
    description:
      "Coordina colores, dedicatoria y temática directamente por WhatsApp; calculamos el envío Shalom antes de confirmar.",
  },
  {
    step: "3",
    title: "Recibe en Chimbote o todo el Perú",
    description:
      "Entregamos en Chimbote y Nuevo Chimbote, y realizamos envíos protegidos agencia a agencia vía Shalom a todo el país.",
  },
] as const

export default function Home() {
  const heroWhatsappUrl = buildWhatsAppUrl(
    "Hola Magic Moments, quiero armar un regalo personalizado."
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      {/* Top Hero Stage — Warm Blush Petal & Sunflower Glow */}
      <section className="hero-atelier-gradient w-full pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-5 lg:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/90 px-3.5 py-1.5 text-xs font-semibold text-[var(--text-accent-accessible)] shadow-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Chimbote · Nuevo Chimbote · Envíos a todo el Perú</span>
              </div>

              <div className="space-y-3.5">
                <h1 className="font-display text-4xl leading-[0.98] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl xl:text-6xl">
                  Convertimos tus momentos en recuerdos inolvidables
                </h1>
                <p className="text-pretty max-w-lg text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  Cajas personalizadas, cuadros 3D con luces LED, ramos temáticos y llaveros acrílicos hechos a mano con cariño.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] shadow-sm transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 text-sm font-semibold text-[var(--color-whatsapp-ink)] shadow-sm transition-colors hover:bg-[var(--color-whatsapp-hover)]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>

              <ul
                aria-label="Beneficios y envíos"
                className="grid grid-cols-1 gap-2.5 border-t border-[var(--border-subtle)] pt-4 text-xs font-medium text-[var(--text-secondary)] sm:grid-cols-3"
              >
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Yape · Plin · Transferencia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Shalom desde S/ 8.00</span>
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Unidad o lotes (12+ u.)</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2.5 shadow-[0_22px_60px_rgba(109,30,59,0.12)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-blush)]">
                  <Image
                    src="/images/hero-atelier.jpg"
                    alt="Caja de regalo personalizada Magic Moments con chocolates, taza, llavero y tarjeta"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>

                {/* Quick Spotlight Links */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2 rounded-2xl bg-[var(--surface-blush)]/70 px-3.5 py-2.5 text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Lo más pedido:
                  </span>
                  <Link
                    href="/productos/1"
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Cajas Temáticas
                  </Link>
                  <Link
                    href="/productos/9"
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Cuadros 3D LED
                  </Link>
                  <Link
                    href="/productos/2"
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Llaveros Acrílicos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductCategories />

      <FeaturedProducts />

      <PromoSection />

      {/* How to Order + Real Instagram Showcase */}
      <section className="w-full bg-[var(--surface-page)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Así armamos tu regalo paso a paso
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Atención cercana desde Chimbote y Nuevo Chimbote. Sin pagos complicados ni sorpresas en el envío.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROCESS_STEPS.map((item) => (
              <article
                key={item.step}
                className="flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 shadow-sm"
              >
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-blush)] font-display text-base font-bold text-[var(--text-accent-accessible)] tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-blush)] p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-cta-primary)] bg-[var(--surface-elevated)] shadow-sm">
                <Image
                  src="/images/logo-magic-moments.jpg"
                  alt="Emblema Magic Moments"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Mira trabajos reales en @magic_moments050
                </h3>
                <p className="text-pretty mt-1 text-sm text-[var(--text-secondary)]">
                  Entregas, cajas Hot Wheels, cuadros LED de girasoles, llaveros y envíos diarios en nuestras historias destacadas.
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="https://www.instagram.com/magic_moments050/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Ver Instagram</span>
              </a>
              <Link
                href="/nosotros"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
              >
                <HeartHandshake className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                <span>Conoce el taller</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
