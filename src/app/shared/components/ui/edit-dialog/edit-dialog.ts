import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-edit-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './edit-dialog.html',
})
export class EditDialogComponent {
    @Input() title: string = 'Edit';
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
