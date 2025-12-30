import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KrHeader } from '../ui/kr-header/kr-header';
import { KrCard } from '../ui/kr-card/kr-card';
import { Slidebar } from '../ui/slidebar/slidebar';
import { StatCard } from '../ui/stat-card/stat-card';
import { SaleChart } from '../ui/sale-chart/sale-chart';
import { CategoryChart } from '../ui/category-chart/category-chart';
import { RecentOrder } from '../ui/recent-order/recent-order';

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [
    CommonModule,
    Slidebar,
    KrHeader,
    StatCard,
    SaleChart,
    CategoryChart,
    KrCard,
    RecentOrder 
  ],
  templateUrl: './dashboard-component.html'
})
export class DashboardComponent {
  products = [
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30e?w=300&h=300&fit=crop',
      name: 'នាឡិកាឆ្លាតវៃ',
      category: 'អេឡិចត្រូនិក',
      price: '$299.00',
      stock: 24
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      name: 'កាសស្តាប់ត្រចៀក',
      category: 'អេឡិចត្រូនិក',
      price: '$199.00',
      stock: 8
    },
    {
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      name: 'ស្បែកជើងកីឡា',
      category: 'សម្លៀកបំពាក់',
      price: '$129.00',
      stock: 35
    },
    {
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
      name: 'កាមេរ៉ាឌីជីថល',
      category: 'អេឡិចត្រូនិក',
      price: '$599.00',
      stock: 0
    }
  ];
}
