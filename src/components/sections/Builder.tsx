"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */

type DrinkCat = "base" | "lait" | "taille" | "extra"
type FoodCat  = "sale" | "sucre"

interface BrickDef {
  id: string
  label: string
  category: DrinkCat | FoodCat
  emoji: string
  bg: string
  studs: number
}

interface OrderItem extends BrickDef { uid: string }

/* ═══════════════════════════════════════
   BRIQUES BOISSON
═══════════════════════════════════════ */

const DRINK_BRICKS: BrickDef[] = [
  { id: "espresso",    label: "Espresso",    category: "base",   emoji: "☕", bg: "#C0392B", studs: 2 },
  { id: "cappuccino",  label: "Cappuccino",  category: "base",   emoji: "☕", bg: "#C0392B", studs: 2 },
  { id: "matcha",      label: "Matcha",      category: "base",   emoji: "🍵", bg: "#C0392B", studs: 2 },
  { id: "the-noir",    label: "Thé noir",    category: "base",   emoji: "🫖", bg: "#C0392B", studs: 2 },
  { id: "lait-entier", label: "Lait entier", category: "lait",   emoji: "🥛", bg: "#B5740A", studs: 2 },
  { id: "oat-milk",    label: "Oat milk",    category: "lait",   emoji: "🌾", bg: "#B5740A", studs: 2 },
  { id: "lait-soja",   label: "Soja",        category: "lait",   emoji: "🫘", bg: "#B5740A", studs: 2 },
  { id: "sans-lait",   label: "Sans lait",   category: "lait",   emoji: "∅",  bg: "#B5740A", studs: 2 },
  { id: "small",       label: "Small",       category: "taille", emoji: "S",  bg: "#1F6B9A", studs: 1 },
  { id: "medium",      label: "Medium",      category: "taille", emoji: "M",  bg: "#1F6B9A", studs: 2 },
  { id: "large",       label: "Large",       category: "taille", emoji: "L",  bg: "#1F6B9A", studs: 3 },
  { id: "caramel",     label: "Caramel",     category: "extra",  emoji: "🍯", bg: "#276845", studs: 2 },
  { id: "vanille",     label: "Vanille",     category: "extra",  emoji: "🌿", bg: "#276845", studs: 2 },
  { id: "chantilly",   label: "Chantilly",   category: "extra",  emoji: "🌀", bg: "#276845", studs: 2 },
  { id: "bubble",      label: "Bubble",      category: "extra",  emoji: "⚫", bg: "#276845", studs: 2 },
]

const DRINK_CATS: { key: DrinkCat; label: string; hint: string }[] = [
  { key: "base",   label: "Base",   hint: "Choisis ton café" },
  { key: "lait",   label: "Lait",   hint: "Adapte ta texture" },
  { key: "taille", label: "Taille", hint: "S, M ou L ?" },
  { key: "extra",  label: "Extras", hint: "Personnalise" },
]

/* ═══════════════════════════════════════
   BRIQUES FOOD
═══════════════════════════════════════ */

