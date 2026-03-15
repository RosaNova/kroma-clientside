import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreCategoriesService {
  path: string = '/api/store-categories';
  constructor(private requestService: requestService) { }
  getStoreCategories(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path, { data, isLoading: true }));
  }
  createStoreCategories(data?: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, { data, isLoading: true }));
  }
  deleteStoreCategories(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchJSON(`${this.path}/update-info/${id}`, { data, isLoading: true }),
    );
  }
  updateImage(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-image/${id}`, {
        data,
        isLoading: true,
      }),
    );
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  search(data?: any) {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/search`, { data, isLoading: true }),
    );
  }
  getOverAllData() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/overall`, { isLoading: true }));
  }
  getOverallForDashboard() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/overall-dashboard`, { isLoading: true }),
    );
  }
}
