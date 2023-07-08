import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {FileService} from 'src/app/core/services/file.service';
import {AccountService} from '../../../api/services/account.service';
import {Order} from '../../../api/models/order';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    order!: Order;

    constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router,
        public checkoutService: CheckoutService, private fileService: FileService) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.accountService.getOrder(id)
                    .subscribe(
                        (data: Order) => {
                            this.order = data;
                        });
            });
    }

    downloadOrder() {
        // TODO: SPOK check if this is correct
        if (this.order && this.order.id && this.order.documentNo) {
            this.fileService.downloadfile(this.order.id, 'order', this.order.documentNo);
        }
    }
}
