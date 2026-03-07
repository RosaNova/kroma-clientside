import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  path: string = '/api/products';
  categoryPath: string = '/api/categories';
  constructor(private requestService: requestService) {}

  getProducts(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path, data));
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`));
  }
  getGroupedProduct(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path + '/grouped'));
  }
  getCategories() {
    return lastValueFrom(this.requestService.getJSON(this.categoryPath));
  }
  createProducts(data: any) {
    return this.requestService.postFormData(this.path, data);
  }
  createProductCategory(data: any) {
    return lastValueFrom(this.requestService.postJSON(this.categoryPath, data));
  }
  updateProductCategory(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.categoryPath}/${id}`, data));
  }
  deleteProductCategory(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.categoryPath}/${id}`));
  }
  updateProductInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, data));
  }
  updateProductImage(id: string, data: any) {
    return this.requestService.patchFormData(`${this.path}/update-image/${id}`, data);
  }
  deleteProduct(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`));
  }
  searchProduct(data: any, categoryId: string) {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/search`, { q: data, category: categoryId }),
    );
  }
  searchProductCategory(data: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.categoryPath}/search`, { q: data }));
  }
}
