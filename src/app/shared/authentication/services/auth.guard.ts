import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  private hasRequiredRole(currentRole: string, allowedRoles?: any): boolean {
    if (!allowedRoles) return true; // no role restriction
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return roles.map((r: string) => r.toString().toUpperCase()).includes(currentRole.toUpperCase());
  }

  private checkRolesAndToken(allowedRoles?: any): boolean {
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    // Allow server-side rendering to proceed without client-only token checks.
    // Only enforce token/role checks when running in the browser.
    if (!isBrowser) {
      return true;
    }

    const token = window.localStorage.getItem('token');
    const role = (window.localStorage.getItem('role') || '').toString();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.hasRequiredRole(role, allowedRoles)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const allowedRoles = next.data?.['roles'];
    return this.checkRolesAndToken(allowedRoles);
  }

  canLoad(route: Route, _segments: UrlSegment[]): boolean {
    const allowedRoles = route.data?.['roles'];
    return this.checkRolesAndToken(allowedRoles);
  }
}
