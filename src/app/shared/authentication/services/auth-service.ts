import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserStateService } from '@/app/core/services/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestService: requestService, private userStateService: UserStateService) { }

  private roleToPath(role: string) {
    if (!role) return '/api/users';
    const r = role.toUpperCase();

    switch (r) {
      case 'MERCHANT':
        return '/api/merchants';
      case 'SUPER-ADMIN':
        return '/api/users';
      default:
        return '/api/users';
    }
  }

  login(data: any, role: string = 'super-admin') {
    const base = this.roleToPath(role);
    return this.requestService.postJSON(`${base}/login`, data);
  }

}
