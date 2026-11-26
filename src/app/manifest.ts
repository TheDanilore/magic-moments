import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Magic Moments",
    short_name: "Magic Moments",
    description:
      "Boutique online de detalles personalizados en Perú: cajas sorpresa, llaveros grabados, tarjetas 3D con lacre y kits de regalo.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f2ef",
    theme_color: "#111113",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
