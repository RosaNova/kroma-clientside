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
} from 'lucide-angular';
import { RouterLink, RouterModule } from '@angular/router';
import { adminUser } from './models/admin-users';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ADMIN_USER_STATS } from '@/app/core/mocks/super-admin/users.mock';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { UserRole } from './models/role.enum';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
import { AdminUsersService } from './services/admin-users-service';
import { StatCard } from '@/app/shared/components/stat-card/stat-card.component';
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
  ],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
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
  currentPage = signal(1);
  itemsPerPage = signal(10);
  users: adminUser[] = [];
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
        c.username.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
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
        this.users = res.list;
        this.cdr.detectChanges();
      } else {
        this.users = [];
      }
    } else {
      await this.getUsers();
    }
  }

  // Form
  uploadFiles: any;
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    profile: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(UserRole.shopOwner),
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
