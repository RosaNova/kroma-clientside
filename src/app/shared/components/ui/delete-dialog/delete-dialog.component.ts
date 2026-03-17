import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule  , Trash2 } from "lucide-angular";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-delete-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
  animations: [
    trigger('overlayAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('dialogAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-36px)' }),
        animate(
          '200ms cubic-bezier(0.2, 0, 0, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '160ms ease-in',
          style({ opacity: 0, transform: 'translateY(-12px)' }),
        ),
      ]),
    ]),
  ],
})
export class DeleteDialog {
  Trash2 = Trash2;
@Input() open = false;          // control dialog open/close
  @Input() name = '';             // item name to delete

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  close() {
    this.cancel.emit();
  }

  delete() {
    this.confirm.emit();
  }
}
