import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from 'src/app/core/services/cart.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {IdNamePair} from '../../../api/models/id-name-pair';


@Component({
    selector: 'app-checkout1',
    templateUrl: './checkout1.component.html',
    styleUrls: ['./checkout1.component.scss'],
})
export class Checkout1Component implements OnInit, OnDestroy {

    sub: any;
    billAddressSelected = true;
    address: Address = {} as Address;
    selectedCountry: IdNamePair = {} as IdNamePair;
    countries: IdNamePair[] = [];
    addresses: Address[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
                public accountService: AccountService, private cartService: CartService, private checkoutService: CheckoutService) {
    }


    ngOnInit(): void {
        this.checkoutService.clear();

        this.sub = this.route
            .params
            .subscribe(params => {
                this.address = {label: 'My address'} as unknown as Address;
                this.commonService.getCountries()
                    .subscribe(
                        (countries: IdNamePair[]) => {
                            this.countries = countries;
                            this.selectedCountry = this.countries.filter(f => f.id === Library.defaultCountryId)[0];
                        });
            });

        this.accountService.getAddresses().subscribe(
            (addresses: Address[]) => {
                this.addresses = addresses;
            }
        );
    }

    ngOnDestroy(): any {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    validateShipAddress(address: Address) {
        this.checkoutService.setShipAddress(address);
        this.router.navigate(['/checkout/checkout2']);
    }


    validateNewAddress(): void {
        if (this.selectedCountry.id != null) {
            // @ts-ignore
            this.address.location.country.id = this.selectedCountry.id;
        }
        if (this.selectedCountry.name != null) {
            // @ts-ignore
            this.address.location.country.name = this.selectedCountry.name;
        }

        this.accountService.updateAddress({body: this.address}).subscribe(
            (address) => {
                // TODO: check if address is valid
                // this.address = address;
                // this.checkoutService.setShipAddress(address);
                // if (this.billAddressSelected) {
                //     this.checkoutService.setBillAddress(address);
                //     this.router.navigate(['/checkout/checkout3']);
                // } else {
                //     this.router.navigate(['/checkout/checkout2']);
                // }
            },
            error => {
                console.log('ERROR ' + error);
            });
    }
}
