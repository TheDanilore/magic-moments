# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Sonner, `next/image`. Pedidos coordinados por WhatsApp + cálculo referencial de envío Shalom en Perú.

## Users

- **Clientes finales en Perú (Chimbote, Nuevo Chimbote y envíos nacionales):** personas que buscan detalles y regalos personalizados hechos a mano para cumpleaños, aniversarios, fechas especiales (ej. 21 de septiembre / flores amarillas) y celebraciones.
- **Compradores ocasionales por mayor en lotes pequeños:** clientes que adquieren varias unidades en un solo pedido (por ejemplo, ~12 llaveros acrílicos personalizados u otros recuerdos para eventos).

## Product Purpose

**Magic Moments** (*Fabiana Mauricio / Yanin Faviana*, [`@magic_moments050`](https://www.instagram.com/magic_moments050/)) es una tienda online de detalles y regalos personalizados en Chimbote y Nuevo Chimbote con envíos a todo el Perú (`S/` PEN). Ofrece cajas personalizadas, cuadros 3D con luces LED, ramos temáticos con rosas eternas, llaveros acrílicos personalizados y tarjetas/kits; permite configurar variantes y cantidades, estimar el envío Shalom y coordinar el pedido por WhatsApp.

> **Estado del catálogo web:** Las fotografías y líneas de producto reflejan la oferta real visible en `@magic_moments050`, mientras que los precios en `S/` PEN y stock mostrados en la web son referenciales hasta confirmar cotización por WhatsApp.

## Positioning

Enfoque artesanal y colorido ("Convertimos tus momentos especiales en recuerdos inolvidables · Regala emoción, regala Magic Moments") desde Chimbote y Nuevo Chimbote para todo el Perú, atendiendo tanto regalos únicos personalizados como lotes pequeños (~12 llaveros acrílicos), con estimación transparente de tramo Shalom antes de ir a WhatsApp.

## Operating Context

- **Idioma:** Español (ES, Perú).
- **Moneda:** Soles peruanos (`S/` PEN), formato numérico tabular (`tabular-nums`).
- **Ubicación y cobertura:** Chimbote y Nuevo Chimbote (entrega local) + envíos a todo el Perú vía Shalom (`XXS`, `XS`, `S`, `M`, `L` y envío gratis referencial desde `S/ 150.00` en `src/lib/shipping.ts`).
- **Canal de cierre:** WhatsApp estructurado al `+51 979 048 693` (`src/lib/whatsapp.ts`).
- **Redes sociales confirmadas:** Instagram [`@magic_moments050`](https://www.instagram.com/magic_moments050/), Facebook y TikTok (URLs exactas de Facebook y TikTok pendientes).
- **Ergonomía adaptativa:** Bottom Sheet y barra sticky inferior en móvil (`48px` mínimo), Split View y Slide-over Drawer en tablet/escritorio, y atajos silenciosos revelados mediante tooltips en escritorio.

## Capabilities and Constraints

- **Funcionalidad confirmada:** Catálogo en `src/data/catalog.ts`, selector de opciones (color, tamaño, temática) y cantidad con soporte para lotes pequeños, carrito con evaluador de empaque Shalom en `src/lib/shipping.ts`, y generación de mensajes estructurados hacia WhatsApp en `src/lib/whatsapp.ts`.
- **Restricciones técnicas actuales:** Sin pasarela de pago online ni backend de pedidos, usuarios o inventario en tiempo real; precios y stock viven en código estático.
- **Decisiones abiertas / pendientes:**
  - URLs/usuarios exactos de Facebook y TikTok.
  - Precios definitivos por modelo y escalas formales de descuento por volumen en lotes grandes.
  - Correo electrónico comercial definitivo (si desean usar uno adicional a WhatsApp/Instagram).

## Brand Commitments

- Nombre de marca confirmado: **Magic Moments** (emblema ilustrado con firma *Yanin Faviana* / `@magic_moments050`).
- Eslogan de marca: *"En Magic Moments, convertimos tus momentos especiales en recuerdos inolvidables."*
- Comunicación en español de Perú y precios expresados en Soles (`S/` PEN).
- WhatsApp oficial de pedidos/consultas: `+51 979 048 693`.
- Instagram oficial: `https://www.instagram.com/magic_moments050/`.

## Evidence on Hand

- **Datos reales confirmados del negocio (`@magic_moments050`):** Nombre, emblema ilustrado, eslogan, ubicación (Chimbote y Nuevo Chimbote), envíos a todo el Perú, categorías visibles (cajas personalizadas, cuadros 3D con luces LED en 2 modelos, ramos temáticos con rosas eternas, llaveros personalizados), WhatsApp `+51 979 048 693` e Instagram `@magic_moments050`.
- **Material referencial / generado:** Los precios base en `S/` PEN, stock referencial en `src/data/catalog.ts` y las fotografías de estudio en `public/images/` sirven como presentación visual del catálogo. No se deben mostrar testimonios, reseñas ni sorteos ficticios presentados como reales.

## Product Principles

1. **Calidez y color artesanal:** Reflejar la energía alegre, romántica y personalizada del taller en Chimbote, evitando superficies frías o monocromáticas.
2. **Transparencia previa al WhatsApp:** Mostrar precios referenciales en `S/` PEN y el tramo estimado de envío Shalom antes de abrir el chat.
3. **Flexibilidad para unidad y lote pequeño:** Facilitar tanto un regalo individual como pedidos por docena (~12 llaveros acrílicos) o cotización especial.
4. **Honestidad comercial:** Enlazar únicamente canales reales y evitar pruebas sociales o promociones ficticias.
