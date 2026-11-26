# Product

## Platform
web

## Stack
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Sonner, `next/image`. Pedidos coordinados por WhatsApp + cálculo referencial de envío Shalom en Perú.

## Purpose
**Magic Moments** es una boutique online de detalles personalizados en Perú (`S/` PEN): cajas sorpresa, llaveros grabados, tarjetas 3D con lacre y kits de regalo listos para emocionar.

## Operating Context
- Idioma: Español (ES).
- Moneda: Soles peruanos (`S/` PEN), formato `tabular-nums`.
- Canal de cierre: WhatsApp estructurado (`src/lib/whatsapp.ts`) con cálculo de envío Shalom (`XXS`, `XS`, `S`, `M`, `L` y envío gratis desde `S/ 150.00`).
- Ergonomía adaptativa ("camaleónica"): Bottom Sheet y barra sticky inferior en móvil (`48px` min target), Split View y Slide-over Drawer en tablet/desktop, atajos silenciosos revelados únicamente mediante tooltips en escritorio.
