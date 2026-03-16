import { CategoryChart } from '@/app/shared/components/category-chart/category-chart.component';
import { KrCard } from '@/app/shared/components/kr-card/kr-card.component';
import { RecentOrder } from '@/app/shared/components/recent-order/recent-order.component';
import { SaleChart } from '@/app/shared/components/sale-chart/sale-chart.component';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LucideAngularModule, DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-angular';
import { ProductService } from '../product/services/product-service';
import { Product } from '../product/models/product';
import { Router } from '@angular/router';
import { DashboardService } from '@/app/features/super-admin/pages/dashboard/service/dashboard-service';
import { RecentOrders } from './models/recent-order';
import { OverallMerchant } from './models/overall';
@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    CommonModule,
    StatCard,
    SaleChart,
    CategoryChart,
    KrCard,
    RecentOrder,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class Dashboard {
  DollarSign = DollarSign;
  ShoppingBag = ShoppingBag;
  Users = Users;
  TrendingUp = TrendingUp;
  products = signal<Product[]>([]);
  recentOrders = signal<RecentOrders[]>([]);
  overAllData = signal<OverallMerchant>({} as any);
  // products = [
  //   {
  //     image: 'https://i.pinimg.com/736x/29/60/23/2960239aa9f13028a186162bc10de8a6.jpg',
  //     name: 'នាឡិកាឆ្លាតវៃ',
  //     category: 'អេឡិចត្រូនិក',
  //     price: '$299.00',
  //     stock: 24
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  //     name: 'កាសស្តាប់ត្រចៀក',
  //     category: 'អេឡិចត្រូនិក',
  //     price: '$250.00',
  //     stock: 8
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
  //     name: 'ស្បែកជើងកីឡា',
  //     category: 'សម្លៀកបំពាក់',
  //     price: '$129.00',
  //     stock: 35
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
  //     name: 'កាមេរ៉ាឌីជីថល',
  //     category: 'អេឡិចត្រូនិក',
  //     price: '$599.00',
  //     stock: 0
  //   }
  // ];
  constructor(
    private productService: ProductService,
    private router: Router,
    private dashboardService: DashboardService,
  ) {
    this.getProducts();
    this.getOverall();
  }
  async getProducts() {
    const query = {
      limit: 4,
    };
    try {
      const res = await this.productService.getProducts(query);
      if (res) {
        this.products.set(res.list);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getOverall() {
    try {
      const res = await this.dashboardService.getOverAllForMerchantStatCard();
      if (res) {
        this.overAllData.set(res);
      }
    } catch (e) {
      console.log(e);
    }
  }
  goToList() {
    this.router.navigate(['/merchant/product']);
  }
  async getRecentOrders() {
    try {
      const res = await this.dashboardService.getRecentOrders();
      if (res) {
        this.recentOrders.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
