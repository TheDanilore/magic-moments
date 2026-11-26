import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, HeartHandshake, Instagram, MapPin, MessageCircle, Package, Sparkles, Truck } from "lucide-react"
import FeaturedProducts from "@/components/FeaturedProducts"
import ClientsAndShippingSection from "@/components/ClientsAndShippingSection"
import { LazyWorkshopVideo } from "@/components/LazyWorkshopVideo"
import ProductCategories from "@/components/ProductCategories"
import PromoSection from "@/components/PromoSection"
import { PriceTag } from "@/components/ui/PriceTag"
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

const productsById = new Map(products.map((product) => [product.id, product]))

export default function Home() {
  const heroWhatsappUrl = buildWhatsAppUrl(
    "Hola Magic Moments, quiero armar un regalo personalizado."
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      {/* Top Hero Stage — Solid Blush Petal */}
      <section
        aria-labelledby="hero-heading"
        className="w-full bg-[var(--surface-blush)] pt-21 pb-10 text-[var(--text-primary)] md:pt-28 md:pb-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 md:col-span-6 lg:col-span-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-accent-accessible)] shadow-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Chimbote · Nuevo Chimbote · Envíos a todo el Perú</span>
              </div>

              <div className="space-y-2.5">
                <h1
                  id="hero-heading"
                  className="font-display text-[2rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl md:text-4xl lg:text-5xl xl:text-[3.5rem]"
                >
                  Convertimos tus momentos en recuerdos inolvidables
                </h1>
                <p className="text-pretty max-w-lg text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:text-lg">
                  Boxes Hot Wheels y Flores Amarillas, cuadros 3D LED, ramos de rosas eternas y llaveros acrílicos hechos a mano.
                </p>
              </div>

              {/* Jerarquía clara: 1 CTA primario dominante + 1 CTA secundario outline */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                <Link
                  href="/productos"
                  className="touch-target-48 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] shadow-sm transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                >
                  <span>Explorar catálogo</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target-48 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--color-whatsapp)] hover:text-[var(--text-whatsapp-accessible)]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[var(--text-whatsapp-accessible)]" aria-hidden="true" />
                  <span>Cotizar WhatsApp</span>
                </a>
              </div>

              <ul
                aria-label="Beneficios y envíos"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border-subtle)] pt-3.5 text-xs font-medium text-[var(--text-secondary)]"
              >
                <li className="flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Yape · Plin · Precios ref.</span>
                </li>
                <li className="flex items-center gap-1.5 whitespace-nowrap">
                  <Truck className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Shalom desde S/ 8.00</span>
                </li>
                <li className="flex items-center gap-1.5 whitespace-nowrap">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>Armado en 2–4 días</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 lg:col-span-7">
              <div className="relative overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-[var(--shadow-stage)] sm:p-2.5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-card)]">
                  <Image
                    src="/images/hero-magic-real.jpg"
                    alt="Caja personalizada con lazo azul rey, cuadro 3D LED de girasoles con luces cálidas, ramo de rosas eternas y llavero acrílico Magic Moments"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
                    className="studio-photo-adapt object-cover"
                  />
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
      <section aria-labelledby="proceso-taller-heading" className="w-full bg-[var(--surface-page)] py-12 md:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="proceso-taller-heading"
              className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl"
            >
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

          {/* Real Deliveries + Lazy Video Showcase */}
          <div className="mt-10 rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-blush)] p-5 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="mx-auto max-w-[290px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-obsidian)] shadow-md">
                  <LazyWorkshopVideo
                    src="/videos/magic-moments-detalle.mp4"
                    poster="/images/productos/box-hot-wheels-abierta.jpg"
                    ariaLabel="Video real de entrega personalizada Magic Moments"
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
                      loading="lazy"
                      decoding="async"
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
                  {REAL_GALLERY_HIGHLIGHTS.map((item) => {
                    const matchedProduct = productsById.get(item.id)
                    return (
                      <Link
                        key={item.id}
                        href={`/productos/${item.id}`}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2.5 transition-colors hover:border-[var(--color-cta-primary)]"
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[var(--surface-card)]">
                          <Image
                            src={item.image}
                            alt=""
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
                        {matchedProduct ? (
                          <div className="mt-1.5 pt-1 border-t border-[var(--border-subtle)]">
                            <PriceTag
                              priceCents={matchedProduct.priceCents}
                              compareAtCents={matchedProduct.compareAtCents}
                              size="sm"
                            />
                          </div>
                        ) : null}
                      </Link>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.instagram.com/magic_moments050/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target-48 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                  >
                    <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Ver más en @magic_moments050</span>
                  </a>
                  <Link
                    href="/nosotros"
                    className="touch-target-48 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
                  >
                    <HeartHandshake className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <span>Conoce el taller</span>
                  </Link>
                  <Link
                    href="/productos"
                    className="touch-target-48 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
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
