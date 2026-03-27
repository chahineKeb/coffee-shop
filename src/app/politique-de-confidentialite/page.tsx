import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Politique de confidentialité — LEGO Coffee Shop",
  description: "Politique de confidentialité et protection des données personnelles du LEGO Coffee Shop, café halal Paris 11e.",
  robots: { index: false, follow: false },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lego-coffee-shop.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Politique de confidentialité", item: "https://lego-coffee-shop.vercel.app/politique-de-confidentialite" },
  ],
}

const sections = [
  {
    id: "responsable",
    title: "1. Responsable du traitement",
    content: `Le responsable du traitement des données personnelles collectées sur ce site est :

**LEGO Coffee Shop**
12 rue des Briques — 75011 Paris
contact@legocoffeeshop.fr`,
  },
  {
    id: "donnees",
    title: "2. Données collectées",
    content: `Dans le cadre de l'inscription à notre newsletter, nous collectons uniquement votre **adresse e-mail**.

Nous ne collectons aucune autre donnée personnelle (nom, prénom, numéro de téléphone, etc.) sans votre consentement explicite.

Aucune donnée de navigation (cookies tiers, pixels de suivi publicitaire) n'est collectée.`,
  },
  {
    id: "finalite",
    title: "3. Finalité du traitement",
    content: `Votre adresse e-mail est collectée dans le seul but de vous envoyer notre newsletter : nouveautés, offres spéciales, actualités du café.

Base légale : **consentement** (article 6.1.a du RGPD). Vous pouvez retirer ce consentement à tout moment.`,
  },
  {
    id: "conservation",
    title: "4. Durée de conservation",
    content: `Vos données sont conservées pendant **3 ans** à compter de votre inscription, ou jusqu'à votre désinscription.

En cas de désinscription, vos données sont supprimées sous 30 jours ouvrés.`,
  },
  {
    id: "destinataires",
    title: "5. Destinataires des données",
    content: `Vos données ne sont jamais vendues, louées ou cédées à des tiers à des fins commerciales.

Elles peuvent être transmises à notre prestataire d'envoi de newsletters dans le cadre strict de ce service, soumis à des obligations contractuelles de confidentialité.`,
  },
  {
    id: "droits",
    title: "6. Vos droits",
    content: `Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :

- **Droit d'accès** (art. 15) : connaître les données que nous détenons sur vous
- **Droit de rectification** (art. 16) : corriger des données inexactes
- **Droit à l'effacement** (art. 17) : demander la suppression de vos données
- **Droit à la portabilité** (art. 20) : recevoir vos données dans un format structuré
- **Droit d'opposition** (art. 21) : vous opposer au traitement
- **Droit au retrait du consentement** : à tout moment, sans préjudice

Pour exercer vos droits, contactez-nous à : **contact@legocoffeeshop.fr**

Vous disposez également du droit d'introduire une réclamation auprès de la **CNIL** (Commission Nationale de l'Informatique et des Libertés) : cnil.fr`,
  },
  {
    id: "cookies",
    title: "7. Cookies",
    content: `Ce site utilise uniquement un cookie fonctionnel pour mémoriser votre choix de consentement. Aucun cookie publicitaire ou de suivi tiers n'est déposé.

| Cookie | Finalité | Durée |
|--------|---------|-------|
| \`cookie-consent\` | Mémoriser votre choix de consentement | 1 an |

Vous pouvez à tout moment modifier votre choix en effaçant les données locales de votre navigateur.`,
  },
  {
    id: "securite",
    title: "8. Sécurité",
    content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.

Le site est hébergé sur **Vercel** (infrastructure sécurisée, HTTPS enforced).`,
  },
  {
    id: "modifications",
    title: "9. Modifications",
    content: `Nous nous réservons le droit de modifier cette politique à tout moment. La date de dernière mise à jour est indiquée en bas de page. En continuant à utiliser notre site, vous acceptez les modifications éventuelles.`,
  },
]

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-espresso text-lego-off-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-white/8 py-5 px-5 md:px-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Retour à l'accueil">
            <Image src="/lego.svg" alt="Logo LEGO" width={28} height={28} className="rounded-sm" />
            <span className="font-heading font-bold text-lg text-lego-off-white">Coffee Shop</span>
          </Link>
          <Link
            href="/"
            className="text-lego-off-white/50 hover:text-lego-off-white text-sm transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 md:px-10 py-16">

        {/* Bandeau projet fictif */}
        <div className="mb-10 bg-lego-yellow/10 border border-lego-yellow/25 rounded-xl px-5 py-4 flex gap-3 items-start">
          <span className="text-lego-yellow text-lg leading-none flex-shrink-0" aria-hidden="true">⚠️</span>
          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-lego-yellow mb-1">Site fictif — Projet d'évaluation</p>
            <p className="text-lego-off-white/60">
              Ce site est un projet pédagogique réalisé dans le cadre d'une évaluation à l'école{" "}
              <strong className="text-lego-off-white/80">CDUI</strong>. Le commerce, les produits, l'adresse
              et toutes les informations présentées sont entièrement fictifs.{" "}
              <strong className="text-lego-off-white/80">Aucune donnée personnelle n'est réellement collectée
              ni traitée.</strong> La politique ci-dessous est présentée à titre pédagogique et illustratif.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-caramel uppercase">Légal</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-lego-off-white mt-3 mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-lego-off-white/50 text-sm">
            Dernière mise à jour : mars 2026
          </p>
        </div>

        <div className="bg-caramel/10 border border-caramel/20 rounded-xl p-5 mb-12">
          <p className="text-lego-off-white/80 text-sm leading-relaxed">
            <strong className="text-lego-off-white">En bref :</strong> On collecte uniquement votre e-mail
            pour la newsletter, on ne le revend jamais, et vous pouvez vous désinscrire à tout moment.
            C&apos;est tout.
          </p>
        </div>

        <nav aria-label="Sommaire" className="mb-12 bg-white/4 rounded-xl p-5 border border-white/8">
          <p className="text-xs font-semibold tracking-widest text-caramel uppercase mb-3">Sommaire</p>
          <ol className="space-y-1.5 list-none">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-lego-off-white/55 hover:text-caramel text-sm transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-heading font-semibold text-xl text-lego-off-white mb-4 scroll-mt-8">
                {s.title}
              </h2>
              <div className="text-lego-off-white/65 text-sm leading-relaxed space-y-3">
                {s.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("| ")) {
                    const rows = para.split("\n").filter((r) => !r.match(/^\|[-| ]+\|$/))
                    return (
                      <div key={i} className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <tbody>
                            {rows.map((row, j) => {
                              const cells = row.split("|").filter(Boolean).map((c) => c.trim())
                              return (
                                <tr key={j} className={j === 0 ? "border-b border-white/10" : ""}>
                                  {cells.map((cell, k) => (
                                    <td
                                      key={k}
                                      className={`py-2 pr-4 ${j === 0 ? "font-semibold text-lego-off-white/80" : "text-lego-off-white/55"}`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                  const html = para
                    .replace(/\*\*(.*?)\*\*/g, "<strong class=\"text-lego-off-white/90\">$1</strong>")
                    .replace(/^- (.*)/gm, "<li class=\"ml-4 list-disc\">$1</li>")
                  if (html.includes("<li")) {
                    return <ul key={i} className="space-y-1.5" dangerouslySetInnerHTML={{ __html: html }} />
                  }
                  return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-lego-off-white/30 text-xs">
          <p>© 2026 LEGO Coffee Shop</p>
          <Link href="/mentions-legales" className="hover:text-lego-off-white/60 transition-colors">
            Mentions légales →
          </Link>
        </div>
      </main>
    </div>
  )
}
