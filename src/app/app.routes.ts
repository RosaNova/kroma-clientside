import { Routes } from '@angular/router';
import { AuthGuard } from './shared/authentication/services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/authentication/login/login.component')
        .then(c => c.Login)
  },
  {
    path: 'merchant',
    loadChildren: () =>
      import('./features/merchant/merchant.routes')
        .then(m => m.MERCHANT_ROUTES),
    data: { roles: ['MERCHANT'] },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },

  {
    path: 'super-admin',
    loadChildren: () =>
      import('./features/super-admin/super-admin.routes')
        .then(m => m.SUPER_ADMIN_ROUTES),
    data: { roles: ['SUPER_ADMIN'] },
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
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
