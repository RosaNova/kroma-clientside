import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { finalize } from 'rxjs';
import { MoveRight, LucideAngularModule } from 'lucide-angular';
import { UserRole } from '@/app/features/super-admin/enum/user-role.enum';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  MoveRight = MoveRight;

  currentYear = new Date().getFullYear();
  isLoading = false;
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const payload = { email: this.form.value.email, password: this.form.value.password };

    this.authService
      .login(payload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => this.handleLoginSuccess(res),
        error: (err: any) => console.error('Login failed', err),
      });
  }

  private handleLoginSuccess(res: any) {
    if (res?.token) localStorage.setItem('token', res.token);
    const rawRole = res.user?.role || res.role || res.data?.role || '';
    const normalizedRole = rawRole.toString().replace(/-/g, '_').toUpperCase();
    localStorage.setItem('role', normalizedRole);
    if (normalizedRole === 'SUPER_ADMIN') {
      this.router.navigate(['/super-admin']);
    } else {
      this.router.navigate(['/merchant']);
    }
  }
}
