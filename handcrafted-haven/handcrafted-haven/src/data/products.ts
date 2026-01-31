import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Handwoven Basket",
    description: "A beautiful handwoven basket made from natural fibers.",
    price: 45,
    category: "Home Decor",
    imageUrl: "/images/gallery/handwoven-basket.webp",
  },
  {
    id: 2,
    name: "Ceramic Mug",
    description: "Handcrafted ceramic mug with a rustic finish.",
    price: 28,
    category: "Kitchen",
    imageUrl: "/images/gallery/ceramic-mug.jpg", 
  },
  {
    id: 3,
    name: "Wooden Jewelry Box",
    description: "Elegant jewelry box carved from solid wood.",
    price: 60,
    category: "Accessories",
    imageUrl: "/images/gallery/jewelry-box.jpg",
  },
];
