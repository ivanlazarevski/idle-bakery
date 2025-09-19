import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/pastries', pathMatch: 'full' },
  {
    title: 'Idle Bakery',
    path: 'pastries',
    loadComponent: () => import('@pastries/components/shop-page/shop-page').then(c => c.ShopPage)
  }
];
