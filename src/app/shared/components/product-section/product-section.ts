import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { RouterLink } from '@angular/router';

interface product{
  id: number;
  image: string;
  name: string;
  price: number;
  stock: number;
}

@Component({
  standalone : true,
  selector: 'app-product-section',
  imports: [CommonModule , ProductCard , RouterLink ],
  templateUrl: './product-section.html',
  styleUrl: './product-section.css',
})

export class ProductSection {
@Input() title! : string;
@Input() products! : product[];
}