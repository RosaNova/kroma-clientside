import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  path: string = '/api/admin-users';
  constructor(private requestService: requestService) {}
  getUsers() {
    return lastValueFrom(this.requestService.getJSON(this.path));
  }
  createUser(data: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, data));
  }
}
