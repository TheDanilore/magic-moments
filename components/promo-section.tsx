import Link from "next/link"
import Image from "next/image"
import { PromoShareButton, PromoWhatsAppButton } from "@/components/promo-actions"

export default function PromoSection() {
  return (
    <section className="w-full border-y border-[var(--border-subtle)] bg-[var(--surface-card)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center space-y-5 lg:col-span-5">
            <div className="space-y-2.5">
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
                Sorteo Mensual de Caja Sorpresa
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Comparte nuestra boutique en tus redes sociales, envíanos tu captura por WhatsApp y participa por una caja personalizada completamente gratis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PromoShareButton
                label="Compartir y Participar"
                size="lg"
                className="min-h-12 rounded-full bg-[var(--color-cta-primary)] px-6 text-sm font-semibold text-[var(--color-cta-primary-ink)] hover:bg-[var(--color-cta-primary-hover)]"
              />
              <Link
                href="/promociones"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-6 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-page)]"
              >
                Ver promociones
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6 lg:col-span-7">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--surface-card)]">
              <Image
                src="/images/promo-sorteo-caja.jpg"
                alt="Caja sorpresa edición sorteo Magic Moments"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="studio-photo-adapt object-cover"
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:items-end">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Cómo participar
                </h3>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  <li>Comparte nuestra web y etiquétanos en tu historia.</li>
                  <li>Envíanos tu captura por WhatsApp para quedar registrado.</li>
                  <li>El ganador se anuncia el último día de cada mes.</li>
                </ol>
              </div>
              <PromoWhatsAppButton
                promoTitle="Sorteo Mensual Caja Sorpresa"
                promoDetails="Ya compartí la página y quiero registrar mi participación en el sorteo mensual."
                label="Participar por WhatsApp"
                className="min-h-12 w-full rounded-full bg-[var(--color-whatsapp)] text-sm font-semibold text-[var(--color-whatsapp-ink)] hover:bg-[var(--color-whatsapp-hover)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
