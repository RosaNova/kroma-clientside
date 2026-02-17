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
    ownerName: string;
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
