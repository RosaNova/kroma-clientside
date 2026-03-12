import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  LayoutDashboard,
  LucideAngularModule,
  Package,
  MessageSquareText,
  FileText,
  Settings,
  User,
  DatabaseBackup,
} from 'lucide-angular';
import localeKm from '@angular/common/locales/km';
import { registerLocaleData, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { UserDashboradAccount } from '@/app/shared/components/sidebar/sidebar.component';
import { requestService } from '@/app/services/request-service';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';
import { UserStateService } from '@/app/core/services/user-state.service';
registerLocaleData(localeKm);

import { AuthService } from '@/app/shared/authentication/services/auth-service';
import { filter, Subscription } from 'rxjs';

interface NavItem {
  icon: any;
  label: string;
  route?: string;
  children?: NavItem[];
  isOpen?: boolean;
}
@Component({
  selector: 'app-super-admin',
  imports: [RouterOutlet, LucideAngularModule, SidebarComponent, KrHeader],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuperAdmin implements OnInit, OnDestroy {
  private userSub!: Subscription;
  navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: 'ផ្ទាំងគ្រប់គ្រង',
      route: '/super-admin/dashboard',
    },
    {
      icon: Package,
      label: 'គ្រប់គ្រងអាជីវកម្ម',
      children: [
        { icon: Package, label: 'ប្រភេទអាជីវកម្ម', route: '/super-admin/store-category' },
        { icon: Package, label: 'អាជីវកម្មទាំងអស់', route: '/super-admin/stores' },
        // { icon: Package, label: 'ប្រភេទទំនិញទាំងអស់', route: '/super-admin/product-category' },
      ],
    },
    {
      icon: User,
      label: 'គ្រប់គ្រងអ្នកប្រើប្រាស់',
      children: [
        { icon: User, label: 'អ្នកប្រើប្រាស់ទាំងអស់ក្នុងទូរសព្ទដៃ', route: '/super-admin/users' },
        { icon: User, label: 'ម្ចាស់អាជីវកម្ម', route: '/super-admin/merchant' },
        { icon: User, label: 'ថ្លៃបង់ភាគរយ', route: '/super-admin/commission' },
      ],
    },
    // {
    //   icon: FileText,
    //   label: 'របាយការណ៍',
    //   children: [{ icon: Package, label: 'របាយការណ៍ទូទៅទាំងអស់', route: '/super-admin/report' }],
    // },
    { icon: MessageSquareText, label: 'គ្រប់គ្រងមតិកែលម្អ', route: '/super-admin/feedback' },
    { icon: Settings, label: 'ការកំណត់', route: '/super-admin/setting' },
  ];

  sidebarUser: UserDashboradAccount = {
    fullname: '',
    role: 'Super-Admin',
    profile_url: 'assets/images/default-profile.png',
  };

  constructor(
    private requestService: requestService,
    private router: Router,
    private userStateService: UserStateService,
  ) {}
  ngOnInit(): void {
    // Subscribe to centralized user state for instant profile updates
    this.userSub = this.userStateService.currentUser$.subscribe((user) => {
      if (user) {
        this.sidebarUser = {
          fullname: user.fullname || '',
          role: user.role,
          profile_url: user.profile_url || 'assets/images/default-profile.png',
        };
      }
    });

    const isBrowser = typeof window !== 'undefined' && window.localStorage;
    const email = isBrowser ? localStorage.getItem('email') : null;
    const role = isBrowser ? localStorage.getItem('role') : null;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

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
