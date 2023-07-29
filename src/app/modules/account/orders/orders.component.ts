import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Document} from 'src/app/api/models';
import {AccountService} from '../../../api/services/account.service';
import {AlertService} from '../../../core/services/alert.service';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    orders: Document[] = [];

    constructor(private router: Router, private accountService: AccountService, private alertService: AlertService) {
    }

    voidOrder(id: number) {
        this.accountService.voidOrder({ id }).subscribe(
            (order) => {
                const index = this.orders.findIndex((o) => o.id === order.id);
                this.orders[index] = order;
                this.alertService.showAlert({type: 'success', msg: 'Order has been voided'});
            }
        );
    }

    ngOnInit(): void {
        this.accountService.getOrders()
            .subscribe(
                (orders: Document[]) => this.orders = orders
            );
    }
}
