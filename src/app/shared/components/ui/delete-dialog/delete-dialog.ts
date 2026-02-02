import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule  , Trash2 } from "lucide-angular";

@Component({
  selector: 'app-delete-dialog',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css',
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
