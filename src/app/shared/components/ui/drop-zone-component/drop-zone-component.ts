import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload } from 'lucide-angular';

@Component({
  standalone : true,
  selector: 'app-drop-zone-component',
  imports: [ LucideAngularModule],
  templateUrl: './drop-zone-component.html',
  styleUrl: './drop-zone-component.css',
})
export class DropZoneComponent {
  /** Max file size (default 1GB) */
  @Input() maxSize = 1024 * 1024 * 1024;

  /** Emit selected files */
  @Output() filesAdded = new EventEmitter<File[]>();

  /** Drag state (Angular Signals) */
  isDragOver = signal(false);

  /** Icon */
  readonly UploadIcon = Upload;

  /* ---------------- Drag Events ---------------- */

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (!event.dataTransfer?.files) return;

    const files = Array.from(event.dataTransfer.files);
    this.filesAdded.emit(files);
  }

  /* ---------------- File Input ---------------- */

  onFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    this.filesAdded.emit(files);
  }

  /* ---------------- Utils ---------------- */

  formatSize(bytes: number): string {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(0)} GB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  }
}
