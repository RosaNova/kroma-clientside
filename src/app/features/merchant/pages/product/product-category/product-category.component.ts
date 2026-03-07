import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild } from '@angular/core';

import {
  LucideAngularModule,
  Package,
  PackageIcon,
  CarIcon,
  WalletIcon,
  BoxIcon,
  Plus,
  Wallet,
  ShoppingCart,
  Box,
  Search,
  Eye,
  FileUp,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-angular';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { Category } from '../models/category';
import { ProductService } from '../services/product-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isActive } from '@angular/router';

const MOCK_CATEGORIES: any[] = [
  {
    id: 101,
    name: 'បង្អែម',
    description: 'ផលិតផលបង្អែម និងអាហារផ្អែម',
    productCount: '12',
    status: 'active',
  },
  {
    id: 102,
    name: 'ភេសជ្ជៈ',
    description: 'ភេសជ្ជៈត្រជាក់ និងក្តៅ',
    productCount: '18',
    status: 'active',
  },
  {
    id: 103,
    name: 'អាហារសម្រន់',
    description: 'អាហារស្រាលសម្រាប់ញ៉ាំលេង',
    productCount: '9',
    status: 'inactive',
  },
  {
    id: 104,
    name: 'បន្លែ',
    description: 'បន្លែស្រស់ និងបន្លែស្ងួត',
    productCount: '15',
    status: 'active',
  },
  {
    id: 105,
    name: 'ផ្លែឈើ',
    description: 'ផ្លែឈើស្រស់ និងផ្លែឈើនាំចូល',
    productCount: '20',
    status: 'inactive',
  },
  {
    id: 106,
    name: 'សាច់ និងត្រី',
    description: 'សាច់ស្រស់ ត្រី និងគ្រឿងសមុទ្រ',
    productCount: '14',
    status: 'active',
  },
  {
    id: 107,
    name: 'គ្រឿងទេស',
    description: 'គ្រឿងទេសសម្រាប់ចម្អិនអាហារ',
    productCount: '22',
    status: 'active',
  },
  {
    id: 108,
    name: 'អង្ករ និងធញ្ញជាតិ',
    description: 'អង្ករ មី និងធញ្ញជាតិផ្សេងៗ',
    productCount: '11',
    status: 'inactive',
  },
];

@Component({
  selector: 'app-product-category',
  imports: [
    StatCard,
    CommonModule,
    LucideAngularModule,
    DeleteDialog,
    BoxDialogComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategory {
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  ShoppingCart = ShoppingCart;

  Plus = Plus;
  Eye = Eye;
  Trash2 = Trash2;
  Edit = Edit;
  FileUp = FileUp;
  Search = Search;

  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronsLeft = ChevronsLeft;
  ChevronsRight = ChevronsRight;
  categories = signal<Category[]>([]);
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(true),
  });
  // State
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  showAddDialog: boolean = false;
  showEditDialog: boolean = false;
  storeId: string = '';
  constructor(private productService: ProductService) {
    this.getCategories();
  }
  async getCategories() {
    try {
      const res = await this.productService.getCategories();
      if (res) {
        this.categories.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  // Filter
  filtered = computed(() =>
    MOCK_CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        c.id.toString().includes(this.searchTerm()),
    ),
  );

  // Pagination
  totalPages = computed(() => Math.max(Math.ceil(this.filtered().length / this.itemsPerPage()), 1));

  startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  endIndex = computed(() =>
    Math.min(this.startIndex() + this.itemsPerPage(), this.filtered().length),
  );

  paginated = computed(() => this.filtered().slice(this.startIndex(), this.endIndex()));

  // Navigation
  goToFirst() {
    this.currentPage.set(1);
  }

  goToLast() {
    this.currentPage.set(this.totalPages());
  }

  prev() {
    this.currentPage.update((p) => Math.max(p - 1, 1));
  }

  next() {
    this.currentPage.update((p) => Math.min(p + 1, this.totalPages()));
  }

  changeItemsPerPage(value: number) {
    this.itemsPerPage.set(value);
    this.currentPage.set(1);
  }

  showDeleteDialog = false;
  selectedName = '';
  name?: string;

  /* ---------- Delete ---------- */
  openDelete(name: string, id: string) {
    this.storeId = id;
    this.selectedName = name;
    this.showDeleteDialog = true;
  }

  handleCancel() {
    this.showDeleteDialog = false;
  }

  async handleDelete() {
    try {
      const res = await this.productService.deleteProductCategory(this.storeId);
      if (res) {
        this.showDeleteDialog = false;
        this.getCategories();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* ---------- Edit ---------- */
  @ViewChild(BoxDialogComponent) editDialog!: BoxDialogComponent;
  @ViewChild(BoxDialogComponent) addDialog!: BoxDialogComponent;

  openEdit(category: Category) {
    this.showEditDialog = true;
    this.storeId = category._id;
    this.form.patchValue({
      name: category.name,
      description: category.description,
      isActive: category.isActive,
    });
  }

  closeEdit() {
    this.editDialog.closeModal();
  }

  async updateCategory() {
    const body = {
      ...this.form.value,
    };
    try {
      const res = await this.productService.updateProductCategory(this.storeId, body);
      if (res) {
        this.getCategories();
        this.showEditDialog = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  openAdd() {
    this.showAddDialog = true;
  }

  closeAdd() {
    this.showAddDialog = false;
  }

  async addCategory() {
    const body = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    };
    try {
      const res = await this.productService.createProductCategory(body);
      if (res) {
        this.getCategories();
        this.closeAdd();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    try {
      const inputKey = (event.target as HTMLInputElement).value;
      if (inputKey != '') {
        const res = await this.productService.searchProductCategory(inputKey);
        if (res.list) {
          this.categories.set(res.list);
        } else {
          this.categories.set([]);
        }
      } else {
        await this.getCategories();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
