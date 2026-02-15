import { ProductCard } from '@/app/shared/components/product-card/product-card';
import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, Search } from 'lucide-angular';
import { ProductService } from '../services/product-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-see-all-product-category',
  imports: [ProductCard, CommonModule, FormsModule, LucideAngularModule, RouterModule],
  templateUrl: './see-all-product-category.html',
  styleUrl: './see-all-product-category.css',
})
export class SeeAllProductCategory {
  searchTerm = '';
  Search = Search;
  ArrowLeft = ArrowLeft;
  products: Product[] = [];
  categories = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
      name: 'ប្រហុកខ្មែរផ្សារភ្សារ',
      price: 20000,
      stock: 50,
    },
  ];

  constructor(
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProductByCategory(id as string);
  }
  async getProductByCategory(id: string) {
    try {
      const res = await this.productService.getProducts({ category: id });
      if (res) {
        this.products = res.list;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleBack() {
    this.location.back();
  }

  get filteredCategories() {
    return this.categories.filter((category) =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
