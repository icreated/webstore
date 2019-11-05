import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule'},
  { path: 'catalog/:categoryId', loadChildren: './modules/catalog/catalog.module#CatalogModule'},
  { path: 'catalog/search', loadChildren: './modules/catalog/catalog.module#CatalogModule'},
  { path: 'cart', loadChildren: './modules/cart/cart.module#CartModule'},
  { path: 'signup', loadChildren: './modules/signup/signup.module#SignupModule'},
  { path: 'checkout',   loadChildren: './modules/checkout/checkout.module#CheckoutModule' },
  { path: 'account',   loadChildren: './modules/account/account.module#AccountModule' },
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
export class AppRoutingModule {}