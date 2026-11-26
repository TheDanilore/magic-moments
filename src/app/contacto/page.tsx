import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

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
      <section
        data-surface="obsidian"
        className="w-full bg-[var(--surface-obsidian)] py-12 text-[var(--text-on-dark)] md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl leading-[0.96] font-bold tracking-[-0.04em] sm:text-5xl">
              Contáctanos
            </h1>
            <p className="mt-3 text-sm text-[var(--text-secondary-on-dark)] sm:text-base">
              Estamos aquí para ayudarte. Envíanos un mensaje directo a WhatsApp y te responderemos lo antes posible.
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
                  Información de Contacto
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Puedes escribirnos directamente por WhatsApp, correo electrónico o usando el formulario.
                </p>
              </div>
              <div className="grid gap-4">
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <MapPin className="h-5 w-5 shrink-0 text-[var(--color-cta-primary)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Ubicación y Envíos</CardTitle>
                      <CardDescription className="mt-1">
                        Lima, Perú · Envíos a todo el país vía Shalom y delivery local
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Phone className="h-5 w-5 shrink-0 text-[var(--color-cta-primary)]" aria-hidden="true" />
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
                    <Mail className="h-5 w-5 shrink-0 text-[var(--color-cta-primary)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Email</CardTitle>
                      <CardDescription className="mt-1">
                        <a
                          href="mailto:info@magicmoments.com"
                          className="underline underline-offset-2 hover:text-[var(--text-primary)]"
                        >
                          info@magicmoments.com
                        </a>
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                  <CardContent className="flex items-start gap-4 p-5">
                    <Clock className="h-5 w-5 shrink-0 text-[var(--color-cta-primary)]" aria-hidden="true" />
                    <div>
                      <CardTitle className="font-display text-base">Horario de Atención</CardTitle>
                      <CardDescription className="mt-1">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                        <br />
                        Sábados: 10:00 AM - 2:00 PM
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
                    Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar.
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
        className="w-full border-t border-[var(--border-subtle)] bg-[var(--surface-card)] py-12 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] md:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Encuentra respuestas a las consultas más habituales
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Cuánto tiempo tarda en llegar mi pedido?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Realizamos envíos nacionales vía Shalom (agencia a agencia) con entrega estimada de 2 a 4 días hábiles, y delivery local en Lima coordinado directamente por WhatsApp.
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
                  ¡Sí! Todos nuestros productos pueden personalizarse según tus preferencias: colores, tamaños, temáticas y dedicatorias.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Cuál es la política de cambios?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Aceptamos cambios o reposiciones dentro de los 7 días posteriores a la recepción si el producto presenta defectos de fabricación o daños durante el envío.
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
                  Aceptamos pagos por Yape, Plin y transferencia bancaria (BCP, Interbank, BBVA). Al confirmar tu pedido por WhatsApp te enviamos los datos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Cómo puedo participar en los sorteos?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Comparte nuestra página en tus redes sociales, etiquétanos y envíanos tu captura desde el botón de WhatsApp en Promociones.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  ¿Ofrecen descuentos corporativos?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)]">
                  Sí, ofrecemos tarifas especiales para eventos, bodas y regalos corporativos. Escríbenos por WhatsApp para cotizar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
