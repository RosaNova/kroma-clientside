import { Routes } from '@angular/router';
export const MERCHANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./merchant').then((m) => m.Merchant),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'product',
        loadComponent: () => import('./pages/product/product').then((c) => c.Product),
      },
      {
        path: 'product/seemoreProduct/:id',
        loadComponent: () =>
          import('./pages/product/see-all-product-category/see-all-product-category').then(
            (c) => c.SeeAllProductCategory,
          ),
      },
      {
        path: 'product/addproduct',
        loadComponent: () =>
          import('./pages/product/create-product/create-product').then((c) => c.CreateProduct),
      },
      {
        path: 'product/productcategory',
        loadComponent: () =>
          import('./pages/product/product-category/product-category').then(
            (c) => c.ProductCategory,
          ),
      },
      {
        path: 'product/productdetail',
        loadComponent: () =>
          import('../../shared/components/product-detail/product-detail').then(
            (c) => c.ProductDetail,
          ),
      },
      {
        path: 'product/productoutstock',
        loadComponent: () =>
          import('../../features/merchant/pages/product/product-outstock/product-outstock').then(
            (c) => c.ProductOutstock,
          ),
      },
      {
        path: 'product/productdiscount',
        loadComponent: () =>
          import('../../features/merchant/pages/product/product-discount-curpon/product-discount-curpon').then(
            (c) => c.ProductDiscountCurpon,
          ),
      },
      {
        path: 'product/discountform',
        loadComponent: () =>
          import('../merchant/pages/product/form-discount/form-discount').then(
            (c) => c.FormDiscount,
          ),
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/orders/orders').then((c) => c.Orders),
      },
      {
        path: 'report',
        loadComponent: () => import('./pages/report/report').then((c) => c.Report),
      },
      {
        path: 'feedback',
        loadComponent: () => import('./pages/feedback/feedback').then((c) => c.Feedback),
      },
      {
        path: 'setting',
        loadComponent: () => import('./pages/setting/setting').then((c) => c.Setting),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.route').then((r) => r.routes),
      },
    ],
  },
];
