import { DollarSign, Package, Users, TrendingUp, Star } from 'lucide-angular';
import { StatCardType } from '@/app/core/models/ui.types';
import { CustomerStats, VendorStats } from '@/app/core/models/ui.types';

export const MONTHLY_REVENUE_STATS: StatCardType[] = [
    {
        title: 'ចំណូលសរុបប្រចាំខែ',
        value: '$23,450',
        change: '+12% ខែនេះ',
        changeType: 'positive',
        icon: DollarSign,
        variant: 'green'
    },
    {
        title: 'ចំណូលសរុបតាមទំនិញ',
        value: '$14,200',
        change: '+8%',
        changeType: 'positive',
        icon: Package,
        variant: 'blue'
    },
    {
        title: 'ចំនួនការទិញ',
        value: '1,230',
        change: '+5%',
        changeType: 'positive',
        icon: Users,
        variant: 'purple'
    },
    {
        title: 'ចំណូលសរុបតាមអ្នកប្រើប្រាស់',
        value: '$19',
        change: '+2%',
        changeType: 'positive',
        icon: TrendingUp,
        variant: 'yellow'
    },
    {
        title: 'អ្នកគ្រប់គ្រងដែលត្រូវបានផ្អាក',
        value: '5',
        change: '+2%',
        changeType: 'positive',
        icon: Star,
        variant: 'red'
    }
];



export const TOP_CUSTOMERS: CustomerStats[] = [
    {
        name: 'Sokha Chheang',
        totalSpent: 1240,
        orders: 15,
        lastOrderDate: '2026-02-15'
    },
    {
        name: 'Rithy Keo',
        totalSpent: 980,
        orders: 12,
        lastOrderDate: '2026-02-16'
    },
    {
        name: 'Pisey Chan',
        totalSpent: 870,
        orders: 9,
        lastOrderDate: '2026-02-17'
    },
    {
        name: 'Vichea Phan',
        totalSpent: 760,
        orders: 8,
        lastOrderDate: '2026-02-16'
    },
    {
        name: 'Srey Leak',
        totalSpent: 650,
        orders: 7,
        lastOrderDate: '2026-02-14'
    }
];


export const TOP_VENDORS: VendorStats[] = [
    {
        name: 'Phnom Penh Electronics',
        totalRevenue: 12450,
        products: 120,
        lastActive: '2026-02-17'
    },
    {
        name: 'Krama Fashion',
        totalRevenue: 9800,
        products: 95,
        lastActive: '2026-02-16'
    },
    {
        name: 'Siem Reap Foods',
        totalRevenue: 8700,
        products: 80,
        lastActive: '2026-02-15'
    },
    {
        name: 'Tonle Sap Crafts',
        totalRevenue: 7600,
        products: 72,
        lastActive: '2026-02-16'
    },
    {
        name: 'Angkor Bookstore',
        totalRevenue: 6500,
        products: 60,
        lastActive: '2026-02-14'
    }
];

export const RECENT_TRANSACTIONS: any[] = [
    {
        id: 'TXN-001',
        customerName: 'Sokha Chheang',
        amount: 120.50,
        date: '2026-02-19 14:30',
        status: 'completed',
        type: 'payment'
    },
    {
        id: 'TXN-002',
        customerName: 'Rithy Keo',
        amount: 45.00,
        date: '2026-02-19 13:15',
        status: 'pending',
        type: 'payment'
    },
    {
        id: 'TXN-003',
        customerName: 'Pisey Chan',
        amount: 300.25,
        date: '2026-02-19 11:45',
        status: 'completed',
        type: 'payment'
    },
    {
        id: 'TXN-004',
        customerName: 'Vichea Phan',
        amount: 15.00,
        date: '2026-02-19 10:20',
        status: 'failed',
        type: 'payment'
    },
    {
        id: 'TXN-005',
        customerName: 'Srey Leak',
        amount: 85.75,
        date: '2026-02-19 09:05',
        status: 'completed',
        type: 'payment'
    },
    {
        id: 'TXN-006',
        customerName: 'Vichea Phan',
        amount: 15.00,
        date: '2026-02-19 10:20',
        status: 'failed',
        type: 'payment'
    },
    {
        id: 'TXN-007',
        customerName: 'Srey Leak',
        amount: 85.75,
        date: '2026-02-19 09:05',
        status: 'completed',
        type: 'payment'
    }, {
        id: 'TXN-008',
        customerName: 'Vichea Phan',
        amount: 15.00,
        date: '2026-02-19 10:20',
        status: 'failed',
        type: 'payment'
    },
    {
        id: 'TXN-009',
        customerName: 'Srey Leak',
        amount: 85.75,
        date: '2026-02-19 09:05',
        status: 'completed',
        type: 'payment'
    }
];
