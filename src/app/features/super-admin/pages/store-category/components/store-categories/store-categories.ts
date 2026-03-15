import { Component, signal, computed, ViewChild, ChangeDetectorRef } from '@angular/core';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';

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
import {
  MOCK_PRODUCT_CATEGORIES,
  SUPER_ADMIN_PRODUCT_STATS,
} from '@/app/core/mocks/super-admin/product.mock';
import { ProductCategoryType } from '@/app/core/models/ui.types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { isActive } from '@angular/router';
import { StoreCategoriesService } from '../../service/store-categories-service';
import { storeCategory } from '../../models/store-categories';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OverallData } from '../../models/overall';
@Component({
  selector: 'app-store-categories',
  imports: [
    StatCard,
    CommonModule,
    LucideAngularModule,
    DeleteDialog,
    BoxDialogComponent,
    ReactiveFormsModule,
    DropZoneComponent,
    MatPaginatorModule,
  ],
  templateUrl: './store-categories.html',
  styleUrl: './store-categories.css',
})
export class StoreCategories {
  SUPER_ADMIN_PRODUCT_STATS = SUPER_ADMIN_PRODUCT_STATS;
  selectedMerchant?: ProductCategoryType;
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  Box = Box;
  ShoppingCart = ShoppingCart;
  storeCategories = signal<storeCategory[]>([]);
  allStoreCategories = signal<storeCategory[]>([]);
  totalStoreCategories = signal<number>(0);
  storeCategory: storeCategory = {} as storeCategory;
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
  showDeleteDialog = false;
  showAddDialog = signal(false);
  showEditDialog = false;
  selectedName = '';
  name?: string;
  showViewDialog = false;
  searchTerm = signal('');
  currentPage = 0;
  itemsPerPage = 5;
  OverAllData = signal<OverallData>({} as any)
  pageSize = 5;
  uploadFiles: any;
  storeId: string = '';
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(true),
  });
  constructor(
    private storeCategoryService: StoreCategoriesService,
    private cdr: ChangeDetectorRef,
  ) {
    this.getList();
    this.getOverall()
  }
  async getList() {
    try {
      const res = await this.storeCategoryService.getStoreCategories();
      if (res) {
        this.allStoreCategories.set(res.list);
        this.totalStoreCategories.set(res.list.length);
        this.updateDisplayedStoreCategories();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getOverall() {
    try {
      const res = await this.storeCategoryService.getOverAllData();
      if (res) {
        this.OverAllData.set(res)
      }
    } catch (e) {
      console.log(e)
    }
  }
  updateDisplayedStoreCategories() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.storeCategories.set(this.allStoreCategories().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedStoreCategories();
  }
  // filtered = computed(() =>
  //   MOCK_PRODUCT_CATEGORIES.filter(
  //     (c) =>
  //       c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
  //       c.id.toString().includes(this.searchTerm()),
  //   ),
  // );

  // // Pagination
  // totalPages = computed(() => Math.max(Math.ceil(this.filtered().length / this.itemsPerPage()), 1));

  // startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  // endIndex = computed(() =>
  //   Math.min(this.startIndex() + this.itemsPerPage(), this.filtered().length),
  // );

  // paginated = computed(() => this.filtered().slice(this.startIndex(), this.endIndex()));

  // // Navigation
  // goToFirst() {
  //   this.currentPage.set(1);
  // }

  // goToLast() {
  //   this.currentPage.set(this.totalPages());
  // }

  // prev() {
  //   this.currentPage.update((p) => Math.max(p - 1, 1));
  // }

  // next() {
  //   this.currentPage.update((p) => Math.min(p + 1, this.totalPages()));
  // }

  // changeItemsPerPage(value: number) {
  //   this.itemsPerPage.set(value);
  //   this.currentPage.set(1);
  // }

  /* ---------- Delete ---------- */
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
      const res = await this.storeCategoryService.deleteStoreCategories(this.storeId);
      if (res) {
        await this.getList();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  /* ---------- Edit ---------- */
  async openEdit(id: string) {
    this.storeId = id;
    try {
      this.showEditDialog = true;
      const res = await this.storeCategoryService.getById(id);
      if (res) {
        this.form.patchValue({
          name: res.name,
          description: res.description,
          isActive: res.isActive,
        });
        this.storeCategory = res;
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    const inputKey = (event.target as HTMLInputElement).value;
    if (inputKey != '') {
      const res = await this.storeCategoryService.search({ q: inputKey });
      if (res.list) {
        this.storeCategories.set(res.list);
      } else {
        this.storeCategories.set([]);
      }
    } else {
      await this.getList();
    }
  }
  closeEdit() {
    this.showEditDialog = false;
    this.form.patchValue({
      name: '',
      description: '',
      isActive: true,
    });
  }

  async updateCategory() {
    const body = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      isActive: this.form.get('isActive')?.value,
    };
    this.closeEdit();
    try {
      const res = await this.storeCategoryService.updateInfo(this.storeId, body);
      if (res) {
        await this.getList();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  openAdd() {
    this.showAddDialog.set(true);
  }

  closeAdd() {
    this.showAddDialog.set(false);
  }

  async addCategory() {
    try {
      const body = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        isActive: this.form.get('isActive')?.value,
        image: this.uploadFiles,
      };
      const res = await this.storeCategoryService.createStoreCategories(body);
      if (res) {
        await this.getList();
        this.closeAdd();
      }
    } catch (e) {
      console.log(e);
    }
  }
  openView(id: string) {
    // this.selectedMerchant = MOCK_PRODUCT_CATEGORIES.find((m) => m.id === id);
    this.showViewDialog = true;
  }
  async handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
      if (this.storeId !== '') {
        const body = {
          image: this.uploadFiles,
        };
        try {
          const res = await this.storeCategoryService.updateImage(this.storeId, body);
          if (res) {
            await this.getList();
            this.closeAdd();
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  closeView() {
    this.showViewDialog = false;
    this.selectedMerchant = undefined;
  }
}
