import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/users/users.component').then((c) => c.Users),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/users-form/users-form.component').then((c) => c.UsersForm),
  },
];
