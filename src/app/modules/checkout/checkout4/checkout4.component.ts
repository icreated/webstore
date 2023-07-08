import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/index';
import {DialogService} from 'src/app/core/services/dialog.service';
import {CartService} from 'src/app/core/services/cart.service';
import {fromPromise} from 'rxjs/internal-compatibility';
import {PriceListProduct} from '../../../api/models/price-list-product';
import {AccountService} from '../../../api/services/account.service';
import {Order} from '../../../api/models/order';
import {CheckoutService} from '../../../api/services/checkout.service';

@Component({
    selector: 'app-checkout4',
    templateUrl: './checkout4.component.html',
    styleUrls: ['./checkout4.component.scss']
})

export class Checkout4Component implements OnInit {

    order: Order = {} as Order;

    constructor(private route: ActivatedRoute, private router: Router, private checkoutService: CheckoutService,
        private accountService: AccountService, private cartService: CartService, private dialogService: DialogService) {
    }

    ngOnInit(): any {
    // getting order from account
        this.route.params.subscribe(params => {
            const id = +params['orderId'];
            if (id > 0) {
                this.accountService.getOrder({id})
                    .subscribe(
                        (data: Order) => {
                            this.order = data;
                            // TODO: SPOK check if this is correct
                            // this.checkoutService.order = data;
                            // this.checkoutService.shipAddress = data.shipAddress;
                            // this.checkoutService.billAddress = data.billAddress;
                            // this.checkoutService.shipper = data.shipper;
                            //
                            // // synchronize cart with order!
                            // this.cartService.clearCart();
                            // this.order.lines.forEach((item: PriceListProduct, index: number) => {
                            //     this.cartService.getCart().push(item);
                            //     this.cartService.synchronize(item);
                            // });
                        });
            }
        });

        // TODO: SPOK check if this is correct
        // this.checkoutService.orderSource.subscribe(
        //     order => {
        //         this.order = order;
        //     });
    }

    payByCheck() {
        // TODO: SPOK check if this is correct
        // this.checkoutService.payment('check', this.order.id).subscribe(
        //     resp => {
        //         if (resp.status === 200) {
        //             this.router.navigate(['/checkout/checkout5', this.order.id]);
        //         }
        //     });
    }

    payByTransfer() {
        // TODO: SPOK check if this is correct
        // this.checkoutService.payment('debit', this.order.id).subscribe(
        //     resp => {
        //         if (resp.status === 200) {
        //             this.router.navigate(['/checkout/checkout5', this.order.id]);
        //         }
        //     });

    }


    canDeactivate(): Observable<boolean> | boolean {
        const p = this.dialogService.confirm('Do you want to void the order?');
        const o = fromPromise(p);
        // TODO: SPOK check if this is correct
        // o.subscribe(
        // onOK => {
        //     if (onOK) {
        //         this.checkoutService.voidCurrentOrder();
        //     }
        // });
        return o;
    }

}
