export interface Order {
  _id: string;
  products: Product[];
  delivery_fee: number;
  total: number;
  payment_method: string;
  status: string;
  user: User;
  number_of_products: number;
  order_date: string;
}
export interface Product {
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
  subtotal?: number;
}
interface User {
  _id: string;
  name: string;
  email: string;
}
