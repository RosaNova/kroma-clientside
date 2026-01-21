import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Package,
  Wallet,
  ShoppingCart,
  Box,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Users,
  ChevronsLeft
} from 'lucide-angular';


type ChangeType = 'positive' | 'negative';
type Variant = 'pink' | 'yellow' | 'green' | 'blue' | 'purple';

interface StatCardType {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
  icon: any;
  variant: Variant;
}

interface OutStockProduct {
  id: number;
  image: string;
  category: string;
  location: string;
  lastUpdated: string;
  status: string;
}


@Component({
  selector: 'app-product-outstock',
  imports: [CommonModule, LucideAngularModule ,  StatCard],
  templateUrl: './product-outstock.html',
  styleUrl: './product-outstock.css',
})
export class ProductOutstock {
  readonly icons = {
    Package,
    Wallet,
    ShoppingCart,
    Box,
    Search,
    Plus,
    ChevronLeft,
    ChevronRight,
  };

  searchTerm = signal('');
  itemsPerPage = signal(10);

  ChevronRight = ChevronRight;
  ChevronsRight = ChevronsRight;
  ChevronLeft = ChevronLeft;
  ChevronsLeft = ChevronsLeft;
  Package  = Package;
  Users = Users;
  Search = Search;

  statCards: StatCardType[] = [
    {
      title: 'ចំនួនផលិតផលសរុប',
      value: 'សរុប: ២០',
      change: '2% ពីមុន',
      changeType: 'positive',
      icon: Package,
      variant: 'purple'
    },
    {
      title: 'ប្រាក់ចំណួលផលសរុប',
      value: '៥០០០ រៀល',
      change: '5% ពីខែមុន',
      changeType: 'positive',
      icon: Wallet,
      variant: 'yellow'
    },
    {
      title: 'ការបញ្ជាទិញផលសរុប',
      value: 'សរុប: ៨',
      change: '1% ពីខែមុន',
      changeType: 'negative',
      icon: ShoppingCart,
      variant: 'pink'
    },
    {
      title: 'ប្រភេទផលិតផលសរុប',
      value: 'សរុប: ២០',
      change: '0% ពីខែមុន',
      changeType: 'negative',
      icon: Box,
      variant: 'pink'
    }
  ];

  products: OutStockProduct[] = [
    { id: 101, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 102, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 103, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងភ្នំពេញ', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 104, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 105, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 106, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងភ្នំពេញ', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 107, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 108, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងសៀមរាប', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
    { id: 109, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop', category: 'គ្រឿងកែច្នៃ', location: 'ឃ្លាំងភ្នំពេញ', lastUpdated: '10/10/2025', status: 'អស់ស្តុក' },
  ];

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products.filter(p =>
      p.category.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      p.id.toString().includes(term)
    );
  });

  // VARIANT_CLASSES: Record<Variant, string> = {
  //   purple: 'bg-violet-100 border-violet-200 text-violet-600',
  //   yellow: 'bg-amber-100 border-amber-200 text-amber-600',
  //   coral: 'bg-rose-100 border-rose-200 text-rose-600',
  //   pink: 'bg-pink-100 border-pink-200 text-pink-600',
  // };
  // variantClass(variant: StatVariant): string {
  //   return this.VARIANT_CLASSES[variant];
  // }


  // State
  // searchTerm = signal('');
  currentPage = signal(1);
  // itemsPerPage = signal(10);

  // Filter
  filtered = computed(() =>
    this.products.filter(c =>
      c.category.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      c.id.toString().includes(this.searchTerm())
    )
  );

  // Pagination
  totalPages = computed(() =>
    Math.max(
      Math.ceil(this.filtered().length / this.itemsPerPage()),
      1
    )
  );

  startIndex = computed(() =>
    (this.currentPage() - 1) * this.itemsPerPage()
  );

  endIndex = computed(() =>
    Math.min(
      this.startIndex() + this.itemsPerPage(),
      this.filtered().length
    )
  );

  paginated = computed(() =>
    this.filtered().slice(this.startIndex(), this.endIndex())
  );

  // Navigation
  goToFirst() {
    this.currentPage.set(1);
  }

  goToLast() {
    this.currentPage.set(this.totalPages());
  }

  prev() {
    this.currentPage.update(p => Math.max(p - 1, 1));
  }

  next() {
    this.currentPage.update(p => Math.min(p + 1, this.totalPages()));
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage.set(value);
    this.currentPage.set(1);
  }


  
}
