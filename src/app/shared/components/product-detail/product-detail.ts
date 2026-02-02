import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRow } from '../ui/detail-row/detail-row';
import { FileText, LucideAngularModule } from 'lucide-angular';
import { Location } from '@angular/common';
import {
  Tag,
  Layers,
  PackageIcon,
  Percent,
  ArrowLeft
} from 'lucide-angular';


@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, DetailRow, LucideAngularModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  @Input() onBack?: () => void;
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  constructor(private location: Location) { }

  Tag = Tag;
  Layers = Layers;
  Package = PackageIcon;
  Percent = Percent;
  ArrowLeft = ArrowLeft;
  FileText = FileText;

  product = {
    name: 'ប្រហុកខ្មែរត្បាសាន',
    price: '20000 រៀល',
    category: 'ត្រីប្រែទេស',
    stock: 50,
    discount: '10%',
    description:
      'ស្នាប់រូបភ្នែក្តីវារស្វប់ជង់ជ្រោយដីងលាលាបទម្លាប់ម្តងមួយពេសស្នាការនន្តុខណេលា មីញ្ញាលម្បាការម្តាជោជយម៉ំងយាមាវាតិការជួរត្រូតក្ដែងម្កីក៏មិកម្មាយម្រល់ពា។',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
  };

  handleBack() {
    this.location.back();
  }

}
