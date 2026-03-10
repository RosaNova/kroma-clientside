import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private activeRequests = new BehaviorSubject<number>(0);

    isLoading$: Observable<boolean> = this.activeRequests.asObservable().pipe(
        map(count => count > 0)
    );

    show() {
        this.activeRequests.next(this.activeRequests.value + 1);
    }

    hide() {
        this.activeRequests.next(Math.max(0, this.activeRequests.value - 1));
    }

    reset() {
        this.activeRequests.next(0);
    }
}
