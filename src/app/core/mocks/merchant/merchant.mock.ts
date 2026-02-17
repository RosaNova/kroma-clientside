export interface Category {
    id: number;
    name: string;
    description: string;
    productCount: string;
    status: 'active' | 'inactive';
}

export const MOCK_CATEGORIES: Category[] = [
    {
        id: 101,
        name: 'បង្អែម',
        description: 'ផលិតផលបង្អែម និងអាហារផ្អែម',
        productCount: '12',
        status: 'active',
    },
    {
        id: 102,
        name: 'ភេសជ្ជៈ',
        description: 'ភេសជ្ជៈត្រជាក់ និងក្តៅ',
        productCount: '18',
        status: 'active',
    },
    {
        id: 103,
        name: 'អាហារសម្រន់',
        description: 'អាហារស្រាលសម្រាប់ញ៉ាំលេង',
        productCount: '9',
        status: 'inactive',
    },
    {
        id: 104,
        name: 'បន្លែ',
        description: 'បន្លែស្រស់ និងបន្លែស្ងួត',
        productCount: '15',
        status: 'active',
    },
    {
        id: 105,
        name: 'ផ្លែឈើ',
        description: 'ផ្លែឈើស្រស់ និងផ្លែឈើនាំចូល',
        productCount: '20',
        status: 'inactive',
    },
    {
        id: 106,
        name: 'សាច់ និងត្រី',
        description: 'សាច់ស្រស់ ត្រី និងគ្រឿងសមុទ្រ',
        productCount: '14',
        status: 'active',
    },
    {
        id: 107,
        name: 'គ្រឿងទេស',
        description: 'គ្រឿងទេសសម្រាប់ចម្អិនអាហារ',
        productCount: '22',
        status: 'active',
    },
    {
        id: 108,
        name: 'អង្ករ និងធញ្ញជាតិ',
        description: 'អង្ករ មី និងធញ្ញជាតិផ្សេងៗ',
        productCount: '11',
        status: 'inactive',
    },
];
