import { formatPEN } from "@/lib/format"
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  formatWeightLabel,
  type CartShippingEvaluation,
} from "@/lib/shipping"
import type { Product, ProductSelectionOptions } from "@/types/catalog"

const DEFAULT_WHATSAPP_NUMBER = "51979048693"

export interface WhatsAppCartLine {
  product: Product
  options: ProductSelectionOptions
  quantity: number
}

/**
 * Devuelve el número de WhatsApp configurado sin caracteres no numéricos.
 */
export function getWhatsAppNumber(): string {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "")
}

/**
 * Formatea el número de WhatsApp para mostrarlo de forma legible en la interfaz.
 */
export function getWhatsAppDisplayPhone(): string {
  const digits = getWhatsAppNumber()
  if (digits === "51979048693") {
    return "+51 979 048 693"
  }
  if (digits.startsWith("51") && digits.length === 11) {
    return `+51 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`
  }
  return `+${digits}`
}

/**
 * Construye una URL wa.me con mensaje codificado opcional.
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber()
  const base = number ? `https://wa.me/${number}` : "https://wa.me/"
  if (!message) {
    return base
  }
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Construye el resumen estructurado del pedido del carrito para enviar por WhatsApp.
 */
export function buildCartOrderMessage({
  items,
  subtotalCents,
  shipping,
  finalTotalCents,
  orderNote,
}: {
  items: WhatsAppCartLine[]
  subtotalCents: number
  shipping: CartShippingEvaluation
  finalTotalCents: number
  orderNote?: string
}): string {
  const lines = [
    "Hola Magic Moments, quiero coordinar este pedido:",
    "",
    ...items.map(
      (item) =>
        `• ${item.quantity}× ${item.product.name} (${item.options.color} · ${item.options.size} · ${item.options.theme} · ${item.product.sku}) — ${formatPEN(
          item.product.priceCents * item.quantity
        )}`
    ),
    "",
  ]

  if (shipping.qualifiesFreeShipping) {
    lines.push(
      `Envío Shalom (${shipping.tierLabel} · ${formatWeightLabel(
        shipping.totalWeightGrams
      )}): GRATIS (compra mayor a ${formatPEN(FREE_SHIPPING_THRESHOLD_CENTS)})`
    )
  } else if (shipping.shippingCents !== null) {
    lines.push(
      `Envío Shalom (${shipping.tierLabel} · ${formatWeightLabel(
        shipping.totalWeightGrams
      )}): ${formatPEN(shipping.shippingCents)} (agencia a agencia)`
    )
  } else {
    lines.push(
      `Envío Shalom (${shipping.tierLabel} · ${formatWeightLabel(
        shipping.totalWeightGrams
      )}): Por cotizar en WhatsApp`
    )
  }

  if (orderNote && orderNote.trim()) {
    lines.push(`Nota / dedicatoria: ${orderNote.trim()}`)
  }

  lines.push(
    shipping.shippingCents !== null
      ? `Total estimado (inc. envío): ${formatPEN(finalTotalCents)}`
      : `Subtotal productos: ${formatPEN(subtotalCents)} (+ envío por cotizar)`
  )

  return lines.join("\n")
}

/**
 * Construye el mensaje directo de pedido o consulta desde la ficha de producto.
 */
export function buildProductInquiryMessage(
  product: Product,
  options: ProductSelectionOptions,
  quantity: number,
  orderNote?: string
): string {
  const lines = [
    `Hola Magic Moments, quiero pedir o consultar por "${product.name}":`,
    `• Cantidad: ${quantity}`,
    `• Opciones: ${options.color} · ${options.size} · ${options.theme}`,
    `• SKU: ${product.sku}`,
    `• Subtotal estimado: ${formatPEN(product.priceCents * quantity)}`,
  ]

  if (orderNote && orderNote.trim()) {
    lines.push(`• Nota / dedicatoria: ${orderNote.trim()}`)
  }

  return lines.join("\n")
}

/**
 * Construye el mensaje prellenado para promociones y packs.
 */
export function buildPromoMessage(promoTitle: string, promoDetails?: string): string {
  const lines = [`Hola Magic Moments, quiero consultar por la promoción: "${promoTitle}".`]
  if (promoDetails && promoDetails.trim()) {
    lines.push(promoDetails.trim())
  }
  return lines.join("\n")
}

/**
 * Construye el mensaje estructurado desde el formulario de contacto.
 */
export function buildContactMessage({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email?: string
  subject?: string
  message: string
}): string {
  const lines = ["Hola Magic Moments, les escribo desde el formulario web:", ""]
  lines.push(`• Nombre: ${name.trim()}`)
  if (email && email.trim()) {
    lines.push(`• Correo: ${email.trim()}`)
  }
  if (subject && subject.trim()) {
    lines.push(`• Asunto: ${subject.trim()}`)
  }
  lines.push(`• Mensaje: ${message.trim()}`)
  return lines.join("\n")
}
