import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from '@/app/core/services/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = '/api/admins';
  constructor(
    private requestService: requestService,
    private userStateService: UserStateService,
  ) {}

  // private roleToPath(role: string) {
  //   if (!role) return '/api/auth';
  //   const r = role.toUpperCase();

  //   switch (r) {
  //     case 'MERCHANT':
  //       return '/api/merchants';
  //     case 'SUPER-ADMIN':
  //       return '/api/users';
  //     default:
  //       return '/api/users';
  //   }
  // }

  login(data: any, role: string = 'super-admin') {
    return this.requestService.postJSON(`${this.path}/login`, data);
  }
}
