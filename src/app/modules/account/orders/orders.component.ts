import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Document} from 'src/app/api/models';
import {AccountService} from '../../../api/services/account.service';


@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

    orders: Document[] = [];

    constructor(private router: Router, private accountService: AccountService) {
    }

    voidOrder(id: number) {
        this.accountService.voidOrder({ id });
    }

    ngOnInit(): void {
        this.accountService.getOrders()
            .subscribe(
                (orders: Document[]) => this.orders = orders
            );
    }
}
