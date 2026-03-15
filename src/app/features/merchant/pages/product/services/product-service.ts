import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  path: string = '/api/products';
  categoryPath: string = '/api/categories';
  constructor(private requestService: requestService) { }

  getProducts(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path, { data, isLoading: true }));
  }
  getById(id: string) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  getGroupedProduct(data?: any) {
    return lastValueFrom(this.requestService.getJSON(this.path + '/grouped', { isLoading: true }));
  }
  getCategories() {
    return lastValueFrom(this.requestService.getJSON(this.categoryPath, { isLoading: true }));
  }
  createProducts(data: any) {
    return this.requestService.postFormData(this.path, { data, isLoading: true });
  }
  createProductCategory(data: any) {
    return lastValueFrom(this.requestService.postJSON(this.categoryPath, { data, isLoading: true }));
  }
  updateProductCategory(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.categoryPath}/${id}`, { data, isLoading: true }));
  }
  deleteProductCategory(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.categoryPath}/${id}`, { isLoading: true }));
  }
  updateProductInfo(id: string, data: any) {
    return lastValueFrom(this.requestService.patchJSON(`${this.path}/update-info/${id}`, { data, isLoading: true }));
  }
  updateProductImage(id: string, data: any) {
    return this.requestService.patchFormData(`${this.path}/update-image/${id}`, { data, isLoading: true });
  }
  deleteProduct(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  searchProduct(data: any, categoryId: string) {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/search`, { data: { q: data, category: categoryId }, isLoading: true }),
    );
  }
  searchProductCategory(data: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.categoryPath}/search`, { data, isLoading: true }));
  }
}
