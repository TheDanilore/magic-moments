import type { Metadata } from "next"
import { Clock, Instagram, MapPin, Phone } from "lucide-react"

import { ContactFormClient } from "@/components/ContactFormClient"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { buildWhatsAppUrl, getWhatsAppDisplayPhone } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Contacto",
}

export default function ContactoPage() {
  const whatsappUrl = buildWhatsAppUrl("Hola Magic Moments, tengo una consulta.")
  const whatsappPhone = getWhatsAppDisplayPhone()

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-page)]">
      <section className="hero-atelier-gradient w-full border-b border-[var(--border-subtle)] pt-24 pb-12 text-[var(--text-primary)] md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl leading-[0.98] font-bold tracking-[-0.04em] text-balance sm:text-5xl">
              Contáctanos
            </h1>
            <p className="text-pretty mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
              Atendemos desde Chimbote y Nuevo Chimbote para todo el Perú. Escríbenos por WhatsApp o Instagram y armamos tu detalle a medida.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Canales Directos
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Coordina pedidos individuales, lotes de llaveros o envíos Shalom directamente con nosotros.
                </p>
              </div>
              <div className="grid gap-4">
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <MapPin className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Ubicación y Envíos</CardTitle>
                      <CardDescription className="mt-1">
                        Chimbote y Nuevo Chimbote, Áncash · Envíos a todo el Perú vía Shalom
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Phone className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">WhatsApp / Pedidos</CardTitle>
                      <CardDescription className="mt-1">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--color-whatsapp)] underline underline-offset-2"
                        >
                          {whatsappPhone}
                        </a>
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Instagram className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Instagram Oficial</CardTitle>
                      <CardDescription className="mt-1">
                        <a
                          href="https://www.instagram.com/magic_moments050/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--text-accent-accessible)] underline underline-offset-2"
                        >
                          @magic_moments050
                        </a>
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Clock className="h-5 w-5 shrink-0 text-[var(--text-accent-accessible)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Horario de Atención</CardTitle>
                      <CardDescription className="mt-1">
                        Lunes a Sábado: coordinación de pedidos y envíos por WhatsApp
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                <CardHeader>
                  <CardTitle className="font-display">Envíanos un Mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y se abrirá WhatsApp ({whatsappPhone}) con tu consulta lista para enviar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactFormClient />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section
        id="preguntas-frecuentes"
        className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-blush)]/45 py-12 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-[var(--text-primary)] md:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Respuestas rápidas sobre personalización, lotes y envíos
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Hacen entregas locales y envíos a provincia?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Sí, entregamos en Chimbote y Nuevo Chimbote, y enviamos a todo el Perú vía Shalom (agencia a agencia) con tarifas referenciales desde S/ 8.00.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Puedo personalizar completamente mi pedido?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  ¡Sí! Personalizamos cajas, cuadros 3D con luces LED, ramos y llaveros según tus fotos, temática favorita, colores y dedicatoria.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Venden llaveros acrílicos por mayor?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Sí, atendemos tanto pedidos unitarios como lotes pequeños (por ejemplo 12 llaveros o más para recuerdos y eventos). Cotiza tu cantidad por WhatsApp.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Qué métodos de pago aceptan?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Aceptamos Yape, Plin y transferencia bancaria. Al confirmar tu pedido por WhatsApp te enviamos los datos para separar tu elaboración.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Dónde puedo ver trabajos ya entregados?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  En nuestro Instagram oficial @magic_moments050 puedes revisar reels, fotos recientes y las destacadas de Clientes, Llaveros y Envíos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Con cuánta anticipación debo pedir?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Como cada detalle se arma a mano, recomendamos escribirnos por WhatsApp unos días antes de tu fecha especial para asegurar disponibilidad y envío.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
