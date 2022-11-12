import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ControlMessagesComponent} from './components/control-messages/control-messages.component';
import {AlertComponent} from './components/alert/alert.component';
import {DocStatusFormat} from './pipes/docstatus-format';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        ControlMessagesComponent, AlertComponent, DocStatusFormat
    ],
    exports: [
        ControlMessagesComponent, AlertComponent, DocStatusFormat
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
