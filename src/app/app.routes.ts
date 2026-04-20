import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { CatalogService } from '@api/services/catalog.service';

const redirectToFirstCategory = () => {
    const router = inject(Router);
    return inject(CatalogService).getCategories().pipe(
        map(categories => categories.length > 0
            ? router.createUrlTree(['/catalog', categories[0].id])
            : router.createUrlTree(['/home'])
        )
    );
};

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
    { path: 'catalog', canActivate: [redirectToFirstCategory] },
    { path: 'catalog/search', loadComponent: () => import('./modules/catalog/catalog.component').then(m => m.CatalogComponent) },
    { path: 'catalog/:categoryId', loadComponent: () => import('./modules/catalog/catalog.component').then(m => m.CatalogComponent) },
    { path: 'cart', loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent) },
    { path: 'signup', loadComponent: () => import('./modules/signup/signup.component').then(m => m.SignupComponent) },
    { path: 'checkout', loadChildren: () => import('./modules/checkout/checkoutRoutes').then(m => m.CHECKOUT_ROUTES) },
    { path: 'account', loadChildren: () => import('./modules/account/accountRoutes').then(m => m.ACCOUNT_ROUTES) },
];
