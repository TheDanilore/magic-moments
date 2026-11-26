import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Package, Sparkles, Truck } from "lucide-react"

import { PromoWhatsAppButton } from "@/components/PromoActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Lotes y Pedidos a Medida",
}

export default function PromocionesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="hero-atelier-gradient w-full border-b border-[var(--border-subtle)] pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--badge-discount-bg)] px-3.5 py-1.5 text-xs font-bold text-[var(--badge-discount-text)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Unidad · Lotes pequeños · Envíos Shalom</span>
              </div>
              <div className="space-y-3">
                <h1 className="font-display text-3xl leading-[0.98] font-bold tracking-[-0.04em] text-balance sm:text-5xl">
                  Pedidos Personalizados y Lotes para Eventos
                </h1>
                <p className="text-pretty max-w-xl text-base text-[var(--text-secondary)]">
                  Cotiza detalles individuales o pequeños lotes por mayor (como 12 o más llaveros acrílicos) hechos a mano en Chimbote con envíos a todo el Perú.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PromoWhatsAppButton
                  promoTitle="Cotización de pedido / lote personalizado"
                  promoDetails="Hola Magic Moments, quiero cotizar un pedido personalizado o un lote pequeño para evento."
                  label="Cotizar por WhatsApp"
                  size="lg"
                  className="min-h-12 rounded-full bg-[var(--color-whatsapp)] px-6 text-sm font-semibold text-[var(--color-whatsapp-ink)] hover:bg-[var(--color-whatsapp-hover)]"
                />
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-blush)]"
                >
                  Ver catálogo
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-2 shadow-sm">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--radius-stage)-0.35rem)] bg-[var(--surface-blush)]">
                  <Image
                    src="/images/prod-llaveros-acrilicos.jpg"
                    alt="Lote de 12 llaveros acrílicos personalizados Magic Moments"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
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
              Opciones por Categoría y Cantidad
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Elige la modalidad que mejor se adapte a tu regalo o evento y coordínala directo con nuestro taller
            </p>
          </div>

          <div className="mx-auto mt-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full justify-start overflow-auto">
                <TabsTrigger value="all" className="min-h-10">Todas</TabsTrigger>
                <TabsTrigger value="llaveros" className="min-h-10">Llaveros en lote</TabsTrigger>
                <TabsTrigger value="cajas" className="min-h-10">Cajas y Ramos</TabsTrigger>
                <TabsTrigger value="cuadros" className="min-h-10">Cuadros 3D LED</TabsTrigger>
                <TabsTrigger value="envios" className="min-h-10">Envíos Shalom</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Lotes de Llaveros Acrílicos</CardTitle>
                          <CardDescription>Desde 6 o 12 unidades iguales o variadas</CardDescription>
                        </div>
                        <span className="rounded-full bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-bold text-[var(--badge-discount-text)]">
                          12+ u.
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/prod-llaveros-acrilicos.jpg"
                          alt="Lote de llaveros acrílicos personalizados"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Ideales para cumpleaños, recuerdos escolares, parejas o eventos. Incluye diseño a medida y herraje dorado o plateado.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="Lote de Llaveros Acrílicos (12+ unidades)"
                        promoDetails="Hola, quiero cotizar un lote de llaveros acrílicos personalizados."
                        label="Cotizar lote por WhatsApp"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Cuadros 3D con Luces LED</CardTitle>
                          <CardDescription>Disponible en 2 modelos personalizables</CardDescription>
                        </div>
                        <span className="rounded-full bg-[var(--surface-blush)] px-2.5 py-1 text-xs font-bold text-[var(--text-accent-accessible)]">
                          2 modelos
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/prod-cuadro-3d-led.jpg"
                          alt="Cuadro 3D con luces LED"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Marcos luminosos de girasoles, Snoopy, personajes o foto especial. Armados y embalados para viajar seguros a todo el Perú.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="Cuadro 3D con Luces LED"
                        promoDetails="Quiero elegir modelo y temática para un Cuadro 3D con luces LED."
                        label="Personalizar Cuadro LED"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Envíos Shalom y Delivery</CardTitle>
                          <CardDescription>Gratis en pedidos mayores a S/ 150</CardDescription>
                        </div>
                        <span className="rounded-full bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-bold text-[var(--badge-discount-text)]">
                          Desde S/ 8
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-blush)]">
                        <Image
                          src="/images/prod-ramo-eterno.jpg"
                          alt="Ramo temático y envío Shalom"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Entrega coordinada en Chimbote y Nuevo Chimbote, o envío nacional Shalom con cálculo automático desde el carrito.
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

              <TabsContent value="llaveros" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Llaveros Acrílicos por Unidad o Docena</CardTitle>
                    <CardDescription>Presupuestos a medida desde 1 hasta 12+ unidades</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <p>
                      Puedes combinar fotos, iniciales florales o temáticas de eventos en acrílico transparente circular o rectangular.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                      <Package className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                      <span>12 llaveros acrílicos caben fácilmente en Paquete XXS / XS Shalom.</span>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Link
                      href="/productos/2"
                      className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)]"
                    >
                      Configurar cantidad
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="cajas" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Cajas Temáticas y Ramos Eternos</CardTitle>
                    <CardDescription>Hot Wheels, Flores Amarillas, Cumpleaños y Aniversarios</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-[var(--text-secondary)]">
                    Personalizamos la temática completa, la cinta de satén, las fotos instantáneas y la tarjeta con dedicatoria.
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="/productos?categoria=cajas-sorpresa"
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)]"
                    >
                      Ver Cajas Personalizadas
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="cuadros" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Cuadros 3D con Luces LED (2 Modelos)</CardTitle>
                    <CardDescription>Iluminación cálida + diseño 3D + foto personalizada</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-[var(--text-secondary)]">
                    Elige temática de girasoles, Snoopy, fútbol o pareja. Coordinamos tu boceto antes de armarlo.
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="/productos/9"
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-5 text-sm font-semibold text-[var(--color-cta-primary-ink)]"
                    >
                      Ver Cuadro 3D LED
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="envios" className="mt-0">
                <Card className="max-w-xl border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardHeader>
                    <CardTitle className="font-display">Cobertura Chimbote y Todo el Perú</CardTitle>
                    <CardDescription>Tarifario referencial Shalom según peso y dimensiones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                      <span>Entrega local en Chimbote y Nuevo Chimbote coordinada por WhatsApp.</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-[var(--color-whatsapp)]" aria-hidden="true" />
                      <span>Envíos agencia a agencia Shalom desde S/ 8.00 (gratis desde S/ 150.00).</span>
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
