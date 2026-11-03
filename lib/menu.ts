export type DishCategory = "Raw Bar" | "Charcoal Grill" | "Signature";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: DishCategory;
  badge?: string;
  detail: string;
};

export const menuCategories = ["All", "Raw Bar", "Charcoal Grill"] as const;
export type MenuFilter = (typeof menuCategories)[number];

export const dishes: Dish[] = [
  {
    id: "red-sea-lobster",
    name: "Red Sea Lobster",
    description:
      "Charcoal-grilled, brushed with saffron butter, finished with charred lemon and sea herbs.",
    price: 168,
    image: "/images/fishfactory-lobster.jpg",
    category: "Charcoal Grill",
    badge: "Chef's signature",
    detail: "Half lobster · Josper grilled · serves one",
  },
  {
    id: "yellowfin-tartare",
    name: "Yellowfin Tartare",
    description:
      "Hand-cut yellowfin, avocado, toasted sesame and nori crisps with a chive-oil drizzle.",
    price: 74,
    image: "/images/fishfactory-tuna.jpg",
    category: "Raw Bar",
    badge: "Line-caught",
    detail: "Sustainably line-caught · gluten-free",
  },
  {
    id: "fine-de-claire",
    name: "Fine de Claire Oysters",
    description:
      "Half a dozen oysters on crushed ice with mignonette, fresh horseradish and lemon.",
    price: 96,
    image: "/images/fishfactory-oysters.jpg",
    category: "Raw Bar",
    badge: "Half dozen",
    detail: "Six pieces · shucked to order",
  },
  {
    id: "king-prawns",
    name: "Charred King Prawns",
    description:
      "Josper-grilled king prawns, garlic butter, flat parsley and smoked lemon.",
    price: 118,
    image: "/images/fishfactory-prawns.jpg",
    category: "Charcoal Grill",
    badge: "Most loved",
    detail: "Six pieces · charcoal-fired",
  },
  {
    id: "saffron-sea-bass",
    name: "Saffron Sea Bass",
    description:
      "Crisp-skinned sea bass, silken beurre blanc, samphire and a touch of saffron.",
    price: 132,
    image: "/images/fishfactory-seabass.jpg",
    category: "Charcoal Grill",
    badge: "Gluten-free",
    detail: "Whole fillet · caught in the Red Sea",
  },
  {
    id: "citrus-salmon",
    name: "Citrus Salmon Crudo",
    description:
      "Citrus-cured salmon ribbons, blood orange, dill and pink peppercorn oil.",
    price: 88,
    image: "/images/fishfactory-salmon.jpg",
    category: "Raw Bar",
    badge: "New",
    detail: "Norwegian salmon · cured in-house",
  },
];

export const featuredPlatter = {
  id: "fish-factory-platter",
  name: "The Fish Factory Platter",
  description:
    "A tiered celebration of the day's catch: oysters, langoustines, king prawns and split lobster on ice. Made for the middle of the table.",
  price: 420,
  image: "/images/fishfactory-hero.jpg",
  serves: "Serves 3–4",
  detail: "Available daily from 2pm · 24h notice for 6+ guests",
};

export const formatSAR = (value: number) =>
  new Intl.NumberFormat("en-SA", {
    maximumFractionDigits: 0,
  }).format(value);
