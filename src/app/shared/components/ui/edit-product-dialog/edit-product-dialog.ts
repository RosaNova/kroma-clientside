import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface EditProductData {
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-edit-product-dialog',
  imports: [CommonModule , MatButtonModule , MatDialogModule, MatInputModule , MatFormFieldModule , FormsModule ],
  templateUrl: './edit-product-dialog.html',
  styleUrl: './edit-product-dialog.css',
})
export class EditProductDialog {
   
   editName: string;
  editPrice: number;
  editStock: number;

  constructor(
    private dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditProductData
  ) {
    this.editName = data.name;
    this.editPrice = data.price;
    this.editStock = data.stock;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.editName,
      price: this.editPrice,
      stock: this.editStock,
    });
  }

}
