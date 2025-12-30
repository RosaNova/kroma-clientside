import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';

@Component({
  selector: 'app-merchant',
  imports: [Dashboard,RouterOutlet],
  templateUrl: './merchant.html',
  styleUrl: './merchant.css',
})
export class Merchant {
  
}
