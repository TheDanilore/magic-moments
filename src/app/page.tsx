import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, HeartHandshake, Instagram, MapPin, MessageCircle, Package, Sparkles, Truck } from "lucide-react"
import FeaturedProducts from "@/components/FeaturedProducts"
import ClientsAndShippingSection from "@/components/ClientsAndShippingSection"
import ProductCategories from "@/components/ProductCategories"
import PromoSection from "@/components/PromoSection"
import { products } from "@/data/catalog"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Elige tu detalle o temática",
    description:
      "Explora boxes Hot Wheels y Flores Amarillas, cuadros 3D con luces LED, ramos eternos o llaveros acrílicos por unidad o docena.",
  },
  {
    step: "2",
    title: "Personaliza fotos y mensaje",
    description:
      "Envíanos tus fotos, colores y dedicatoria por WhatsApp. El armado artesanal toma de 2 a 4 días según el modelo.",
  },
  {
    step: "3",
    title: "Recibe en Chimbote o todo el Perú",
    description:
      "Entregamos en Chimbote y Nuevo Chimbote, y despachamos protegido agencia a agencia vía Shalom a todo el país.",
  },
] as const

const REAL_GALLERY_HIGHLIGHTS = [
  {
    id: 11,
    title: "Box Hot Wheels",
    subtitle: "Con carrito, llavero y fotos",
    image: "/images/productos/box-hot-wheels-cerrada.jpg",
  },
  {
    id: 12,
    title: "Box Flores Amarillas",
    subtitle: "Girasol tejido y tarjetas",
    image: "/images/productos/box-flores-amarillas-tapa.jpg",
  },
  {
    id: 13,
    title: "Ramo Hot Wheels",
    subtitle: "2 carritos + rosas azules",
    image: "/images/productos/ramo-hot-wheels-detalle.jpg",
  },
  {
    id: 14,
    title: "Cuadro 3D LED",
    subtitle: "Girasoles, Snoopy y luz cálida",
    image: "/images/productos/cuadro-3d-led-girasoles-osito.jpg",
  },
  {
    id: 2,
    title: "Llavero Spotify",
    subtitle: "Con tarjeta «Llévame contigo»",
    image: "/images/productos/llavero-spotify-azul.jpg",
  },
  {
    id: 6,
    title: "Dúo Llaveros Kraft",
    subtitle: "Lazos satinados + bolsa kraft",
    image: "/images/productos/llavero-duo-familia-kraft.jpg",
  },
] as const

