"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email.trim()) {
      setError("L'adresse email est requise.")
      return
    }
    if (!consent) {
      setError("Tu dois accepter la politique de confidentialité pour continuer.")
      return
    }
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-lego-off-white"
      aria-label="Newsletter et localisation"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-lego-red text-sm font-semibold uppercase tracking-widest">
            Reste informé
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-warm-dark mt-3 mb-4 text-balance">
            Les nouveautés en avant-première
          </h2>
          <p className="text-warm-muted text-lg mb-8">
            Nouvelles saveurs, combos limités, codes promo — directement dans ta boîte. Zéro spam, promis.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
            >
              <span className="text-4xl block mb-3" aria-hidden="true">✅</span>
              <p className="font-heading font-bold text-green-800 text-xl">
                Tu es dans la liste !
              </p>
              <p className="text-green-700 text-sm mt-2">
                On garde le contact. Zéro spam, c&apos;est promis.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto" noValidate aria-describedby={error ? "newsletter-error" : undefined}>
              {error && (
                <p id="newsletter-error" role="alert" className="text-lego-red text-sm font-medium text-left">
                  {error}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  aria-required="true"
                  className="flex-1 px-5 py-3.5 bg-white border border-warm-dark/10 rounded-xl text-warm-dark placeholder:text-warm-muted/50 focus:outline-none focus:ring-2 focus:ring-lego-red/30 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!consent}
                  className="px-6 py-3.5 bg-lego-red text-white font-bold rounded-xl hover:bg-red-700 transition-all whitespace-nowrap cursor-pointer text-sm shadow-lg shadow-lego-red/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  M&apos;inscrire
                </button>
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 accent-lego-red flex-shrink-0 cursor-pointer"
                  aria-required="true"
                />
                <span className="text-warm-muted text-xs leading-relaxed">
                  J&apos;accepte que mon adresse e-mail soit utilisée pour recevoir la newsletter du LEGO Coffee Shop.
                  Désinscription possible à tout moment.{" "}
                  <Link
                    href="/politique-de-confidentialite"
                    className="text-coffee-brown underline underline-offset-2 hover:text-warm-dark transition-colors"
                    target="_blank"
                    rel="noopener"
                  >
                    Politique de confidentialité
                  </Link>
                </span>
              </label>
            </form>
          )}
        </motion.div>

        {/* Carte + Infos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="grid md:grid-cols-5 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-black/5"
        >
          {/* Carte OpenStreetMap */}
          <div className="md:col-span-3 h-72 md:h-auto relative">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.3620%2C48.8520%2C2.3760%2C48.8600&layer=mapnik&marker=48.856%2C2.369"
              title="Localisation du LEGO Coffee Shop, 12 rue des Briques, Paris 11e"
              className="w-full h-full min-h-72"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>

          {/* Infos pratiques */}
          <div className="md:col-span-2 p-8 flex flex-col justify-center gap-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-warm-dark mb-1">
                Viens nous voir
              </h3>
              <p className="text-warm-muted text-sm">On t&apos;attend avec du café chaud.</p>
            </div>

            <address className="not-italic space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lego-red mt-0.5" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-warm-dark">12 rue des Briques</p>
                  <p className="text-warm-muted">75011 Paris</p>
                  <p className="text-warm-muted text-xs mt-0.5">Métro Bastille — L1, L5, L8</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lego-red mt-0.5" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="space-y-1">
                  <p><strong className="text-warm-dark font-semibold">Lun – Ven</strong>{" "}<span className="text-warm-muted">7h – 19h</span></p>
                  <p><strong className="text-warm-dark font-semibold">Sam – Dim</strong>{" "}<span className="text-warm-muted">9h – 18h</span></p>
                </div>
              </div>
            </address>

            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                🟢 100% Halal
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                🇫🇷 Made in France
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
