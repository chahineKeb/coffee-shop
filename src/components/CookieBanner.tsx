"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Consentement aux cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="bg-espresso border border-white/12 rounded-2xl shadow-2xl shadow-black/50 p-5">
            <p className="text-lego-off-white/80 text-sm leading-relaxed mb-4">
              🍪 On utilise des cookies pour améliorer ton expérience. Aucun cookie tiers, aucun tracking publicitaire.{" "}
              <Link
                href="/politique-de-confidentialite"
                className="text-caramel underline underline-offset-2 hover:text-lego-off-white transition-colors"
              >
                Politique de confidentialité
              </Link>
            </p>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 px-4 py-2.5 bg-lego-red text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
              >
                Accepter
              </button>
              <button
                onClick={decline}
                className="flex-1 px-4 py-2.5 bg-white/8 text-lego-off-white/70 text-sm font-medium rounded-xl hover:bg-white/14 transition-colors cursor-pointer border border-white/10"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
