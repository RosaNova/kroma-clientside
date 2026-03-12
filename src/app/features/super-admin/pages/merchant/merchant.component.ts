import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { TableComponent } from '@/app/shared/components/table/table.component';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import {
  Component,
  signal,
  computed,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

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
import { isActive } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
    MatPaginatorModule,
  ],
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css'],
})
export class MerchantComponent {
  stores = signal<Store[]>([]);
  allStores = signal<Store[]>([]);
  detailInfo = signal<any>({});
  merchants = signal<Merchant[]>([]);

  store = signal<Store>({} as any);
  storeCategories = signal<storeCategory[]>([]);
  totalStores = signal<number>(0);
  form = new FormGroup({
    name: new FormControl(''),
    merchant: new FormControl(''),
    isActive: new FormControl(true),
    store_category: new FormControl(''),
    lat: new FormControl(''),
    long: new FormControl(''),
    is_delivery_fee: new FormControl(true),
  });
  uploadFiles?: File;
  store_id: string = '';
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
  currentPage = 0;
  itemsPerPage = 5;
  pageSize = 5;
  constructor(
    private merchantService: MerchantService,
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
        this.allStores.set(res.list);
        this.totalStores.set(res.list.length!);
        this.updateDisplayedStores();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getMerchants() {
    try {
      const res = await this.adminUserService.getUsers();
      if (res) {
        this.merchants.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getStoreCategories() {
    try {
      const res = await this.storeCategoriesService.getStoreCategories();
      if (res) {
        this.storeCategories.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedStores() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.stores.set(this.allStores().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedStores();
  }
  // Filter
  // filtered = computed(() =>
  //   MOCK_MERCHANTS.filter(
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

  showDeleteDialog = false;
  showAddDialog = signal(false);
  showEditDialog = false;
  selectedName = '';
  name?: string;

  /* ---------- Delete ---------- */
  openDelete(name: string, id: string) {
    this.selectedName = name;
    this.showDeleteDialog = true;
    this.store_id = id;
  }

  handleCancel() {
    this.showDeleteDialog = false;
  }

  async handleDelete() {
    try {
      this.showDeleteDialog = false;
      const res = await this.merchantService.delete(this.store_id);
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
    this.store_id = id;
    try {
      this.showEditDialog = true;
      const res = await this.merchantService.getById(this.store_id);
      if (res) {
        this.form.get('merchant')?.disable();
        this.form.patchValue({
          name: res.name,
          merchant: res.merchant._id,
          isActive: res.isActive,
          store_category: res.store_category,
          lat: res.address.latitude,
          long: res.address.longitude,
        });
        this.store.set(res);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async updateStore() {
    const body = {
      name: this.form.get('name')?.value,
      merchant: this.form.get('merchant')?.value,
      isActive: this.form.get('isActive')?.value,
      store_category: this.form.get('store_category')?.value,
    };
    this.closeEdit();
    try {
      const res = await this.merchantService.updateInfo(this.store_id, body);
      if (res) {
        this.getList();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
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
    this.form.patchValue({
      name: '',
      merchant: '',
      isActive: true,
      store_category: '',
      lat: '',
      long: '',
    });
  }

  closeAdd() {
    this.showAddDialog.set(false);
  }
  async handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
      if (this.store_id !== '') {
        const body = {
          store_img: this.uploadFiles,
        };
        try {
          const res = await this.merchantService.updateImage(this.store_id, body);
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
  async addCategory() {
    const body: any = { ...this.form.value, isActive: true };
    if (this.uploadFiles) {
      body.store_img = this.uploadFiles;
    }
    console.log(body);
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
    try {
      const res = await this.merchantService.getDetail(id);
      if (res) {
        this.showViewDialog = false;
        this.detailInfo.set(res);
        this.showViewDialog = true;
      }
    } catch (e) {
      console.log(e);
    }
  }

  closeView() {
    this.detailInfo.set({});
    this.showViewDialog = false;
  }
}
