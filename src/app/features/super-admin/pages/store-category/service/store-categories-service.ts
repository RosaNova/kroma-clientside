import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreCategoriesService {
  path: string = '/api/store-categories';
  constructor(private requestService: requestService) {}
  getStoreCategories(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path, data));
  }
  createStoreCategories(data?: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, data));
  }
  deleteStoreCategories(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, data));
  }
  updateImage(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-image/${id}`, data),
    );
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`));
  }
  search(data?: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/search`, { q: data }));
  }
}
