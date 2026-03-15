import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  path: string = '/api/dashboard';
  constructor(private requestService: requestService) { }
  getOverallStats() {
    return lastValueFrom(
      this.requestService.getJSON(`${this.path}/overAllStatsForAdmin`, { isLoading: true }),
    );
  }
  getEachStoreProducts() {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/each-store-product`, { isLoading: true }))
  }
}
