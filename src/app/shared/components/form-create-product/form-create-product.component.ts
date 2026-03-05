import { Component, signal } from '@angular/core';
import {
  Upload,
  ChevronRight,
  Package,
  DollarSign,
  ListTree,
  Hash,
  Tag,
  FileText,
  LucideAngularModule,
} from 'lucide-angular';
import { DropZoneComponent } from '../ui/drop-zone/drop-zone.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@/app/features/merchant/pages/product/services/product-service';
import { MerchantService } from '@/app/features/super-admin/pages/merchant/services/merchant-service';
import { Store } from '@/app/features/super-admin/pages/merchant/models/store';
import { CommonModule } from '@angular/common';
import { Category } from '@/app/features/merchant/pages/product/models/category';
@Component({
  standalone: true,
  selector: 'app-form-create-product',
  imports: [LucideAngularModule, DropZoneComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-create-product.component.html',
  styleUrl: './form-create-product.component.css',
})
export class FormCreateProductComponent {
  upload = Upload;
  ChevronRight = ChevronRight;
  Package = Package;
  DollarSign = DollarSign;
  ListTree = ListTree;
  Hash = Hash;
  Tag = Tag;
  FileText = FileText;
  uploadFiles: any;
  stores = signal<Store[]>([]);
  categories = signal<Category[]>([]);
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl('693ab7eda6eeb5e1cdb1a83f'),
    qty: new FormControl(''),
    isActive: new FormControl(true),
    discount: new FormControl(''),
    store: new FormControl('693ab7eda6eeb5e1cdb1a83f'),
  });
  constructor(
    private productService: ProductService,
    private merchantService: MerchantService,
  ) {
    this.getStores();
    this.getCategories();
  }
  async getStores() {
    try {
      const res = await this.merchantService.getMany();
      if (res) {
        this.stores.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getCategories() {
    try {
      const res = await this.productService.getCategories();
      if (res) {
        this.categories.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  onCreateProduct() {
    const body = {
      ...this.form.value,
      image: this.uploadFiles,
    };
    this.productService.createProducts(body).subscribe({
      next: (res) => {},
    });
  }
}
