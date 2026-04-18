import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
    { path: 'catalog/:categoryId', loadComponent: () => import('./modules/catalog/catalog.component').then(m => m.CatalogComponent) },
    { path: 'catalog/search', loadComponent: () => import('./modules/catalog/catalog.component').then(m => m.CatalogComponent) },
    { path: 'cart', loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent) },
    { path: 'signup', loadComponent: () => import('./modules/signup/signup.component').then(m => m.SignupComponent) },
    { path: 'checkout', loadChildren: () => import('./modules/checkout/checkoutRoutes').then(m => m.CHECKOUT_ROUTES) },
    { path: 'account', loadChildren: () => import('./modules/account/accountRoutes').then(m => m.ACCOUNT_ROUTES) },
];
