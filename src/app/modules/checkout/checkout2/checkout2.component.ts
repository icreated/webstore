import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';

@Component({
    selector: 'app-checkout2',
    templateUrl: './checkout2.component.html',
    styleUrls: ['./checkout2.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout2Component {
    private router = inject(Router);
    private accountService = inject(AccountService);
    private checkoutService = inject(CheckoutService);

    addresses = toSignal(this.accountService.getAddresses(), { initialValue: [] as Address[] });
    actions = [{ label: 'Validate', icon: 'fa-bank', buttonClass: 'btn-success' }];
    newAddressAction = { label: 'Create Invoice Address', icon: 'fa-plus', buttonClass: 'btn-primary' };

    validateAddress(address: Address): void {
        this.checkoutService.setOrder({...this.checkoutService.order(), billAddress: address});
        this.router.navigate(['/checkout/checkout3']);
    }
}
