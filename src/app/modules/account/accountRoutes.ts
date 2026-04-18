import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth-guard';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: '/account/menu', pathMatch: 'full' },
            { path: 'menu', loadComponent: () => import('./account.component').then(m => m.AccountComponent), canActivate: [AuthGuard] },
            { path: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent), canActivate: [AuthGuard] },
            { path: 'order/:id', loadComponent: () => import('./order/order.component').then(m => m.OrderComponent), canActivate: [AuthGuard] },
            { path: 'addresses', loadComponent: () => import('./addresses/addresses.component').then(m => m.AddressesComponent), canActivate: [AuthGuard] },
            { path: 'upsert-address/:id', loadComponent: () => import('./upsert-address/upsert-address.component').then(m => m.UpsertAddressComponent), canActivate: [AuthGuard] },
            { path: 'upsert-address', loadComponent: () => import('./upsert-address/upsert-address.component').then(m => m.UpsertAddressComponent), canActivate: [AuthGuard] },
            { path: 'information', loadComponent: () => import('./user-information/user-information.component').then(m => m.UserInformationComponent), canActivate: [AuthGuard] },
            { path: 'password', loadComponent: () => import('./user-password/user-password.component').then(m => m.UserPasswordComponent), canActivate: [AuthGuard] },
            { path: '**', redirectTo: '/account/menu', pathMatch: 'full' }
        ]
    }
];
