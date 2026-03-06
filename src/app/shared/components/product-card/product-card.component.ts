import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KhmerNumberPipe } from '@/app/pipes/khmer-number.pipe';
import { Product } from '@/app/features/merchant/pages/product/models/product';
import { DeleteDialog } from '../ui/delete-dialog/delete-dialog.component';
import { BoxDialogComponent } from '../ui/box-dialog/box-dialog.component';
import { ProductService } from '@/app/features/merchant/pages/product/services/product-service';
import { Category } from '@/app/features/merchant/pages/product/models/category';

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
    ReactiveFormsModule,
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
  categories = signal<Category[]>([]);
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
  image_url: string = '';
  uploadFiles?: File;
  constructor(private productService: ProductService) {
    this.getCategories();
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
  /* ---------- Delete ---------- */
  openDelete(id: string, name: string) {
    this.storeId = id;
    this.selectedName = name;
    this.showDeleteDialog = true;
  }

  handleCancel() {
    this.showDeleteDialog = false;
  }

  async handleDelete() {
    console.log(this.storeId);
    try {
      const res = await this.productService.deleteProduct(this.storeId);
      if (res) {
        this.showDeleteDialog = false;
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
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
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files);
    if (files) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
        this.image_url = URL.createObjectURL(file);
        const body = {
          image: this.uploadFiles,
        };
        this.productService.updateProductImage(this.storeId, body).subscribe();
      }
    }
  }
  async open(id: string) {
    try {
      const res = await this.productService.getById(id);
      if (res) {
        this.image_url = res.image_url;
        this.form.patchValue({
          name: res.name,
          price: res.price,
          qty: res.qty,
          discount: res.discount,
          description: res.description,
          category: res.category._id,
        });
      }
    } catch (e) {
      console.log(e);
    }
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
        window.location.reload();
        this.close();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
