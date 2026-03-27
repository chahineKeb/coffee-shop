"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const commitments = [
  {
    icon: "🟢",
    title: "100% Halal",
    desc: "Tous nos ingrédients sont certifiés HCB. Zéro compromis, toujours.",
  },
  {
    icon: "🇫🇷",
    title: "Fait maison",
    desc: "Pains, cookies, donuts, brownies — préparés chaque matin sur place.",
  },
  {
    icon: "🌿",
    title: "Produits français",
    desc: "Du lait aux farines, on soutient les producteurs locaux.",
  },
]

export default function Values() {
  return (
    <section id="valeurs" className="bg-espresso overflow-hidden" aria-label="Nos valeurs">

      {/* Concept — deux colonnes */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-caramel text-sm font-semibold uppercase tracking-widest">
              Le concept
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-lego-off-white mt-3 mb-6 text-balance leading-tight">
              Ton café,{" "}
              <span className="text-lego-red">assemblé comme des LEGO</span>
            </h2>
            <p className="text-lego-off-white/60 text-lg leading-relaxed mb-5">
              Tu choisis ta base, tes saveurs, tes ajouts. Chaque combo est une création
              unique — construite brique par brique, servie avec intention.
            </p>
            <p className="text-lego-off-white/40 text-base">
              Zéro barrière, zéro jugement. Juste du fun, du goût, et toi à la barre.
            </p>
            <blockquote className="mt-8 pl-4 border-l-2 border-caramel">
              <p className="text-lego-off-white/80 text-base italic leading-relaxed">
                &ldquo;Pas de raccourcis. Pas de poudre de maquillage. Juste du vrai.&rdquo;
              </p>
              <footer className="mt-2">
                <cite className="text-caramel text-sm font-semibold not-italic">
                  — L&apos;équipe LEGO Coffee Shop
                </cite>
              </footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[480px] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85"
                alt="Barista préparant un café au LEGO Coffee Shop"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-caramel text-espresso rounded-2xl px-5 py-3 shadow-xl">
              <p className="font-heading font-bold text-sm">Café de spécialité</p>
              <p className="text-xs opacity-75">Colombie · Finca El Ladrillo</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Origine café — photo plein cadre */}
      <div className="relative h-[440px] md:h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80"
          alt="Plantation de café Finca El Ladrillo, Valle del Cauca, Colombie"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/20" />
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl mx-auto px-5 md:px-10 w-full"
          >
            <div className="max-w-xl">
              <span className="text-caramel text-sm font-semibold uppercase tracking-widest">
                Origine du café
              </span>
              <h3 className="font-heading font-bold text-3xl md:text-4xl text-white mt-3 mb-5 text-balance">
                Finca El Ladrillo,<br />Valle del Cauca
              </h3>
              <p className="text-white/65 text-base md:text-lg leading-relaxed">
                Haut dans la montagne colombienne, des fermiers indépendants cultivent
                notre café avec soin. Pas d&apos;industrie — juste{" "}
                <strong className="text-white/90">une famille, une parcelle</strong>,
                et un café que tu goûtes vraiment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Engagements */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 md:py-24">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading font-bold text-3xl text-lego-off-white text-center mb-12"
        >
          Ce qu&apos;on te promet, on le tient
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-caramel/30 transition-colors duration-300"
            >
              <span className="text-4xl mb-5 block" aria-hidden="true">{c.icon}</span>
              <h4 className="font-heading font-bold text-xl text-lego-off-white mb-3">
                {c.title}
              </h4>
              <p className="text-lego-off-white/50 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
