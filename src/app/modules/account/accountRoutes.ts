import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderComponent} from './order/order.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {UserPasswordComponent} from './user-password/user-password.component';
import {AddressComponent} from './address/address.component';
import {AddAddressComponent} from './address/add-address.component';
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
            {path: 'addresses', component: AddressComponent, canActivate: [AuthGuard]},
            {path: 'new-address/:id', component: AddAddressComponent, canActivate: [AuthGuard]},
            {path: 'new-address', component: AddAddressComponent, canActivate: [AuthGuard]},
            {path: 'information', component: UserInformationComponent, canActivate: [AuthGuard]},
            {path: 'password', component: UserPasswordComponent, canActivate: [AuthGuard]},
            {path: '**', redirectTo: '/account/menu', pathMatch: 'full'}
        ]
    }
];

export const accountRoutes: ModuleWithProviders<RouterModule> = RouterModule.forChild(ACCOUNT_ROUTES);


