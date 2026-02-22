import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Upload,
  ChevronRight,
  Package,
  LucideAngularModule,
  User,
  Mail,
  KeyRound,
  Phone,
} from 'lucide-angular';
import { DropZoneComponent } from '@/app/shared/components/ui/drop-zone/drop-zone.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [
    LucideAngularModule,
    DropZoneComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersForm {
  upload = Upload;
  ChevronRight = ChevronRight;
  Package = Package;
  User = User;
  Mail = Mail;
  KeyRound = KeyRound;
  Phone = Phone;
  uploadFiles: any;
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    profile: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(),
  });
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  handleFiles(files: File[]) {
    if (files!.length > 0) {
      for (let index = 0; index < files!.length; index++) {
        const file: File = files![index];
        this.uploadFiles = file;
      }
    }
  }
  async onCreateUser() {
    try {
      const body: any = {
        ...this.form.value,
      };
      if (this.uploadFiles) {
        body.profile = this.uploadFiles;
      }
      // const res = await this.userService.createUser(body);
      // if (res) {
      //   this._snackBar.open('User created successfully!', 'OK', { duration: 3000 });
      //   this.onBack();
      // }
    } catch (e) {
      console.log(e);
    }
  }
  onBack() {
    this.router.navigate(['/super-admin/users']);
  }
}
