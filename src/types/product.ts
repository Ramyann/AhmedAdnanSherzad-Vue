// src/types/product.ts
export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductSearchParams = {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
};