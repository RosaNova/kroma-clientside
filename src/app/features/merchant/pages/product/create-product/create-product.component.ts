import { FormCreateProductComponent } from '@/app/shared/components/form-create-product/form-create-product.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-create-product',
  imports: [FormCreateProductComponent, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProduct {
  constructor(private productService: ProductService) { }
}
