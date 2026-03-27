"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

/* ─── Types ─────────────────────────────────────── */

type BrickCat = "base" | "lait" | "taille" | "extra"

interface BrickDef {
  id: string
  label: string
  category: BrickCat
  emoji: string
  bg: string
  studs: number
}

interface OrderItem extends BrickDef {
  uid: string
}

/* ─── Catalogue de briques ───────────────────────── */

const BRICKS: BrickDef[] = [
  // Base
  { id: "espresso",   label: "Espresso",   category: "base",   emoji: "☕", bg: "#C0392B", studs: 2 },
  { id: "cappuccino", label: "Cappuccino", category: "base",   emoji: "☕", bg: "#C0392B", studs: 2 },
  { id: "matcha",     label: "Matcha",     category: "base",   emoji: "🍵", bg: "#C0392B", studs: 2 },
  { id: "the-noir",   label: "Thé noir",   category: "base",   emoji: "🫖", bg: "#C0392B", studs: 2 },
  // Lait
  { id: "lait-entier",label: "Lait entier",category: "lait",  emoji: "🥛", bg: "#B5740A", studs: 2 },
  { id: "oat-milk",   label: "Oat milk",   category: "lait",  emoji: "🌾", bg: "#B5740A", studs: 2 },
  { id: "lait-soja",  label: "Soja",       category: "lait",  emoji: "🫘", bg: "#B5740A", studs: 2 },
  { id: "sans-lait",  label: "Sans lait",  category: "lait",  emoji: "∅",  bg: "#B5740A", studs: 2 },
  // Taille
  { id: "small",  label: "Small",  category: "taille", emoji: "S", bg: "#1F6B9A", studs: 1 },
  { id: "medium", label: "Medium", category: "taille", emoji: "M", bg: "#1F6B9A", studs: 2 },
  { id: "large",  label: "Large",  category: "taille", emoji: "L", bg: "#1F6B9A", studs: 3 },
  // Extras
  { id: "caramel",  label: "Caramel",  category: "extra", emoji: "🍯", bg: "#276845", studs: 2 },
  { id: "vanille",  label: "Vanille",  category: "extra", emoji: "🌿", bg: "#276845", studs: 2 },
  { id: "chantilly",label: "Chantilly",category: "extra", emoji: "🌀", bg: "#276845", studs: 2 },
  { id: "bubble",   label: "Bubble",   category: "extra", emoji: "⚫", bg: "#276845", studs: 2 },
]

const CAT_META: Record<BrickCat, { label: string; hint: string }> = {
  base:   { label: "Base",    hint: "Choisis ton café" },
  lait:   { label: "Lait",    hint: "Adapte ta texture" },
  taille: { label: "Taille",  hint: "S, M ou L ?" },
  extra:  { label: "Extras",  hint: "Personnalise" },
}

const CATS: BrickCat[] = ["base", "lait", "taille", "extra"]

/* ─── Stud visuel ────────────────────────────────── */

function Studs({ bg, count }: { bg: string; count: number }) {
  return (
    <div className="absolute -top-[7px] left-2.5 flex gap-1.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[11px] h-[11px] rounded-full"
          style={{
            backgroundColor: bg,
            filter: "brightness(1.4)",
            boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.12)",
          }}
        />
      ))}
    </div>
  )
}

/* ─── Brique draggable ───────────────────────────── */

function BrickTile({
  brick,
  onAdd,
  dropRef,
  isOverZone,
  setIsOverZone,
}: {
  brick: BrickDef
  onAdd: (b: BrickDef) => void
  dropRef: React.RefObject<HTMLDivElement | null>
  isOverZone: boolean
  setIsOverZone: (v: boolean) => void
}) {
  const checkOver = useCallback(
    (point: { x: number; y: number }) => {
      const zone = dropRef.current
      if (!zone) return false
      const r = zone.getBoundingClientRect()
      return point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom
    },
    [dropRef],
  )

  return (
    <motion.button
      drag
      dragSnapToOrigin
      dragElastic={0.5}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
      style={{ backgroundColor: brick.bg, touchAction: "none", position: "relative" }}
      className="relative px-3 pt-6 pb-2.5 rounded-[8px] cursor-grab active:cursor-grabbing select-none text-white shadow-[0_4px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_0_rgba(0,0,0,0.25)] transition-shadow"
      whileHover={{ y: -3 }}
      whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: "0 16px 40px rgba(0,0,0,0.35)" }}
      onDrag={(_, info: PanInfo) => setIsOverZone(checkOver(info.point))}
      onDragEnd={(_, info: PanInfo) => {
        setIsOverZone(false)
        if (checkOver(info.point)) onAdd(brick)
      }}
      onClick={() => onAdd(brick)}
      aria-label={`Ajouter ${brick.label}`}
    >
      <Studs bg={brick.bg} count={brick.studs} />
      <span className="block text-base leading-none mb-0.5">{brick.emoji}</span>
      <span className="block text-[11px] font-bold whitespace-nowrap leading-none">{brick.label}</span>
    </motion.button>
  )
}

/* ─── Brique dans la commande ────────────────────── */

function OrderBrick({ item, onRemove }: { item: OrderItem; onRemove: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="relative flex items-center gap-2.5 rounded-[8px] px-3 pt-6 pb-2.5 text-white shadow-[0_3px_0_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: item.bg }}
    >
      <Studs bg={item.bg} count={item.studs} />
      <span className="text-base leading-none">{item.emoji}</span>
      <span className="text-sm font-bold flex-1 leading-none">{item.label}</span>
      <button
        onClick={onRemove}
        className="w-5 h-5 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center text-[11px] font-black leading-none"
        aria-label={`Retirer ${item.label}`}
      >
        ×
      </button>
    </motion.div>
  )
}

