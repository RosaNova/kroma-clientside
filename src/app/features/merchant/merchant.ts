import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutDashboard,LucideAngularModule ,Package, ShoppingCart, Users, FileText, Settings } from 'lucide-angular';
import { Slidebar } from '@/app/shared/components/slidebar/slidebar';
import { KrHeader } from '@/app/shared/components/kr-header/kr-header';
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
  imports: [RouterOutlet  ,LucideAngularModule, KrHeader , Slidebar ],
  templateUrl: './merchant.html',
  styleUrl: './merchant.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Merchant {
   navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'ផ្ទាំងគ្រប់គ្រង',
      route: '/merchant/dashboard'
     },
    { icon: Package, label: 'ផលិតផល' ,
     
       children: [
      { label: 'ផលិតផលទាំងអស់', route: '/merchant/product' , icon: ""},
      { label: 'បន្ថែមផលិតផល', route: '/merchant/product/addproduct' ,icon: "" },
      { label: 'ប្រភេទផលិតផល', route: '/merchant/product/productcategory' ,icon: "" },
      { label: 'អស់ស្តុក', route: '/merchant/product/productoutstock' , icon: "" },
      { label: 'បញ្ចុះតម្លៃ & គូប៉ុង', route: '/merchant/product/discount' , icon: "" },
    ]
     },
    { icon: ShoppingCart, label: 'ការបញ្ជាទិញ'},
    { icon: Users, label: 'អតិថិជន' },
    { icon: FileText, label: 'របាយការណ៍' ,
         children: [
      { label: 'របាយការណ៍លក់', route: '/merchant' , icon: ""},
      { label: 'របាយការណ៍ផលិតផល', route: '/merchant' ,icon: "" },
      { label: 'របាយការណ៍អតិថិជន', route: '/merchant' ,icon: "" },
    ]
     },
    { icon: Settings, label: 'ការកំណត់' ,   route: '/merchant/setting'  },
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
