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
  title: "Café Halal Paris 11e | LEGO Coffee Shop — Spécialité colombienne",
  description:
    "Café de spécialité halal à Paris 11e. Grains colombiens Finca El Ladrillo, nourriture 100 % maison. Composez votre boisson comme des LEGO — Métro Bastille.",
  keywords: [
    "café de spécialité",
    "coffee shop Paris",
    "café paris halal",
    "halal",
    "fait maison",
    "café colombien",
    "Paris 11e",
    "coffee shop halal Paris",
    "bubble tea paris halal",
    "matcha latte paris",
    "café fait maison paris",
    "boisson artisanale",
  ],
  metadataBase: new URL("https://lego-coffee-shop.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEGO Coffee Shop — Café Halal Paris 11e",
    description: "Café de spécialité colombien, 100% halal, fait maison. Composez votre boisson comme des LEGO — Paris 11e, Métro Bastille.",
    type: "website",
    locale: "fr_FR",
    url: "https://lego-coffee-shop.vercel.app",
    siteName: "LEGO Coffee Shop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "LEGO Coffee Shop — Café de spécialité halal colombien à Paris 11e",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEGO Coffee Shop — Café Halal Paris 11e",
    description: "Café de spécialité colombien, 100% halal, fait maison. Paris 11e, Métro Bastille.",
    images: ["https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=630&fit=crop"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/lego.svg",
    shortcut: "/lego.svg",
    apple: "/lego.svg",
  },
}

const jsonLd = [
  {
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8531,
      longitude: 2.3694,
    },
    openingHours: ["Mo-Fr 07:00-19:00", "Sa-Su 09:00-18:00"],
    servesCuisine: ["Coffee", "French", "Halal", "Colombian"],
    priceRange: "€€",
    hasMenu: "https://lego-coffee-shop.vercel.app/#menu",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.instagram.com/legocoffeeshop",
      "https://www.tiktok.com/@legocoffeeshop",
      "https://x.com/legocoffeeshop",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LEGO Coffee Shop",
    url: "https://lego-coffee-shop.vercel.app",
    logo: "https://lego-coffee-shop.vercel.app/lego.svg",
    sameAs: [
      "https://www.instagram.com/legocoffeeshop",
      "https://www.tiktok.com/@legocoffeeshop",
      "https://x.com/legocoffeeshop",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LEGO Coffee Shop",
    url: "https://lego-coffee-shop.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://lego-coffee-shop.vercel.app/#menu?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menu LEGO Coffee Shop — Café Halal Paris 11e",
    url: "https://lego-coffee-shop.vercel.app/#menu",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Boissons",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Espresso", description: "Force pure, saveur nette, effet garanti.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Cappuccino", description: "Crémeux, doux, le classique réinventé.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Macchiato", description: "Espresso + touche de lait, équilibre parfait.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Matcha Latte", description: "Vert intense, sucré juste comme il faut.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Bubble Tea", description: "Perles fondantes, thé frais, asiatique assumé.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Citronade", description: "Sucré-aigre, naturel, été en verre.", suitableForDiet: "https://schema.org/HalalDiet" },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Food — Fait maison",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Muffin Egg", description: "Savoureux, protéiné, ton déjeuner champion.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Sandwich", description: "Fait du jour, farci, une vraie pause déj'.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Brownie", description: "Chocolat noir intense, gooey au centre, vrai.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Cookie NAYRA", description: "Homemade, encore tiède, 6 possibilités infinies.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Donuts", description: "Moelleux dedans, glacé dehors, sucré juste.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Cinnamon Roll", description: "Épicé, doux, le réconfort en un morceau.", suitableForDiet: "https://schema.org/HalalDiet" },
          { "@type": "MenuItem", name: "Egg & Bacon", description: "Simple, généreux, le petit-déj' qui fait sens.", suitableForDiet: "https://schema.org/HalalDiet" },
        ],
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lego-coffee-shop.vercel.app" },
    ],
  },
]

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
