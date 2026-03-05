import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  LucideAngularModule,
  User,
  Camera,
  Phone,
  MapPin,
  Calendar,
  KeyRound,
  Form,
  CirclePercent,
  Mail,
} from 'lucide-angular';
import { AdminUsersService } from '../services/admin-users-service';

@Component({
  selector: 'app-admin-users-detail',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './admin-users-detail.html',
  styleUrls: ['./admin-users-detail.css'],
})
export class AdminUsersDetail {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  User = User;
  Camera = Camera;
  Phone = Phone;
  MapPin = MapPin;
  Calendar = Calendar;
  KeyRound = KeyRound;
  CirclePercent = CirclePercent;
  Mail = Mail;
  img_url: string = '';
  id: string = '';
  uploadFiles?: File;
  selectedImage: string = '';
  form = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    phone: new FormControl(''),
    commission_rate: new FormControl(''),
    address: new FormControl(''),
  });
  constructor(
    private adminUserService: AdminUsersService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.id = this.route?.snapshot.paramMap.get('id')!;
    this.getUserById(this.id);
  }
  async getUserById(id: string) {
    try {
      const res = await this.adminUserService.getUserById(id);
      if (res) {
        console.log(res);
        this.img_url = res.profile_url;
        this.form.patchValue({
          name: res.name,
          address: res.address,
          commission_rate: res.commission_rate,
          username: res.username,
          email: res.email,
          role: res.role,
          phone: res.phone,
        });
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSave() {
    try {
      const body: any = {
        ...this.form.value,
      };
      const res = await this.adminUserService.updateUser(this.id, body);
      if (res) {
        this.snackBar.open('Admin updated successfully', 'OK', { duration: 2000 });
        this.onBack();
      }
    } catch (e) {
      console.log(e);
    }
  }
  onBack() {
    this.router.navigate(['/super-admin/merchant']);
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
        const res = await this.adminUserService.updateProfile(this.id, body);
        if (res) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
