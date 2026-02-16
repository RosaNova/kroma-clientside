import { Routes } from '@angular/router';
export const MERCHANT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./merchant.component').then((m) => m.Merchant),
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
        path: 'product',
        loadComponent: () => import('./pages/product/product.component').then((c) => c.Product),
      },
      {
        path: 'product/seemoreProduct/:id',
        loadComponent: () =>
          import('./pages/product/see-all-product-category/see-all-product-category.component').then(
            (c) => c.SeeAllProductCategory,
          ),
      },
      {
        path: 'product/addproduct',
        loadComponent: () =>
          import('./pages/product/create-product/create-product.component').then(
            (c) => c.CreateProduct,
          ),
      },
      {
        path: 'product/productcategory',
        loadComponent: () =>
          import('./pages/product/product-category/product-category.component').then(
            (c) => c.ProductCategory,
          ),
      },
      {
        path: 'product/productdetail',
        loadComponent: () =>
          import('../../shared/components/product-detail/product-detail.component').then(
            (c) => c.ProductDetail,
          ),
      },
      {
        path: 'product/productoutstock',
        loadComponent: () =>
          import('../../features/merchant/pages/product/product-outstock/product-outstock.component').then(
            (c) => c.ProductOutstock,
          ),
      },
      {
        path: 'product/productdiscount',
        loadComponent: () =>
          import('../../features/merchant/pages/product/product-discount-coupon/product-discount-coupon.component').then(
            (c) => c.ProductDiscountCouponComponent,
          ),
      },
      {
        path: 'product/discountform',
        loadComponent: () =>
          import('../merchant/pages/product/form-discount/form-discount.component').then(
            (c) => c.FormDiscount,
          ),
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/orders/orders.component').then((c) => c.Orders),
      },
      {
        path: 'report',
        loadComponent: () => import('./pages/report/report.component').then((c) => c.Report),
      },
      {
        path: 'feedback',
        loadComponent: () => import('./pages/feedback/feedback.component').then((c) => c.Feedback),
      },
      {
        path: 'setting',
        loadComponent: () => import('./pages/setting/setting.component').then((c) => c.Setting),
      },
    ],
  },
];
