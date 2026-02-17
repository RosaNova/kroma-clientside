import { Plus, Package, Inbox, Activity } from 'lucide-angular';
import { StatCardType } from '../../models/ui.types';
import { ProductCategoryType } from '../../models/ui.types';
export const SUPER_ADMIN_PRODUCT_STATS: StatCardType[] = [
    {
        title: 'ប្រភេទផលិតផលសរុប',
        value: '4',
        icon: Package,
        change: '1 ថ្មីខែនេះ',
        changeType: 'positive',
        variant: "blue"
    },
    {
        title: 'ប្រភេទសកម្ម',
        value: '3',
        icon: Inbox,
        change: '75% នៃទាំងអស់',
        changeType: 'positive',
        variant: "yellow"
    },
    {
        title: 'ផលិតផលសរុប',
        value: '585',
        icon: Package,
        change: '8.2% ពីខែមុន',
        changeType: 'positive',
        variant: "green"
    },
    {
        title: 'ប្រភេទផលិតផលដែលសកម្ម',
        value: '39',
        icon: Activity,
        change: '5 ថ្មី',
        changeType: 'positive',
        variant: "pink"
    }
];


export const MOCK_PRODUCT_CATEGORIES: ProductCategoryType[] = [
    {
        id: 1,
        name: 'បង្អែម',
        totalProducts: 120,
        totalMerchants: 8,
        totalRevenue: 5400,
        status: 'active'
    },
    {
        id: 2,
        name: 'ភេសជ្ជៈ',
        totalProducts: 210,
        totalMerchants: 15,
        totalRevenue: 9800,
        status: 'active'
    },
    {
        id: 3,
        name: 'អាហារសម្រន់',
        totalProducts: 95,
        totalMerchants: 6,
        totalRevenue: 3200,
        status: 'inactive'
    },
    {
        id: 4,
        name: 'បន្លែ',
        totalProducts: 160,
        totalMerchants: 10,
        totalRevenue: 7200,
        status: 'active'
    }
];
