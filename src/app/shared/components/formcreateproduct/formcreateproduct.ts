import { Component } from '@angular/core';
import {
  Upload,
  ChevronRight,
  Package,
  DollarSign,
  ListTree,
  Hash,
  Tag,
  FileText,
  LucideAngularModule,
} from 'lucide-angular';
import { DropZoneComponent } from '../ui/drop-zone-component/drop-zone-component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-formcreateproduct',
  imports: [LucideAngularModule, DropZoneComponent, ReactiveFormsModule],
  templateUrl: './formcreateproduct.html',
  styleUrl: './formcreateproduct.css',
})
export class Formcreateproduct {
  upload = Upload;
  ChevronRight = ChevronRight;
  Package = Package;
  DollarSign = DollarSign;
  ListTree = ListTree;
  Hash = Hash;
  Tag = Tag;
  FileText = FileText;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    qty: new FormControl(''),
    isActive: new FormControl(''),
    discount: new FormControl(''),
    store: new FormControl(''),
  });
  handleFiles(files: File[]) {
    console.log(files);
  }
  onCreateProduct() {
    console.log(this.form.value);
  }
}
