import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from './model/order';
import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  LucideAngularModule,
  ShoppingBag,
  DollarSignIcon,
  Timer,
  Clock3,
  CircleCheckBig,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { MerchantService } from '../../service/merchant-service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

type OrderStatus = 'completed' | 'processing' | 'pending' | 'shipped' | 'cancelled';
type PaymentStatus = 'paid' | 'pending' | 'failed';

type ChangeType = 'positive' | 'negative';
type Variant = 'pink' | 'yellow' | 'green' | 'blue' | 'purple';

// interface Order {
//   id: string;
//   customer: string;
//   email: string;
//   date: string;
//   items: number;
//   amount: string;
//   payment: PaymentStatus;
//   status: OrderStatus;
// }

interface StatCardType {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
  variant: Variant;
}

@Component({
  selector: 'app-orders',
  imports: [CommonModule, LucideAngularModule, FormsModule, StatCard, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class Orders {
  // Icons
  ShoppingCart = ShoppingCart;
  DollarSign = DollarSign;
  Clock = Clock;
  CheckCircle = CheckCircle;
  Search = Search;
  Filter = Filter;
  Download = Download;
  Eye = Eye;
  Edit = Edit;
  Trash2 = Trash2;
  ShoppingBag = ShoppingBag;
  orderInfo = signal<Order[]>([]);
  searchTerm = '';
  statusFilter: 'all' | OrderStatus = 'all';
  currentPage = 1;
  itemsPerPage = 5;

  orders: any[] = [
    {
      id: '#ORD-001',
      customer: 'ចាន់ សុភា',
      email: 'sophat@email.com',
      date: '២៣ មករា ២០២៦',
      items: 3,
      amount: '$125.00',
      payment: 'paid',
      status: 'completed',
    },
    {
      id: '#ORD-002',
      customer: 'សុខ វិសាល',
      email: 'visal@email.com',
      date: '២២ មករា ២០២៦',
      items: 5,
      amount: '$289.50',
      payment: 'paid',
      status: 'processing',
    },
    {
      id: '#ORD-003',
      customer: 'រស្មី ពេជ្រ',
      email: 'pich@email.com',
      date: '២២ មករា ២០២៦',
      items: 2,
      amount: '$78.00',
      payment: 'pending',
      status: 'pending',
    },
    {
      id: '#ORD-004',
      customer: 'មុំ សារ៉ា',
      email: 'sara@email.com',
      date: '២១ មករា ២០២៦',
      items: 4,
      amount: '$456.75',
      payment: 'paid',
      status: 'completed',
    },
    {
      id: '#ORD-005',
      customer: 'គង់ ដារ៉ា',
      email: 'dara@email.com',
      date: '២១ មករា ២០២៦',
      items: 1,
      amount: '$45.00',
      payment: 'failed',
      status: 'cancelled',
    },
  ];

  // statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  //   completed: {
  //     label: 'បានបញ្ចប់',
  //     className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  //   },
  //   processing: {
  //     label: 'កំពុងដំណើរការ',
  //     className: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  //   },
  //   pending: { label: 'រង់ចាំ', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  //   shipped: {
  //     label: 'បានដឹកជញ្ជូន',
  //     className: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  //   },
  //   cancelled: { label: 'បានលុបចោល', className: 'bg-red-500/10 text-red-600 border-red-500/20' },
  // };

  // paymentConfig: Record<PaymentStatus, { label: string; className: string }> = {
  //   paid: { label: 'បានបង់', className: 'bg-emerald-500/10 text-emerald-600' },
  //   pending: { label: 'រង់ចាំ', className: 'bg-amber-500/10 text-amber-600' },
  //   failed: { label: 'បរាជ័យ', className: 'bg-red-500/10 text-red-600' },
  // };
  constructor(
    private merchantService: MerchantService,
    private router: Router,
  ) {
    this.getOrder();
  }
  async getOrder() {
    try {
      const res = await this.merchantService.getOrder();
      if (res) {
        this.orderInfo.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    try {
      const inputKey = (event.target as HTMLInputElement).value;
      if (inputKey != '') {
        const res = await this.merchantService.getOrder({ q: inputKey });
        if (res.list) {
          this.orderInfo.set(res.list);
        } else {
          this.orderInfo.set([]);
        }
      } else {
        await this.getOrder();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onFilter(event: Event) {
    try {
      const value = (event.target as HTMLSelectElement).value;
      if (value != '') {
        const res = await this.merchantService.getOrder({ q: value });
        if (res.list) {
          this.orderInfo.set(res.list);
        } else {
          this.orderInfo.set([]);
        }
      } else {
        this.getOrder();
      }
    } catch (e) {
      console.log(e);
    }
  }
  get filteredOrders(): Order[] {
    return this.orders.filter((o) => {
      const matchSearch =
        o.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchStatus = this.statusFilter === 'all' || o.status === this.statusFilter;

      return matchSearch && matchStatus;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
  get paginatedEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredOrders.length);
  }

  statCards: StatCardType[] = [
    {
      title: 'ការបញ្ជាទិញ',
      value: '១២០',
      change: 'កើន​ ១២% ពីខែមុន',
      changeType: 'positive',
      icon: ShoppingCart,
      variant: 'blue',
    },
    {
      title: 'ប្រាក់ចំណូល',
      value: '៥០០០ រៀល',
      change: '5% ពីខែមុន',
      changeType: 'positive',
      icon: DollarSignIcon,
      variant: 'yellow',
    },
    {
      title: 'កំពុងរង់ចាំទូទាត់',
      value: '១៨',
      change: '1% ពីខែមុន',
      changeType: 'negative',
      icon: Clock3,
      variant: 'pink',
    },
    {
      title: 'បានបញ្ចប់ការទូទាត់',
      value: '២០',
      change: '0% ពីខែមុន',
      changeType: 'negative',
      icon: CircleCheckBig,
      variant: 'green',
    },
  ];
  onViewDetail(id: string) {
    this.router.navigate([`merchant/order/${id}`]);
  }
  async onDelete(id: string) {
    try {
      const res = await this.merchantService.deleteOrder(id);
      if (res) {
        this.getOrder();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
