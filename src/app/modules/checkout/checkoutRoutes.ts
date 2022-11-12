import {Checkout2Component} from './checkout2/checkout2.component';
import {Checkout1Component} from './checkout1/checkout1.component';
import {RouterModule, Routes} from '@angular/router';
import {Checkout3Component} from './checkout3/checkout3.component';
import {Checkout4Component} from './checkout4/checkout4.component';
import {Checkout5Component} from './checkout5/checkout5.component';
import {CheckoutComponent} from './checkout.component';
import {ModuleWithProviders} from '@angular/core';
import {CheckoutGuard} from 'src/app/core/guards/checkout-guard';
import {AuthGuard} from 'src/app/core/guards/auth-guard';


export const CHECKOUT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: CheckoutComponent,
        children: [
            {path: '', component: Checkout1Component},
            {path: 'checkout1', component: Checkout1Component, canActivate: [AuthGuard, CheckoutGuard]},
            {path: 'checkout2', component: Checkout2Component, canActivate: [AuthGuard, CheckoutGuard]},
            {path: 'checkout3', component: Checkout3Component, canActivate: [AuthGuard, CheckoutGuard]},
            {path: 'checkout4', component: Checkout4Component, canActivate: [AuthGuard, CheckoutGuard]}, // , canDeactivate: [CanDeactiva..
            {path: 'checkout4i/:orderId', component: Checkout4Component, canActivate: [AuthGuard, CheckoutGuard]},
            {path: 'checkout5/:id', component: Checkout5Component, canActivate: [CheckoutGuard]},
            {path: '**', redirectTo: '/checkout/checkout1', pathMatch: 'full'}
        ]
    }
];

export const checkoutRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(CHECKOUT_ROUTES);

