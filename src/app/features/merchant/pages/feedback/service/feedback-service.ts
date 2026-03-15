import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  path: string = '/api/feedbacks';
  constructor(private requestService: requestService) { }
  getFeedbacks() {
    return lastValueFrom(this.requestService.getJSON(this.path, { isLoading: true }));
  }
  deleteFeedBack(id: string) {
    return lastValueFrom(this.requestService.deleteJSON(`${this.path}/${id}`, { isLoading: true }));
  }
  search(data: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/search`, { data, isLoading: true }));
  }
}
