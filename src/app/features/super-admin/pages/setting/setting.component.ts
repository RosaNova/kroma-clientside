import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideAngularModule,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Settings,
  Moon,
  Sun,
  Globe,
  Bell,
  LogOut,
  Camera,
  Key,
  Database,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-angular';
import { UserService } from '@/app/features/super-admin/pages/users/service/user-service';
import { requestService } from '@/app/services/request-service';
import { SuperAdminAccountType} from '@/app/core/models/super-admin.types';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class Setting implements OnInit {
  activeTab: string = 'profile';
  settingsForm!: FormGroup;
  passwordForm!: FormGroup;

  user?: SuperAdminAccountType ;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private requestService: requestService
  ) { }

  ngOnInit() {
    this.initForms();

    // Fetch super-admin account and update settings form
    this.requestService.getJSON('/api/super-admins').subscribe({
      next: (res) => {
        if (res && Array.isArray(res.list) && res.list.length > 0) {
          const acct: SuperAdminAccountType = res.list[0];
          this.user = {
            id: acct.id?.toString() ,
            fullname: acct.fullname ,
            email: acct.email,
            phone: acct.phone,
            role: acct.role ,
            profile_url: acct.profile_url,
            joinDate:acct.createdAt
          } as any;

          // update form values
          if (this.settingsForm) {
            this.settingsForm.patchValue({
              name: this.user?.fullname,
              email: this.user?.email,
              phone: this.user?.phone,
            });
          }
        }
      },
      error: () => {
        // keep defaults on error
      }
    });
  }

  private initForms() {
    this.settingsForm = this.fb.group({
      name: [this.user?.fullname, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone],
      language: ['km'],
      darkMode: [false],
      notifications: [true]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  async updateProfile() {
    if (this.settingsForm.valid) {
      console.log('Updating profile...', this.settingsForm.value);
      // Logic to call userService.updateUser would go here
    }
  }

  async changePassword() {
    if (this.passwordForm.valid) {
      console.log('Changing password...', this.passwordForm.value);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user = { ...this.user, profile_url: e.target.result } as any;
      };
      reader.readAsDataURL(file);
    }
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }


  User = User
  Mail = Mail
  Phone = Phone
  ShieldCheck = ShieldCheck
  Settings = Settings
  Moon = Moon
  Sun = Sun
  Globe = Globe
  Bell = Bell
  LogOut = LogOut
  Camera = Camera
  Key = Key
  Database = Database
  History = History
  CheckCircle2 = CheckCircle2
  AlertCircle = AlertCircle

}
