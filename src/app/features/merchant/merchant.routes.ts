import { Routes } from '@angular/router';

export const MERCHANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./merchant')
        .then(m => m.Merchant),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(c => c.Dashboard)
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product/product')
            .then(c => c.Product)
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/setting/setting')
            .then(c => c.Setting)
      }
    ]
  }
];
