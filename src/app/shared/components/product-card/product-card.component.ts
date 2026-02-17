import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhmerNumberPipe } from '@/app/pipes/khmer-number.pipe';
import { Product } from '@/app/features/merchant/pages/product/models/product';
import { DeleteDialog } from '../ui/delete-dialog/delete-dialog.component';
import { BoxDialogComponent } from '../ui/box-dialog/box-dialog.component';

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

  showDeleteDialog = false;
  selectedName = '';

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

  form = {
    firstName: 'Felicia',
    lastName: 'Burke',
    email: 'example@mail.com',
    day: '10',
    month: 'June',
    year: '1990',
    gender: 'Female',
  };

  open() {
    this.editDialog.openModal();
  }

  close() {
    this.editDialog.closeModal();
  }

  update() {
    console.log(this.form);
    this.close();
  }
}
