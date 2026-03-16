export interface RecentOrders {
    _id: string,
    status: string,
    total: number,
    createdAt: string,
    userData: User
}
interface User {
    _id: string,
    name: string,
    phone: string
}