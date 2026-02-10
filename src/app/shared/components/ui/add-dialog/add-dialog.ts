import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-add-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './add-dialog.html',
})
export class AddDialogComponent {
    @Input() title: string = 'Add';
    @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
    @Output() close = new EventEmitter<void>();

    openModal() {
        this.dialog.nativeElement.showModal();
    }

    closeModal() {
        this.dialog.nativeElement.close();
        this.close.emit();
    }
}
