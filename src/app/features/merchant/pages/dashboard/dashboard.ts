import { CategoryChart } from '@/app/shared/components/category-chart/category-chart';
import { KrCard } from '@/app/shared/components/kr-card/kr-card';
import { RecentOrder } from '@/app/shared/components/recent-order/recent-order';
import { SaleChart } from '@/app/shared/components/sale-chart/sale-chart';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { LucideAngularModule,DollarSign ,Users, ShoppingBag ,TrendingUp} from 'lucide-angular';
@Component({
  selector: 'app-dashboard',
  imports: [LucideAngularModule,CommonModule,StatCard , SaleChart , CategoryChart , KrCard , RecentOrder],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
DollarSign = DollarSign;
ShoppingBag = ShoppingBag;
Users = Users;
TrendingUp = TrendingUp;
 products  = [
    {
      image: 'https://i.pinimg.com/736x/29/60/23/2960239aa9f13028a186162bc10de8a6.jpg',
      name: 'នាឡិកាឆ្លាតវៃ',
      category: 'អេឡិចត្រូនិក',
      price: '$299.00',
      stock: 24
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      name: 'កាសស្តាប់ត្រចៀក',
      category: 'អេឡិចត្រូនិក',
      price: '$250.00',
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