import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild, OnInit } from '@angular/core';

import { LucideAngularModule, Package, PackageIcon, CarIcon, WalletIcon, BoxIcon, Plus, Wallet, ShoppingCart, Box, Search, Eye, FileUp, Trash2, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Phone, Mail, Calendar, Star, ArrowUpRight, ArrowDownLeft, CheckCircle, Clock, AlertCircle } from 'lucide-angular';
import { BoxDialogComponent } from "@/app/shared/components/ui/box-dialog/box-dialog.component";


import { Merchant } from '@/app/core/models/ui.types';
import { MONTHLY_REVENUE_STATS, TOP_CUSTOMERS, TOP_VENDORS, RECENT_TRANSACTIONS } from '@/app/core/mocks/super-admin/report-revenue';
import { MOCK_MERCHANTS } from '@/app/core/mocks/super-admin/merchant.mock';
import { LoadingSpinner } from '@/app/shared/components/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [StatCard, CommonModule, LucideAngularModule, DeleteDialog, BoxDialogComponent, LoadingSpinner],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class Report implements OnInit {
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }

  MONTHLY_REVENUE_STATS = MONTHLY_REVENUE_STATS;
  TOP_CUSTOMERS = TOP_CUSTOMERS;
  TOP_VENDORS = TOP_VENDORS;
  RECENT_TRANSACTIONS = RECENT_TRANSACTIONS;


  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
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
  ArrowUpRight = ArrowUpRight;
  ArrowDownLeft = ArrowDownLeft;
  CheckCircle = CheckCircle;
  Clock = Clock;
  AlertCircle = AlertCircle;

  // State
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);

  // Filter
  filtered = computed(() =>
    MOCK_MERCHANTS.filter(c =>
      c.fullname.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      c._id.toString().includes(this.searchTerm())
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
  selectedMerchant?: Merchant;

  openView(id: string) {
    this.selectedMerchant = MOCK_MERCHANTS.find(m => m._id === id);
    this.showViewDialog = true;
  }

  closeView() {
    this.showViewDialog = false;
    this.selectedMerchant = undefined;
  }
}
