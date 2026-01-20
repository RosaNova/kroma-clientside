import { Component } from '@angular/core';
import { Upload, ChevronRight, Package, DollarSign, ListTree, Hash, Tag, FileText, LucideAngularModule } from "lucide-angular"
import { DropZoneComponent } from '../ui/drop-zone-component/drop-zone-component';
@Component({
  standalone : true,
  selector: 'app-formcreateproduct',
  imports: [LucideAngularModule , DropZoneComponent],
  templateUrl: './formcreateproduct.html',
  styleUrl: './formcreateproduct.css',
})
export class Formcreateproduct {
  upload = Upload;
  ChevronRight = ChevronRight;
   Package =  Package;
   DollarSign = DollarSign;
   ListTree = ListTree;
   Hash = Hash;
   Tag = Tag;
   FileText = FileText;

   handleFiles(files: File[]) {
  console.log(files);
}

}
