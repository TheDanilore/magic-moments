import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Gift, Heart, Instagram, MapPin, Package, Sparkles } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ClientsAndShippingSection from "@/components/ClientsAndShippingSection"

export const metadata: Metadata = {
  title: "Nosotros",
}

export default function NosotrosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="w-full border-b border-[var(--border-subtle)] bg-[var(--surface-blush)] pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-accent-accessible)]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Chimbote y Nuevo Chimbote · Perú</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-3xl leading-[1.02] font-bold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
                  Sobre Magic Moments
                </h1>
                <p className="text-pretty max-w-[600px] text-base font-medium text-[var(--text-accent-accessible)] md:text-lg">
                  Detalles personalizados hechos a mano para emocionar
                </p>
              </div>
              <p className="text-pretty max-w-[600px] text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                En Magic Moments convertimos tus momentos especiales en recuerdos inolvidables. Somos un emprendimiento peruano en Chimbote y Nuevo Chimbote dedicado a diseñar cajas personalizadas, cuadros 3D con luces LED, ramos temáticos y llaveros hechos a mano con cariño.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                >
                  Ver Catálogo
                </Link>
                <a
                  href="https://www.instagram.com/magic_moments050/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-page)]"
                >
                  <Instagram className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                  <span>@magic_moments050</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-card)]">
                  <Image
                    src="/images/nosotros-taller.jpg"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="Taller y empaque artesanal de Magic Moments"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Nuestros Valores
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Lo que cuidamos en cada caja, cuadro LED, ramo o llavero
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-blush)]">
                  <Heart className="h-6 w-6 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Dedicación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-sm text-[var(--text-secondary)]">
                  Cada pedido está hecho a mano con cariño y atención en cada lazo y dedicatoria.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--badge-discount-bg)]">
                  <Sparkles className="h-6 w-6 text-[var(--badge-discount-text)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Creatividad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-sm text-[var(--text-secondary)]">
                  Adaptamos temáticas favoritas (girasoles, personajes, fechas especiales) a tu estilo.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-blush)]">
                  <Package className="h-6 w-6 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Envío Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-sm text-[var(--text-secondary)]">
                  Protegemos cada detalle para entrega en Chimbote o envío nacional vía Shalom.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--badge-discount-bg)]">
                  <Gift className="h-6 w-6 text-[var(--badge-discount-text)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Personalización</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-sm text-[var(--text-secondary)]">
                  Desde un obsequio único hasta lotes pequeños de llaveros para tus eventos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-card)] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <Image
                    src="/images/productos/cuadro-3d-led-girasoles.jpg"
                    alt="Cuadro 3D con luces LED Magic Moments"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <Image
                    src="/images/productos/ramo-hot-wheels.jpg"
                    alt="Ramo temático Hot Wheels con rosas eternas"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <Image
                    src="/images/productos/box-hot-wheels-abierta.jpg"
                    alt="Box Hot Wheels personalizado Magic Moments"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <Image
                    src="/images/productos/box-flores-amarillas-abierta.jpg"
                    alt="Box Flores Amarillas lista para entrega"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col justify-center space-y-5 lg:order-2">
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
                  Nuestro Proceso
                </h2>
                <p className="text-sm text-[var(--text-secondary)] sm:text-base">
                  Así preparamos cada regalo o docena de recuerdos
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Coordinamos tu idea por WhatsApp",
                    text: "Definimos temática, colores, fotos, frase y si es entrega individual o por lote.",
                  },
                  {
                    step: 2,
                    title: "Diseño e impresión a medida",
                    text: "Preparamos láminas, fotografías, stickers, acrílicos o papel arte según el formato.",
                  },
                  {
                    step: 3,
                    title: "Armado artesanal",
                    text: "Cada caja, cuadro con luz LED, ramo o llavero se ensambla a mano en nuestro taller.",
                  },
                  {
                    step: 4,
                    title: "Entrega en Chimbote o envío Shalom",
                    text: "Coordinamos entrega en Chimbote y Nuevo Chimbote o despacho seguro a todo\u00A0el\u00A0Perú.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-cta-primary)] text-sm font-bold text-[var(--color-cta-primary-ink)] tabular-nums">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="text-pretty text-sm text-[var(--text-secondary)]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsAndShippingSection />
    </div>
  )
}
