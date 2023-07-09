import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from './account.component';
import {OrderComponent} from './order/order.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {UserPasswordComponent} from './user-password/user-password.component';
import {accountRoutes} from './accountRoutes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import {AddressesComponent} from './addresses/addresses.component';
import {UpsertAddressComponent} from './upsert-address/upsert-address.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, accountRoutes], // , AccountRoutes
    declarations: [AccountComponent, OrdersComponent, OrderComponent, AddressesComponent, UpsertAddressComponent,
        UserInformationComponent, UserPasswordComponent]
})

export class AccountModule { }
