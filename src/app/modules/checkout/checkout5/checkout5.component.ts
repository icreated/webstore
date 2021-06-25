import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from 'src/app/shared/models/order';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {CartService} from 'src/app/core/services/cart.service';
import {FileService} from 'src/app/core/services/file.service';

@Component({
  selector: 'app-checkout5',
  providers: [FileService],
  templateUrl: './checkout5.component.html',
  styleUrls: ['./checkout5.component.scss']
})
export class Checkout5Component implements OnInit {

  order: Order = <Order>{shipAddress: {}, billAddress: {}};

  constructor(private router: Router, private checkoutService: CheckoutService, private route: ActivatedRoute,
              private privateService: PrivateService, private authService: AuthService,
              private cartService: CartService, private fileService: FileService) {
  }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        const id = params['id'];
        if (id > 0) {
          this.privateService.getOrder(id)
            .subscribe(
              (data: Order) => {
                this.order = data;
                if (this.order.docStatus === 'CO') {
                  this.authService.showAlert({type: 'success', msg: 'Order ' + this.order.documentNo + ' is validated'});
                  this.cartService.clearCart();
                  this.checkoutService.clear();
                } else if (this.order.docStatus === 'VO') {
                  this.authService.showAlert({type: 'warning', msg: 'Order ' + this.order.documentNo + ' is validated'});
                  this.checkoutService.voidCurrentOrder();
                }
              });
        }
      });
  }

  downloadOrder() {
    this.fileService.downloadfile(this.order.id, 'order', this.order.documentNo);
  }

}
