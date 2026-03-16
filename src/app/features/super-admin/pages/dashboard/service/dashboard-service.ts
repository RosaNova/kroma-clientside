import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  path: string = '/api/dashboard';
  constructor(private requestService: requestService) {}
  getOverallStats() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/overAllStatsForAdmin`, { isLoading: true }),
    );
  }
  getEachStoreProducts() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/each-store-product`, { isLoading: true }),
    );
  }
  getHighIncomeMerchant(isShowAll: any = false) {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/highIncomeAdmin`, {
        data: { showAll: isShowAll },
        isLoading: true,
      }),
    );
  }
  getEachCategoryProducts() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/each-category-product`, { isLoading: true }),
    );
  }
  getRecentOrders() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/getRecentOrders`, { isLoading: true }),
    );
  }
  getOverAllForMerchantStatCard() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/overAllStatsForMerchant`, { isLoading: true }),
    );
  }
}
