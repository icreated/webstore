import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from 'src/app/core/services/cart.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {CommonService} from '../../../api/services/common.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';


@Component({
    selector: 'app-checkout1',
    templateUrl: './checkout1.component.html',
    styleUrls: ['./checkout1.component.scss'],
})
export class Checkout1Component implements OnInit {

    address: Address = {} as Address;
    addresses: Address[] = [];
    actions = [
      {label: 'Validate', icon: 'fa-truck', buttonClass: 'btn-success'},
    ];
    newAddressAction = {label: 'Create Delivery Address', icon: 'fa-plus', buttonClass: 'btn-primary'};

    constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
                public accountService: AccountService, private cartService: CartService, private checkoutService: CheckoutService) {
    }


    ngOnInit(): void {
      this.checkoutService.clear();
      this.address = {label: 'My address', location: {} } as unknown as Address;
      this.accountService.getAddresses()
        .subscribe(addresses => this.addresses = addresses);
    }

    validateAddress(address: Address): void {
      this.checkoutService.getOrder().shipAddress = address;
      this.router.navigate(['/checkout/checkout2']);
    }
}
