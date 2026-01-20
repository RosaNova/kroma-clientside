import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCard } from '../product-card/product-card';

interface product{
  id: number;
  image: string;
  name: string;
  price: string;
  stock: number;
}

@Component({
  standalone : true,
  selector: 'app-product-section',
  imports: [CommonModule , ProductCard],
  templateUrl: './product-section.html',
  styleUrl: './product-section.css',
})

export class ProductSection {
@Input() title! : string;
@Input() products! : product[];
}