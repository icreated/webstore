import { Routes } from '@angular/router';
import { CheckoutGuard } from '@core/guards/checkout-guard';
import { AuthGuard } from '@core/guards/auth-guard';

export const CHECKOUT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./checkout.component').then(m => m.CheckoutComponent),
        children: [
            { path: '', loadComponent: () => import('./checkout1/checkout1.component').then(m => m.Checkout1Component) },
            { path: 'checkout1', loadComponent: () => import('./checkout1/checkout1.component').then(m => m.Checkout1Component), canActivate: [AuthGuard, CheckoutGuard] },
            { path: 'checkout2', loadComponent: () => import('./checkout2/checkout2.component').then(m => m.Checkout2Component), canActivate: [AuthGuard, CheckoutGuard] },
            { path: 'checkout3', loadComponent: () => import('./checkout3/checkout3.component').then(m => m.Checkout3Component), canActivate: [AuthGuard, CheckoutGuard] },
            { path: 'checkout4', loadComponent: () => import('./checkout4/checkout4.component').then(m => m.Checkout4Component), canActivate: [AuthGuard, CheckoutGuard] },
            { path: 'checkout5', loadComponent: () => import('./checkout5/checkout5.component').then(m => m.Checkout5Component), canActivate: [CheckoutGuard] },
            { path: '**', redirectTo: '/checkout/checkout1', pathMatch: 'full' }
        ]
    }
];
