import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Share2, Users } from "lucide-react"

import { PromoShareButton, PromoWhatsAppButton } from "@/components/promo-actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Promociones",
}

export default function PromocionesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section
        data-surface="obsidian"
        className="w-full bg-[var(--surface-obsidian)] py-12 text-[var(--text-on-dark)] md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
              <div className="space-y-3">
                <h1 className="font-display text-3xl leading-[0.96] font-bold tracking-[-0.04em] sm:text-5xl">
                  Promociones y Sorteos
                </h1>
                <p className="max-w-xl text-base text-[var(--text-secondary-on-dark)]">
                  Descubre nuestras promociones vigentes y participa en el sorteo mensual de una caja sorpresa personalizada.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PromoShareButton
                  label="Compartir y Participar"
                  size="lg"
                  className="min-h-12 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                />
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-white/5 px-6 text-sm font-semibold text-[var(--text-on-dark)] hover:bg-white/10"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)]">
                <Image
                  src="/images/promo-sorteo-caja.jpg"
                  alt="Promociones y sorteos Magic Moments"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
              Sorteo Mensual
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Comparte nuestra página en tus redes sociales y participa por una caja personalizada completamente gratis.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <Card className="overflow-hidden border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader className="pb-0">
                <CardTitle className="font-display text-2xl">¡Gana una Caja Sorpresa!</CardTitle>
                <CardDescription>Sorteo mensual entre todos los participantes</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-[var(--surface-card)]">
                  <Image
                    src="/images/promo-sorteo-caja.jpg"
                    alt="Caja sorpresa de regalo"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-card)] text-[var(--color-cta-primary)]">
                      <Share2 className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2.5 font-display font-semibold">Paso 1</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      Comparte nuestra web en tus redes sociales y etiquétanos
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-card)] text-[var(--color-cta-primary)]">
                      <Users className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2.5 font-display font-semibold">Paso 2</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      Envíanos tus datos y captura por WhatsApp para confirmar
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-card)] text-[var(--color-cta-primary)]">
                      <Calendar className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2.5 font-display font-semibold">Paso 3</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      Espera al sorteo el último día del mes
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-[var(--surface-card)] p-6">
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <PromoWhatsAppButton
                    promoTitle="Sorteo Mensual Caja Sorpresa"
                    promoDetails="Quiero registrar mi participación en el sorteo mensual de Magic Moments."
                    label="Participar Ahora"
                    className="min-h-12 w-full rounded-full bg-[var(--color-whatsapp)] text-sm font-semibold text-[var(--color-whatsapp-ink)] hover:bg-[var(--color-whatsapp-hover)]"
                  />
                  <PromoShareButton
                    label="Compartir"
                    variant="outline"
                    size="lg"
                    className="min-h-12 w-full rounded-full border-[var(--border-strong)] bg-[var(--surface-elevated)]"
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-card)] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
              Promociones Actuales
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Aprovecha nuestras campañas vigentes por tiempo limitado
            </p>
          </div>

          <div className="mx-auto mt-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 w-full justify-start overflow-auto">
                <TabsTrigger value="all" className="min-h-10">Todas</TabsTrigger>
                <TabsTrigger value="cajas" className="min-h-10">Cajas Sorpresa</TabsTrigger>
                <TabsTrigger value="llaveros" className="min-h-10">Llaveros</TabsTrigger>
                <TabsTrigger value="tarjetas" className="min-h-10">Tarjetas</TabsTrigger>
                <TabsTrigger value="kits" className="min-h-10">Kits de Regalo</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">2x1 en Llaveros</CardTitle>
                          <CardDescription>Válido hasta fin de mes</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          2x1
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-llavero-cristal.jpg"
                          alt="Promoción 2x1 en llaveros"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Lleva dos llaveros personalizados por el precio de uno. Aplica para todos los diseños.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="2x1 en Llaveros"
                        promoDetails="Me interesa llevar 2 llaveros personalizados al precio de 1."
                        label="Aprovechar Oferta"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">30% en Cajas Sorpresa</CardTitle>
                          <CardDescription>En temáticas seleccionadas</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          -30%
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-caja-cumpleanos.jpg"
                          alt="Promoción de cajas sorpresa"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        30% de descuento en nuestras cajas sorpresa temáticas. ¡Sorprende a tus seres queridos!
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="30% en Cajas Sorpresa"
                        promoDetails="Quiero coordinar una Caja Sorpresa con el 30% de descuento."
                        label="Aprovechar Oferta"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>

                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Envío Gratis Shalom</CardTitle>
                          <CardDescription>En compras mayores a S/ 150</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          Gratis
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-kit-amistad.jpg"
                          alt="Promoción de envío gratis Shalom"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Envío gratis vía Shalom a todo el Perú en compras superiores a S/ 150. Se aplica automáticamente en tu pedido.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/productos"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-cta-dark)] text-sm font-semibold text-[var(--color-cta-dark-ink)] transition-colors hover:opacity-90"
                      >
                        Comprar Ahora
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cajas" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">30% en Cajas Sorpresa</CardTitle>
                          <CardDescription>En temáticas seleccionadas</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          -30%
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-caja-cumpleanos.jpg"
                          alt="Promoción de cajas sorpresa"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        30% de descuento en todas nuestras cajas sorpresa temáticas. ¡Sorprende a tus seres queridos!
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="30% en Cajas Sorpresa"
                        promoDetails="Quiero coordinar una Caja Sorpresa con el 30% de descuento."
                        label="Aprovechar Oferta"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="llaveros" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">2x1 en Llaveros</CardTitle>
                          <CardDescription>Válido hasta fin de mes</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          2x1
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-llavero-cristal.jpg"
                          alt="Promoción de llaveros"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Lleva dos llaveros personalizados por el precio de uno. Aplica para todos los diseños.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="2x1 en Llaveros"
                        promoDetails="Me interesa llevar 2 llaveros personalizados al precio de 1."
                        label="Aprovechar Oferta"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tarjetas" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">20% en Tarjetas 3D</CardTitle>
                          <CardDescription>En paquetes de 3 o más tarjetas</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          -20%
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-tarjeta-3d.jpg"
                          alt="Promoción de tarjetas personalizadas"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Personaliza tus tarjetas 3D y de felicitación con un 20% de descuento al llevar tres o más.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <PromoWhatsAppButton
                        promoTitle="20% en Tarjetas 3D"
                        promoDetails="Quiero pedir un paquete de 3 o más tarjetas personalizadas con 20% de descuento."
                        label="Aprovechar Oferta"
                        showGiftIcon
                        className="min-h-12 w-full rounded-full bg-[var(--color-cta-primary)] text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                      />
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="kits" className="mt-0">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                    <CardHeader className="pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="font-display">Envío Gratis en Kits</CardTitle>
                          <CardDescription>En compras mayores a S/ 150</CardDescription>
                        </div>
                        <span className="rounded-md bg-[var(--badge-discount-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--badge-discount-text)]">
                          Gratis
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--surface-card)]">
                        <Image
                          src="/images/prod-kit-amistad.jpg"
                          alt="Promoción de kits de regalo"
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="studio-photo-adapt object-cover"
                        />
                      </div>
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        Combina tus kits de regalo favoritos y obtén envío gratis vía Shalom en pedidos superiores a S/ 150.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/productos?categoria=kits-regalo"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-cta-dark)] text-sm font-semibold text-[var(--color-cta-dark-ink)] transition-colors hover:opacity-90"
                      >
                        Ver Kits de Regalo
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
