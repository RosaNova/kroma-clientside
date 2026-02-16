import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/users/users').then((c) => c.Users),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/users-form/users-form').then((c) => c.UsersForm),
  },
];
