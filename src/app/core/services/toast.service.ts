import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    id: number;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toasts$ = new BehaviorSubject<Toast[]>([]);
    toasts = this.toasts$.asObservable();
    private nextId = 0;

    show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
        const id = this.nextId++;
        const toast: Toast = { message, type, id };
        this.toasts$.next([...this.toasts$.value, toast]);

        setTimeout(() => {
            this.remove(id);
        }, 3000);
    }

    success(message: string) {
        this.show(message, 'success');
    }

    error(message: string) {
        this.show(message, 'error');
    }

    remove(id: number) {
        this.toasts$.next(this.toasts$.value.filter((t) => t.id !== id));
    }
}
