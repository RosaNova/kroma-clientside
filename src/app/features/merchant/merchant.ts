import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutDashboard,LucideAngularModule ,Package, ShoppingCart, Users, FileText, Settings } from 'lucide-angular';
import { Slidebar } from '@/app/shared/components/slidebar/slidebar';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header';
interface NavItem {
  icon: any; 
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}
@Component({
  standalone: true,
  selector: 'app-merchant',
  imports: [RouterOutlet  ,LucideAngularModule, KrHeader , Slidebar ],
  templateUrl: './merchant.html',
  styleUrl: './merchant.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Merchant {
   navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'ផ្ទាំងគ្រប់គ្រង', active: true },
    { icon: Package, label: 'ផលិតផល', hasDropdown: true },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ', hasDropdown: true },
    { icon: Users, label: 'អតិថិជន' },
    { icon: FileText, label: 'របាយការណ៍', hasDropdown: true },
    { icon: Settings, label: 'ការកំណត់' , hasDropdown : false},
  ];
    user = {
    name: 'សុខ វណ្ណា',
    role: 'អ្នកគ្រប់គ្រង',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  title = "ផ្ទាំងគ្រប់គ្រង";
  subtitle = "សូមស្វាគមន៍មកកាន់ Krama Dashboard";
  date = "០៨ ធ្នូ ២០២៤"
  notificationCount = 10;
}
