import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { finalize } from 'rxjs';
import { MoveRight, LucideAngularModule, Eye, EyeOff, AlertCircle } from 'lucide-angular';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { UserStateService } from '@/app/core/services/user-state.service';
import { SuperAdminAccountType } from '@/app/core/models/super-admin.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('errorAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ]),
    trigger('shake', [
      transition('* => error', [
        animate('400ms cubic-bezier(.36,.07,.19,.97)', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-4px)', offset: 0.2 }),
          style({ transform: 'translateX(4px)', offset: 0.4 }),
          style({ transform: 'translateX(-4px)', offset: 0.6 }),
          style({ transform: 'translateX(4px)', offset: 0.8 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class Login {
  MoveRight = MoveRight;
  Eye = Eye;
  EyeOff = EyeOff;
  AlertCircle = AlertCircle;

  currentYear = new Date().getFullYear();
  isLoading = false;
  isSuccess = false;
  showPassword = false;
  errorMessage = '';
  shakeState = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStateService: UserStateService,
  ) {
    // Reset success/loading only when typing
    this.form.valueChanges.subscribe(() => {
      this.isSuccess = false;
      this.shakeState = '';
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit() {
    this.form.markAllAsTouched();
    this.errorMessage = ''; // Clear previous global error before re-submit

    if (this.form.invalid) {
      this.errorMessage = 'សូមបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ!';
      this.shakeState = 'error';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.isSuccess = false;
    this.shakeState = '';

    const payload = { email: this.form.value.email, password: this.form.value.password };
    this.authService
      .login(payload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          this.isSuccess = true;
          setTimeout(() => this.handleLoginSuccess(res), 800);
        },
        error: (err: any) => {
          console.error('Login failed', err);
          this.isLoading = false;
          this.shakeState = 'error';

          const rawMessage = err.error?.message || '';

          // Map to Khmer and set error message
          if (rawMessage.toLowerCase().includes('password')) {
            this.errorMessage = 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!';
          } else if (
            rawMessage.toLowerCase().includes('user') ||
            rawMessage.toLowerCase().includes('email') ||
            rawMessage.toLowerCase().includes('found')
          ) {
            this.errorMessage = 'រកមិនឃើញគណនីនេះទេ!';
          } else {
            this.errorMessage = rawMessage || 'ឈ្មោះគណនី ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ!';
          }
        },
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private handleLoginSuccess(res: any) {
    const user = res.user;
    const token = res.token || '';

    // Normalize role string: e.g., "super-admin" -> "SUPER_ADMIN"
    let normalizedRole = (user.role).toString().toUpperCase().replace(/-/g, '_');

    // Store essential data in localStorage
    if (user.fullname || user.username) {
      localStorage.setItem('fullname', user.fullname || user.username);
    }
    if (user.profile_url) {
      localStorage.setItem('profile_url', user.profile_url);
    }
    if (token) {
      localStorage.setItem('token', token);
    }

    // Map backend response to SuperAdminAccountType for centralized state
    const userProfile: SuperAdminAccountType = {
      id: user.id || user._id || '',
      fullname: user.fullname || user.username || '',
      email: user.email || this.form.value.email || '',
      phone: user.phone || '',
      role: normalizedRole,
      profile_url: user.profile_url || '',
      createdAt: user.createdAt || new Date().toISOString()
    };

    // Set centralized user state
    this.userStateService.setUser(userProfile);

    // Keep individual keys for compatibility with AuthGuard and other components
    localStorage.setItem('email', userProfile.email);
    localStorage.setItem('userId', userProfile.id.toString());
    localStorage.setItem('role', userProfile.role);

    // Role-based navigation
    if (userProfile.role === 'SUPER_ADMIN') {
      this.router.navigate(['/super-admin']);
    } else if (userProfile.role === 'MERCHANT') {
      this.router.navigate(['/merchant']);
    } else {
      console.warn('Unknown role:', userProfile.role);
      this.router.navigate(['/login']);
    }
  }
}
