import {Component, effect} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from 'src/app/core/services/cart.service';
import {AccountService} from '../../../api/services/account.service';
import {Order} from '../../../api/models/order';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {switchMap} from 'rxjs/operators';
import {AlertService} from '../../../core/services/alert.service';
import {PaymentParam} from '../../../api/models/payment-param';


@Component({
    selector: 'app-checkout4',
    templateUrl: './checkout4.component.html',
    styleUrls: ['./checkout4.component.scss']
})

export class Checkout4Component {

  order: Order = {} as Order;

  constructor(private route: ActivatedRoute, private router: Router, private checkoutService: CheckoutService,
              private accountService: AccountService, private cartService: CartService, private alertService: AlertService) {
    effect(() => {
      this.order = this.checkoutService.getOrder();
    });
  }


  payBy(type: string) {
    this.accountService.createOrder({body: this.order})
      .pipe(
        switchMap((order: Order) => {
            this.cartService.clearCart();
            this.checkoutService.setOrder(order);
            return this.accountService.payment$Response({id: order.id, body: {type: type} as PaymentParam});
          }
        )).subscribe(
      resp => {
        if (resp.status === 200) {
          this.alertService.showAlert({type: 'success', msg: 'Order ' + this.order.documentNo + ' is generated'});
          this.router.navigate(['/checkout/checkout5']);
        }
      }
    );

  }
}
