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

    selectedShipper: Shipper = {} as Shipper;
    shippers: Shipper[] = [];

    constructor(private router: Router, private commonService: CommonService, private cartService: CartService,
        private checkoutService: CheckoutService) {
    }

    ngOnInit(): void {
        // let countryId = 0;
        if (this.checkoutService.shipAddress) {
            // TODO: SPOK check if this is correct
            // countryId = this.checkoutService.shipAddress.location.country.id;
        }
        this.commonService.getShippers()
            .subscribe(
                (shippers: Shipper[]) => {
                    this.shippers = shippers;
                    this.selectedShipper = this.shippers[0];
                });
    }

    validate(shipper: Shipper) {
        this.checkoutService.setShipper(shipper);
        this.checkoutService.createOrder();
        this.cartService.clearCart();
        this.router.navigate(['/checkout/checkout4']);
    }

}
