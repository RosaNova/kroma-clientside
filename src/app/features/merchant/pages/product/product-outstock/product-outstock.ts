import { StatCard } from '@/app/shared/components/stat-card/stat-card';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog';
import { EditDialogComponent } from '@/app/shared/components/ui/edit-dialog/edit-dialog';
import { Component, computed, signal, ViewChild } from '@angular/core';
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
  ChevronsLeft,
  Edit,
  Trash2
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
  imports: [CommonModule, LucideAngularModule, StatCard, DeleteDialog, EditDialogComponent],
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
  Package = Package;
  Users = Users;
  Search = Search;
  Edit = Edit;
  Trash2 = Trash2;

  statCards: StatCardType[] = [
    {
      title: 'ចំនួនផលិតផល',
      value: '២០',
      change: '2% ពីមុន',
      changeType: 'positive',
      icon: Package,
      variant: 'purple'
    },
    {
      title: 'ប្រាក់ចំណួលផល',
      value: '៥០០០ រៀល',
      change: '5% ពីខែមុន',
      changeType: 'positive',
      icon: Wallet,
      variant: 'yellow'
    },
    {
      title: 'ការបញ្ជាទិញផល',
      value: '៨',
      change: '1% ពីខែមុន',
      changeType: 'negative',
      icon: ShoppingCart,
      variant: 'pink'
    },
    {
      title: 'ប្រភេទផលិតផល',
      value: '២០',
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

  /* ---------- Delete ---------- */
  showDeleteDialog = false;
  selectedName = '';

  openDelete(name: string) {
    this.selectedName = name;
    this.showDeleteDialog = true;
  }

  handleCancel() {
    this.showDeleteDialog = false;
  }

  handleDelete() {
    this.showDeleteDialog = false;
    console.log('Deleted:', this.selectedName);
  }

  /* ---------- Edit ---------- */
  @ViewChild(EditDialogComponent) editDialog!: EditDialogComponent;

  openEdit() {
    this.editDialog.openModal();
  }


  closeEdit() {
    this.editDialog.closeModal();
  }

  updateProduct() {
    console.log('Product updated');
    this.closeEdit();
  }

}
