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
}
