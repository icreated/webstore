import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ControlMessagesComponent} from './components/control-messages/control-messages.component';
import {AlertComponent} from './components/alert/alert.component';
import {DocStatusFormat} from './pipes/docstatus-format';
import { AddressComponent } from './components/address/address.component';
import { FormAddressComponent } from './components/form-address/form-address.component';

@NgModule({ declarations: [
        ControlMessagesComponent, AlertComponent, DocStatusFormat, AddressComponent, FormAddressComponent
    ],
    exports: [
        ControlMessagesComponent, AlertComponent, DocStatusFormat, AddressComponent, FormAddressComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {
}
