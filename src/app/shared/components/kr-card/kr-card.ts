import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'kr-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kr-card.html',
  styleUrls: ['./kr-card.css'],
})
export class KrCard {
  @Input({ required: true }) image!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) category!: string;
  @Input({ required: true }) price!: string;
  @Input({ required: true }) stock!: number;

  get stockClass(): string {
    if (this.stock > 10) {
      return 'bg-stat-green-light text-stat-green';
    }
    if (this.stock > 0) {
      return 'bg-stat-yellow-light text-stat-yellow';
    }
    return 'bg-destructive/10 text-destructive';
  }

  get stockLabel(): string {
    return this.stock > 0 ? `${this.stock} នៅសល់` : 'អស់ស្តុក';
  }
}
