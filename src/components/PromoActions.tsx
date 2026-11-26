"use client"

import { Gift, MessageCircle, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { buildPromoMessage, buildWhatsAppUrl } from "@/lib/whatsapp"

interface PromoShareButtonProps {
  label?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function PromoShareButton({
  label = "Compartir y Participar",
  variant = "default",
  size = "lg",
  className,
}: PromoShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Magic Moments | Promociones",
          text: "¡Mira las promociones y packs de detalles personalizados en Magic Moments!",
          url: shareUrl,
        })
        return
      }
      await navigator.clipboard.writeText(shareUrl)
      toast.success("Enlace copiado para compartir")
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Enlace copiado para compartir")
      } catch {
        toast.error("No se pudo copiar el enlace")
      }
    }
  }

  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  )
}

interface PromoWhatsAppButtonProps {
  promoTitle: string
  promoDetails?: string
  label?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  showGiftIcon?: boolean
}

export function PromoWhatsAppButton({
  promoTitle,
  promoDetails,
  label = "Aprovechar por WhatsApp",
  variant = "default",
  size = "default",
  className,
  showGiftIcon = false,
}: PromoWhatsAppButtonProps) {
  const url = buildWhatsAppUrl(buildPromoMessage(promoTitle, promoDetails))

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {showGiftIcon ? (
          <Gift className="mr-2 h-4 w-4" aria-hidden="true" />
        ) : (
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {label}
      </a>
    </Button>
  )
}
