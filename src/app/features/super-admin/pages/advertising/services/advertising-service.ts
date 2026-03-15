import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdvertisingService {
  path: string = '/api/advertisings';
  constructor(private requestService: requestService) { }
  create(data: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, { data, isLoading: true }));
  }
  getMany() {
    return lastValueFrom(this.requestService.getJSON(this.path, { isLoading: true }));
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, { data, isLoading: true }));
  }
  updateImage(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-img/${id}`, { data, isLoading: true }));
  }
  delete(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`, { isLoading: true }));
  }
}
