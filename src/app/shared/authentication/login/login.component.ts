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
  MoveRight = MoveRight;

  username = '';
  password = '';
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
    this.isLoading = true;
    this.authService
      .login(this.form.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('_t', res.token);
          localStorage.setItem('store_id', res.user.store._id);
        },
      });
  }
}
