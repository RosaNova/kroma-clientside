import {
    Users, Activity, UserPlus, ShieldAlert, Wifi, Shield,
    ShieldCheck,
    UserRound,
    LogIn,
    Clock,
    UserRoundX,
    UserLock,
    UserCog,
    UserRoundCheck
} from 'lucide-angular';
import { StatCardType } from '@/app/core/models/ui.types';
import {

} from 'lucide-angular';

export const SUPER_ADMIN_USER_STATS: StatCardType[] = [
    {
        title: 'អ្នកប្រើប្រាស់សរុប',
        value: '12450',
        change: '+12% ខែនេះ',
        changeType: 'positive',
        icon: Users,
        variant: 'blue'
    },
    {
        title: 'អ្នកប្រើប្រាស់សកម្ម (30ថ្ងៃ)',
        value: '8420',
        change: '+5.3%',
        changeType: 'positive',
        icon: Activity,
        variant: 'green'
    },
    {
        title: 'អ្នកប្រើប្រាស់ថ្មី (ថ្ងៃនេះ)',
        value: '87',
        change: '-2%',
        changeType: 'negative',
        icon: UserPlus,
        variant: 'purple'
    },
    {
        title: 'អ្នកប្រើប្រាស់ដែលត្រូវបានផ្អាក',
        value: '23',
        change: '+3',
        changeType: 'positive',
        icon: ShieldAlert,
        variant: 'red'
    },
    {
        title: 'អ្នកប្រើប្រាស់កំពុងអនឡាញ',
        value: '312',
        change: '+3',
        changeType: "positive",
        icon: Wifi,
        variant: 'yellow'
    }
];


export const ADMIN_USER_STATS: StatCardType[] = [
    {
        title: 'អ្នកគ្រប់គ្រងសរុប',
        value: '18',
        change: '+2 ខែនេះ',
        changeType: "positive",
        icon: Users,
        variant: 'blue'
    },
    {
        title: 'អ្នកគ្រប់គ្រងសកម្ម (30ថ្ងៃ)',
        value: '14',
        change: '+1',
        changeType: 'positive',
        icon: UserCog,
        variant: 'green'
    },
    {
        title: 'អ្នកគ្រប់គ្រងថ្មី',
        value: '3',
        change: '-1',
        changeType: 'negative',
        icon: UserRoundCheck,
        variant: 'purple'
    },
    {
        title: 'អ្នកគ្រប់គ្រងដែលត្រូវបានផ្អាក',
        value: '1',
        change: '+1',
        changeType: 'positive',
        icon: UserRoundX,
        variant: 'red'
    },
    {
        title: 'អ្នកគ្រប់គ្រងចូលប្រើថ្ងៃនេះ',
        value: '9',
        change: '+1',
        changeType: 'positive',
        icon: UserLock,
        variant: 'yellow'
    },
    {
        title: 'រង់ចាំការស្នើសុំតួនាទី',
        value: '2',
        icon: Clock,
        change: '+1',
        changeType: 'positive',
        variant: "orange"
    }
];
