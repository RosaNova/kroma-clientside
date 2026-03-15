import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, User, Camera, Megaphone } from 'lucide-angular';
import { AdvertisingService } from '../../services/advertising-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertising } from '../../model/advertising';
import { MerchantService } from '../../../merchant/services/merchant-service';
import { Store } from '../../../merchant/models/store';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-advertising-detail',
  imports: [LucideAngularModule, CommonModule, ReactiveFormsModule],
  templateUrl: './advertising-detail.html',
  styleUrl: './advertising-detail.css',
})
export class AdvertisingDetail {
  User = User;
  Camera = Camera;
  Megaphone = Megaphone;
  selectedImage: string = '';
  img_url = signal<string>('');
  ad = signal<Advertising>({} as any);
  adId: string = '';
  form = new FormGroup({
    description: new FormControl(''),
    store: new FormControl(''),
    isActive: new FormControl(true),
  });
  stores = signal<Store[]>([]);
  uploadFiles?: File;
  constructor(
    private advertisingService: AdvertisingService,
    private route: ActivatedRoute,
    private storeService: MerchantService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.adId = this.route?.snapshot.paramMap.get('id')!;
    this.getById(this.adId);
    this.getStores();
  }
  async getById(id: string) {
    try {
      const res = await this.advertisingService.getById(id);
      if (res) {
        this.form.patchValue({
          description: res.description,
          store: res.store,
          isActive: res.isActive,
        });
        this.img_url.set(res.ad_img);
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
  async onFileChange(event: Event) {
    try {
      const files = (event.target as HTMLInputElement).files;
      if (files!.length > 0) {
        for (let index = 0; index < files!.length; index++) {
          const file: File = files![index];
          this.uploadFiles = file;
          this.selectedImage = URL.createObjectURL(file);
        }
        const body = {
          profile: this.uploadFiles,
        };
        const res = await this.advertisingService.updateImage(this.adId, body);
        if (res) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async updateInfo() {
    const body = {
      ...this.form.value,
    };
    try {
      const res = await this.advertisingService.updateInfo(this.adId, body);
      if (res) {
        this.snackBar.open('Advertising updated successfully', 'OK', { duration: 2000 });
        this.onBack();
      }
    } catch (e) {
      console.log(e);
    }
  }
  onBack() {
    this.router.navigate(['/super-admin/advertising']);
  }
}
