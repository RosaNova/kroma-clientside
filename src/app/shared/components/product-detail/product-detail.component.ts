import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRow } from '../ui/detail-row/detail-row.component';
import { FileText, LucideAngularModule, Ban, BadgeDollarSign } from 'lucide-angular';
import { Location } from '@angular/common';
import { Tag, Layers, PackageIcon, Percent, ArrowLeft } from 'lucide-angular';
import { ProductService } from '@/app/features/merchant/pages/product/services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@/app/features/merchant/pages/product/models/product';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, DetailRow, LucideAngularModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  @Input() onBack?: () => void;
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  storeId: string = '';
  product = signal<Product>({} as any);
  constructor(
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getProduct(id);
  }
  async getProduct(id: string) {
    try {
      const res = await this.productService.getById(id);
      if (res) {
        this.product.set(res);
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  }
  Tag = Tag;
  Layers = Layers;
  Package = PackageIcon;
  Percent = Percent;
  ArrowLeft = ArrowLeft;
  FileText = FileText;
  Ban = Ban;
  BadgeDollarSign = BadgeDollarSign;

  // product = {
  //   name: 'ប្រហុកខ្មែរត្បាសាន',
  //   price: '20000 រៀល',
  //   category: 'ត្រីប្រែទេស',
  //   stock: 50,
  //   brand: 'KhmerFood',
  //   discount: '10%',
  //   description:
  //     'ស្នាប់រូបភ្នែក្តីវារស្វប់ជង់ជ្រោយដីងលាលាបទម្លាប់ម្តងមួយពេសស្នាការនន្តុខណេលា មីញ្ញាលម្បាការម្តាជោជយម៉ំងយាមាវាតិការជួរត្រូតក្ដែងម្កីក៏មិកម្មាយម្រល់ពា។',
  //   image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
  // };

  handleBack() {
    this.location.back();
  }
}
