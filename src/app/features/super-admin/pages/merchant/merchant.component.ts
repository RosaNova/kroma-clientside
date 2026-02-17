import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild } from '@angular/core';

import { LucideAngularModule, Package, PackageIcon, CarIcon, WalletIcon, BoxIcon, Plus, Wallet, ShoppingCart, Box, Search, Eye, FileUp, Trash2, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-angular';
import { EditDialogComponent } from "@/app/shared/components/ui/edit-dialog/edit-dialog.component";
import { AddDialogComponent } from "@/app/shared/components/ui/add-dialog/add-dialog.component";

import { SUPER_ADMIN_MERCHANT_STATS } from '@/app/core/mocks/super-admin/merchant.mock';
import { MOCK_MERCHANTS } from '@/app/core/mocks/super-admin/merchant.mock';


@Component({
  selector: 'app-merchant',
  imports: [StatCard, CommonModule, LucideAngularModule, DeleteDialog, EditDialogComponent, AddDialogComponent],
  templateUrl: './merchant.component.html',
  styleUrl: './merchant.component.css',
})
export class Merchant {
  SUPER_ADMIN_MERCHANT_STATS = SUPER_ADMIN_MERCHANT_STATS;

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

  // Filter
  filtered = computed(() =>
    MOCK_MERCHANTS.filter(c =>
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
  @ViewChild(EditDialogComponent) editDialog!: EditDialogComponent;
  @ViewChild(AddDialogComponent) addDialog!: AddDialogComponent;

  openEdit() {
    this.editDialog.openModal();
  }

  closeEdit() {
    this.editDialog.closeModal();
  }

  updateCategory() {
    console.log('Category updated');
    this.closeEdit();
  }

  openAdd() {
    this.addDialog.openModal();
  }

  closeAdd() {
    this.addDialog.closeModal();
  }

  addCategory() {
    console.log('Category added');
    this.closeAdd();
  }
}
