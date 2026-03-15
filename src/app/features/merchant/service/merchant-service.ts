import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  path: string = '/api/admins';
  constructor(private requestService: requestService) { }
  getUserDetail() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/get-detail`, { isLoading: true }));
  }
  updateInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, { data, isLoading: true }));
  }
  updateProfile(id: string, data: any) {
    return lastValueFrom(
      this.requestService.patchFormData(`${this.path}/update-profile/${id}`, { data, isLoading: true }),
    );
  }
  updatePassword(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-password/${id}`, { data, isLoading: true }));
  }
  getOrder(data?: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/order-info`, { data, isLoading: true }));
  }
  getOrderDetail(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/order-detail/${id}`, { isLoading: true }));
  }
  deleteOrder(id: string) {
    const path = '/api/orders';
    return lastValueFrom(this.requestService.deleteJSON(`${path}/${id}`, { isLoading: true }));
  }
}
