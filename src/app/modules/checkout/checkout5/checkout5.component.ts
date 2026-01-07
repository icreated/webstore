import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {FileService} from 'src/app/core/services/file.service';
import {Order} from '../../../api/models/order';

@Component({
    selector: 'app-checkout5',
    providers: [FileService],
    templateUrl: './checkout5.component.html',
    styleUrls: ['./checkout5.component.scss'],
    standalone: false
})
export class Checkout5Component {

    order = this.checkoutService.order;

    constructor(private router: Router, private checkoutService: CheckoutService, private fileService: FileService) {
    }


    downloadOrder() {
        this.fileService.downloadFile(this.order().id, 'order', this.order().documentNo || 'order');
    }

}
