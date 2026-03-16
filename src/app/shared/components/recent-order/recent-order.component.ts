import { RecentOrders } from '@/app/features/merchant/pages/dashboard/models/recent-order';
import { DashboardService } from '@/app/features/super-admin/pages/dashboard/service/dashboard-service';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
type OrderStatus = 'completed' | 'pending' | 'processing';
interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
}

@Component({
  selector: 'app-recent-order',
  imports: [CommonModule],
  templateUrl: './recent-order.component.html',
  styleUrl: './recent-order.component.css',
})
export class RecentOrder {
  recentOrders = signal<RecentOrders[]>([])
  orders: Order[] = [
    {
      id: '#KR001',
      customer: 'ចាន់ សុភា',
      date: '០៨ ធ្នូ ២០២៤',
      amount: '$125.00',
      status: 'completed',
    },
    {
      id: '#KR002',
      customer: 'សុខ វិសាល',
      date: '០៧ ធ្នូ ២០២៤',
      amount: '$89.50',
      status: 'pending',
    },
    {
      id: '#KR003',
      customer: 'រស្មី ពេជ្រ',
      date: '០៧ ធ្នូ ២០២៤',
      amount: '$234.00',
      status: 'completed',
    },
    {
      id: '#KR004',
      customer: 'មុំ សារ៉ា',
      date: '០៦ ធ្នូ ២០២៤',
      amount: '$56.75',
      status: 'processing',
    },
    {
      id: '#KR005',
      customer: 'គង់ ដារ៉ា',
      date: '០៦ ធ្នូ ២០២៤',
      amount: '$178.25',
      status: 'completed',
    },
  ];

  statusStyles: Record<OrderStatus, string> = {
    completed: 'bg-stat-green-light text-stat-green',
    pending: 'bg-stat-yellow-light text-stat-yellow',
    processing: 'bg-stat-blue-light text-stat-blue',
  };

  statusLabels: Record<OrderStatus, string> = {
    completed: 'បានបញ្ចប់',
    pending: 'រង់ចាំ',
    processing: 'កំពុងដំណើរការ',
  };
  constructor(private dashboardService: DashboardService, private router: Router) {
    this.getRecentOrders()
  }
  trackById(_: number, order: Order): string {
    return order.id;
  }
  async getRecentOrders() {
    try {
      const res = await this.dashboardService.getRecentOrders();
      if (res) {
        this.recentOrders.set(res.list)
      }
    } catch (e) {
      console.log(e)
    }
  }
  goToList() {
    this.router.navigate(['merchant/order'])
  }
}
