import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PrivateService} from 'src/app/core/services/private.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Order} from 'src/app/shared/models/order';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    orders: Order[] = [];

    constructor(private router: Router, private privateService: PrivateService, private checkoutService: CheckoutService) {
    }

    ngOnInit(): void {
        this.privateService.getOrders()
            .subscribe(
                (orders: Order[]) => this.orders = orders
            );
    }
}
