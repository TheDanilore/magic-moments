import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Package, Sparkles, Truck } from "lucide-react"

import { PromoWhatsAppButton } from "@/components/PromoActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Promociones",
}

export default function PromocionesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="w-full border-b border-[var(--border-subtle)] bg-[var(--surface-blush)] pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--badge-discount-bg)] px-3.5 py-1.5 text-xs font-bold text-[var(--badge-discount-text)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Packs · Docenas · Envíos Shalom</span>
              </div>
              <div className="space-y-3">
                <h1 className="font-display text-3xl leading-[0.98] font-bold tracking-[-0.04em] text-balance sm:text-5xl">
                  Promociones y Packs de Regalo
                </h1>
                <p className="text-pretty max-w-xl text-base text-[var(--text-secondary)]">
                  Aprovecha nuestros packs combinados, cotizaciones especiales por docena de llaveros acrílicos y el beneficio de envío gratis vía Shalom desde S/ 150.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PromoWhatsAppButton
                  promoTitle="Promociones y Packs Magic Moments"
                  promoDetails="Hola Magic Moments, quiero consultar por las promociones y packs vigentes."
                  label="Consultar por WhatsApp"
                  size="lg"
                  className="min-h-12 rounded-full bg-[var(--color-whatsapp)] px-6 text-sm font-semibold text-[var(--color-whatsapp-ink)] hover:bg-[var(--color-whatsapp-hover)]"
                />
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-page)]"
                >
                  Ver catálogo
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-card)]">
                  <Image
                    src="/images/productos/box-hot-wheels-abierta.jpg"
                    alt="Packs y promociones de regalos personalizados Magic Moments"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
              Promociones Disponibles
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Beneficios y packs activos para coordinar directamente por WhatsApp
            </p>
          </div>

          <div className="mx-auto mt-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full justify-start gap-1">
                <TabsTrigger value="all" className="min-h-10">Todas</TabsTrigger>
                <TabsTrigger value="packs" className="min-h-10">Packs Regalo</TabsTrigger>
                <TabsTrigger value="llaveros" className="min-h-10">Docena de Llaveros</TabsTrigger>
                <TabsTrigger value="envios" className="min-h-10">Envío Shalom</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Pack Caja o Cuadro + Tarjeta 3D</CardTitle>
                          <CardDescription>Dedicatoria sellada incluida en tu combo</CardDescription>
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-bold text-[var(--badge-discount-text)]">
                          Pack
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/productos/cuadro-3d-led-girasoles.jpg"
                          alt="Pack Cuadro 3D con luces LED y tarjeta personalizada"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="text-pretty mt-4 text-sm text-[var(--text-secondary)]">
                        Arma tu Caja Temática o Cuadro 3D LED junto con una Tarjeta 3D artesanal y coordina el combo personalizado por WhatsApp.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="Pack Caja o Cuadro 3D LED + Tarjeta 3D"
                        promoDetails="Hola, quiero cotizar el Pack de Caja o Cuadro 3D LED con Tarjeta 3D."
                        label="Cotizar Pack por WhatsApp"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Docena de Llaveros Acrílicos</CardTitle>
                          <CardDescription>Tarifa especial desde 12 unidades</CardDescription>
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--surface-blush)] px-2.5 py-1 text-xs font-bold text-[var(--text-accent-accessible)]">
                          12+ u.
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/productos/box-hot-wheels-detalle.jpg"
                          alt="Promoción por docena en llaveros acrílicos personalizados"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="text-pretty mt-4 text-sm text-[var(--text-secondary)]">
                        Ideales para cumpleaños, eventos o recuerdos. Personaliza fotos o ilustraciones y solicita precio especial por docena en WhatsApp.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="Promoción Docena de Llaveros Acrílicos (12+ u.)"
                        promoDetails="Hola, quiero consultar el precio promocional por docena de llaveros acrílicos."
                        label="Consultar Promo 12+"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Envío Shalom Gratis</CardTitle>
                          <CardDescription>Referencial en pedidos mayores a S/ 150</CardDescription>
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-bold text-[var(--badge-discount-text)]">
                          Gratis
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/productos/ramo-hot-wheels.jpg"
                          alt="Envío Shalom gratis en compras mayores a S/ 150"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="text-pretty mt-4 text-sm text-[var(--text-secondary)]">
                        Combina tus detalles favoritos y al superar S/ 150.00 el carrito aplica envío Shalom sin costo referencial a todo el Perú.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/productos"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-cta-dark)] text-sm font-semibold text-[var(--color-cta-dark-ink)] transition-colors hover:opacity-90"
                      >
                        Armar mi pedido
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="packs" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Pack Caja o Cuadro 3D LED + Tarjeta 3D</CardTitle>
                    <CardDescription>Arma tu regalo completo en una sola coordinación</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-[var(--text-secondary)]">
                    Elige tu caja temática, ramo o cuadro con luces LED y súmale una tarjeta dedicatoria en papel algodón.
                  </CardContent>
                  <CardFooter>
                    <PromoWhatsAppButton
                      promoTitle="Pack Regalo Personalizado"
                      promoDetails="Hola, quiero cotizar un pack combinado de regalo."
                      label="Cotizar Pack por WhatsApp"
                      showGiftIcon
                      className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)]"
                    />
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="llaveros" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Llaveros Acrílicos por Docena (12+ u.)</CardTitle>
                    <CardDescription>Atención por unidad o en cantidad para tus eventos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <p>
                      Personalizamos diseños circulares o rectangulares con tus fotos, iniciales florales o temática especial.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                      <Package className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                      <span>12 llaveros acrílicos caben en Paquete XS Shalom (S/ 10.00 ref.).</span>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Link
                      href="/productos/2"
                      className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)]"
                    >
                      Configurar 12 llaveros
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="envios" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Beneficio de Envío Shalom y Entrega Local</CardTitle>
                    <CardDescription>Chimbote, Nuevo Chimbote y envíos a todo el Perú</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                      <span>Entrega local en Chimbote y Nuevo Chimbote coordinada por WhatsApp.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-[var(--color-whatsapp)]" aria-hidden="true" />
                      <span>Envíos Shalom desde S/ 8.00 y gratis referencial desde S/ 150.00.</span>
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
