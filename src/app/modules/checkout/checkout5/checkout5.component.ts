import {Component, effect} from '@angular/core';
import {Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {FileService} from 'src/app/core/services/file.service';
import {Order} from '../../../api/models/order';

@Component({
    selector: 'app-checkout5',
    providers: [FileService],
    templateUrl: './checkout5.component.html',
    styleUrls: ['./checkout5.component.scss']
})
export class Checkout5Component {

    order: Order = {shipAddress: {}, billAddress: {}} as Order;

    constructor(private router: Router, private checkoutService: CheckoutService, private fileService: FileService) {
      effect(() => {
        this.order = this.checkoutService.getOrder();
      });
    }


    downloadOrder() {
        this.fileService.downloadFile(this.order.id, 'order', this.order.documentNo || 'order');
    }

}
