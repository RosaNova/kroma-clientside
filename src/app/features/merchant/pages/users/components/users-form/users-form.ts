import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  Upload,
  ChevronRight,
  Package,
  LucideAngularModule,
  User,
  Mail,
  KeyRound,
} from 'lucide-angular';
import { ProductService } from '../../../product/services/product-service';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone-component/drop-zone-component';
import { CommonModule } from '@angular/common';
import { UserRole } from '../../models/user-role';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-users-form',
  imports: [LucideAngularModule, DropZoneComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './users-form.html',
  styleUrl: './users-form.css',
})
export class UsersForm {
  upload = Upload;
  ChevronRight = ChevronRight;
  Package = Package;
  User = User;
  Mail = Mail;
  KeyRound = KeyRound;
  uploadFiles: any;
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    profile: new FormControl(''),
    role: new FormControl(UserRole.shopOwner),
  });
  constructor(private userService: UserService) {}
  handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  async onCreateProduct() {
    try {
      const body = {
        ...this.form.value,
        profile: this.uploadFiles,
      };
      await this.userService.createUser(body);
    } catch (e) {
      console.log(e);
    }
  }
}
