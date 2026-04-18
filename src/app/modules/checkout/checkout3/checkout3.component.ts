import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { CheckoutService } from '@core/services/checkout.service';
import { CommonService } from '@api/services/common.service';
import { Shipper } from '@api/models/shipper';

@Component({
    selector: 'app-checkout3',
    templateUrl: './checkout3.component.html',
    styleUrls: ['./checkout3.component.scss'],
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout3Component {
    private readonly router = inject(Router);
    private readonly commonService = inject(CommonService);
    private readonly checkoutService = inject(CheckoutService);

    shippers = toSignal(this.commonService.getShippers(), { initialValue: [] as Shipper[] });

    validate(shipper: Shipper) {
        this.checkoutService.setOrder({ ...this.checkoutService.order(), shipper });
        this.router.navigate(['/checkout/checkout4']);
    }
}
