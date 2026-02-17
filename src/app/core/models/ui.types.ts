export type ChangeType = 'positive' | 'negative';
export type Variant = 'pink' | 'yellow' | 'green' | 'blue' | 'purple' | 'orange';
export interface StatCardType {
    title: string;
    value: string;
    change: string;
    changeType: ChangeType;
    icon: any;
    variant: Variant;
}


//  Merchant 
export interface Merchant {
    id: number;
    name: string;
    brandImage: string;
    ownerName: string;
    profile: string;
    phone: string;
    email: string;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    commissionPaid: number;
    joinDate: string;
    status: 'active' | 'inactive' | 'suspended' | 'pending';
    rating: number;
}


//  Product Category
export interface ProductCategoryType {
    id: number;
    name: string;
    totalProducts: number;
    totalMerchants: number;
    totalRevenue: number;
    status: 'active' | 'inactive';
}
