"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-espresso/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5"
          : "bg-transparent"
      }`}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="LEGO Coffee Shop — accueil">
          <Image
            src="/lego.svg"
            alt="Logo LEGO"
            width={36}
            height={36}
            className="rounded-sm shadow-sm flex-shrink-0"
            priority
          />
          <span className="font-heading font-bold text-xl text-lego-off-white tracking-tight leading-none">
            Coffee Shop
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-lego-off-white/70 list-none">
          {[
            { label: "Menu", href: "#menu" },
            { label: "Nos valeurs", href: "#valeurs" },
            { label: "Nous trouver", href: "#contact" },
          ].map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative pb-0.5 hover:text-lego-off-white transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-caramel group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#builder"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-lego-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:shadow-lego-red/25"
        >
          Créer ma commande
        </a>

        <button
          className="md:hidden text-lego-off-white p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-espresso/98 backdrop-blur-md border-t border-white/8 px-5 py-6 flex flex-col gap-4 overflow-hidden"
          >
            {["#menu", "#valeurs", "#contact"].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-lego-off-white/80 font-medium hover:text-lego-off-white py-1 transition-colors"
                onClick={() => setOpen(false)}
              >
                {["Menu", "Nos valeurs", "Nous trouver"][i]}
              </a>
            ))}
            <a
              href="#builder"
              className="mt-2 px-5 py-3 bg-lego-red text-center text-white font-semibold rounded-lg"
              onClick={() => setOpen(false)}
            >
              Créer ma commande
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
