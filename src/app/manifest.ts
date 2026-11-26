import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Magic Moments | Detalles Personalizados",
    short_name: "Magic Moments",
    description:
      "Cajas personalizadas, cuadros 3D con luces LED, ramos temáticos y llaveros acrílicos en Chimbote y Nuevo Chimbote con envíos a todo el Perú.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7fa",
    theme_color: "#6d1e3b",
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
