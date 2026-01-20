import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
    standalone: true,
  selector: 'app-detail-row',
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center gap-4 text-gray-600">
      <lucide-angular
        [img]="icon"
        class="lucide h-5 w-5 text-gray-600">
      </lucide-angular>

      <span class="text-muted-foreground font-medium min-w-30">
        {{ label }} :
      </span>

      <span class="text-foreground" [ngClass]="valueClass">
        {{ value }}
      </span>
    </div>
  `,
  styleUrl: './detail-row.css',
})
export class DetailRow {
   @Input() icon!: LucideIconData; 
  @Input() label!: string;
  @Input() value!: string;
  @Input() valueClass = '';
}
