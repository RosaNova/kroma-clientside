import { Formcreateproduct } from '@/app/shared/components/formcreateproduct/formcreateproduct';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-product',
  imports: [Formcreateproduct , CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {

}
