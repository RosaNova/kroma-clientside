import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  templateUrl: './recent-order.html',
  styleUrl: './recent-order.css',
})
export class RecentOrder {

  orders: Order[] = [
    { id: '#KR001', customer: 'ចាន់ សុភា', date: '០៨ ធ្នូ ២០២៤', amount: '$125.00', status: 'completed' },
    { id: '#KR002', customer: 'សុខ វិសាល', date: '០៧ ធ្នូ ២០២៤', amount: '$89.50', status: 'pending' },
    { id: '#KR003', customer: 'រស្មី ពេជ្រ', date: '០៧ ធ្នូ ២០២៤', amount: '$234.00', status: 'completed' },
    { id: '#KR004', customer: 'មុំ សារ៉ា', date: '០៦ ធ្នូ ២០២៤', amount: '$56.75', status: 'processing' },
    { id: '#KR005', customer: 'គង់ ដារ៉ា', date: '០៦ ធ្នូ ២០២៤', amount: '$178.25', status: 'completed' },
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

  trackById(_: number, order: Order): string {
  return order.id;
}

}
