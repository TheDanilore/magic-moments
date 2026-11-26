import Link from "next/link"
import Image from "next/image"
import { MessageCircle, PackageCheck, Sparkles } from "lucide-react"
import { buildPromoMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

export default function PromoSection() {
  const batchWhatsappUrl = buildWhatsAppUrl(
    buildPromoMessage(
      "Pedido por lote / recuerdo personalizado",
      "Hola Magic Moments, quiero cotizar un lote pequeño (ej. 12 llaveros acrílicos o recuerdos para evento)."
    )
  )

  return (
    <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-warm-sun)]/65 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center space-y-5 lg:col-span-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--badge-discount-bg)] px-3.5 py-1.5 text-xs font-bold text-[var(--badge-discount-text)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Por unidad o en lotes para eventos</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
                Llaveros Acrílicos y Recuerdos a Medida
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                ¿Buscas un detalle único o recuerdos por cantidad para cumpleaños, promociones o eventos? Armamos desde 1 pieza hasta lotes de 12 o más llaveros con tus fotos, nombres o diseño.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={batchWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Cotizar lote por WhatsApp</span>
              </a>
              <Link
                href="/productos/2"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-blush)]"
              >
                Ver llaveros acrílicos
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6 lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--surface-blush)]">
              <Image
                src="/images/prod-llaveros-acrilicos.jpg"
                alt="Lote de 12 llaveros acrílicos personalizados con ilustraciones y borlas"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="studio-photo-adapt object-cover"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Envío Shalom transparente
                </h3>
                <p className="text-pretty mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  Calculamos automáticamente el paquete Shalom según peso y tamaño desde S/ 8.00 (XXS), o entrega directa en Chimbote y Nuevo Chimbote.
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-[var(--border-subtle)] pt-3 text-xs sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                <PackageCheck
                  className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]"
                  aria-hidden="true"
                />
                <span className="font-medium text-[var(--text-primary)]">
                  Presets rápidos de 1, 6 y 12 unidades disponibles en catálogo.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
