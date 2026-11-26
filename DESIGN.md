---
name: Magic Moments — Atelier Pétalo, Frambuesa & Girasol
description: Boutique artesanal de detalles personalizados en Chimbote y todo el Perú con superficies rosa pétalo, vino frambuesa y acentos girasol dorado.
colors:
  page: "#fff7fa"
  blush: "#fce6ee"
  blush-deep: "#f9d5e3"
  card: "#f7e8ee"
  elevated: "#ffffff"
  berry-deep: "#6d1e3b"
  ink: "#2d1821"
  ink-muted: "#664754"
  night-plum: "#1c1016"
  cta-primary: "#b03658"
  cta-primary-hover: "#952947"
  accent-accessible: "#962947"
  accent-sunflower: "#fff0c7"
  whatsapp: "#0f7a3f"
  whatsapp-accessible-light: "#0c6b36"
  whatsapp-accessible-dark: "#4ade80"
  dark-page: "#1c1016"
  dark-card: "#26151e"
typography:
  display: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
  sans: "Figtree, ui-sans-serif, system-ui, sans-serif"
---

## Overview
**Atelier Pétalo, Frambuesa & Girasol** reemplaza los bloques negros y monocromáticos por superficies sólidas limpias sin degradados, inspiradas en `@magic_moments050`: rosa pétalo suave (`#fce6ee`), frambuesa berry de alto contraste (`#b03658`, ≥ 5.9:1 WCAG AA), vino frambuesa (`#6d1e3b`) para cierres y acentos girasol cálido (`#fff0c7` / `#ffd97d`) propios de los cuadros 3D LED y ramos. En modo oscuro utiliza **Ciruela Nocturna** (`#1c1016` / `#26151e`) manteniendo calidez cromática.

## Ergonomía & Reglas
- Contraste WCAG AA mínimo de `4.5:1` en todos los botones, chips activos y enlaces (incluyendo CTAs frambuesa `#b03658` y WhatsApp `#0f7a3f`).
- Targets táctiles mínimos de `48×48px` (`min-h-12`) en controles móviles, selectores y acciones principales.
- Atajos de teclado silenciosos (`/`, `B`, `T`, `Esc`, `A`, `←`, `→`) revelados exclusivamente en `ShortcutTooltip` al hacer hover o focus en escritorio.
- Imágenes con `aspect-ratio` consistente dentro de contenedores posicionados (`relative`) para `CLS = 0`.
