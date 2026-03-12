export interface Store {
  _id: string;
  name: string;
  merchant: Merchant;
  store_category: any;
  isActive: boolean;
  store_image?: File;
  image_url: string;
}
interface Merchant {
  address: string;
  commission_rate: number;
  createdAt: Date;
  email: string;
  fullname: string;
  isActive: boolean;
  phone: string;
  role: string;
  updatedAt: Date;
  username: string;
}
