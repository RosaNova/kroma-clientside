import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  path: string = '/api/stores';
  constructor(private requestService: requestService) {}
  getMany() {
    return lastValueFrom(this.requestService.getJSON(this.path));
  }
  getDetail(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/detail-admin/${id}`));
  }
  create(data: any) {
    return lastValueFrom(this.requestService.postFormData(this.path, data));
  }
  delete(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`));
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, data));
  }
  updateImage(id: string, data: any) {
    return lastValueFrom(this.requestService.patchFormData(`${this.path}/update-img/${id}`, data));
  }
  getCommissions() {
    const path = '/api/admins';
    return lastValueFrom(this.requestService.getJSON(`${path}/commissions`));
  }
  updateCommissions(id: string, data: any) {
    const path = '/api/admins';
    return lastValueFrom(this.requestService.patchJSON(`${path}/update-commissions/${id}`, data));
  }
}
