import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Camera, Save, User, Lock, Mail, Phone, MapPin, Calendar,
  Bell, Globe, Moon, Sun, Shield, Smartphone, Eye, EyeOff,
  Languages, Check,
  LucideAngularModule
} from 'lucide-angular';


@Component({
  selector: 'app-setting',
  imports: [CommonModule, FormsModule , LucideAngularModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
Camera = Camera;
 Save = Save;
  User = User;
   Lock = Lock ;
   Mail = Mail;
    Phone = Phone;
    MapPin = MapPin;
    Calendar = Calendar;
  Bell = Bell;
   Globe = Globe;
     Moon = Moon;
    Sun =  Shield;
    Smartphone = Smartphone;
     Eye = Eye;
    EyeOff = EyeOff;
  Languages = Languages ;
   Check = Check;
  


  profileData = {
    firstName: 'សុខ',
    lastName: 'ដារ៉ា',
    dateOfBirth: '20/05/2025',
    phone: '099 888 777',
    address: 'រាជធានីភ្នំពេញ, កម្ពុជា'
  };

  accountData = {
    email: 'abc.2333@gmail.com',
    oldPassword: '',
    newPassword: ''
  };

  showOldPassword = false;
  showNewPassword = false;

  preferences = {
    language: 'km',
    theme: 'dark',
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    twoFactorAuth: false
  };

  saveProfile() {
    console.log('Profile Saved', this.profileData);
  }

  saveAccount() {
    console.log('Account Saved', this.accountData, this.preferences.twoFactorAuth);
  }

  savePreferences() {
    console.log('Preferences Saved', this.preferences);
  }

  setTheme(theme: 'light' | 'dark') {
    this.preferences.theme = theme;
  }
}
