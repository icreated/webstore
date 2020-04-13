import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Checkout1Component} from './checkout1/checkout1.component';
import {Checkout2Component} from './checkout2/checkout2.component';
import {Checkout3Component} from './checkout3/checkout3.component';
import {Checkout4Component} from './checkout4/checkout4.component';
import {Checkout5Component} from './checkout5/checkout5.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {CheckoutRoutes} from "./checkout.routes";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule, 
        SharedModule, 
        CheckoutRoutes],
    declarations: [CheckoutComponent, 
        Checkout1Component, 
        Checkout2Component, 
        Checkout3Component, 
        Checkout4Component, 
        Checkout5Component]
})
export class CheckoutModule {
}
