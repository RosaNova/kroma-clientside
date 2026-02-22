import { CommonModule } from '@angular/common';
import { Component, signal, computed, ChangeDetectorRef } from '@angular/core';

import {
  LucideAngularModule,
  Package,
  PackageIcon,
  WalletIcon,
  BoxIcon,
  Plus,
  ShoppingCart,
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
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../service/user-service';
import { mobileUser } from '../../models/user';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { SUPER_ADMIN_USER_STATS } from '@/app/core/mocks/super-admin/users.mock';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    StatCard,
    CommonModule,
    LucideAngularModule,
    RouterModule,
    DeleteDialog,
    MatSnackBarModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class Users {
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  ShoppingCart = ShoppingCart;

  SUPER_ADMIN_USER_STATS = SUPER_ADMIN_USER_STATS;

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
  users: mobileUser[] = [];
  showDeleteDialog = false;
  selectedName = '';
  storeId: string = '';
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {
    this.getUsers();
  }
  async getUsers() {
    try {
      const res = await this.userService.getMany();
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
    this.users.filter(
      (c) =>
        c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        c._id.toString().includes(this.searchTerm()),
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
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    const inputKey = (event.target as HTMLInputElement).value;
    if (inputKey != '') {
      // const res = await this.userService.searchUser(inputKey);
      // if (res.list) {
      //   this.users = res.list;
      //   this.cdr.detectChanges();
      // } else {
      //   this.users = [];
      // }
    } else {
      await this.getUsers();
    }
  }
}
