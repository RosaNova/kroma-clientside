import { DashboardComponent } from '@/app/shared/components/dashboard-component/dashboard-component';
import { Component  } from '@angular/core';
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings, LogOut, ChevronDown, LucideAngularModule } from 'lucide-angular';

interface NavItem {
  icon: any; 
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [DashboardComponent , LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'ផ្ទាំងគ្រប់គ្រង', active: true },
    { icon: Package, label: 'ផលិតផល', hasDropdown: true },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ', hasDropdown: true },
    { icon: Users, label: 'អតិថិជន' },
    { icon: FileText, label: 'របាយការណ៍', hasDropdown: true },
    { icon: Settings, label: 'ការកំណត់' },
  ];
 ChevronDown = ChevronDown
 LogOut = LogOut
user = {
    name: 'សុខ វណ្ណា',
    role: 'អ្នកគ្រប់គ្រង',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };
} 
