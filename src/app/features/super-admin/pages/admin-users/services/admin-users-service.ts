import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  path: string = '/api/admin-users';
  constructor(private requestService: requestService) {}
  getUsers() {
    return lastValueFrom(this.requestService.getJSON(this.path));
  }
  createUser(data: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, data));
  }
  getUserById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`));
  }
  updateUser(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, data));
  }
  updateProfile(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-profile/${id}`, data),
    );
  }
  deleteUser(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`));
  }
  searchUser(data: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/search`, { q: data }));
  }
}
