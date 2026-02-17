import { Category } from './category';

export interface Product {
  _id: string;
  image_url: string;
  name: string;
  price: number;
  qty: number;
  category: Category;
}

export interface ProductGrouped {
  _id: string;
  name: string;
  description: string;
  products: Product[];
}
