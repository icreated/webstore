import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderComponent} from './order/order.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {UserPasswordComponent} from './user-password/user-password.component';
import {AddressesComponent} from './addresses/addresses.component';
import {UpsertAddressComponent} from './upsert-address/upsert-address.component';
import {ModuleWithProviders} from '@angular/core';
import {AuthGuard} from 'src/app/core/guards/auth-guard';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: '/account/menu', pathMatch: 'full', canActivate: [AuthGuard]},
            {path: 'menu', component: AccountComponent, canActivate: [AuthGuard]},
            {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
            {path: 'order/:id', component: OrderComponent, canActivate: [AuthGuard]},
            {path: 'addresses', component: AddressesComponent, canActivate: [AuthGuard]},
            {path: 'upsert-address/:id', component: UpsertAddressComponent, canActivate: [AuthGuard]},
            {path: 'upsert-address', component: UpsertAddressComponent, canActivate: [AuthGuard]},
            {path: 'information', component: UserInformationComponent, canActivate: [AuthGuard]},
            {path: 'password', component: UserPasswordComponent, canActivate: [AuthGuard]},
            {path: '**', redirectTo: '/account/menu', pathMatch: 'full'}
        ]
    }
];

export const accountRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(ACCOUNT_ROUTES);


