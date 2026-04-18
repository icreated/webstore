import { NgModule } from '@angular/core';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { DocStatusFormat } from '@shared/pipes/docstatus-format';
import { AddressComponent } from '@shared/components/address/address.component';
import { FormAddressComponent } from '@shared/components/form-address/form-address.component';

const SHARED = [ControlMessagesComponent, AlertComponent, DocStatusFormat, AddressComponent, FormAddressComponent];

@NgModule({
    imports: SHARED,
    exports: SHARED,
})
export class SharedModule {}
