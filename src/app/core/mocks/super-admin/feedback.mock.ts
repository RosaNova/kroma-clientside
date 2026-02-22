import { FeedbackType, StatCardType } from "@/app/core/models/ui.types";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Smartphone, ShoppingBag } from "lucide-angular";

export const FEEDBACK_STATS: StatCardType[] = [
    {
        title: 'មតិយោបល់សរុប',
        value: '1,240',
        change: '+12% ខែនេះ',
        changeType: 'positive',
        icon: MessageSquare,
        variant: 'blue'
    },
    {
        title: 'ពិន្ទុជាមធ្យម',
        value: '4.8',
        change: '+0.2',
        changeType: 'positive',
        icon: Star,
        variant: 'yellow'
    },
    {
        title: 'មតិយោបល់វិជ្ជមាន',
        value: '95%',
        change: '+2%',
        changeType: 'positive',
        icon: ThumbsUp,
        variant: 'green'
    },
    {
        title: 'មតិយោបល់អវិជ្ជមាន',
        value: '2%',
        change: '-1%',
        changeType: 'positive',
        icon: ThumbsDown,
        variant: 'red'
    }
];

export const MOCK_FEEDBACK: FeedbackType[] = [
    {
        id: 'FB-001',
        customerName: 'សុខា ជា',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb1',
        rating: 5,
        comment: 'សេវាកម្មល្អណាស់! ទំនិញមានគុណភាពខ្ពស់ និងការដឹកជញ្ជូនរហ័ស។ ខ្ញុំនឹងមកទិញម្តងទៀត។',
        date: '2026-02-19 14:30',
        status: 'pending',
        category: 'marketplace',
        productName: 'អាវយឺត Krama Custom',
        merchantName: 'Krama Fashion'
    },
    {
        id: 'FB-APP-001',
        customerName: 'ចាន់ថា ហេង',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb6',
        rating: 5,
        comment: 'កម្មវិធីទូរស័ព្ទងាយស្រួលប្រើខ្លាំងណាស់! ចំណុចប្រទាក់ស្អាត និងទំនើប។',
        date: '2026-02-19 12:15',
        status: 'resolved',
        category: 'app',
        appVersion: 'v1.2.4',
        deviceInfo: 'iPhone 15 Pro, iOS 17.2'
    },
    {
        id: 'FB-002',
        customerName: 'រិទ្ធី កែវ',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb2',
        rating: 4,
        comment: 'ទំនិញល្អ តែការដឹកជញ្ជូនរាងយឺតបន្តិច។ សង្ឃឹមថានឹងប្រសើរឡើងនៅពេលក្រោយ។',
        date: '2026-02-18 10:15',
        status: 'resolved',
        category: 'marketplace',
        productName: 'ស្បែកជើង Nike Air',
        merchantName: 'Phnom Penh Electronics'
    },
    {
        id: 'FB-APP-002',
        customerName: 'ភារុណ សុខ',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb7',
        rating: 2,
        comment: 'កម្មវិធីរាងស្លឹក (lag) នៅពេលបើកមើលផលិតផលច្រើន។ សូមជួយពិនិត្យឡើងវិញ។',
        date: '2026-02-18 09:40',
        status: 'pending',
        category: 'app',
        appVersion: 'v1.2.3',
        deviceInfo: 'Samsung S23 Ultra, Android 14'
    },
    {
        id: 'FB-003',
        customerName: 'ពិសី ចាន់',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb3',
        rating: 2,
        comment: 'ខ្ញុំមិនសូវពេញចិត្តនឹងផលិតផលនេះទេ ព្រោះវាមានទំហំខុសពីការបញ្ជាទិញ។',
        date: '2026-02-17 16:45',
        status: 'pending',
        category: 'marketplace',
        productName: 'កាបូបដៃនារី',
        merchantName: 'Siem Reap Foods'
    },
    {
        id: 'FB-APP-003',
        customerName: 'នីតា មាស',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb8',
        rating: 4,
        comment: 'ចង់ឱ្យមានសេវាកម្មបង់ប្រាក់តាមរយៈ ABA ផ្ទាល់ក្នុងកម្មវិធី។',
        date: '2026-02-17 14:20',
        status: 'resolved',
        category: 'app',
        appVersion: 'v1.2.4',
        deviceInfo: 'Google Pixel 8'
    },
    {
        id: 'FB-004',
        customerName: 'វិជ្ជា ផាន់',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb4',
        rating: 5,
        comment: 'ពិតជាអស្ចារ្យមែន! តម្លៃសមរម្យ និងគុណភាពល្អហួសពីការរំពឹងទុក។',
        date: '2026-02-16 09:20',
        status: 'resolved',
        category: 'marketplace',
        productName: 'នាឡិកាដៃ Casio',
        merchantName: 'Tonle Sap Crafts'
    },
    {
        id: 'FB-005',
        customerName: 'ស្រីលក្ខណ៍',
        customerAvatar: 'https://i.pravatar.cc/150?u=fb5',
        rating: 3,
        comment: 'មធ្យម មិនសូវល្អពេក ហើយក៏មិនអាក្រក់ពេកដែរ។',
        date: '2026-02-15 11:05',
        status: 'hidden',
        category: 'marketplace',
        productName: 'កាស Bluetooth',
        merchantName: 'Angkor Bookstore'
    }
];
