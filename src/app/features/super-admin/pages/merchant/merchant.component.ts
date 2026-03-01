import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
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
  Phone,
  Mail,
  Calendar,
  Star,
} from 'lucide-angular';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';

import { SUPER_ADMIN_MERCHANT_STATS } from '@/app/core/mocks/super-admin/merchant.mock';
import { MOCK_MERCHANTS } from '@/app/core/mocks/super-admin/merchant.mock';
import { Merchant } from '../admin-users/models/merchant';
import { MerchantService } from './services/merchant-service';
import { Store } from './models/store';
import {
  FormControl,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { AdminUsersService } from '../admin-users/services/admin-users-service';
import { StoreCategoriesService } from '../store-category/service/store-categories-service';
import { storeCategory } from '../store-category/models/store-categories';
@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [
    StatCard,
    CommonModule,
    LucideAngularModule,
    DeleteDialog,
    BoxDialogComponent,
    DropZoneComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './merchant.component.html',
  styleUrl: './merchant.component.css',
})
export class MerchantComponent {
  stores: Store[] = [];
  detailInfo!: any;
  merchants: Merchant[] = [];
  storeCategories: storeCategory[] = [];
  form = new FormGroup({
    name: new FormControl(''),
    merchant: new FormControl(''),
    isActive: new FormControl(''),
    store_category: new FormControl(''),
  });
  uploadFiles?: File;
  SUPER_ADMIN_MERCHANT_STATS = SUPER_ADMIN_MERCHANT_STATS;

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

  // State
  searchTerm = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(10);
  constructor(
    private merchantService: MerchantService,
    private cdr: ChangeDetectorRef,
    private adminUserService: AdminUsersService,
    private storeCategoriesService: StoreCategoriesService,
  ) {
    this.getList();
    this.getMerchants();
    this.getStoreCategories();
  }
  async getList() {
    try {
      const res = await this.merchantService.getMany();
      if (res) {
        this.stores = res.list;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getMerchants() {
    try {
      const res = await this.adminUserService.getUsers();
      if (res) {
        this.merchants = res.list;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getStoreCategories() {
    try {
      const res = await this.storeCategoriesService.getStoreCategories();
      if (res) {
        this.storeCategories = res.list;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  // Filter
  filtered = computed(() =>
    MOCK_MERCHANTS.filter(
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
  showAddDialog = signal(false);
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
    this.showAddDialog.set(true);
  }

  closeAdd() {
    this.showAddDialog.set(false);
  }
  handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  async addCategory() {
    const body: any = { ...this.form.value };
    if (this.uploadFiles) {
      body.store_img = this.uploadFiles;
    }
    try {
      const res = await this.merchantService.create(body);
      if (res) {
        await this.getList();
        this.closeAdd();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* ---------- View ---------- */
  showViewDialog = false;
  selectedMerchant?: Merchant;

  async openView(id: string) {
    // this.selectedMerchant = MOCK_MERCHANTS.find((m) => m.id === id);
    this.showViewDialog = true;
    try {
      const res = await this.merchantService.getDetail(id);
      if (res) {
        this.detailInfo = res;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }

  closeView() {
    this.showViewDialog = false;
    this.selectedMerchant = undefined;
  }
}
