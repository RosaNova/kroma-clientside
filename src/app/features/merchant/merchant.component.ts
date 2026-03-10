import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
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
import { UserDashboradAccount } from '@/app/shared/components/sidebar/sidebar.component';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';
import localeKm from '@angular/common/locales/km';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeKm);
import { UserStateService } from '@/app/core/services/user-state.service';

import { title } from 'process';
import { AuthService } from '@/app/shared/authentication/services/auth-service';
import { filter, Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
export class Merchant implements OnInit, OnDestroy {
  private userSub!: Subscription;
  constructor(private router: Router, private userStateService: UserStateService) { }

  ngOnInit(): void {
    // Subscribe to centralized user state for instant profile updates
    this.userSub = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.sidebarUser = {
          fullname: user.fullname || '',
          role: user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Merchant',
          profile_url: user.profile_url || 'assets/images/default-profile.png',
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
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
        // { label: 'អស់ស្តុក', route: '/merchant/product/productoutstock', icon: '' },
        // { label: 'បញ្ចុះតម្លៃ & គូប៉ុង', route: '/merchant/product/productdiscount', icon: '' },
      ],
    },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ', route: 'order' },
    { icon: FileText, label: 'របាយការណ៍', route: 'report' },
    { icon: MessageSquareText, label: 'មតិកែលម្អ', route: 'feedback' },
    // { icon: User, label: 'គ្រប់គ្រងអ្នកប្រើប្រាស់ប្រព័ន្ធ', route: 'users' },
    { icon: Settings, label: 'ការកំណត់', route: '/merchant/setting' },
  ];

  sidebarUser: UserDashboradAccount = {
    fullname: '',
    role: 'Merchant',
    profile_url: 'assets/images/default-profile.png',
  };

  title = 'ផ្ទាំងគ្រប់គ្រង';
  subtitle = 'សូមស្វាគមន៍មកកាន់ Krama Dashboard';
  today = new Date();
  notificationCount = 10;

  logout(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (e) {
      console.error('Error clearing storage during logout', e);
    }
    this.router.navigate(['/login']);
  }
}
