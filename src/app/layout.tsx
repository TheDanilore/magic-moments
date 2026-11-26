import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Figtree } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { LazyCartDrawer } from "@/components/LazyCartDrawer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/context/cart-context"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
})

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Magic Moments | Detalles Personalizados",
    template: "%s | Magic Moments",
  },
  description:
    "En Magic Moments convertimos tus momentos especiales en recuerdos inolvidables. Cajas personalizadas, cuadros 3D con luces LED, ramos y llaveros en Chimbote y todo el Perú.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Magic Moments",
    title: "Magic Moments | Detalles Personalizados",
    description:
      "Cajas personalizadas, cuadros 3D con luces LED, ramos temáticos y llaveros acrílicos en Chimbote y Nuevo Chimbote con envíos a todo el Perú.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fce6ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1016" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable}`}
    >
      <body className="min-h-screen bg-[var(--surface-page)] font-sans text-[var(--text-primary)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <a
              href="#contenido-principal"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-[var(--color-cta-primary)] focus:px-4 focus:text-sm focus:font-semibold focus:text-[var(--color-cta-primary-ink)]"
            >
              Saltar al contenido
            </a>
            <Header />
            <main id="contenido-principal">{children}</main>
            <Footer />
            <LazyCartDrawer />
            <Toaster richColors position="bottom-right" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
