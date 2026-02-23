import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-drop-zone',
  imports: [LucideAngularModule],
  templateUrl: './drop-zone.component.html',
  styleUrl: './drop-zone.component.css',
})
export class DropZoneComponent {
  showImage: boolean = false;
  selectedImage: string = '';
  /** Max file size (default 1GB) */
  @Input() maxSize = 1024 * 1024 * 1024;
  @Input() isImageUrl?: string;

  /** Emit selected files */
  @Output() filesAdded = new EventEmitter<File[]>();

  /** Drag state (Angular Signals) */
  isDragOver = signal(false);

  /** Icon */
  readonly UploadIcon = Upload;
  /* ---------------- Drag Events ---------------- */
  ngOnInit() {
    if (this.isImageUrl) {
      this.selectedImage = this.isImageUrl;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isImageUrl']?.currentValue) {
      this.selectedImage = changes['isImageUrl'].currentValue;
      this.showImage = true;
    }
  }
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
    if (files) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.showImage = true;
        this.selectedImage = URL.createObjectURL(file);
      }
    }
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
