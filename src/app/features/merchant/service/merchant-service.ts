import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  path: string = '/api/merchants';
  constructor(private requestService: requestService) {}
  getUserDetail() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/get-detail`));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, data));
  }
  updateProfile(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-profile/${id}`, data),
    );
  }
  getOrder(data?: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/order-info`, data));
  }
  getOrderDetail(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/order-detail/${id}`));
  }
  deleteOrder(id: string) {
    const path = '/api/orders';
    return lastValueFrom(this.requestService.deleteJSON(`${path}/${id}`));
  }
}
