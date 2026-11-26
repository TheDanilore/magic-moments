import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Star, Truck } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import ProductCategories from "@/components/product-categories"
import PromoSection from "@/components/promo-section"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Valeria Salazar",
    location: "Lima · Miraflores",
    quote:
      "Pedí la Caja Sorpresa de Cumpleaños con fotos y dedicatoria. Cada detalle llegó impecable y con un aroma delicioso.",
    since: "Cliente frecuente · 2025",
  },
  {
    id: 2,
    name: "Diego Huamán",
    location: "Arequipa · Envío Shalom",
    quote:
      "Coordiné dos llaveros personalizados y una tarjeta 3D por WhatsApp. Llegaron a la agencia en 2 días hábiles, súper bien protegidos.",
    since: "Compra verificada · 2025",
  },
  {
    id: 3,
    name: "Camila Torres",
    location: "Trujillo · Envío Shalom",
    quote:
      "La calidad del papel algodón y el sello de lacre hacen toda la diferencia. Es mi tienda favorita para regalar momentos.",
    since: "Cliente desde 2024",
  },
] as const

export default function Home() {
  const heroWhatsappUrl = buildWhatsAppUrl(
    "Hola Magic Moments, quiero armar un regalo personalizado."
  )

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      {/* Top Hero Stage (Obsidian Surface) */}
      <section
        data-surface="obsidian"
        className="w-full bg-[var(--surface-obsidian)] pt-8 pb-14 text-[var(--text-on-dark)] md:pt-12 md:pb-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6 lg:col-span-5">
              <div className="space-y-4">
                <h1 className="font-display text-4xl leading-[0.95] font-bold tracking-[-0.04em] text-balance sm:text-5xl xl:text-6xl">
                  Detalles únicos para momentos inolvidables
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-[var(--text-secondary-on-dark)] sm:text-lg">
                  Cajas sorpresa, llaveros grabados, tarjetas 3D con sello de lacre y kits curados a mano en nuestro atelier.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
                >
                  <span>Explorar detalles</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-on-dark)] bg-white/5 px-6 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-[var(--text-accent-on-dark)]" aria-hidden="true" />
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>

              <ul
                aria-label="Garantías y envíos"
                className="grid grid-cols-1 gap-2.5 border-t border-[var(--border-on-dark)] pt-5 text-xs text-[var(--text-muted-on-dark)] sm:grid-cols-3"
              >
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]" aria-hidden="true" />
                  <span>Yape · Plin · Transferencia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]" aria-hidden="true" />
                  <span>Envíos Shalom a todo el Perú</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-[var(--text-accent-on-dark)]" aria-hidden="true" />
                  <span>Envío gratis desde S/ 150</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/hero-atelier.jpg"
                    alt="Caja de regalo personalizada Magic Moments con chocolates, taza cerámica, llavero de cristal y tarjeta 3D"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>

                {/* Quick Spotlight Links */}
                <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)] px-4 py-3 text-xs">
                  <span className="font-medium text-[var(--text-muted-on-dark)]">
                    Piezas de la escena:
                  </span>
                  <Link
                    href="/productos/1"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-on-dark)] bg-white/5 px-3 font-medium text-[var(--text-on-dark)] transition-colors hover:border-[var(--text-accent-on-dark)]"
                  >
                    Caja Sorpresa
                  </Link>
                  <Link
                    href="/productos/2"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-on-dark)] bg-white/5 px-3 font-medium text-[var(--text-on-dark)] transition-colors hover:border-[var(--text-accent-on-dark)]"
                  >
                    Llavero Cristal
                  </Link>
                  <Link
                    href="/productos/3"
                    className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-on-dark)] bg-white/5 px-3 font-medium text-[var(--text-on-dark)] transition-colors hover:border-[var(--text-accent-on-dark)]"
                  >
                    Tarjeta 3D
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

      {/* Testimonials */}
      <section className="w-full bg-[var(--surface-page)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Experiencias reales de quienes ya sorprendieron con un detalle de Magic Moments.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl px-8 sm:px-10">
            <Carousel className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <article className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6">
                      <div>
                        <div className="mb-3 flex items-center gap-1" aria-label="Calificación 5 de 5 estrellas">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4 fill-[var(--color-cta-primary)] text-[var(--color-cta-primary)]"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>
                      <div className="mt-5 border-t border-[var(--border-subtle)] pt-3">
                        <h3 className="font-display text-sm font-semibold text-[var(--text-primary)]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {item.location} · {item.since}
                        </p>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  )
}
