import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/authentication/login/login')
        .then(c => c.Login)
  },

  {
    path: 'merchant',
    loadChildren: () =>
      import('./features/merchant/merchant.routes')
        .then(m => m.MERCHANT_ROUTES),
    data: { roles: ['MERCHANT'] }
  },

  {
    path: 'superadmin',
    loadChildren: () =>
      import('./features/super-admin/super-admin.routes')
        .then(m => m.SUPER_ADMIN_ROUTES),
    data: { roles: ['SUPER_ADMIN'] }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
