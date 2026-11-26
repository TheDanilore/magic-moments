"use client"

import { useState, type FormEvent } from "react"
import { ExternalLink, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

export function ContactFormClient() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !message.trim()) {
      setError("Por favor ingresa tu nombre y tu mensaje antes de enviar.")
      return
    }

    setError(null)
    const url = buildWhatsAppUrl(
      buildContactMessage({
        name,
        email,
        subject,
        message,
      })
    )

    setLastWhatsAppUrl(url)
    window.open(url, "_blank", "noopener,noreferrer")
    toast.success("Abriendo WhatsApp con tu mensaje...")
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre Completo</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          className="min-h-11 rounded-xl"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Correo Electrónico (opcional)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="min-h-11 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">Asunto</Label>
        <Input
          id="subject"
          name="subject"
          autoComplete="off"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Asunto de tu consulta o pedido"
          className="min-h-11 rounded-xl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntanos qué detalle personalizado te gustaría cotizar..."
          className="min-h-[150px] rounded-xl"
          required
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 text-sm font-semibold text-[var(--color-whatsapp-ink)] transition-colors hover:bg-[var(--color-whatsapp-hover)]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>Enviar Mensaje por WhatsApp</span>
      </button>

      {lastWhatsAppUrl ? (
        <p className="text-center text-xs text-[var(--text-secondary)]">
          ¿No se abrió automáticamente?{" "}
          <a
            href={lastWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[var(--color-whatsapp)] underline underline-offset-2"
          >
            <span>Abrir WhatsApp aquí</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </p>
      ) : null}
    </form>
  )
}
