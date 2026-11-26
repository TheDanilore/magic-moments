---
name: Magic Moments — Atelier Rosa & Obsidiana
description: Boutique de detalles personalizados con escenario nocturno en obsidiana, catálogo luminoso en marfil rosado y ergonomía camaleónica.
colors:
  page: "#f6f2ef"
  card: "#ece5df"
  elevated: "#fcfaf8"
  obsidian: "#111113"
  ink: "#141413"
  ink-muted: "#5c5852"
  cta-primary: "#c94c6a"
  cta-primary-hover: "#b23c59"
  accent-accessible: "#9a2e4b"
  whatsapp: "#128c4a"
typography:
  display: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
  sans: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
---

## Overview
**Atelier Rosa & Obsidiana** combina un escenario focal oscuro (`#111113`) para el Hero y la vitrina de producto con un catálogo cálido y luminoso (`#f6f2ef` / `#ece5df`), soportando modo claro y oscuro mediante variables CSS semánticas (`var(--surface-*)`, `var(--text-*)`, `var(--color-cta-*)`).

## Ergonomía & Reglas
- Targets táctiles mínimos de `48×48px` (`min-h-12 min-w-12`) en controles móviles y selectores.
- Atajos de teclado silenciosos (`/`, `B`, `T`, `Esc`, `A`, `←`, `→`) revelados exclusivamente en `ShortcutTooltip` al hacer hover o focus en escritorio.
- Imágenes reales de estudio con `aspect-ratio` fijo y `loading="lazy"` (excepto Hero `priority`) para `CLS = 0`.
