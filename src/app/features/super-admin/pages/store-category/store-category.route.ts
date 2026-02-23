import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/store-categories/store-categories').then((c) => c.StoreCategories),
  },
];
