import { Component, signal } from '@angular/core';
import { LucideAngularModule, Edit, Search, Trash2, Eye, Megaphone, Package } from 'lucide-angular';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BoxDialogComponent } from '@/app/shared/components/ui/box-dialog/box-dialog.component';
import { AdvertisingService } from '../../services/advertising-service';
import { CommonModule } from '@angular/common';
import { Advertising } from '../../model/advertising';
import { RouterModule } from '@angular/router';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MerchantService } from '../../../merchant/services/merchant-service';
import { Store } from '../../../merchant/models/store';
import { DeleteDialog } from '@/app/shared/components/ui/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-advertisings',
  imports: [
    LucideAngularModule,
    MatPaginatorModule,
    BoxDialogComponent,
    CommonModule,
    RouterModule,
    DropZoneComponent,
    ReactiveFormsModule,
    DeleteDialog,
  ],
  templateUrl: './advertisings.html',
  styleUrl: './advertisings.css',
})
export class Advertisings {
  Edit = Edit;
  Search = Search;
  Trash2 = Trash2;
  Eye = Eye;
  Megaphone = Megaphone;
  Package = Package;
  showConfirmDialog: boolean = false;
  allAds = signal<Advertising[]>([]);
  ads = signal<Advertising[]>([]);
  totalAds = signal<number>(0);
  currentPage = 0;
  itemsPerPage = 5;
  pageSize = 5;
  uploadFiles?: File;
  selectedName: string = 'Advertising';
  showDeleteDialog: boolean = false;
  form = new FormGroup({
    description: new FormControl(''),
    store: new FormControl(''),
    isActive: new FormControl(true),
  });
  showAddDialog: boolean = false;
  selectedImage: string = '';
  stores = signal<Store[]>([]);
  adId: string = '';
  constructor(
    private advertisingService: AdvertisingService,
    private snackBar: MatSnackBar,
    private storeService: MerchantService,
  ) {
    this.getList();
    this.getStores();
  }
  async getList() {
    try {
      const res = await this.advertisingService.getMany();
      if (res) {
        this.allAds.set(res.list);
        this.totalAds.set(res.list.length!);
        this.updateDisplayedAds();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getStores() {
    try {
      const res = await this.storeService.getMany();
      if (res) {
        this.stores.set(res.list);
      }
    } catch (e) {
      console.log(e);
    }
  }
  updateDisplayedAds() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ads.set(this.allAds().slice(startIndex, endIndex));
  }
  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedAds();
  }
  closeAdd() {
    this.showAddDialog = false;
  }
  openAddDialog() {
    this.showAddDialog = true;
  }
  onFileChange(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  async onCreate() {
    try {
      const body = {
        ...this.form.value,
        image: this.uploadFiles,
      };
      const res = await this.advertisingService.create(body);
      if (res) {
        this.showAddDialog = false;
        this.getList();
        this.snackBar.open('Advertising created successfully!', 'OK', { duration: 2000 });
      }
    } catch (e) {
      console.log(e);
    }
  }
  openDeleteDialog(id: string) {
    this.showDeleteDialog = true;
    this.adId = id;
  }
  cancelDelete() {
    this.showDeleteDialog = false;
  }
  async handleDelete() {
    try {
      const res = await this.advertisingService.delete(this.adId);
      if (res) {
        this.showDeleteDialog = false;
        this.getList();
        this.snackBar.open('Advertising deleted successfully!', 'OK', { duration: 2000 });
      }
    } catch (e) {
      console.log(e);
    }
  }
  closeDialog() {}
}
