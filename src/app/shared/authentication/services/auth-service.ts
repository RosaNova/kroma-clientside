import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestService: requestService) {}

  private roleToPath(role: string) {
    if (!role) return '/api/admin-users';
    const r = role.toUpperCase();
    switch (r) {
      case 'MERCHANT':
        return '/api/merchants';
      case 'SUPER_ADMIN':
        return '/api/admin-users';
      default:
        return '/api/admin-users';
    }
  }

  login(data: any, role : string) {
    const base = this.roleToPath(role);
    return this.requestService.postJSON(`${base}/login`, data);
  }

  register(data: any, role: string) {
    const base = this.roleToPath(role);
    return this.requestService.postJSON(`${base}/register`, data);
  }
}
