import { ProductCard } from '@/app/shared/components/product-card/product-card';
import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-see-all-product-category',
  imports: [ProductCard, CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './see-all-product-category.html',
  styleUrl: './see-all-product-category.css',
})
export class SeeAllProductCategory {
  searchTerm = '';
  Search = Search;
  ArrowLeft = ArrowLeft;

  categories = [
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
    { id: 4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", name: "ប្រហុកខ្មែរផ្សារភ្សារ", price: 20000, stock: 50 },
  ];

  constructor(private location: Location) { }


  handleBack() {
    this.location.back();
  }

  get filteredCategories() {
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


}
