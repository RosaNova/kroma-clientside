import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  path: string = '/api/products';
  constructor(private requestService: requestService) {}

  getProducts(data?: any) {
    return this.requestService.getJSON(this.path, { data });
  }
  createProducts(data: any) {
    return this.requestService.postJSON(this.path, data);
  }
  uploadFile(data: File) {
    return this.requestService.postFile(this.path, { image: data });
  }
}
