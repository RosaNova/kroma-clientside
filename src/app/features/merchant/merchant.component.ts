import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  LayoutDashboard,
  LucideAngularModule,
  Package,
  ShoppingCart,
  MessageSquareText,
  FileText,
  Settings,
  User,
} from 'lucide-angular';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';
import localeKm from '@angular/common/locales/km';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeKm);

import { AccountDashboard } from '@/app/core/models/ui.types';
import { title } from 'process';

interface NavItem {
  icon: any;
  label: string;
  route?: string;
  children?: NavItem[];
  isOpen?: boolean;
}
@Component({
  standalone: true,
  selector: 'app-merchant',
  imports: [RouterOutlet, LucideAngularModule, KrHeader, SidebarComponent],
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Merchant {
  navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: 'ផ្ទាំងគ្រប់គ្រង',
      route: '/merchant/dashboard',
    },
    {
      icon: Package,
      label: 'ផលិតផល',

      children: [
        { label: 'ផលិតផលទាំងអស់', route: '/merchant/product', icon: '' },
        { label: 'បន្ថែមផលិតផល', route: '/merchant/product/addproduct', icon: '' },
        { label: 'ប្រភេទផលិតផល', route: '/merchant/product/productcategory', icon: '' },
        { label: 'អស់ស្តុក', route: '/merchant/product/productoutstock', icon: '' },
        { label: 'បញ្ចុះតម្លៃ & គូប៉ុង', route: '/merchant/product/productdiscount', icon: '' },
      ],
    },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ', route: 'order' },
    { icon: FileText, label: 'របាយការណ៍', route: 'report' },
    { icon: MessageSquareText, label: 'មតិកែលម្អ', route: 'feedback' },
    { icon: User, label: 'គ្រប់គ្រងអ្នកប្រើប្រាស់ប្រព័ន្ធ', route: 'users' },
    { icon: Settings, label: 'ការកំណត់', route: '/merchant/setting' },
  ];

  sidebarUser? :AccountDashboard = {
    fullname: '',
    role: '',
    profile_url: 'assets/images/default-profile.png',
  };
 
  title = 'ផ្ទាំងគ្រប់គ្រង';
  subtitle = 'សូមស្វាគមន៍មកកាន់ Krama Dashboard';
  today = new Date();
  notificationCount = 10;
}
