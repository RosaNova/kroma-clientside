import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@/app/core/services/toast.service';
import { LucideAngularModule, CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-angular';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
      <div
        *ngFor="let toast of toasts$ | async"
        [@toastAnimation]
        [ngClass]="getToastClass(toast.type)"
        class="flex items-center gap-3 p-4 rounded-xl shadow-lg border pointer-events-auto min-w-[300px]"
      >
        <div [ngClass]="getIconClass(toast.type)">
          <lucide-angular [img]="getIcon(toast.type)" class="w-5 h-5"></lucide-angular>
        </div>
        
        <p class="text-sm font-medium text-gray-800 flex-1">{{ toast.message }}</p>
        
        <button (click)="remove(toast.id)" class="text-gray-400 hover:text-gray-600 transition-colors">
          <lucide-angular [img]="X" class="w-4 h-4"></lucide-angular>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts$ = this.toastService.toasts;

  X = X;

  getToastClass(type: string) {
    const base = 'bg-white/80 backdrop-blur-md';
    switch (type) {
      case 'success': return `${base} border-emerald-100`;
      case 'error': return `${base} border-red-100`;
      case 'warning': return `${base} border-amber-100`;
      default: return `${base} border-blue-100`;
    }
  }

  getIconClass(type: string) {
    switch (type) {
      case 'success': return 'text-emerald-500';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      default: return 'text-blue-500';
    }
  }

  getIcon(type: string) {
    switch (type) {
      case 'success': return CheckCircle2;
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  }

  remove(id: number) {
    this.toastService.remove(id);
  }
}
