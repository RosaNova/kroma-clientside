import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/advertisings/advertisings').then((c) => c.Advertisings),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/advertising-detail/advertising-detail').then((c) => c.AdvertisingDetail),
  },
];
