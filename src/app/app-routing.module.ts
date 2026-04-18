import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)},
    {path: 'catalog/:categoryId', loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule)},
    {path: 'catalog/search', loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule)},
    {path: 'cart', loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent)},
    {path: 'signup', loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)},
    {path: 'checkout', loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)},
    {path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
