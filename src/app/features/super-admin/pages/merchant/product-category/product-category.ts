import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild } from '@angular/core';

import { LucideAngularModule, Package, PackageIcon, CarIcon, WalletIcon, BoxIcon, Plus, Wallet, ShoppingCart, Box, Search, Eye, FileUp, Trash2, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Phone, Mail, Calendar, Star } from 'lucide-angular';
import { BoxDialogComponent } from "@/app/shared/components/ui/box-dialog/box-dialog.component";

import { MOCK_PRODUCT_CATEGORIES, SUPER_ADMIN_PRODUCT_STATS } from '@/app/core/mocks/super-admin/product.mock';
import { ProductCategoryType } from '@/app/core/models/ui.types';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [StatCard, CommonModule, LucideAngularModule, DeleteDialog, BoxDialogComponent],
  templateUrl: './product-category.html',
  styleUrls: ['./product-category.css'],
})
export class ProductCategoryComponent {
  SUPER_ADMIN_PRODUCT_STATS = SUPER_ADMIN_PRODUCT_STATS;

  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  Box = Box;
  ShoppingCart = ShoppingCart;

  Phone = Phone;
  Mail = Mail;
  Calendar = Calendar;
  Star = Star;

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

  // Filter
  filtered = computed(() =>
    MOCK_PRODUCT_CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
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

  showDeleteDialog = false;
  showAddDialog = false;
  showEditDialog = false;
  selectedName = '';
  name?: string;


  /* ---------- Delete ---------- */
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
  openEdit() {
    this.showEditDialog = true;
  }

  closeEdit() {
    this.showEditDialog = false;
  }

  updateCategory() {
    console.log('Merchant updated');
    this.closeEdit();
  }

  openAdd() {
    this.showAddDialog = true;
  }

  closeAdd() {
    this.showAddDialog = false;
  }

  addCategory() {
    console.log('Merchant added');
    this.closeAdd();
  }


  /* ---------- View ---------- */
  showViewDialog = false;
  selectedMerchant?: ProductCategoryType;

  openView(id: number) {
    this.selectedMerchant = MOCK_PRODUCT_CATEGORIES.find(m => m.id === id);
    this.showViewDialog = true;
  }

  closeView() {
    this.showViewDialog = false;
    this.selectedMerchant = undefined;
  }
}
