import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  LayoutDashboard,
  LucideAngularModule,
  Package,
  ShoppingCart,
  MessageSquareText,
  FileText,
  Settings,
} from 'lucide-angular';
import localeKm from '@angular/common/locales/km';
import { CommonModule, AsyncPipe, registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';

import {
  SidebarComponent,
  UserDashboradAccount,
} from '@/app/shared/components/sidebar/sidebar.component';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';
import { LoadingSpinner } from '@/app/shared/components/ui/loading-spinner/loading-spinner.component';
import { UserStateService } from '@/app/core/services/user-state.service';
import { LoadingService } from '@/app/core/services/loading.service';

registerLocaleData(localeKm);

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
  imports: [
    CommonModule,
    AsyncPipe,
    RouterOutlet,
    LucideAngularModule,
    KrHeader,
    SidebarComponent,
    LoadingSpinner,
  ],
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Merchant implements OnInit, OnDestroy {
  private userSub!: Subscription;
  private userStateService = inject(UserStateService);
  private loadingService = inject(LoadingService);

  // API-loading state from global loading service (interceptor-driven)
  isLoading$ = this.loadingService.isLoading$;

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
      ],
    },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ', route: 'order' },
    { icon: FileText, label: 'របាយការណ៍', route: 'report' },
    { icon: MessageSquareText, label: 'មតិកែលម្អ', route: 'feedback' },
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.userStateService.currentUser$.subscribe((user) => {
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
