import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CheckoutService } from '@core/services/checkout.service';
import { Address } from '@api/models/address';
import { AccountService } from '@api/services/account.service';
import { AddressComponent } from '@shared/components/address/address.component';
import { FormAddressComponent } from '@shared/components/form-address/form-address.component';

@Component({
    selector: 'app-checkout1',
    templateUrl: './checkout1.component.html',
    styleUrls: ['./checkout1.component.scss'],
    standalone: true,
    imports: [AddressComponent, FormAddressComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout1Component implements OnInit {
    private readonly router = inject(Router);
    private readonly accountService = inject(AccountService);
    private readonly checkoutService = inject(CheckoutService);

    addresses = toSignal(this.accountService.getAddresses(), { initialValue: [] as Address[] });
    actions = [{ label: 'Validate', icon: 'fa-truck', buttonClass: 'btn-success' }];
    newAddressAction = { label: 'Create Delivery Address', icon: 'fa-plus', buttonClass: 'btn-primary' };

    ngOnInit() {
        this.checkoutService.clear();
    }

    validateAddress(address: Address) {
        this.checkoutService.setOrder({ ...this.checkoutService.order(), shipAddress: address });
        this.router.navigate(['/checkout/checkout2']);
    }
}
