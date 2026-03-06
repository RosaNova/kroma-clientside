import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  path: string = '/api/products';
  constructor(private requestService: requestService) {}

  getProducts(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path, data));
  }
  getGroupedProduct(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path + '/grouped'));
  }
  getCategories() {
    const path = '/api/categories';
    return lastValueFrom(this.requestService.getJSON(path));
  }
  createProducts(data: any) {
    return this.requestService.postFormData(this.path, data);
  }
  updateProductInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/${id}`, data));
  }
  updateProductImage(id: string, data: any) {
    return lastValueFrom(this.requestService.patchFormData(`${this.path}/${id}`, data));
  }
}
