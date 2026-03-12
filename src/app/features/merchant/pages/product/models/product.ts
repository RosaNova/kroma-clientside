import { Category } from './category';

export interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
  // qty: number;
  category: Category;
  discount: number;
  description?: string;
  price_after_discount: number;
}

export interface ProductGrouped {
  _id: string;
  name: string;
  description: string;
  products: Product[];
}
