import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Camera,
  Save,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bell,
  Globe,
  Moon,
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  Sun,
  Languages,
  Check,
  LucideAngularModule,
  CircleDollarSignIcon,
} from 'lucide-angular';
import { MerchantService } from '../../service/merchant-service';
import { SettingInfo } from './models/setting';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-setting',
  imports: [CommonModule, FormsModule, LucideAngularModule, ReactiveFormsModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class Setting {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  Camera = Camera;
  Save = Save;
  User = User;
  Lock = Lock;
  Mail = Mail;
  Phone = Phone;
  MapPin = MapPin;
  Calendar = Calendar;
  Bell = Bell;
  Globe = Globe;
  Moon = Moon;
  Shield = Shield;
  Smartphone = Smartphone;
  Eye = Eye;
  EyeOff = EyeOff;
  Languages = Languages;
  Check = Check;
  Sun = Sun;
  CircleDollarSignIcon = CircleDollarSignIcon;

  profileData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    address: '',
  };

  accountData = {
    email: '',
    oldPassword: '',
    newPassword: '',
  };

  showOldPassword = false;
  showNewPassword = false;

  preferences = {
    language: 'km',
    theme: 'dark',
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    twoFactorAuth: false,
  };
  storeUserId: string = '';
  uploadFiles?: File;
  selectedImage: string = '';
  form = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    // email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    commission_rate: new FormControl(''),
    createdAt: new FormControl(Date()),
  });
  formUpdatePass = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  user = signal<SettingInfo>({} as any);
  constructor(
    private merchantService: MerchantService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
  ) {
    this.getInformation();
  }
  async getInformation() {
    try {
      const res = await this.merchantService.getUserDetail();
      if (res) {
        this.form.get('createdAt')?.disable();
        this.form.get('commission_rate')?.disable();
        this.form.patchValue({
          name: res.name,
          username: res.username,
          // email: res.email,
          phone: res.phone,
          address: res.address,
          commission_rate: res.commission_rate,
          createdAt: this.datePipe.transform(res.createdAt, 'dd/MM/yyyy'),
        });
        this.formUpdatePass.patchValue({
          email: res.email,
        });
        this.storeUserId = res._id;
        this.user.set(res);
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
        const res = await this.merchantService.updateProfile(this.storeUserId, body);
        if (res) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async saveProfile() {
    const body = {
      ...this.form.value,
    };
    try {
      const res = await this.merchantService.updateInfo(this.storeUserId, body);
      if (res) {
        this.snackBar.open('User updated successfully!', 'OK', { duration: 2000 });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async saveAccount() {
    const body = {
      ...this.formUpdatePass.value,
    };
    try {
      const res = await this.merchantService.updateInfo(this.storeUserId, body);
      if (res) {
        this.formUpdatePass.controls.password.patchValue('');
        this.snackBar.open('User updated successfully!', 'OK', { duration: 2000 });
      }
    } catch (e) {
      console.log(e);
    }
  }

  savePreferences() {
    console.log('Preferences Saved', this.preferences);
  }

  setTheme(theme: 'light' | 'dark') {
    this.preferences.theme = theme;
  }
}
