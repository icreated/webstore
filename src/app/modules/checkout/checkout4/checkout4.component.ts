import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { AccountService } from '@api/services/account.service';
import { Order } from '@api/models/order';
import { CheckoutService } from '@core/services/checkout.service';
import { map, switchMap } from 'rxjs/operators';
import { AlertService } from '@core/services/alert.service';
import { PaymentParam } from '@api/models/payment-param';

@Component({
    selector: 'app-checkout4',
    templateUrl: './checkout4.component.html',
    styleUrls: ['./checkout4.component.scss'],
    standalone: true,
    imports: [CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout4Component {

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly checkoutService = inject(CheckoutService);
    private readonly accountService = inject(AccountService);
    private readonly cartService = inject(CartService);
    private readonly alertService = inject(AlertService);

    readonly order = this.checkoutService.order;

    payBy(type: string) {
        this.accountService.createOrder({ body: this.order() }).pipe(
            switchMap((order: Order) => {
                this.cartService.clearCart();
                this.checkoutService.setOrder(order);
                return this.accountService.payment$Response({ id: order.id, body: { type } as PaymentParam }).pipe(
                    switchMap(resp => this.accountService.getOrder({ id: order.id }).pipe(
                        map((updated: Order) => ({ resp, updated }))
                    ))
                );
            })
        ).subscribe(({ resp, updated }) => {
            if (resp.status === 200) {
                this.checkoutService.setOrder(updated);
                this.alertService.showAlert({ type: 'success', msg: 'Order ' + this.order().documentNo + ' is generated' });
                this.router.navigate(['/checkout/checkout5']);
            }
        });
    }
}
