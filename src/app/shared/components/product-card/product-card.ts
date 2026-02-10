import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteDialog } from '../ui/delete-dialog/delete-dialog';
import { EditDialogComponent } from '../ui/edit-dialog/edit-dialog';
import { FormsModule } from '@angular/forms';
import { KhmerNumberPipe } from '@/app/pipes/khmer-number.pipe';

@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, DeleteDialog, EditDialogComponent, FormsModule, KhmerNumberPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {

  @Input() image!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() stock!: number;

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
  @ViewChild(EditDialogComponent) editDialog!: EditDialogComponent;

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
