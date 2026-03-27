import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "LEGO Coffee Shop — Crée ta boisson à Paris",
  description:
    "Café de spécialité latino, nourriture 100% maison et halal. Compose ta boisson brique par brique au LEGO Coffee Shop, Paris 11e.",
  keywords: ["café spécialité", "coffee shop Paris", "halal", "fait maison", "café latino"],
  openGraph: {
    title: "LEGO Coffee Shop — Crée ta boisson à Paris",
    description: "Café de spécialité latino, nourriture 100% maison et halal. Paris 11e.",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "LEGO Coffee Shop",
  description: "Café de spécialité et nourriture maison halal à Paris",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 rue des Briques",
    addressLocality: "Paris",
    postalCode: "75011",
    addressCountry: "FR",
  },
  openingHours: ["Mo-Fr 07:00-19:00", "Sa-Su 09:00-18:00"],
  servesCuisine: ["Coffee", "French", "Halal"],
  priceRange: "€€",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-espresso text-lego-off-white">
        {children}
      </body>
    </html>
  )
}
