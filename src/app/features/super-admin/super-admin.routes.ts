import { Routes } from '@angular/router';
export const SUPER_ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./super-admin.component').then((m) => m.SuperAdmin),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((c) => c.Dashboard),
      },
      {
        path: 'stores',
        loadComponent: () =>
          import('./pages/merchant/merchant.component').then((c) => c.MerchantComponent),
      },
      {
        path: 'product-category',
        loadComponent: () =>
          import('./pages/merchant/product-category/product-category').then(
            (c) => c.ProductCategoryComponent,
          ),
      },
      {
        path: 'report',
        loadComponent: () => import('./pages/report/report.component').then((c) => c.Report),
      },
      {
        path: 'feedback',
        loadComponent: () => import('./pages/feedback/feedback').then((c) => c.Feedback),
      },
      {
        path: 'store-category',
        loadChildren: () =>
          import('./pages/store-category/store-category.route').then((r) => r.routes),
      },
      // {
      //   path: 'backup-information',
      //   loadComponent: () =>
      //     import('./pages/backup-information/backup-information.component').then(
      //       (c) => c.BackupInformation,
      //     ),
      // },
      {
        path: 'setting',
        loadComponent: () => import('./pages/setting/setting.component').then((c) => c.Setting),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes').then((r) => r.routes),
      },
      {
        path: 'merchant',
        loadChildren: () => import('./pages/admin-users/admin-users.route').then((r) => r.routes),
      },
      {
        path: 'commission',
        loadChildren: () => import('./pages/commissions/commission.route').then((r) => r.routes),
      },
      {
        path: 'advertising',
        loadChildren: () => import('./pages/advertising/advertising.route').then((r) => r.routes),
      },
    ],
  },
];
