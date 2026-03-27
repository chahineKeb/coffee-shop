"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Section hero"
    >
      {/* Photo de fond */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1600&q=85"
          alt="Intérieur chaleureux du LEGO Coffee Shop"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/60 to-espresso/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 to-transparent" />
      </motion.div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Contenu animé */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-10 text-center py-32 pt-40">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-lego-red animate-pulse" aria-hidden="true" />
          Café de spécialité · 100% Halal · Paris 11e
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-heading font-bold text-5xl md:text-7xl text-white leading-[1.05] mb-6 text-balance"
        >
          Crée ta boisson.
          <br />
          <span className="text-lego-red">Brique par brique.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Café de spécialité colombien, nourriture 100&nbsp;% maison et halal.
          Chaque commande est unique — composée comme tu veux, servie avec soin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="inline-flex items-center justify-center px-8 py-4 bg-lego-red text-white font-bold text-base rounded-xl hover:bg-red-700 transition-all duration-200 hover:shadow-xl hover:shadow-lego-red/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Voir le menu
          </a>
          <a
            href="#valeurs"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-base rounded-xl hover:bg-white/20 transition-all duration-200"
          >
            Notre histoire
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto border-t border-white/15 pt-8"
        >
          {[
            { value: "100%", label: "Halal" },
            { value: "13", label: "Créations" },
            { value: "1", label: "Producteur" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading font-bold text-2xl text-white">{s.value}</p>
              <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs"
        aria-hidden="true"
      >
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
