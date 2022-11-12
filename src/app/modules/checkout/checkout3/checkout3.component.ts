import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Shipper} from 'src/app/shared/models/shipper';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {ApiService} from 'src/app/core/services/api.service';
import {CartService} from 'src/app/core/services/cart.service';


@Component({
    selector: 'app-checkout3',
    templateUrl: './checkout3.component.html',
    styleUrls: ['./checkout3.component.scss']
})
export class Checkout3Component implements OnInit {

    selectedShipper: Shipper = {} as Shipper;
    shippers: Shipper[] = [];

    constructor(private router: Router, private apiService: ApiService, private cartService: CartService,
        private checkoutService: CheckoutService, private privateService: PrivateService) {
    }

    ngOnInit(): void {
        let countryId = 0;
        if (this.checkoutService.shipAddress) {
            countryId = this.checkoutService.shipAddress.countryId;
        }
        this.apiService.getShippers(countryId)
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