const FOOD_BRICKS: BrickDef[] = [
  // Salé
  { id: "muffin-egg",  label: "Muffin Egg",   category: "sale",  emoji: "🫓", bg: "#4A6FA5", studs: 2 },
  { id: "sandwich",    label: "Sandwich",      category: "sale",  emoji: "🥪", bg: "#4A6FA5", studs: 2 },
  { id: "egg-bacon",   label: "Egg & Bacon",   category: "sale",  emoji: "🍳", bg: "#4A6FA5", studs: 2 },
  // Sucré
  { id: "brownie",              label: "Brownie",                category: "sucre", emoji: "🍫", bg: "#8B4E8B", studs: 2 },
  { id: "donuts",               label: "Donuts",                 category: "sucre", emoji: "🍩", bg: "#8B4E8B", studs: 2 },
  { id: "cinnamon-roll",        label: "Cinnamon Roll",          category: "sucre", emoji: "🌀", bg: "#8B4E8B", studs: 2 },
  { id: "cookie-tout-choco",    label: "Cookie tout choco",      category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
  { id: "cookie-speculoos",     label: "Cookie Spéculoos",       category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
  { id: "cookie-caramel",       label: "Cookie Caramel & pécan", category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
  { id: "cookie-framboise",     label: "Cookie Framboise & choco blanc", category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
  { id: "cookie-bueno",         label: "Cookie Bueno",           category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
  { id: "cookie-nutella",       label: "Cookie Nutella",         category: "sucre", emoji: "🍪", bg: "#7A3B7A", studs: 2 },
]

const FOOD_CATS: { key: FoodCat; label: string; hint: string }[] = [
  { key: "sale",  label: "Salé",  hint: "Savoureux & consistant" },
  { key: "sucre", label: "Sucré", hint: "Fait maison, encore tiède" },
]

/* ═══════════════════════════════════════
   SOUS-COMPOSANTS PARTAGÉS
═══════════════════════════════════════ */

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

function BrickTile({
  brick,
  onAdd,
  dropRef,
  setIsOverZone,
}: {
  brick: BrickDef
  onAdd: (b: BrickDef) => void
  dropRef: React.RefObject<HTMLDivElement | null>
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
      style={{ backgroundColor: brick.bg, touchAction: "none" }}
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
        className="w-5 h-5 rounded-full bg-black/20 hover:bg-black/40 transition-colors flex items-center justify-center text-[11px] font-black"
        aria-label={`Retirer ${item.label}`}
      >×</button>
    </motion.div>
  )
}

function DropZone({
  dropRef,
  order,
  onRemove,
  isOverZone,
  emptyLabel,
  bump,
}: {
  dropRef: React.RefObject<HTMLDivElement | null>
  order: OrderItem[]
  onRemove: (uid: string) => void
  isOverZone: boolean
  emptyLabel: string
  bump: number
}) {
  return (
    <motion.div
      ref={dropRef}
      key={bump}
      animate={bump > 0 ? { scale: [1, 1.015, 1] } : {}}
      transition={{ duration: 0.25 }}
      className={`relative min-h-[280px] rounded-2xl border-2 transition-all duration-200 p-5 flex flex-col
        ${isOverZone
          ? "border-lego-red bg-lego-red/5 shadow-lg shadow-lego-red/10"
          : "border-dashed border-warm-dark/15 bg-white"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest">
          {order.length === 0 ? emptyLabel : `Ta sélection (${order.length})`}
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

      <div className="flex-1 flex flex-col gap-2.5">
        <AnimatePresence mode="popLayout">
          {order.map((item) => (
            <OrderBrick key={item.uid} item={item} onRemove={() => onRemove(item.uid)} />
          ))}
        </AnimatePresence>

        {order.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-warm-muted/25">
            <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <p className="text-sm text-center">Glisse ou clique une brique</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   STEP INDICATOR
═══════════════════════════════════════ */

function StepBar({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Boisson", emoji: "☕" },
    { n: 2, label: "Food",    emoji: "🍪" },
    { n: 3, label: "Récap",   emoji: "🎉" },
  ]
  return (
    <div className="flex items-center mb-10 gap-0" role="tablist" aria-label="Étapes de la commande">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${step === s.n ? "bg-lego-red text-white shadow-md shadow-lego-red/20"
                : step > s.n ? "bg-lego-red/15 text-lego-red"
                : "bg-warm-dark/6 text-warm-muted"}`}
            role="tab"
            aria-selected={step === s.n}
          >
            <span className="text-base leading-none">{step > s.n ? "✓" : s.emoji}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-2 transition-colors duration-300
              ${step > s.n + 1 ? "bg-lego-red/40" : "bg-warm-dark/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   STEP 1 — BOISSON
═══════════════════════════════════════ */

function DrinkStep({
  order, onAdd, onRemove, dropRef, isOverZone, setIsOverZone, bump,
}: {
  order: OrderItem[]
  onAdd: (b: BrickDef) => void
  onRemove: (uid: string) => void
  dropRef: React.RefObject<HTMLDivElement | null>
  isOverZone: boolean
  setIsOverZone: (v: boolean) => void
  bump: number
}) {
  return (
    <div className="grid md:grid-cols-[1fr_48px_340px] gap-6 items-start">
      {/* Palette */}
      <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-6">
        <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest">Briques disponibles</p>
        {DRINK_CATS.map((cat) => (
          <div key={cat.key}>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: DRINK_BRICKS.find(b => b.category === cat.key)?.bg }}
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-warm-dark uppercase tracking-wider">{cat.label}</span>
              <span className="text-xs text-warm-muted">{cat.hint}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {DRINK_BRICKS.filter(b => b.category === cat.key).map(brick => (
                <BrickTile key={brick.id} brick={brick} onAdd={onAdd}
                  dropRef={dropRef} setIsOverZone={setIsOverZone} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-start justify-center pt-28">
        <motion.div animate={{ x: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-2xl text-warm-muted/25 select-none" aria-hidden="true">→</motion.div>
      </div>

      {/* Drop zone */}
      <DropZone dropRef={dropRef} order={order} onRemove={onRemove}
        isOverZone={isOverZone} emptyLabel="Glisse ta boisson ici" bump={bump} />
    </div>
  )
}

/* ═══════════════════════════════════════
   STEP 2 — FOOD
═══════════════════════════════════════ */

function FoodStep({
  order, onAdd, onRemove, dropRef, isOverZone, setIsOverZone, bump,
}: {
  order: OrderItem[]
  onAdd: (b: BrickDef) => void
  onRemove: (uid: string) => void
  dropRef: React.RefObject<HTMLDivElement | null>
  isOverZone: boolean
  setIsOverZone: (v: boolean) => void
  bump: number
}) {
  return (
    <div className="grid md:grid-cols-[1fr_48px_340px] gap-6 items-start">
      {/* Palette */}
      <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-6">
        <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest">Briques disponibles</p>
        {FOOD_CATS.map((cat) => (
          <div key={cat.key}>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-sm inline-block"
                style={{ backgroundColor: FOOD_BRICKS.find(b => b.category === cat.key)?.bg }}
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-warm-dark uppercase tracking-wider">{cat.label}</span>
              <span className="text-xs text-warm-muted">{cat.hint}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {FOOD_BRICKS.filter(b => b.category === cat.key).map(brick => (
                <BrickTile key={brick.id} brick={brick} onAdd={onAdd}
                  dropRef={dropRef} setIsOverZone={setIsOverZone} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-start justify-center pt-28">
        <motion.div animate={{ x: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-2xl text-warm-muted/25 select-none" aria-hidden="true">→</motion.div>
      </div>

      {/* Drop zone */}
      <DropZone dropRef={dropRef} order={order} onRemove={onRemove}
        isOverZone={isOverZone} emptyLabel="Glisse ton food ici" bump={bump} />
    </div>
  )
}

/* ═══════════════════════════════════════
   STEP 3 — RÉCAP
═══════════════════════════════════════ */

function RecapStep({
  drinkOrder, foodOrder, onReset,
}: {
  drinkOrder: OrderItem[]
  foodOrder: OrderItem[]
  onReset: () => void
}) {
  const hasNothing = drinkOrder.length === 0 && foodOrder.length === 0

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {hasNothing ? (
        <div className="bg-white rounded-2xl border border-black/5 p-10 text-center text-warm-muted/40 space-y-3">
          <span className="text-5xl block">😅</span>
          <p className="text-sm">Tu n&apos;as rien sélectionné — retourne choisir tes briques !</p>
        </div>
      ) : (
        <>
          {/* Ticket de commande */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
            {/* Header ticket */}
            <div className="bg-espresso px-6 py-5 flex items-center gap-3">
              <Image src="/lego.svg" alt="Logo LEGO" width={36} height={36} className="rounded-sm flex-shrink-0" />
              <div>
                <p className="font-heading font-bold text-lego-off-white text-lg">Ta commande</p>
                <p className="text-lego-off-white/40 text-xs">LEGO Coffee Shop · Paris 11e</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Boisson */}
              {drinkOrder.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest mb-3">
                    ☕ Boisson
                  </p>
                  <div className="flex flex-col gap-2">
                    {drinkOrder.map((item) => (
                      <div
                        key={item.uid}
                        className="relative flex items-center gap-2.5 rounded-[8px] px-3 pt-5 pb-2 text-white shadow-[0_3px_0_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: item.bg }}
                      >
                        <Studs bg={item.bg} count={item.studs} />
                        <span className="text-sm leading-none">{item.emoji}</span>
                        <span className="text-sm font-bold leading-none">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Séparateur */}
              {drinkOrder.length > 0 && foodOrder.length > 0 && (
                <div className="border-t border-dashed border-warm-dark/10" />
              )}

              {/* Food */}
              {foodOrder.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-warm-muted/50 uppercase tracking-widest mb-3">
                    🍪 Food
                  </p>
                  <div className="flex flex-col gap-2">
                    {foodOrder.map((item) => (
                      <div
                        key={item.uid}
                        className="relative flex items-center gap-2.5 rounded-[8px] px-3 pt-5 pb-2 text-white shadow-[0_3px_0_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: item.bg }}
                      >
                        <Studs bg={item.bg} count={item.studs} />
                        <span className="text-sm leading-none">{item.emoji}</span>
                        <span className="text-sm font-bold leading-none">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer ticket — résumé texte */}
            <div className="bg-lego-off-white/60 border-t border-black/5 px-6 py-4">
              <p className="text-xs text-warm-muted/60 leading-relaxed">
                {[...drinkOrder, ...foodOrder].map(b => b.label).join(" · ")}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={onReset}
              className="flex-1 py-3 text-sm font-bold text-warm-muted hover:text-warm-dark border border-warm-dark/10 rounded-xl transition-colors bg-white"
            >
              Recommencer
            </button>
            <a
              href="#contact"
              className="flex-1 py-3 text-sm font-bold text-white bg-lego-red hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-lego-red/20 text-center"
            >
              Passer commande →
            </a>
          </div>
          <p className="text-center text-xs text-warm-muted/40">
            Présente ce récap au comptoir ou viens simplement nous voir 😊
          </p>
        </>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════ */

let _uid = 0
const nextUid = () => `uid-${++_uid}`

export default function Builder() {
  const [step, setStep]             = useState(1)
  const [direction, setDirection]   = useState(1)
  const [drinkOrder, setDrinkOrder] = useState<OrderItem[]>([])
  const [foodOrder, setFoodOrder]   = useState<OrderItem[]>([])
  const [drinkOverZone, setDrinkOverZone] = useState(false)
  const [foodOverZone, setFoodOverZone]   = useState(false)
  const [drinkBump, setDrinkBump] = useState(0)
  const [foodBump, setFoodBump]   = useState(0)
  const drinkDropRef = useRef<HTMLDivElement | null>(null)
  const foodDropRef  = useRef<HTMLDivElement | null>(null)

  const addDrink = useCallback((b: BrickDef) => {
    setDrinkOrder(p => [...p, { ...b, uid: nextUid() }])
    setDrinkBump(n => n + 1)
  }, [])

  const addFood = useCallback((b: BrickDef) => {
    setFoodOrder(p => [...p, { ...b, uid: nextUid() }])
    setFoodBump(n => n + 1)
  }, [])

  const removeDrink = (uid: string) => setDrinkOrder(p => p.filter(b => b.uid !== uid))
  const removeFood  = (uid: string) => setFoodOrder(p => p.filter(b => b.uid !== uid))

  const reset = () => {
    setDrinkOrder([])
    setFoodOrder([])
    setDirection(-1)
    setStep(1)
  }

  const goNext = () => { setDirection(1);  setStep(s => Math.min(s + 1, 3)) }
  const goBack = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)) }

  return (
    <section
      id="builder"
      className="py-20 md:py-28 bg-lego-off-white overflow-x-clip"
      aria-label="Configurateur de commande"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lego-red/8 text-lego-red text-sm font-semibold mb-4">
            🧱 L&apos;expérience en magasin
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-warm-dark mb-4 text-balance">
            Construis ta commande
          </h2>
          <p className="text-warm-muted text-lg max-w-xl mx-auto">
            Glisse les briques dans ta sélection — ou clique dessus — comme tu le ferais au comptoir.
          </p>
        </motion.div>

        {/* Step indicator */}
        <StepBar step={step} />

        {/* Steps animés */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.28 }}
          >
            {step === 1 && (
              <DrinkStep
                order={drinkOrder} onAdd={addDrink} onRemove={removeDrink}
                dropRef={drinkDropRef} isOverZone={drinkOverZone}
                setIsOverZone={setDrinkOverZone} bump={drinkBump}
              />
            )}
            {step === 2 && (
              <FoodStep
                order={foodOrder} onAdd={addFood} onRemove={removeFood}
                dropRef={foodDropRef} isOverZone={foodOverZone}
                setIsOverZone={setFoodOverZone} bump={foodBump}
              />
            )}
            {step === 3 && (
              <RecapStep drinkOrder={drinkOrder} foodOrder={foodOrder} onReset={reset} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-warm-dark/8">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-warm-muted hover:text-warm-dark border border-warm-dark/10 rounded-xl transition-colors disabled:opacity-0 disabled:pointer-events-none bg-white"
          >
            ← Retour
          </button>

          <p className="text-xs text-warm-muted/40 hidden sm:block">
            {step === 1 && "Configure ta boisson, puis passe au food"}
            {step === 2 && "Ajoute du food (optionnel), puis vois ton récap"}
            {step === 3 && "Voilà ta commande complète 🎉"}
          </p>

          {step < 3 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-lego-red hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-lego-red/20"
            >
              {step === 1 ? "Suivant : Food →" : "Voir le récap →"}
            </button>
          ) : (
            <button
              onClick={reset}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-lego-red hover:text-red-700 border border-lego-red/20 rounded-xl transition-colors bg-white"
            >
              Recommencer
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
