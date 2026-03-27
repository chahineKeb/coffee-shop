export type Category = "boisson" | "food"

export interface MenuItem {
  id: string
  name: string
  description: string
  category: Category
  variants?: string[]
  isHot?: boolean
  isCold?: boolean
  emoji: string
}

export const menuItems: MenuItem[] = [
  // BOISSONS
  {
    id: "espresso",
    name: "Espresso",
    description: "Force pure, saveur nette, effet garanti.",
    category: "boisson",
    isHot: true,
    emoji: "☕",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Crémeux, doux, le classique réinventé.",
    category: "boisson",
    variants: ["Chaud", "Froid"],
    isHot: true,
    isCold: true,
    emoji: "☕",
  },
  {
    id: "machiatto",
    name: "Macchiato",
    description: "Espresso + touche de lait, équilibre parfait.",
    category: "boisson",
    isHot: true,
    emoji: "☕",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Vert intense, sucré juste comme il faut.",
    category: "boisson",
    variants: ["Chaud", "Froid"],
    isHot: true,
    isCold: true,
    emoji: "🍵",
  },
  {
    id: "bubble-tea",
    name: "Bubble Tea",
    description: "Perles fondantes, thé frais, asiatique assumé.",
    category: "boisson",
    isCold: true,
    emoji: "🧋",
  },
  {
    id: "citronade",
    name: "Citronade",
    description: "Sucré-aigre, naturel, été en verre.",
    category: "boisson",
    variants: ["Framboise", "Fruit du dragon", "Menthe"],
    isCold: true,
    emoji: "🍋",
  },
  // FOOD
  {
    id: "muffin-egg",
    name: "Muffin Egg",
    description: "Savoureux, protéiné, ton déjeuner champion.",
    category: "food",
    emoji: "🫓",
  },
  {
    id: "sandwich",
    name: "Sandwich",
    description: "Fait du jour, farci, une vraie pause déj'.",
    category: "food",
    emoji: "🥪",
  },
  {
    id: "brownie",
    name: "Brownie",
    description: "Chocolat noir intense, gooey au centre, vrai.",
    category: "food",
    emoji: "🍫",
  },
  {
    id: "cookie-nayra",
    name: "Cookie NAYRA",
    description: "Homemade, encore tiède, 6 possibilités infinies.",
    category: "food",
    variants: [
      "Tout choco",
      "Spéculoos",
      "Caramel beurre salé & noix de pécan",
      "Framboise & chocolat blanc",
      "Bueno",
      "Nutella",
    ],
    emoji: "🍪",
  },
  {
    id: "donuts",
    name: "Donuts",
    description: "Moelleux dedans, glacé dehors, sucré juste.",
    category: "food",
    emoji: "🍩",
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    description: "Épicé, doux, le réconfort en un morceau.",
    category: "food",
    emoji: "🌀",
  },
  {
    id: "egg-bacon",
    name: "Egg & Bacon",
    description: "Simple, généreux, le petit-déj' qui fait sens.",
    category: "food",
    emoji: "🍳",
  },
]
