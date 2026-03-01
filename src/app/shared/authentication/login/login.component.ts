import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { finalize } from 'rxjs';
import { MoveRight, LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  MoveRight = MoveRight

  currentYear = new Date().getFullYear();
  isLoading = false;
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.authService
      .login(this.form.value, 'MERCHANT')
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          if (res?.token) localStorage.setItem('token', res.token);
          const roleFromRes = res.role || res.user.role || res.data.role;
          const roleToStore = roleFromRes || 'MERCHANT';
          localStorage.setItem('role', roleToStore);
          if (roleToStore === 'SUPER_ADMIN' || roleToStore === 'super-admin') {
            this.router.navigate(['/super-admin']);
          } else {
            this.router.navigate(['/merchant']);
          }
        },
        error: (err) => {
          console.error('Login error', err);
        }
      });
  }
}
