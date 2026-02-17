import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import {
  LucideAngularModule,
  User,
  Camera,
  Phone,
  MapPin,
  Calendar,
  KeyRound,
} from 'lucide-angular';
import { UserService } from '../../service/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { adminUser } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './users-detail.html',
  styleUrl: './users-detail.css',
})
export class UsersDetail {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  User = User;
  Camera = Camera;
  Phone = Phone;
  MapPin = MapPin;
  Calendar = Calendar;
  KeyRound = KeyRound;
  img_url: string = '';
  id: string = '';
  uploadFiles?: File;
  selectedImage: string = '';
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    this.id = this.route?.snapshot.paramMap.get('id')!;
    this.getUserById(this.id);
  }
  async getUserById(id: string) {
    try {
      const res = await this.userService.getUserById(id);
      if (res) {
        this.img_url = res.profile_url;
        this.form.patchValue({
          username: res.username,
          email: res.email,
          role: res.role,
          phone: res.phone,
        });
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onSave() {
    try {
      const body: any = {
        ...this.form.value,
      };
      const res = await this.userService.updateUser(this.id, body);
      if (res) {
        this.router.navigate(['/super-admin/users']);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async onFileChange(event: Event) {
    try {
      const files = (event.target as HTMLInputElement).files;
      if (files!.length > 0) {
        for (let index = 0; index < files!.length; index++) {
          const file: File = files![index];
          this.uploadFiles = file;
          this.selectedImage = URL.createObjectURL(file);
        }
        const body = {
          profile: this.uploadFiles,
        };
        const res = await this.userService.updateProfile(this.id, body);
        if (res) {
          window.location.reload();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
