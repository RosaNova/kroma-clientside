import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/authentication/login/login.component').then((c) => c.Login),
  },

  {
    path: 'merchant',
    loadChildren: () =>
      import('./features/merchant/merchant.routes').then((m) => m.MERCHANT_ROUTES),
    data: { roles: ['MERCHANT'] },
  },

  {
    path: 'super-admin',
    loadChildren: () =>
      import('./features/super-admin/super-admin.routes').then((m) => m.SUPER_ADMIN_ROUTES),
    data: { roles: ['SUPER_ADMIN'] },
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
