import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { KrHeader } from '@/app/shared/components/kr-header/kr-header.component';

registerLocaleData(localeKm);
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
  styleUrl: './super-admin.component.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuperAdmin {
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
        { icon: Package, label: 'ម្ខាស់អាជីវកម្មទាំងអស់', route: '' },
        { icon: Package, label: 'ប្រភេទទំនិញទាំងអស់', route: '' },
      ]
    },
    {
      icon: FileText,
      label: 'របាយការណ៍',
      route: 'report',
      children: [
        { icon: Package, label: 'របាយការណ៍លក់', route: '' },
        { icon: Package, label: 'របាយការណ៍ទូទាត់', route: '' },
      ]
    },
    { icon: MessageSquareText, label: 'មតិកែលម្អ', route: 'feedback' },
    { icon: User, label: 'គ្រប់គ្រងអ្នកប្រើប្រាស់ប្រព័ន្ធ', route: 'users' },
    { icon: DatabaseBackup, label: 'ការបម្រុងទុកទិន្នន័យ', route: 'backup' },
    { icon: Settings, label: 'ការកំណត់', route: 'setting' },
  ];
  user = {
    name: 'សុខ វណ្ណា',
    role: 'អ្នកគ្រប់គ្រង',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  };

  title = 'ផ្ទាំងគ្រប់គ្រង';
  subtitle = 'សូមស្វាគមន៍មកកាន់ Krama Dashboard';
  today = new Date();
  notificationCount = 10;
}

