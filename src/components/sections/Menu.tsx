"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { menuItems, type Category } from "@/lib/data/menu"

// Photos Unsplash — IDs à fort trafic, très stables
const itemPhotos: Record<string, string> = {
  espresso:       "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80",
  cappuccino:     "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80",
  machiatto:      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  "matcha-latte": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80",
  "bubble-tea":   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  citronade:      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
  "muffin-egg":   "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80",
  sandwich:       "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  brownie:        "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
  "cookie-nayra": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
  donuts:         "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  "cinnamon-roll":"https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80",
  "egg-bacon":    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Category>("boisson")
  const filtered = menuItems.filter((item) => item.category === activeTab)

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream lego-stud-pattern-dark" aria-label="Notre menu">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-caramel text-sm font-semibold uppercase tracking-widest">
            Ce qu&apos;on propose
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-warm-dark mt-3 mb-4 text-balance">
            Menu Café Halal — Paris 11e
          </h2>
          <p className="text-warm-muted text-lg max-w-xl mx-auto">
            On a la base. Toi, tu fais le reste — sélectionne, personnalise, déguste.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
          role="tablist"
          aria-label="Catégories du menu"
        >
          {(["boisson", "food"] as Category[]).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 font-semibold text-sm border transition-all duration-200 cursor-pointer
                first:rounded-l-xl last:rounded-r-xl
                ${activeTab === cat
                  ? "bg-lego-red text-white border-lego-red shadow-lg shadow-lego-red/20"
                  : "bg-white text-warm-dark border-warm-dark/10 hover:border-warm-dark/25"
                }`}
            >
              <span aria-hidden="true">{cat === "boisson" ? "☕" : "🍪"}</span>
              {cat === "boisson" ? " Boissons" : " Food"}
            </button>
          ))}
        </motion.div>

        {/* Grid avec AnimatePresence pour transition fluide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="tabpanel"
            aria-label={activeTab === "boisson" ? "Boissons" : "Food"}
          >
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                variants={cardAnim}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-caramel/10 transition-all duration-300 border border-black/4 hover:border-caramel/20 group"
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={itemPhotos[item.id] ?? "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"}
                    alt={`${item.name} — café de spécialité halal, LEGO Coffee Shop Paris 11e`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badges temp */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {item.isHot && (
                      <span className="px-2 py-0.5 bg-orange-100/95 text-orange-900 rounded-full text-xs font-semibold backdrop-blur-sm">
                        🔥 Chaud
                      </span>
                    )}
                    {item.isCold && (
                      <span className="px-2 py-0.5 bg-sky-100/95 text-sky-900 rounded-full text-xs font-semibold backdrop-blur-sm">
                        ❄️ Froid
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-warm-dark mb-1">
                    {item.name}
                  </h3>
                  <p className="text-warm-muted text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  {item.variants && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.variants.map((v) => (
                        <span
                          key={v}
                          className="px-2 py-0.5 bg-lego-off-white text-warm-muted text-xs rounded-md font-medium"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
