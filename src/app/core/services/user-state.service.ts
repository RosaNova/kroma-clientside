import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SuperAdminAccountType } from '@/app/core/models/super-admin.types';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    private platformId = inject(PLATFORM_ID);
    private currentUserSubject = new BehaviorSubject<SuperAdminAccountType | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        this.hydrate();
    }

    private hydrate() {
        if (isPlatformBrowser(this.platformId)) {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                try {
                    this.currentUserSubject.next(JSON.parse(storedUser));
                } catch (e) {
                    console.error('Error parsing stored user', e);
                    localStorage.removeItem('currentUser');
                }
            }
        }
    }

    setUser(user: SuperAdminAccountType) {
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    updateUser(updates: Partial<SuperAdminAccountType>) {
        const current = this.currentUserSubject.value;
        if (current) {
            const updated = { ...current, ...updates };
            this.setUser(updated);
        }
    }

    clearUser() {
        this.currentUserSubject.next(null);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        }
    }

    get currentUserValue(): SuperAdminAccountType | null {
        return this.currentUserSubject.value;
    }
}
