import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, Search } from 'lucide-angular';
import { ProductService } from '../services/product-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../models/product';
import { ProductCard } from '@/app/shared/components/product-card/product-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-see-all-product-category',
  imports: [ProductCard, CommonModule, FormsModule, LucideAngularModule, RouterModule, MatPaginatorModule],
  templateUrl: './see-all-product-category.component.html',
  styleUrls: ['./see-all-product-category.component.css'],
})
export class SeeAllProductCategory {
  searchTerm = '';
  Search = Search;
  ArrowLeft = ArrowLeft;
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
  allProducts = signal<Product[]>([]);
  products = signal<Product[]>([]);
  totalProducts = signal<number>(0);
  currentPage = 0;
  itemsPerPage = 4;
  pageSize = 4;
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
        this.allProducts.set(res.list);
        this.totalProducts.set(res.list.length!);
        this.updateDisplayedProducts();
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
        this.allProducts.set(res.list ?? []);
      } else {
        await this.getProductByCategory(this.categoryId);
      }
      this.totalProducts.set(this.allProducts().length);
      this.currentPage = 0;
      this.updateDisplayedProducts();
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products.set(this.allProducts().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedProducts();
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
