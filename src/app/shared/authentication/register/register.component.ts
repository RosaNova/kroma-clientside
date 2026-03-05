import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class Register {
  isLoading = false;
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('MERCHANT'),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const role = this.form.get('role')?.value || 'MERCHANT';
    this.authService
      .register(this.form.value, role)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          if (res?.token) localStorage.setItem('token', res.token);
          localStorage.setItem('role', role || res?.role || 'MERCHANT');
          if ((role || res?.role) === 'SUPER_ADMIN') {
            this.router.navigate(['/super-admin']);
          } else {
            this.router.navigate(['/merchant']);
          }
        },
        error: (err) => console.error('Register error', err),
      });
  }
}

