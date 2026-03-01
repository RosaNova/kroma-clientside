export interface Merchant {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  profile: File;
  role: string;
  createdAt: Date;
  phone: string;
  address: string;
  commission_rate: number;
  profile_url?: string;
}
