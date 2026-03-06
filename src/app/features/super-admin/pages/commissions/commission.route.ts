import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/commissions/commissions').then((c) => c.Commissions),
  },
];
