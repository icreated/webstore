import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/index';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {Order} from 'src/app/shared/models/order';
import {DialogService} from 'src/app/core/services/dialog.service';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-checkout4',
  templateUrl: './checkout4.component.html',
  styleUrls: ['./checkout4.component.scss']
})

export class Checkout4Component implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute, private router: Router, private checkoutService: CheckoutService,
              private privateService: PrivateService, private cartService: CartService, private dialogService: DialogService) {
  }

  ngOnInit(): any {
    // getting order from account
    this.route.params.subscribe(params => {
      const id = +params['orderId'];
      if (id > 0) {
        this.privateService.getOrder(id)
          .subscribe(
            (data: Order) => {
              this.order = data;
              this.checkoutService.order = data;
              this.checkoutService.shipAddress = data.shipAddress;
              this.checkoutService.billAddress = data.billAddress;
              this.checkoutService.shipper = data.shipper;

              // synchronize cart with order!
              this.cartService.clearCart();
              this.order.lines.forEach((item: PriceListProduct, index: number) => {
                this.cartService.getCart().push(item);
                this.cartService.synchronize(item);
              });
            });
      }
    });

    this.checkoutService.orderSource.subscribe(
      order => {
        this.order = order;
      });
  }

  payByCheck() {
    this.privateService.payment('check', this.order.id).subscribe(
      resp => {
        if (resp.status === 200) {
          this.router.navigate(['/checkout/checkout5', this.order.id]);
        }
      });
  }

  payByTransfer() {
    this.privateService.payment('debit', this.order.id).subscribe(
      resp => {
        if (resp.status === 200) {
          this.router.navigate(['/checkout/checkout5', this.order.id]);
        }
      });

  }


  canDeactivate(): Observable<boolean> | boolean {
    const p = this.dialogService.confirm('Do you want to void the order?');
    const o = fromPromise(p);
    o.subscribe(
      onOK => {
        if (onOK) {
          this.checkoutService.voidCurrentOrder();
        }
      });
    return o;
  }

}
