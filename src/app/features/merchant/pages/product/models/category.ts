export interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}
export interface OverallData {
  total_categories: number;
  total_active_categories: number;
  total_inactive_categories: number;
}
