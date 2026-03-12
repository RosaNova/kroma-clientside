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
  Mail,
  Upload,
  User,
  KeyRound,
  Phone,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MapPinHouse,
  CirclePercent,
  Circle,
} from 'lucide-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { Merchant } from './models/merchant';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ADMIN_USER_STATS } from '@/app/core/mocks/super-admin/users.mock';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { UserRole } from './models/role.enum';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { AdminUsersService } from './services/admin-users-service';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-users',
  imports: [
    StatCard,
    CommonModule,
    LucideAngularModule,
    RouterModule,
    RouterLink,
    BoxDialogComponent,
    ReactiveFormsModule,
    DropZoneComponent,
    DeleteDialog,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css'],
})
export class AdminUsers {
  Package = Package;
  PackageIcon = PackageIcon;
  WalletIcon = WalletIcon;
  BoxIcon = BoxIcon;
  ShoppingCart = ShoppingCart;
  Upload = Upload;
  User = User;
  Mail = Mail;
  KeyRound = KeyRound;
  Phone = Phone;
  MapPinHouse = MapPinHouse;
  CirclePercent = CirclePercent;
  ADMIN_USER_STATS = ADMIN_USER_STATS;

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
  users = signal<Merchant[]>([]);
  allUsers = signal<Merchant[]>([]);
  totalUsers = signal<number>(0);
  showDeleteDialog = false;
  showAddDialog = signal(false);
  selectedName = '';
  storeId: string = '';

  constructor(
    private adminUserService: AdminUsersService,
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {
    this.getUsers();
  }
  async getUsers() {
    try {
      const res = await this.adminUserService.getUsers();
      if (res) {
        this.allUsers.set(res.list);
        this.totalUsers.set(res.list.length!);
        this.updateDisplayedUsers();
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedUsers() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.users.set(this.allUsers().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedUsers();
  }
  // Filter
  // filtered = computed(() =>
  //   this.users.filter(
  //     (c) =>
  //       c.username.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
  //       c._id.toString().includes(this.searchTerm()),
  //   ),
  // );

  // Pagination
  // totalPages = computed(() => Math.max(Math.ceil(this.users.length / this.itemsPerPage()), 1));

  // startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage());

  // endIndex = computed(() => Math.min(this.startIndex() + this.itemsPerPage(), this.users.length));

  // paginated = computed(() => this.users.slice(this.startIndex(), this.endIndex()));

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

  openAdd() {
    this.showAddDialog.set(true);
  }

  closeAdd() {
    this.showAddDialog.set(false);
    this.form.reset();
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
      const res = await this.adminUserService.deleteUser(this.storeId);
      if (res) {
        await this.getUsers();
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSearch(event: KeyboardEvent) {
    const inputKey = (event.target as HTMLInputElement).value;
    if (inputKey != '') {
      const res = await this.adminUserService.searchUser(inputKey);
      if (res.list) {
        this.users.set(res.list);
      } else {
        this.users.set([]);
      }
    } else {
      await this.getUsers();
    }
  }

  // Form
  uploadFiles: any;
  form = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    commission_rate: new FormControl(''),
    role: new FormControl(UserRole.ShopOwner),
  });

  handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  async onCreateUser() {
    try {
      const body: any = {
        ...this.form.value,
      };
      if (this.uploadFiles) {
        body.profile = this.uploadFiles;
      }
      const res = await this.adminUserService.createUser(body);
      if (res) {
        this._snackBar.open('User created successfully!', 'OK', { duration: 3000 });
        await this.getUsers();
        this.closeAdd();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
