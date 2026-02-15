import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  currentYear = new Date().getFullYear();
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('role', res.role);
      },
    });
  }
}