export default function Home() {
  const heroWhatsappUrl = buildWhatsAppUrl(
    "Hola Magic Moments, quiero armar un regalo personalizado."
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      {/* Top Hero Stage — Solid Blush Petal */}
      <section className="w-full bg-[var(--surface-blush)] pt-21 pb-10 text-[var(--text-primary)] md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-accent-accessible)] shadow-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Chimbote · Nuevo Chimbote · Envíos a todo el Perú</span>
              </div>

              <div className="space-y-2.5">
                <h1 className="font-display text-[2rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl xl:text-[3.5rem]">
                  Convertimos tus momentos en recuerdos inolvidables
                </h1>
                <p className="text-pretty max-w-lg text-sm leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  Boxes Hot Wheels y Flores Amarillas, cuadros 3D LED, ramos de rosas eternas y llaveros acrílicos hechos a mano.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:gap-3">
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-4 text-sm font-semibold text-[var(--color-cta-primary-ink)] shadow-sm transition-colors hover:bg-[var(--color-cta-primary-hover)] sm:px-6"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="hidden h-4 w-4 sm:inline" aria-hidden="true" />
                </Link>
                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 text-sm font-semibold text-[var(--color-whatsapp-ink)] shadow-sm transition-colors hover:bg-[var(--color-whatsapp-hover)] sm:px-6"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Cotizar WhatsApp</span>
                </a>
              </div>

              <ul
                aria-label="Beneficios y envíos"
                className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-[var(--border-subtle)] pt-3.5 text-xs font-medium text-[var(--text-secondary)] sm:grid-cols-3"
              >
                <li className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Yape · Plin · Precios ref.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Shalom desde S/ 8.00</span>
                </li>
                <li className="col-span-2 flex items-center gap-1.5 sm:col-span-1">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Armado artesanal (2–4 días)</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-[0_22px_60px_rgba(109,30,59,0.12)] sm:p-2.5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-card)]">
                  <Image
                    src="/images/hero-magic-moments.jpg"
                    alt="Caja personalizada Magic Moments, cuadro 3D LED de girasoles, ramo de rosas eternas y llavero acrílico"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>

                {/* Quick Spotlight Category Links */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-2xl bg-[var(--surface-page)] px-3 py-2 text-xs sm:mt-2.5 sm:gap-2 sm:px-3.5 sm:py-2.5">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Líneas principales:
                  </span>
                  <Link
                    href="/productos?categoria=cajas-sorpresa"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Boxes Temáticos
                  </Link>
                  <Link
                    href="/productos?categoria=cuadros-3d-led"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Cuadros 3D LED
                  </Link>
                  <Link
                    href="/productos?categoria=ramos-tematicos"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Ramos Eternos
                  </Link>
                  <Link
                    href="/productos?categoria=llaveros"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)]"
                  >
                    Llaveros (12+ u.)
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

      {/* How to Order + Real Workshop Video & Gallery Showcase */}
      <section className="w-full bg-[var(--surface-page)] py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Así armamos tu regalo paso a paso
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Atención cercana desde Chimbote y Nuevo Chimbote. Sin pagos complicados ni sorpresas en el envío.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
            {PROCESS_STEPS.map((item) => (
              <article
                key={item.step}
                className="flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 shadow-sm"
              >
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-blush)] font-display text-base font-bold text-[var(--text-accent-accessible)] tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="text-balance mt-4 font-display text-lg font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-pretty mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Real Deliveries + Video Showcase */}
          <div className="mt-10 rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-blush)] p-5 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="mx-auto max-w-[290px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-obsidian)] shadow-md">
                  <video
                    src="/videos/magic-moments-detalle.mp4"
                    poster="/images/productos/box-hot-wheels-abierta.jpg"
                    controls
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    aria-label="Video real de entrega personalizada Magic Moments"
                    className="aspect-[9/16] max-h-[380px] w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-5 lg:col-span-8">
                <div className="flex items-center gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-cta-primary)] bg-[var(--surface-elevated)] shadow-sm sm:h-16 sm:w-16">
                    <Image
                      src="/images/logo-magic-moments.jpg"
                      alt="Emblema Magic Moments"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <h3 className="text-balance font-display text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                      Trabajos reales entregados en @magic_moments050
                    </h3>
                    <p className="text-pretty mt-1 text-sm text-[var(--text-secondary)]">
                      Cada foto y video corresponde a pedidos reales armados a mano en nuestro taller de Chimbote.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {REAL_GALLERY_HIGHLIGHTS.map((item) => (
                    <Link
                      key={item.id}
                      href={`/productos/${item.id}`}
                      className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 transition-colors hover:border-[var(--color-cta-primary)]"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 640px) 42vw, 180px"
                          className="studio-photo-adapt object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-2 truncate font-display text-xs font-bold text-[var(--text-primary)]">
                        {item.title}
                      </p>
                      <p className="truncate text-[11px] text-[var(--text-secondary)]">
                        {item.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.instagram.com/magic_moments050/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                  >
                    <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Ver más en @magic_moments050</span>
                  </a>
                  <Link
                    href="/nosotros"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
                  >
                    <HeartHandshake className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <span>Conoce el taller</span>
                  </Link>
                  <Link
                    href="/productos"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
                  >
                    <Package className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <span>Ver {products.length} modelos</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsAndShippingSection />
    </div>
  )
}
