import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { ThemeProvider } from "@/components/theme-provider"
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

export const metadata: Metadata = {
  title: {
    default: "Magic Moments | Detalles Personalizados",
    template: "%s | Magic Moments",
  },
  description:
    "Magic Moments - Boutique de detalles personalizados, cajas sorpresa, llaveros y kits de regalo en Perú.",
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
            <CartDrawer />
            <Toaster richColors position="bottom-right" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
