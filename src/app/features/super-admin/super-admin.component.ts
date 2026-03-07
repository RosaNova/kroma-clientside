import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { User as SidebarUser } from '@/app/shared/components/sidebar/sidebar.component';
import { requestService } from '@/app/services/request-service';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';
registerLocaleData(localeKm);
import { AccountDashboard } from '@/app/core/models/ui.types';
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
export class SuperAdmin implements OnInit {
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
        { icon: Package, label: 'ប្រភេទទំនិញទាំងអស់', route: '/super-admin/product-category' },
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
    {
      icon: FileText,
      label: 'របាយការណ៍',
      children: [{ icon: Package, label: 'របាយការណ៍ទូទៅទាំងអស់', route: '/super-admin/report' }],
    },
    { icon: MessageSquareText, label: 'គ្រប់គ្រងមតិកែលម្អ', route: '/super-admin/feedback' },
    { icon: Settings, label: 'ការកំណត់', route: '/super-admin/setting' },
  ];

  sidebarUser: SidebarUser = {
    fullname: '',
    role: 'Super-Admin',
    profile: 'assets/images/default-profile.png',
  };
  private userSub!: Subscription;
  constructor(
    private requestService: requestService,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.authService.refreshUser();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.authService.refreshUser();
    });

    this.userSub = this.authService.user$.subscribe((user) => {
      this.sidebarUser = user;
    });

    // Fetch super-admin account info from API and map to sidebar user
    // this.requestService.getJSON('/api/admins').subscribe({
    //   next: (res) => {
    //     if (res && Array.isArray(res.list) && res.list.length > 0) {
    //       const superAdmin: AccountDashboard = res.list[0];
    //       this.sidebarUser = {
    //         fullname: superAdmin.fullname || '',
    //         role: superAdmin.role || 'Super-Admin',
    //         profile: localStorage.getItem('userProfile') || 'assets/images/default-profile.png',
    //       };
    //     }
    //   },
    //   error: () => {
    //     // keep default user if request fails
    //   },
    // });
  }
  ngOnDestroy(): void {
    this.userSub?.unsubscribe(); //prevent memory leaks
  }
  title = 'ផ្ទាំងគ្រប់គ្រង';
  subtitle = 'សូមស្វាគមន៍មកកាន់ Krama Dashboard';
  today = new Date();
  notificationCount = 10;
}
