import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { LazyCartDrawer } from "@/components/LazyCartDrawer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/context/cart-context"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const instrument = Instrument_Sans({
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
    "Magic Moments - Boutique de detalles personalizados, cajas sorpresa, llaveros y kits de regalo en Perú.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Magic Moments",
    title: "Magic Moments | Detalles Personalizados",
    description:
      "Boutique de detalles personalizados en Perú: cajas sorpresa, llaveros grabados, tarjetas 3D con lacre y kits de regalo.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#111114" },
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
      className={`${bricolage.variable} ${instrument.variable}`}
    >
      <body className="min-h-screen bg-[var(--surface-page)] font-sans text-[var(--text-primary)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <LazyCartDrawer />
            <Toaster richColors position="bottom-right" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
