import { requestService } from '@/app/services/request-service';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  path: string = '/api/mobile-users';
  constructor(private requestService: requestService) {}
  getMany() {
    return lastValueFrom(this.requestService.getJSON(this.path));
  }
  search(data: any) {
    return lastValueFrom(this.requestService.getJSON(`${this.path}/search`, { q: data }));
  }
}
