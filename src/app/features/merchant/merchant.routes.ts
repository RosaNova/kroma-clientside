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
        path: 'product/addproduct',
        loadComponent: () =>
          import('./pages/product/create-product/create-product')
            .then(c => c.CreateProduct)
      },
       {
        path: 'product/productcategory',
        loadComponent: () =>
          import('./pages/product/product-category/product-category')
            .then(c => c.ProductCategory)
      },
       {
         path :'product/productdetail',
         loadComponent : ()=> import('../../shared/components/product-detail/product-detail')
          .then(c => c.ProductDetail)
       },
       {
          path : 'product/productoutstock',
          loadComponent : ()=> import('../../features/merchant/pages/product/product-outstock/product-outstock')
          .then(c => c.ProductOutstock)
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
