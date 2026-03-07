import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, Search } from 'lucide-angular';
import { ProductService } from '../services/product-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../models/product';
import { ProductCard } from '@/app/shared/components/product-card/product-card.component';

@Component({
  selector: 'app-see-all-product-category',
  imports: [ProductCard, CommonModule, FormsModule, LucideAngularModule, RouterModule],
  templateUrl: './see-all-product-category.component.html',
  styleUrls: ['./see-all-product-category.component.css'],
})
export class SeeAllProductCategory {
  searchTerm = '';
  Search = Search;
  ArrowLeft = ArrowLeft;
  products = signal<Product[]>([]);
  categoryId: string = '';
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
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.getProductByCategory(this.categoryId as string);
  }
  async getProductByCategory(id: string) {
    try {
      const res = await this.productService.getProducts({ category: id });
      if (res) {
        this.products.set(res.list);
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    try {
      const inputKey = (event.target as HTMLInputElement).value;
      if (inputKey != '') {
        const res = await this.productService.searchProduct(inputKey, this.categoryId);
        if (res.list) {
          this.products.set(res.list);
        } else {
          this.products.set([]);
        }
      } else {
        await this.getProductByCategory(this.categoryId);
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
