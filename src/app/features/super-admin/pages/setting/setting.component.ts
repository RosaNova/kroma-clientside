import { Component, OnInit, inject } from '@angular/core';
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
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-angular';
import { requestService } from '@/app/services/request-service';
import { Router } from '@angular/router';
import { SuperAdminAccountType } from '@/app/core/models/super-admin.types';
import { LoadingSpinner } from '@/app/shared/components/ui/loading-spinner/loading-spinner.component';
import { LoadingService } from '@/app/core/services/loading.service';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '@/app/core/services/toast.service';
import { UserStateService } from '@/app/core/services/user-state.service';
import { ToastComponent } from '@/app/shared/components/ui/toast/toast.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, LoadingSpinner, AsyncPipe, ToastComponent],
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class Setting implements OnInit {
  activeTab: string = 'profile';
  private loadingService = inject(LoadingService);
  private toastService = inject(ToastService);
  isLoading$ = this.loadingService.isLoading$;
  settingsForm!: FormGroup;
  passwordForm!: FormGroup;

  user!: SuperAdminAccountType;
  currentId: string | null = null; // Added to store the current user ID

  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private requestService: requestService,
    private router: Router,
    private userStateService: UserStateService, // Injected UserStateService
  ) { }

  ngOnInit() {
    this.initForms();

    const user = this.userStateService.currentUserValue;
    const isBrowser = typeof window !== 'undefined' && window.localStorage;
    const userId = user?.id || (isBrowser ? localStorage.getItem('userId') : null);

    if (userId) {
      this.currentId = userId.toString();
      this.fetchSuperAdmin(this.currentId); // Call a new method to fetch user data
    }
  }

  private fetchSuperAdmin(userId: string) {
    this.requestService.getJSON(`/api/admins/${userId}`).subscribe({
      next: (res: any) => {
        if (res) {
          // Handle inconsistent naming from backend
          const fullname = res.fullname || res.fullName || res.name || '';

          this.user = {
            id: (res.id || res._id || userId).toString(),
            fullname: fullname,
            email: res.email,
            phone: res.phone,
            role: res.role,
            profile_url: res.profile_url,
            joinDate: res.createdAt,
          } as any;

          // update form values
          if (this.settingsForm) {
            this.settingsForm.patchValue({
              fullname: this.user?.fullname,
              email: this.user?.email,
              phone: this.user?.phone,
            });
          }

          // Sync API data back to UserStateService
          this.userStateService.updateUser(this.user);
        }
      },
      error: (err) => {
        console.error('Failed to fetch user info', err);
      },
    });
  }

  private initForms() {
    this.settingsForm = this.fb.group({
      fullname: [this.user?.fullname || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || ''],
      profile_url: [this.user?.profile_url || ''],
      darkMode: [false],
      notifications: [true],
      twoFactor: [true],
    });

    // ( At least 8 characters, one uppercase, one lowercase, and one number )
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.pattern(passwordRegex)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async updateInformation() {
    if (this.settingsForm.valid && this.user) {
      const payload = {
        fullname: this.settingsForm.value.fullname,
        fullName: this.settingsForm.value.fullname, // Send both variants
        name: this.settingsForm.value.fullname,     // Send name variant too
        email: this.settingsForm.value.email,
        phone: this.settingsForm.value.phone,
      };

      this.requestService.patchJSON(`/api/admins/update-info/${this.user.id}`, payload).subscribe({
        next: (res) => {
          // this.requestService.clearCache();
          this.toastService.success('ព័ត៌មានត្រូវបានរក្សាទុកដោយជោគជ័យ');

          this.userStateService.updateUser({
            fullname: payload.fullname,
            email: payload.email,
            phone: payload.phone
          });

          const isBrowser = typeof window !== 'undefined' && window.localStorage;
          if (isBrowser && payload.email !== localStorage.getItem('email')) {
            localStorage.setItem('email', payload.email);
          }
        },
        error: (err) => {
          console.error('Update failed', err);
          this.toastService.error('ការកែប្រែព័ត៌មានបានបរាជ័យ៖ ' + (err.error?.message || 'សូមព្យាយាមម្តងទៀត'));
        },
      });
    }
  }

  async updatePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.toastService.error('សូមបំពេញព័ត៌មានសម្ងាត់ឱ្យបានគ្រប់គ្រាន់');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.toastService.error('លេខសម្ងាត់ថ្មី និងការបញ្ជាក់មិនដូចគ្នាទេ');
      return;
    }

    if (this.passwordForm.get('newPassword')?.errors?.['pattern']) {
      this.toastService.error('លេខសម្ងាត់ថ្មីមិនទាន់មានសុវត្ថិភាពគ្រប់គ្រាន់ទេ');
      return;
    }

    if (this.passwordForm.invalid || !this.user) return;

    const payload = {
      email: this.user.email,
      old_pass: currentPassword,
      new_pass: newPassword,
    };

    this.requestService.patchJSON('/api/admins/update-password', payload).subscribe({
      next: (res: any) => {
        this.toastService.success('ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ');
        this.passwordForm.reset();
        Object.keys(this.passwordForm.controls).forEach(key => {
          this.passwordForm.get(key)?.setErrors(null);
        });
      },
      error: (err) => {
        console.error('Password update failed', err);
        const errorMessage = err.error?.msg || err.error?.message || 'ការផ្លាស់ប្តូរពាក្យសម្ងាត់បានបរាជ័យ';

        let displayMessage = errorMessage;
        if (errorMessage.includes('Old password was not correct')) {
          displayMessage = 'ពាក្យសម្ងាត់ចាស់មិនត្រឹមត្រូវទេ';
        }

        this.toastService.error(displayMessage);
      }
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file);

    if (file && this.user) {
      this.requestService.patchFormData(`/api/admins/update-profile/${this.user.id}`, { profile: file }).subscribe({
        next: (res) => {
          this.requestService.clearCache();
          this.toastService.success('បានផ្លាស់ប្តូររូបភាពប្រវត្តិរូបដោយជោគជ័យ!');

          // Preview the image locally
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (this.user) {
              this.user.profile_url = e.target.result;
            }
          };
          reader.readAsDataURL(file);
        },
        error: (err) => {
          console.error('Profile update failed', err);
          this.toastService.error('ការផ្លាស់ប្តូររូបភាពបានបរាជ័យ');
        }
      });
    }
  }

  cancelInformation() {
    if (this.user && this.settingsForm) {
      this.settingsForm.patchValue({
        fullname: this.user.fullname,
        email: this.user.email,
        phone: this.user.phone,
        profile_url: this.user.profile_url
      });
      this.toastService.show('ព័ត៌មានត្រូវបានកំណត់ឡើងវិញ', 'info');
    }
  }

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }

  User = User;
  Mail = Mail;
  Phone = Phone;
  ShieldCheck = ShieldCheck;
  Settings = Settings;
  Moon = Moon;
  Sun = Sun;
  Globe = Globe;
  Bell = Bell;
  LogOut = LogOut;
  Camera = Camera;
  Key = Key;
  Database = Database;
  History = History;
  // CheckCircle2 = CheckCircle2;
  AlertCircle = AlertCircle;
  Eye = Eye;
  EyeOff = EyeOff;

  toggleTwoFactor() {
    const isEnabled = this.settingsForm.get('twoFactor')?.value;
    const status = isEnabled ? 'បើក' : 'បិទ';
    this.toastService.success(`ការផ្ទៀងផ្ទាត់ពីរជំហាន (2FA) ត្រូវបាន${status}ដោយជោគជ័យ`);
  }

  logout(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('userId');
      }
      this.router.navigate(['/login']);
    } catch (e) {
      console.error('Error clearing storage during logout', e);
    }
  }
}
