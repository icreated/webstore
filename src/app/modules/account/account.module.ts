import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {OrderComponent} from './orders/order.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {UserPasswordComponent} from './user-password/user-password.component';
import {accountRoutes} from './accountRoutes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {AddressComponent} from './address/address.component';
import {AddAddressComponent} from './address/add-address.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, accountRoutes], // , AccountRoutes
    declarations: [AccountComponent, OrdersComponent, OrderComponent, AddressComponent, AddAddressComponent,
        UserInformationComponent, UserPasswordComponent]
})

export class AccountModule { }
