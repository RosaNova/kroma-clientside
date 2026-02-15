import { Component } from '@angular/core';
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
import { DropZoneComponent } from '../ui/drop-zone-component/drop-zone-component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@/app/features/merchant/pages/product/services/product-service';
@Component({
  standalone: true,
  selector: 'app-formcreateproduct',
  imports: [LucideAngularModule, DropZoneComponent, ReactiveFormsModule],
  templateUrl: './formcreateproduct.html',
  styleUrl: './formcreateproduct.css',
})
export class Formcreateproduct {
  upload = Upload;
  ChevronRight = ChevronRight;
  Package = Package;
  DollarSign = DollarSign;
  ListTree = ListTree;
  Hash = Hash;
  Tag = Tag;
  FileText = FileText;
  uploadFiles: any;
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
  constructor(private productService: ProductService) {}
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
