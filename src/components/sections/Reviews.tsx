"use client"

import { motion } from "framer-motion"

const reviews = [
  {
    name: "Yasmine K.",
    avatar: "YK",
    color: "#8B4E8B",
    rating: 5,
    date: "il y a 3 jours",
    text: "Le matcha latte est une tuerie absolue 🤩 Et le fait que tout soit certifié halal c'est vraiment un plus énorme pour moi. Mon spot préféré du 11e, j'y reviens chaque semaine.",
    tag: "Matcha Latte",
  },
  {
    name: "Thomas R.",
    avatar: "TR",
    color: "#4A6FA5",
    rating: 5,
    date: "il y a 1 semaine",
    text: "J'y passe tous les matins avant le taf. Le café colombien de la Finca El Ladrillo est vraiment d'une qualité rare, on sent la différence vs les chaînes. Le staff est aux petits soins.",
    tag: "Espresso",
  },
  {
    name: "Amina B.",
    avatar: "AB",
    color: "#2D7D4E",
    rating: 5,
    date: "il y a 2 semaines",
    text: "Le cookie NAYRA au chocolat noir c'est mon péché mignon 😍 Tout est vraiment fait maison, ça se sent dans chaque bouchée. Et l'ambiance est tellement cosy, j'adore.",
    tag: "Cookie NAYRA",
  },
  {
    name: "Lucas M.",
    avatar: "LM",
    color: "#C8820A",
    rating: 5,
    date: "il y a 2 semaines",
    text: "Le concept de composer sa boisson comme des LEGO c'est trop original haha 😂 J'ai ramené toute ma team de boulot, tout le monde a kiffé. L'ambiance est vraiment unique à Paris.",
    tag: "Expérience",
  },
  {
    name: "Sarah D.",
    avatar: "SD",
    color: "#D42B2B",
    rating: 5,
    date: "il y a 3 semaines",
    text: "Enfin un coffee shop halal qui ne fait aucun compromis sur la qualité ! Le bubble tea est incroyable et le muffin de l'enfer 🔥 Je recommande à tous mes amis sans hésitation.",
    tag: "Bubble Tea",
  },
  {
    name: "Karim A.",
    avatar: "KA",
    color: "#6B4C2A",
    rating: 5,
    date: "il y a 1 mois",
    text: "Le meilleur cappuccino de Paris, point final. La Finca El Ladrillo c'est un niveau au-dessus. J'ai essayé beaucoup de coffee shops dans le coin, celui-là les dépasse tous.",
    tag: "Cappuccino",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-lego-yellow" : "text-white/15"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Reviews() {
  return (
    <section className="bg-warm-dark py-24 px-5 md:px-10" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-caramel uppercase mb-4">
            Avis clients
          </span>
          <h2
            id="reviews-heading"
            className="font-heading font-bold text-3xl md:text-4xl text-lego-off-white mb-4"
          >
            Ils nous font confiance
          </h2>
          <p className="text-lego-off-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Plus de 200 clients réguliers nous font confiance chaque semaine.
            Voici ce qu'ils disent.
          </p>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
            <span className="font-heading font-bold text-3xl text-lego-off-white">4.9</span>
            <div className="flex flex-col items-start gap-1">
              <Stars count={5} />
              <span className="text-lego-off-white/40 text-xs">basé sur 200+ avis</span>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {reviews.map((r) => (
            <motion.article
              key={r.name}
              variants={cardVariant}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-espresso/60 border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-caramel/30 transition-colors duration-300"
            >
              {/* Top: avatar + name + rating */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: r.color }}
                  aria-hidden="true"
                >
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lego-off-white font-semibold text-sm leading-none mb-1 truncate">
                    {r.name}
                  </p>
                  <Stars count={r.rating} />
                </div>
                <span className="text-lego-off-white/25 text-xs flex-shrink-0">{r.date}</span>
              </div>

              {/* Review text */}
              <p className="text-lego-off-white/65 text-sm leading-relaxed flex-1">
                {r.text}
              </p>

              {/* Tag */}
              <span className="self-start px-2.5 py-1 bg-white/6 border border-white/10 text-lego-off-white/45 text-xs rounded-full">
                {r.tag}
              </span>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
