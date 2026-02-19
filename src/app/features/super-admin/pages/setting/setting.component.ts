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

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class Setting implements OnInit {
  activeTab: string = 'profile';
  settingsForm!: FormGroup;
  passwordForm!: FormGroup;

  user = {
    id: 'admin-1',
    name: 'សុខ វណ្ណា',
    email: 'vanna.sokh@krama.com',
    phone: '012 345 678',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    joinDate: new Date('2024-01-15')
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForms();
  }

  private initForms() {
    this.settingsForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone],
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
        this.user.avatar = e.target.result;
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
