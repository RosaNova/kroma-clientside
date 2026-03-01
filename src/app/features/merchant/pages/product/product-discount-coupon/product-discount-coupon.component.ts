import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, ShoppingCart, PackageIcon, Package, WalletIcon, BoxIcon } from 'lucide-angular';

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: string;
  status: 'active' | 'inactive';
}

const ProductDiscount: Category[] = [
  { id: 101, name: 'ម៉ីឌូ', description: 'Regular text column', productCount: 'Regular text column', status: 'active' },
  { id: 102, name: 'សល់', description: 'Regular text column', productCount: 'Regular text column', status: 'active' },
  { id: 103, name: 'បង្ហូតល្លស', description: 'Regular text column', productCount: 'Regular text column', status: 'inactive' },
  { id: 104, name: 'ស្អូអគដលីណិ', description: 'Regular text column', productCount: 'Regular text column', status: 'active' },
  { id: 105, name: 'Regular text column', description: 'Regular text column', productCount: 'Regular text column', status: 'inactive' },
  { id: 106, name: 'Regular text column', description: 'Regular text column', productCount: 'Regular text column', status: 'active' },
  { id: 107, name: 'Regular text column', description: 'Regular text column', productCount: 'Regular text column', status: 'active' },
  { id: 108, name: 'Regular text column', description: 'Regular text column', productCount: 'Regular text column', status: 'inactive' },
];

@Component({
  selector: 'app-product-discount-coupon',
  imports: [TableComponent, StatCard, CommonModule, LucideAngularModule],
  templateUrl: './product-discount-coupon.component.html',
  styleUrls: ['./product-discount-coupon.component.css'],
})
export class ProductDiscountCouponComponent {
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  ShoppingCart = ShoppingCart;
}
