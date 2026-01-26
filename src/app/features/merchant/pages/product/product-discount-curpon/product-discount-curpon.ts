import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { TableComponent } from '@/app/shared/components/table-component/table-component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule ,ShoppingCart,PackageIcon, Package,CarIcon, WalletIcon ,BoxIcon } from 'lucide-angular';
 
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
  selector: 'app-product-discount-curpon',
  imports: [TableComponent, StatCard, CommonModule, LucideAngularModule],
  templateUrl: './product-discount-curpon.html',
  styleUrl: './product-discount-curpon.css',
})
export class ProductDiscountCurpon { 
       Package =  Package;
       PackageIcon  = PackageIcon;
       WalletIcon = WalletIcon;
       BoxIcon = BoxIcon;
      ShoppingCart = ShoppingCart;
}
