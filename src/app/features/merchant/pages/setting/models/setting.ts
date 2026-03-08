export interface SettingInfo {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  commission_rate: number;
  createdAt: Date;
  isActive: boolean;
  profile_url: string;
  stores: Store[];
}
interface Store {
  _id: string;
  name: string;
  store_category: string;
  isActive: boolean;
  merchant: string;
}
