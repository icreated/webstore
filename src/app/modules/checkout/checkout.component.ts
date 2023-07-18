import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Address} from '../../api/models/address';
import {AccountService} from '../../api/services/account.service';
import {PriceListProduct} from '../../api/models/price-list-product';
import {Order} from '../../api/models/order';
import {CartService} from '../../core/services/cart.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {

    disabled = true;
    currentUrl = '/checkout/checkout1';
    order: Order = {} as Order;

    constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService,
        private authService: AuthService, private checkoutService: CheckoutService, private cartService: CartService) {

      effect(() => {
          this.order = this.checkoutService.getOrder();
      });
    }

    ngOnInit(): void {
      this.order.grandTotal = this.cartService.getTotalPrice();
    }

    routeIsActive(routePath: string) {
        if (routePath === '/checkout/checkout5' && this.router.url.startsWith('/checkout/checkout5')) {
            return true;
        } else {
            return this.router.url === routePath;
        }
    }


}
