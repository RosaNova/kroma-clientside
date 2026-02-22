import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-users').then((c) => c.AdminUsers),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./admin-users-detail/admin-users-detail').then((c) => c.AdminUsersDetail),
  },
];
