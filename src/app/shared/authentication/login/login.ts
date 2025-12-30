import { Component } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  currentYear = new Date().getFullYear();
  constructor(private router: Router) {}
  onSubmit() {
    if (!this.username || !this.password) return;

    // TODO: replace with real auth API
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('role', 'MERCHANT');

    this.router.navigate(['/merchant']);
  }
}
