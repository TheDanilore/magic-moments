import Link from "next/link"
import { CheckCircle2, Instagram, MapPin, MessageCircle, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const CLIENT_REACTIONS = [
  {
    quote: "Quedó tal cual lo tenía en mi cabeza. Gracias ❤️",
    detail: "Box temática personalizada · Entrega local",
    source: "Clientes ❤️ · WhatsApp",
  },
  {
    quote: "Está hermosooo 😍😍😍😍",
    detail: "Box personalizada con lazo rosado y dedicatoria",
    source: "Clientes ❤️ · WhatsApp",
  },
  {
    quote: "Lindo tu trabajo, gracias amiga",
    detail: "Pedido entregado personalmente · Confirmado por WhatsApp",
    source: "Clientes ❤️ · WhatsApp",
  },
  {
    quote: "Está bien, muchas gracias por la indicación",
    detail: "Envío protegido con tecnopor y aviso de apertura cuidadosa",
    source: "Envíos 📦 · Shalom Callao",
  },
] as const

const REAL_SHIPMENTS = [
  {
    destination: "La Unión, Piura",
    packageType: "Box personalizada con lazo lila",
    protection: "Caja sellada con etiqueta FRÁGIL",
  },
  {
    destination: "Mala, Cañete",
    packageType: "Pedido completo en caja grande",
    protection: "Embalaje kraft reforzado vía Shalom",
  },
  {
    destination: "Callao, Lima",
    packageType: "Paquete XXS (S/ 8.00 ref.)",
    protection: "Protección interior con tecnopor + clave de recojo",
  },
  {
    destination: "Envíos nacionales de llaveros",
    packageType: "Lotes y dúos «Llévame siempre contigo»",
    protection: "Doble envoltura kraft + film protector",
  },
] as const

export default function ClientsAndShippingSection() {
  const quoteUrl = buildWhatsAppUrl(
    "Hola Magic Moments, vi sus envíos y entregas reales. Quiero cotizar mi pedido."
  )

  return (
    <section
      aria-labelledby="clientes-envios-heading"
      className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-blush)] py-12 md:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2
              id="clientes-envios-heading"
              className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl"
            >
              Clientes felices y envíos comprobados
            </h2>
            <p className="text-pretty mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Reacciones reales compartidas en nuestras historias destacadas de{" "}
              <span className="font-semibold text-[var(--text-primary)]">Clientes ❤️</span> y{" "}
              <span className="font-semibold text-[var(--text-primary)]">Envíos 📦</span> desde Chimbote a todo el Perú.
            </p>
          </div>

          <a
            href="https://www.instagram.com/magic_moments050/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)] hover:text-[var(--text-accent-accessible)] md:self-auto"
          >
            <Instagram className="h-4 w-4 text-[var(--text-accent-accessible)]" aria-hidden="true" />
            <span>Ver destacadas en @magic_moments050</span>
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left: Real WhatsApp Client Reactions */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {CLIENT_REACTIONS.map((item) => (
              <article
                key={item.quote}
                className="flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--text-accent-accessible)]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{item.source}</span>
                    </span>
                  </div>
                  <blockquote className="text-pretty mt-3 font-display text-base leading-snug font-bold text-[var(--text-primary)] sm:text-lg">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <p className="text-pretty mt-3 border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>

          {/* Right: Real Shalom Shipments Panel */}
          <div className="flex flex-col justify-between rounded-[var(--radius-stage)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-sm sm:p-6 lg:col-span-5">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-blush)] text-[var(--text-accent-accessible)]">
                  <Truck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-balance font-display text-lg font-bold text-[var(--text-primary)]">
                    Despachos reales vía Shalom
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Embalaje protector con tecnopor, kraft y etiqueta FRÁGIL
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {REAL_SHIPMENTS.map((shipment) => (
                  <li
                    key={shipment.destination}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-3.5"
                  >
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                        {shipment.destination}
                      </p>
                      <p className="text-pretty mt-0.5 text-xs font-medium text-[var(--text-secondary)]">
                        {shipment.packageType}
                      </p>
                      <p className="text-pretty mt-0.5 inline-flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
                        <ShieldCheck className="h-3 w-3 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                        <span>{shipment.protection}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 border-t border-[var(--border-subtle)] pt-4 sm:flex-row">
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 text-xs font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Coordinar envío</span>
              </a>
              <Link
                href="/productos"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-page)] px-4 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-cta-primary)]"
              >
                <PackageCheck className="h-4 w-4 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                <span>Ver catálogo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
