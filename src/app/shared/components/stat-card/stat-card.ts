import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { KhmerNumberPipe } from '@/app/pipes/khmer-number.pipe';

export type ChangeType = 'positive' | 'negative';
export type Variant = 'pink' | 'yellow' | 'green' | 'blue' | 'purple';

@Component({
  selector: 'app-stat-card',
  imports: [LucideAngularModule, CommonModule, KhmerNumberPipe],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: false }) change!: string;
  @Input({ required: false }) changeType!: ChangeType;
  @Input({ required: true }) icon!: any;
  @Input({ required: true }) variant!: Variant;
  @Input({ required: false }) khmerUnit?: string;

  variantStyles: Record<Variant, any> = {
    pink: {
      bg: 'bg-stat-pink-light',
      iconBg: 'bg-stat-pink',
      text: 'text-stat-pink',
    },
    yellow: {
      bg: 'bg-stat-yellow-light',
      iconBg: 'bg-stat-yellow',
      text: 'text-stat-yellow',
    },
    green: {
      bg: 'bg-stat-green-light',
      iconBg: 'bg-stat-green',
      text: 'text-stat-green',
    },
    blue: {
      bg: 'bg-stat-blue-light',
      iconBg: 'bg-stat-blue',
      text: 'text-stat-blue',
    },
    purple: {
      bg: 'bg-green-300',
      iconBg: 'bg-green-600',
      text: 'text-green-700',
    }
  };

  get styles() {
    return this.variantStyles[this.variant];
  }

  get isPositive() {
    return this.changeType === 'positive';
  }
}
