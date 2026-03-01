export interface Store {
  _id: string;
  name: string;
  owner_name: string;
  merchant: any;
  store_type: string;
  isActive: boolean;
  store_image?: File;
  image_url: string;
}
