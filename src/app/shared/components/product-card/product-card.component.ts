import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { KhmerNumberPipe } from '@/app/pipes/khmer-number.pipe';
import { Product } from '@/app/features/merchant/pages/product/models/product';
import { DeleteDialog } from '../ui/delete-dialog/delete-dialog.component';
import { BoxDialogComponent } from '../ui/box-dialog/box-dialog.component';
import { ProductService } from '@/app/features/merchant/pages/product/services/product-service';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [
    CommonModule,
    RouterLink,
    DeleteDialog,
    FormsModule,
    KhmerNumberPipe,
    BoxDialogComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCard {
  @Input() image!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() stock!: number;
  @Input() products: Product[] = [];
  form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    qty: new FormControl(0),
    category: new FormControl(''),
    discount: new FormControl(0),
    description: new FormControl(''),
  });
  storeId: string = '';
  showDeleteDialog = false;
  selectedName = '';
  constructor(private productService: ProductService) {}
  /* ---------- Delete ---------- */
  openDelete(name: string) {
    this.selectedName = name;
    this.showDeleteDialog = true;
  }

  handleCancel() {
    this.showDeleteDialog = false;
  }

  handleDelete() {
    this.showDeleteDialog = false;
    console.log('Deleted:', this.selectedName);
  }

  /* ---------- Edit ---------- */
  @ViewChild(BoxDialogComponent) editDialog!: BoxDialogComponent;

  // form = {
  //   firstName: 'Felicia',
  //   lastName: 'Burke',
  //   email: 'example@mail.com',
  //   day: '10',
  //   month: 'June',
  //   year: '1990',
  //   gender: 'Female',
  // };
  open(id: string, product: Product) {
    this.form.patchValue({
      name: product.name,
      price: product.price,
      qty: product.qty,
      discount: product.discount,
      description: product.description,
      category: product.category._id,
    });
    this.storeId = id;
    this.editDialog.openModal();
  }

  close() {
    this.editDialog.closeModal();
  }

  async update() {
    const body = {
      ...this.form.value,
    };
    try {
      const res = await this.productService.updateProductInfo(this.storeId, body);
      if (res) {
        this.close();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
