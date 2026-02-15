import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { ProductGrouped } from '@/app/features/merchant/pages/product/models/product';

interface product {
  id: number;
  image_url: string;
  name: string;
  price: number;
  qty: number;
}

@Component({
  standalone: true,
  selector: 'app-product-section',
  imports: [CommonModule, RouterLink, FormsModule, ProductCard],
  templateUrl: './product-section.html',
  styleUrl: './product-section.css',
})
export class ProductSection {
  @Input() title!: string;
  @Input() products: ProductGrouped[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log('Products changed:', {
        previousValue: changes['products'].previousValue,
        currentValue: changes['products'].currentValue,
        isFirstChange: changes['products'].firstChange,
        hasData: !!this.products && this.products.length > 0,
      });
    }
  }
}
