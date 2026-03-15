import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  path: string = '/api/admins';
  constructor(private requestService: requestService) {}
  getUsers() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/display`, { isLoading: true }));
  }
  createUser(data: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, { data, isLoading: true }));
  }
  getUserById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  updateUser(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchJSON(`${this.path}/update-info/${id}`, { data, isLoading: true }),
    );
  }
  updateProfile(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-profile/${id}`, {
        data,
        isLoading: true,
      }),
    );
  }
  deleteUser(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  searchUser(data: any) {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/search`, { data, isLoading: true }),
    );
  }
  changePassword(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchJSON(`${this.path}/update-password/${id}`, {
        data,
        isLoading: true,
      }),
    );
  }
  getOverall() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/overall`, { isLoading: true }));
  }
}
