import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { PrivateService } from 'src/app/core/services/private.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { Order } from 'src/app/shared/models/order';


@Component({

  selector: 'sp-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  error: String;

  constructor(private router:Router,
    private privateService: PrivateService, private checkoutService: CheckoutService)  {}

  ngOnInit():void {

    this.privateService.getOrders()
      .subscribe(
          (orders:Order[]) => this.orders = orders
      );
  }

/*
  payOrder(order:Order) {

    this.privateService.getOrder(order.id)
      .subscribe(
        data => {
          this.checkoutService.orderSource.next(data);
          this.checkoutService.order = data;
          this.checkoutService.shipAddress = data.shipAddress;
          this.checkoutService.billAddress = data.billAddress;
          this.checkoutService.shipper = data.shipper;
          this.router.navigate(['/checkout/checkout4']);
        });

  }
*/




}
