import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = '/api/admins';
  constructor(private requestService: requestService) {}

  // private roleToPath(role: string) {
  //   if (!role) return '/api/admin-users';
  //   const r = role.toUpperCase();
  //   switch (r) {
  //     case 'MERCHANT':
  //       return '/api/merchants';
  //     case 'SUPER_ADMIN':
  //       return '/api/admin-users';
  //     default:
  //       return '/api/admin-users';
  //   }
  // }
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());

  user$ = this.userSubject.asObservable();

  private getUserFromStorage() {
    if (typeof window === 'undefined') return null;
    return {
      fullname: localStorage.getItem('fullName') ?? '',
      role: localStorage.getItem('role') ?? '',
      profile: localStorage.getItem('user_profile') || 'assets/images/default-profile.png',
    };
  }

  refreshUser() {
    this.userSubject.next(this.getUserFromStorage());
  }
  login(data: any) {
    // const base = this.roleToPath(role);
    return this.requestService.postJSON(`${this.path}/login`, data);
  }
  // register(data: any, role: string) {
  //   const base = this.roleToPath(role);
  //   return this.requestService.postJSON(`${base}/register`, data);
  // }
}
