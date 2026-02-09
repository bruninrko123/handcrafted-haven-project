export type Product = {
  _id?: string;
  artisanId: string,
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;

  averageRating?: number;
  reviewCount?: number;
};
