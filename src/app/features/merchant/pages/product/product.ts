import { ProductSection } from '@/app/shared/components/product-section/product-section';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Package , Wallet , ShoppingCart ,Box} from 'lucide-angular';
@Component({
  selector: 'app-product',
  imports: [CommonModule, ProductSection , StatCard , LucideAngularModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})

export class Product {
  Package = Package; 
  Wallet = Wallet;
  ShoppingCart = ShoppingCart;
  Box  = Box;
spiceProducts = [
  { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
];

 vegetableProducts = [
  { id: 5, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 6, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 7, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 8, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
];

souvenirProducts = [
  { id: 9, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 10, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 11, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
  { id: 12, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: "20000 រៀល", stock: 50 },
];
}
