import { Store, Users, DollarSign, TrendingUp } from "lucide-angular";
import { StatCardType } from "@/app/core/models/ui.types";
import { Merchant } from "@/app/core/models/ui.types";

export const SUPER_ADMIN_MERCHANT_STATS: StatCardType[] = [
    {
        title: 'អាជីវករសរុប',
        value: '1,245',
        change: '8.2% ពីខែមុន',
        changeType: 'positive',
        icon: Store,
        variant: 'blue'
    },
    {
        title: 'អាជីវករសកម្ម',
        value: '1,032',
        change: '5.4% ពីខែមុន',
        changeType: 'positive',
        icon: Users,
        variant: 'green'
    },
    {
        title: 'ប្រាក់ចំណូលសរុប',
        value: '$24,580',
        change: '3.1% ពីខែមុន',
        changeType: 'positive',
        icon: DollarSign,
        variant: 'purple'
    },
    {
        title: 'Merchant ថ្មីខែនេះ',
        value: '87',
        change: '2.5% ថយចុះ',
        changeType: 'negative',
        icon: TrendingUp,
        variant: 'orange'
    }
];


export const MOCK_MERCHANTS: Merchant[] = [
    {
        id: 1001,
        name: 'Krama Mart',
        ownerName: 'Sok Dara',
        phone: '012345678',
        email: 'krama@shop.com',
        totalProducts: 120,
        totalOrders: 840,
        totalRevenue: 12540,
        commissionPaid: 1254,
        joinDate: '2025-01-12',
        status: 'active',
        rating: 4.6
    },
    {
        id: 1002,
        name: 'Cambodia Fresh',
        ownerName: 'Chan Rithy',
        phone: '098765432',
        email: 'fresh@shop.com',
        totalProducts: 85,
        totalOrders: 430,
        totalRevenue: 6840,
        commissionPaid: 684,
        joinDate: '2025-02-03',
        status: 'active',
        rating: 4.2
    },
    {
        id: 1003,
        name: 'Sweet Home Bakery',
        ownerName: 'Ly Nika',
        phone: '011223344',
        email: 'sweet@shop.com',
        totalProducts: 45,
        totalOrders: 210,
        totalRevenue: 3150,
        commissionPaid: 315,
        joinDate: '2025-03-20',
        status: 'inactive',
        rating: 3.8
    },
    {
        id: 1004,
        name: 'Ocean Seafood',
        ownerName: 'Vannak',
        phone: '015889900',
        email: 'ocean@shop.com',
        totalProducts: 70,
        totalOrders: 520,
        totalRevenue: 9820,
        commissionPaid: 982,
        joinDate: '2025-01-30',
        status: 'suspended',
        rating: 4.1
    }
];
