import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = '/api/admin-users';
  constructor(private requestService: requestService) {}
  login(data: any) {
    return this.requestService.postJSON(this.path + '/login', data);
  }
}
