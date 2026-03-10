import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);
  const allowedRoles = route?.data?.['roles'];
  const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  // When running on the server (SSR) we should not block routing — allow rendering to proceed.
  if (!isBrowser) {
    return true;
  }

  const token = window.localStorage.getItem('token');
  const role = (window.localStorage.getItem('role') || '').toString();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const hasRole = roles
      .map((r: string) => r.toString().toUpperCase())
      .includes(role.toUpperCase());
    if (!hasRole) {
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
