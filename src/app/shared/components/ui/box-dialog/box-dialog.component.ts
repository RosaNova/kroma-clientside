import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-box-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './box-dialog.component.html',
})
export class BoxDialogComponent implements OnChanges {
    @Input() title: string = 'Add';
    @Input() open: boolean = false;
    @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
    @Output() close = new EventEmitter<void>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['open'] && this.dialog) {
            if (this.open) {
                this.dialog.nativeElement.showModal();
            } else {
                this.dialog.nativeElement.close();
            }
        }
    }

    openModal() {
        this.open = true;
        this.dialog.nativeElement.showModal();
    }

    closeModal() {
        this.open = false;
        this.dialog.nativeElement.close();
        this.close.emit();
    }
}
