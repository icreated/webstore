import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {CartService} from 'src/app/core/services/cart.service';
import {CommonService} from '../../../api/services/common.service';
import {Shipper} from '../../../api/models/shipper';


@Component({
    selector: 'app-checkout3',
    templateUrl: './checkout3.component.html',
    styleUrls: ['./checkout3.component.scss']
})
export class Checkout3Component implements OnInit {

    shippers: Shipper[] = [];

    constructor(private router: Router, private commonService: CommonService, private cartService: CartService,
        private checkoutService: CheckoutService) {
    }

    ngOnInit(): void {
        this.commonService.getShippers()
            .subscribe(shippers => this.shippers = shippers);
    }

    validate(shipper: Shipper) {
        this.checkoutService.getOrder().shipper = shipper;
        this.router.navigate(['/checkout/checkout4']);
    }

}
