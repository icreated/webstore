import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {CommonService} from '../../../api/services/common.service';
import {Shipper} from '../../../api/models/shipper';

@Component({
    selector: 'app-checkout3',
    templateUrl: './checkout3.component.html',
    styleUrls: ['./checkout3.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout3Component {
    private router = inject(Router);
    private commonService = inject(CommonService);
    private checkoutService = inject(CheckoutService);

    shippers = toSignal(this.commonService.getShippers(), { initialValue: [] as Shipper[] });

    validate(shipper: Shipper) {
        this.checkoutService.setOrder({...this.checkoutService.order(), shipper});
        this.router.navigate(['/checkout/checkout4']);
    }
}
