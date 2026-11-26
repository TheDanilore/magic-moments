import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, PackageCheck, Sparkles } from "lucide-react"
import { buildPromoMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

export default function PromoSection() {
  const promoWhatsappUrl = buildWhatsAppUrl(
    buildPromoMessage(
      "Packs y promociones Magic Moments",
      "Hola Magic Moments, quiero consultar por los packs promocionales y envíos disponibles."
    )
  )

  return (
    <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-card)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center space-y-5 lg:col-span-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--badge-discount-bg)] px-3.5 py-1.5 text-xs font-bold text-[var(--badge-discount-text)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Packs, docenas y envíos</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
                Promociones y Packs para Sorprender
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Combina tu Caja Personalizada o Cuadro 3D LED con tarjeta dedicatoria, cotiza docenas de llaveros acrílicos para eventos y aprovecha envío gratis vía Shalom desde S/ 150.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/promociones"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] transition-colors hover:bg-[var(--color-cta-primary-hover)]"
              >
                <span>Ver promociones</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              <a
                href={promoWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6 lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[var(--surface-blush)]">
              <Image
                src="/images/productos/box-flores-amarillas-abierta.jpg"
                alt="Box Flores Amarillas con girasol tejido, chocolates y tarjetas Magic Moments"
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
                  Tarifa referencial desde S/ 8.00 según peso y caja, o envío gratis en compras mayores a S/ 150.00.
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-[var(--border-subtle)] pt-3 text-xs sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                <PackageCheck
                  className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]"
                  aria-hidden="true"
                />
                <span className="font-medium text-[var(--text-primary)]">
                  Packs Caja + Tarjeta 3D y docenas de llaveros acrílicos listos para cotizar.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
