import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Mentions légales — LEGO Coffee Shop",
  description: "Mentions légales du LEGO Coffee Shop, Paris 11e.",
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-espresso text-lego-off-white">

      {/* Header */}
      <header className="border-b border-white/8 py-5 px-5 md:px-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Retour à l'accueil">
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
              <strong className="text-lego-off-white/80">CDUI</strong>. Le commerce, les produits, l'adresse,
              le SIRET et toutes les informations présentées sont entièrement fictifs. Aucune commande
              ne peut être passée, aucune donnée n'est réellement collectée.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <span className="text-xs font-semibold tracking-widest text-caramel uppercase">Légal</span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-lego-off-white mt-3 mb-4">
            Mentions légales
          </h1>
          <p className="text-lego-off-white/50 text-sm">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN).
          </p>
        </div>

        <div className="space-y-10 text-sm text-lego-off-white/65 leading-relaxed">

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Éditeur du site</h2>
            <div className="space-y-1">
              <p><strong className="text-lego-off-white/85">Raison sociale :</strong> LEGO Coffee Shop</p>
              <p><strong className="text-lego-off-white/85">Forme juridique :</strong> SAS (Société par Actions Simplifiée)</p>
              <p><strong className="text-lego-off-white/85">Siège social :</strong> 12 rue des Briques, 75011 Paris</p>
              <p><strong className="text-lego-off-white/85">SIRET :</strong> 123 456 789 00012</p>
              <p><strong className="text-lego-off-white/85">Numéro de TVA intracommunautaire :</strong> FR 12 123456789</p>
              <p><strong className="text-lego-off-white/85">Capital social :</strong> 10 000 €</p>
              <p>
                <strong className="text-lego-off-white/85">Contact :</strong>{" "}
                <a href="mailto:contact@legocoffeeshop.fr" className="text-caramel hover:text-lego-off-white transition-colors">
                  contact@legocoffeeshop.fr
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de LEGO Coffee Shop.</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Hébergeur</h2>
            <div className="space-y-1">
              <p><strong className="text-lego-off-white/85">Société :</strong> Vercel Inc.</p>
              <p><strong className="text-lego-off-white/85">Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
              <p>
                <strong className="text-lego-off-white/85">Site web :</strong>{" "}
                <span className="text-lego-off-white/55">vercel.com</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments de ce site (textes, images, logo, design) est protégé par le droit d&apos;auteur.
              Toute reproduction, représentation ou diffusion, même partielle, est interdite sans autorisation écrite préalable.
            </p>
            <p className="mt-3">
              Les photographies utilisées sur ce site proviennent de la plateforme Unsplash et sont soumises à la licence Unsplash.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Limitation de responsabilité</h2>
            <p>
              LEGO Coffee Shop s&apos;efforce de maintenir les informations de ce site à jour. Toutefois, nous ne pouvons
              garantir l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Données personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos données personnelles, consultez notre{" "}
              <Link href="/politique-de-confidentialite" className="text-caramel hover:text-lego-off-white transition-colors underline underline-offset-2">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-lego-off-white mb-4">Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-lego-off-white/30 text-xs">
          <p>© 2026 LEGO Coffee Shop</p>
          <Link href="/politique-de-confidentialite" className="hover:text-lego-off-white/60 transition-colors">
            Politique de confidentialité →
          </Link>
        </div>
      </main>
    </div>
  )
}
