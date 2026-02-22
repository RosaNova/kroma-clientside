export interface mobileUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  address?: address[];
  phone: string;
  createdAt: Date;
}
export interface address {
  street: string;
  city: string;
  province: string;
  country: string;
  lat: number;
  lng: number;
}
