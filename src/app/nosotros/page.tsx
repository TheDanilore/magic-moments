import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Gift, Heart, Package, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Nosotros",
}

export default function NosotrosPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section
        data-surface="obsidian"
        className="w-full bg-[var(--surface-obsidian)] py-12 text-[var(--text-on-dark)] md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-6">
              <div className="space-y-2">
                <h1 className="font-display text-3xl leading-[0.96] font-bold tracking-[-0.04em] sm:text-5xl xl:text-6xl">
                  Nuestra Historia
                </h1>
                <p className="max-w-[600px] text-base text-[var(--text-accent-on-dark)] md:text-lg">
                  Creando momentos especiales desde 2024
                </p>
              </div>
              <p className="max-w-[600px] text-sm leading-relaxed text-[var(--text-secondary-on-dark)] sm:text-base">
                Magic Moments nació de la pasión por crear regalos personalizados que transmitan emociones y fortalezcan lazos. Comenzamos como un pequeño emprendimiento familiar y hemos crecido gracias a la confianza de nuestros clientes, manteniendo siempre nuestra esencia: la atención al detalle y el amor por lo que hacemos.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/productos"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
                >
                  Ver Productos
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-on-dark)] bg-white/5 px-6 text-sm font-semibold text-[var(--text-on-dark)] hover:bg-white/10"
                >
                  Contáctanos
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-square overflow-hidden rounded-[var(--radius-stage)] border border-[var(--border-on-dark)] bg-[var(--surface-obsidian-elevated)]">
                <Image
                  src="/images/nosotros-taller.jpg"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Equipo y empaque artesanal de Magic Moments"
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
              Nuestros Valores
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Los principios que guían nuestro trabajo día a día
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  <Heart className="h-9 w-9 text-[var(--color-cta-primary)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Pasión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Amamos lo que hacemos y ponemos nuestro corazón en cada detalle que creamos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  <Sparkles className="h-9 w-9 text-[var(--color-cta-primary)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Creatividad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Buscamos constantemente nuevas ideas y formas de sorprender a nuestros clientes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  <Package className="h-9 w-9 text-[var(--color-cta-primary)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Calidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Utilizamos los mejores materiales y cuidamos cada detalle para ofrecer productos excepcionales.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-center">
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  <Gift className="h-9 w-9 text-[var(--color-cta-primary)]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 font-display">Personalización</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Creemos que cada regalo debe ser único, como la persona que lo recibe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-card)] py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
              Nuestro Equipo
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Las personas que hacen posible cada detalle
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-[var(--surface-card)]">
                  <Image
                    src="/images/prod-caja-cumpleanos-detalle.jpg"
                    alt="Curaduría creativa en Magic Moments"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="font-display">María Rodríguez</CardTitle>
                <CardDescription className="mt-1">Fundadora y Directora Creativa</CardDescription>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Apasionada por el diseño y la creación de experiencias memorables a través de regalos personalizados.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-[var(--surface-card)]">
                  <Image
                    src="/images/nosotros-proceso.jpg"
                    alt="Diseño artesanal de tarjetas y regalos"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="font-display">Carlos Gómez</CardTitle>
                <CardDescription className="mt-1">Diseñador Principal</CardDescription>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Experto en diseño gráfico y papelería fina con un ojo especial para los detalles que hacen único cada producto.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-[var(--surface-card)]">
                  <Image
                    src="/images/prod-kit-amistad.jpg"
                    alt="Atención personalizada y armado de kits"
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="studio-photo-adapt object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="font-display">Laura Martínez</CardTitle>
                <CardDescription className="mt-1">Atención al Cliente</CardDescription>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Dedicada a coordinar cada pedido por WhatsApp para que llegue puntual y perfecto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                    <Image
                      src="/images/nosotros-taller.jpg"
                      alt="Taller de Magic Moments"
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="studio-photo-adapt object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                    <Image
                      src="/images/nosotros-proceso.jpg"
                      alt="Proceso creativo Magic Moments"
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="studio-photo-adapt object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                    <Image
                      src="/images/prod-tarjeta-felicitacion.jpg"
                      alt="Materiales de papelería y sello de lacre"
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="studio-photo-adapt object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                    <Image
                      src="/images/prod-caja-amor.jpg"
                      alt="Producto terminado listo para envío"
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="studio-photo-adapt object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col justify-center space-y-5 lg:order-2">
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
                  Nuestro Proceso
                </h2>
                <p className="text-sm text-[var(--text-secondary)] sm:text-base">
                  Cómo creamos cada detalle con amor y dedicación
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Diseño Personalizado",
                    text: "Escuchamos tus ideas por WhatsApp y definimos colores, temática y dedicatoria.",
                  },
                  {
                    step: 2,
                    title: "Selección de Materiales",
                    text: "Elegimos papel algodón, cintas de satén, cajas rígidas y accesorios duraderos.",
                  },
                  {
                    step: 3,
                    title: "Elaboración Artesanal",
                    text: "Cada caja, tarjeta o kit se arma a mano cuidando hasta el último lazo.",
                  },
                  {
                    step: 4,
                    title: "Control de Calidad y Envío",
                    text: "Revisamos cada pieza y protegemos tu pedido para envío seguro vía Shalom o delivery.",
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
                      <p className="text-sm text-[var(--text-secondary)]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
