import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Camera, Save, User, Lock, Mail, Phone, MapPin, Calendar,
  Bell, Globe, Moon, Shield, Smartphone, Eye, EyeOff, Sun,
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
    Shield =  Shield;
    Smartphone = Smartphone;
     Eye = Eye;
    EyeOff = EyeOff;
  Languages = Languages ;
   Check = Check;
 Sun = Sun;


  profileData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    address: ''
  };

  accountData = {
    email: '',
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
