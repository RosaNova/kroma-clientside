import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild, ChangeDetectorRef } from '@angular/core';

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
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../service/user-service';
import { adminUser } from '../../models/user';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Category {
  id: number;
  name: string;
  description: string;
  productCount: string;
  status: 'active' | 'inactive';
}

const MOCK_CATEGORIES: Category[] = [
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
  selector: 'app-users',
  imports: [StatCard, CommonModule, LucideAngularModule, RouterModule, RouterLink, DeleteDialog],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class Users {
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

  // State
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  users: adminUser[] = [];
  showDeleteDialog = false;
  selectedName = '';
  storeId: string = '';
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {
    this.getUsers();
  }
  async getUsers() {
    try {
      const res = await this.userService.getUsers();
      if (res) {
        this.users = res.list;
        this.cdr.detectChanges();
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
  totalPages = computed(() => Math.max(Math.ceil(this.users.length / this.itemsPerPage()), 1));

  startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  endIndex = computed(() => Math.min(this.startIndex() + this.itemsPerPage(), this.users.length));

  paginated = computed(() => this.users.slice(this.startIndex(), this.endIndex()));

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
  openDelete(name: string, id: string) {
    this.selectedName = name;
    this.storeId = id;
    this.showDeleteDialog = true;
  }
  handleCancel() {
    this.showDeleteDialog = false;
  }
  async handleDelete() {
    try {
      this.showDeleteDialog = false;
      const res = await this.userService.deleteUser(this.storeId);
      if (res) {
        await this.getUsers();
        this._snackBar.open('User deleted Successfully!', 'OK', { duration: 3000 });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    const inputKey = (event.target as HTMLInputElement).value;
    if (inputKey != '') {
      const res = await this.userService.searchUser(inputKey);
      if (res.list) {
        this.users = res.list;
        this.cdr.detectChanges();
      } else {
        this.users = [];
      }
    } else {
      await this.getUsers();
    }
  }
}
