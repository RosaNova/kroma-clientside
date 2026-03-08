import { Component, signal } from '@angular/core';
import { LucideAngularModule, ArrowBigLeftIcon } from 'lucide-angular';
import { MerchantService } from '../../../service/merchant-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/order';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-detail',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './orders-detail.html',
  styleUrl: './orders-detail.css',
})
export class OrdersDetail {
  products = signal<Product[]>([]);
  ArrowBigLeftIcon = ArrowBigLeftIcon;
  constructor(
    private merchantService: MerchantService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetail(id!);
  }
  async getDetail(id: string) {
    try {
      const res = await this.merchantService.getOrderDetail(id);
      if (res) {
        this.products.set(res.products);
      }
    } catch (e) {
      console.log(e);
    }
  }
  onBack() {
    this.router.navigate(['merchant/order']);
  }
}
