export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  tags: string[];
  stockLeft: number;
  urgencyType: '30min' | '2hours' | null;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "24K Gold Luxury",
    price: 35000,
    originalPrice: 45000,
    description: "An opulent blend of rare golden saffron and deep amber for a signature statement.",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"],
    rating: 4.9,
    reviews: 128,
    tags: ["Best Seller", "Luxury"],
    stockLeft: 5,
    urgencyType: "30min"
  },
  {
    id: "2",
    name: "Mousouf Royal",
    price: 18000,
    originalPrice: 22000,
    description: "A charismatic fusion of rich oud and sweet caramel that guarantees long-lasting freshness.",
    images: ["https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800"],
    rating: 4.8,
    reviews: 210,
    tags: ["Popular"],
    stockLeft: 8,
    urgencyType: "2hours"
  },
  {
    id: "3",
    name: "Cool Breeze",
    price: 12500,
    originalPrice: 15000,
    description: "Light, aquatic notes bursting with fresh citrus for everyday elegance.",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"],
    rating: 4.5,
    reviews: 84,
    tags: ["Fresh", "Daily"],
    stockLeft: 12,
    urgencyType: null,
  },
  {
    id: "4",
    name: "Smart Collection #344",
    price: 8500,
    originalPrice: 10000,
    description: "Inspired by designer fragrances, formulated for affordability without compromising projection.",
    images: ["https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&q=80&w=800"],
    rating: 4.6,
    reviews: 312,
    tags: ["Affordable"],
    stockLeft: 3,
    urgencyType: "30min"
  },
  {
    id: "5",
    name: "Pure Love",
    price: 16000,
    originalPrice: 20000,
    description: "A sweet, floral symphony wrapped in delicate vanilla notes.",
    images: ["https://images.unsplash.com/photo-1629198725807-6c8cf42fd366?auto=format&fit=crop&q=80&w=800"],
    rating: 4.7,
    reviews: 94,
    tags: ["Floral"],
    stockLeft: 0,
    urgencyType: null
  },
  {
    id: "6",
    name: "Chairman Executive",
    price: 28000,
    originalPrice: 35000,
    description: "Woody, muscular, and commanding. A fragrance built for leadership and boardrooms.",
    images: ["https://images.unsplash.com/photo-1590159763121-7c9bf39cd7dc?auto=format&fit=crop&q=80&w=800"],
    rating: 4.9,
    reviews: 67,
    tags: ["Male", "Premium"],
    stockLeft: 2,
    urgencyType: "2hours"
  },
  {
    id: "7",
    name: "Explore Passion",
    price: 10000,
    originalPrice: 13500,
    description: "A vibrant explosion of fruity accords perfect for summer adventures.",
    images: ["https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"],
    rating: 4.4,
    reviews: 145,
    tags: [],
    stockLeft: 15,
    urgencyType: null
  },
  {
    id: "8",
    name: "Techno Edge",
    price: 11500,
    originalPrice: 14000,
    description: "Contemporary and spicy elements crafted into a modern olfactory experience.",
    images: ["https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800"],
    rating: 4.5,
    reviews: 51,
    tags: ["Spicy"],
    stockLeft: 4,
    urgencyType: "30min"
  }
];
