import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import CookieBanner from "@/components/CookieBanner"

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
    "Café de spécialité colombien, nourriture 100% maison et halal. Compose ta boisson brique par brique au LEGO Coffee Shop, Paris 11e.",
  keywords: [
    "café spécialité",
    "coffee shop Paris",
    "halal",
    "fait maison",
    "café latino",
    "café colombien",
    "Paris 11e",
    "café latino",
    "boisson artisanale",
    "coffee shop halal Paris",
  ],
  metadataBase: new URL("https://lego-coffee-shop.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEGO Coffee Shop — Crée ta boisson à Paris",
    description: "Café de spécialité colombien, nourriture 100% maison et halal. Paris 11e.",
    type: "website",
    locale: "fr_FR",
    url: "https://lego-coffee-shop.vercel.app",
    siteName: "LEGO Coffee Shop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "LEGO Coffee Shop — Café de spécialité colombien à Paris 11e",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEGO Coffee Shop — Crée ta boisson à Paris",
    description: "Café de spécialité colombien, nourriture 100% maison et halal. Paris 11e.",
    images: ["https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=630&fit=crop"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/lego.svg",
    shortcut: "/lego.svg",
    apple: "/lego.svg",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "LEGO Coffee Shop",
  description: "Café de spécialité colombien et nourriture maison 100% halal à Paris 11e",
  url: "https://lego-coffee-shop.vercel.app",
  image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=630&fit=crop",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 rue des Briques",
    addressLocality: "Paris",
    postalCode: "75011",
    addressCountry: "FR",
  },
  openingHours: ["Mo-Fr 07:00-19:00", "Sa-Su 09:00-18:00"],
  servesCuisine: ["Coffee", "French", "Halal", "Colombian"],
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/legocoffeeshop",
    "https://www.tiktok.com/@legocoffeeshop",
    "https://x.com/legocoffeeshop",
  ],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-caramel focus:text-espresso focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Aller au contenu principal
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
