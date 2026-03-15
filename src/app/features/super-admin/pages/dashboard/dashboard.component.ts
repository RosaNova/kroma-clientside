import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { SaleChart } from '@/app/shared/components/sale-chart/sale-chart.component';
import { CategoryChart } from '@/app/shared/components/category-chart/category-chart.component';
import { RecentOrder } from '@/app/shared/components/recent-order/recent-order.component';
import { MessagingComponent } from '@/app/shared/components/messaging/messaging.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  Store,
  Activity,
  ShieldAlert,
} from 'lucide-angular';
import { LoadingSpinner } from '@/app/shared/components/ui/loading-spinner/loading-spinner.component';
import { LoadingService } from '@/app/core/services/loading.service';
import { AsyncPipe } from '@angular/common';
import { DashboardService } from './service/dashboard-service';
import { Overall } from './models/overall';
import { StoreCategoriesService } from '../store-category/service/store-categories-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StatCard,
    SaleChart,
    CategoryChart,
    LoadingSpinner,
    AsyncPipe,
    // RecentOrder,
    // MessagingComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class Dashboard {
  private loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;
  storeCategories = signal<any>([]);
  DollarSign = DollarSign;

  ShoppingBag = ShoppingBag;
  Users = Users;
  TrendingUp = TrendingUp;
  Store = Store;
  Activity = Activity;
  ShieldAlert = ShieldAlert;

  topMerchants = [
    {
      name: 'ហាងលក់ទំនិញខ្មែរ',
      owner: 'សុខ ជា',
      sales: '$12,450',
      status: 'active',
      performance: '+15%',
    },
    {
      name: 'អេឡិចត្រូនិច ភ្នំពេញ',
      owner: 'លីណា ម៉ៅ',
      sales: '$9,820',
      status: 'active',
      performance: '+12%',
    },
    {
      name: 'ម៉ាឃីត ហ្វេសិន',
      owner: 'ចាន់ សុភ័ក្ត្រ',
      sales: '$8,150',
      status: 'active',
      performance: '-2%',
    },
    {
      name: 'ម្ហូបអាហារស្រស់ៗ',
      owner: 'រស្មី ពេជ្រ',
      sales: '$5,900',
      status: 'warning',
      performance: '+5%',
    },
  ];
  products = [
    {
      image: 'https://i.pinimg.com/736x/29/60/23/2960239aa9f13028a186162bc10de8a6.jpg',
      name: 'នាឡិកាឆ្លាតវៃ',
      category: 'អេឡិចត្រូនិក',
      price: '$299.00',
      stock: 24,
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      name: 'កាសស្តាប់ត្រចៀក',
      category: 'អេឡិចត្រូនិក',
      price: '$250.00',
      stock: 8,
    },
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      name: 'ស្បែកជើងកីឡា',
      category: 'សម្លៀកបំពាក់',
      price: '$129.00',
      stock: 35,
    },
    {
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
      name: 'កាមេរ៉ាឌីជីថល',
      category: 'អេឡិចត្រូនិក',
      price: '$599.00',
      stock: 0,
    },
  ];
  overallStats = signal<Overall>({} as any);
  constructor(
    private dashboardService: DashboardService,
  ) {
    this.getOverallStats();
  }
  async getOverallStats() {
    try {
      const res = await this.dashboardService.getOverallStats();
      if (res) {
        this.overallStats.set(res);
      }
    } catch (e) {
      console.log(e);
    }
  }

}