/* ─── Composant principal ────────────────────────── */

let _uid = 0
const uid = () => `uid-${++_uid}`

export default function Builder() {
  const [order, setOrder] = useState<OrderItem[]>([])
  const [isOverZone, setIsOverZone] = useState(false)
  const [bump, setBump] = useState(0)
  const dropRef = useRef<HTMLDivElement | null>(null)

  const addBrick = useCallback((brick: BrickDef) => {
    setOrder((prev) => [...prev, { ...brick, uid: uid() }])
    setBump((n) => n + 1)
  }, [])

  const removeBrick = (id: string) => setOrder((prev) => prev.filter((b) => b.uid !== id))

  const reset = () => setOrder([])

  const orderText = order.length
    ? order.map((b) => b.label).join(" + ")
    : ""

  return (
    <section
      id="builder"
      className="py-20 md:py-28 bg-lego-off-white overflow-x-clip"
      aria-label="Construis ta commande"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lego-red/8 text-lego-red text-sm font-semibold mb-4">
            🧱 L&apos;expérience en magasin
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-warm-dark mb-4 text-balance">
            Construis ta commande
          </h2>
          <p className="text-warm-muted text-lg max-w-xl mx-auto">
            Glisse les briques dans le verre — ou clique dessus — et compose ta boisson
            comme tu le ferais au comptoir.
          </p>
        </motion.div>

        {/* Builder grid */}
        <div className="grid md:grid-cols-[1fr_56px_380px] gap-6 items-start">

          {/* ── Palette ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-7"
          >
            <p className="text-xs font-bold text-warm-muted/60 uppercase tracking-widest">
              Briques disponibles
            </p>
            {CATS.map((cat) => (
              <div key={cat}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: BRICKS.find((b) => b.category === cat)?.bg }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-warm-dark uppercase tracking-wider">
                    {CAT_META[cat].label}
                  </span>
                  <span className="text-xs text-warm-muted">{CAT_META[cat].hint}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {BRICKS.filter((b) => b.category === cat).map((brick) => (
                    <BrickTile
                      key={brick.id}
                      brick={brick}
                      onAdd={addBrick}
                      dropRef={dropRef}
                      isOverZone={isOverZone}
                      setIsOverZone={setIsOverZone}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Flèche animée ── */}
          <div className="hidden md:flex items-start justify-center pt-32">
            <motion.div
              animate={{ x: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-2xl text-warm-muted/30 select-none"
              aria-hidden="true"
            >
              →
            </motion.div>
          </div>

          {/* ── Zone d'assemblage ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Cup / Drop zone */}
            <motion.div
              ref={dropRef}
              key={bump}
              animate={bump > 0 ? { scale: [1, 1.015, 1] } : {}}
              transition={{ duration: 0.25 }}
              className={`relative min-h-[320px] rounded-2xl border-2 transition-all duration-200 p-5 flex flex-col
                ${isOverZone
                  ? "border-lego-red bg-lego-red/5 shadow-lg shadow-lego-red/10"
                  : "border-dashed border-warm-dark/15 bg-white"
                }`}
            >
              {/* Drop target label */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest">
                  {order.length === 0 ? "Glisse tes briques ici" : `Ta commande (${order.length})`}
                </p>
                {isOverZone && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs font-bold text-lego-red"
                  >
                    Lâche !
                  </motion.span>
                )}
              </div>

              {/* Stacked bricks */}
              <div className="flex-1 flex flex-col gap-2.5">
                <AnimatePresence mode="popLayout">
                  {order.map((item) => (
                    <OrderBrick
                      key={item.uid}
                      item={item}
                      onRemove={() => removeBrick(item.uid)}
                    />
                  ))}
                </AnimatePresence>

                {/* Empty state */}
                {order.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center py-10 text-warm-muted/25">
                    <svg
                      className="w-14 h-14 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    <p className="text-sm text-center leading-relaxed">
                      Commence à empiler tes briques<br />pour créer ta boisson
                    </p>
                  </div>
                )}
              </div>

              {/* Verre stylisé — fond décoratif */}
              {order.length > 0 && (
                <div
                  className="absolute bottom-4 right-4 opacity-5 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 2l1.5 15a2 2 0 002 1.7h7a2 2 0 002-1.7L19 2H5z" />
                  </svg>
                </div>
              )}
            </motion.div>

            {/* Résumé commande */}
            <AnimatePresence>
              {order.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-espresso/6 border border-espresso/8 rounded-xl p-4 space-y-3"
                >
                  <div>
                    <p className="text-xs font-bold text-warm-muted/60 uppercase tracking-wider mb-1.5">
                      Résumé
                    </p>
                    <p className="text-sm text-warm-dark font-medium leading-relaxed">
                      {orderText}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={reset}
                      className="flex-1 py-2.5 text-xs font-bold text-warm-muted hover:text-warm-dark border border-warm-dark/10 rounded-lg transition-colors"
                    >
                      Vider
                    </button>
                    <button
                      className="flex-1 py-2.5 text-xs font-bold text-white bg-lego-red hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                      onClick={() => {
                        const target = document.getElementById("contact")
                        target?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Commander →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Légende */}
            <p className="text-center text-xs text-warm-muted/40">
              Glisse depuis la palette · Clique pour ajouter · × pour retirer
            </p>
          </motion.div>
        </div>

        {/* Légende couleurs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {CATS.map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm shadow-[0_2px_0_rgba(0,0,0,0.2)]"
                style={{ backgroundColor: BRICKS.find((b) => b.category === cat)?.bg }}
                aria-hidden="true"
              />
              <span className="text-xs text-warm-muted font-medium">{CAT_META[cat].label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
