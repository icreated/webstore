import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {IdNamePair} from '../../../api/models/id-name-pair';


@Component({
    selector: 'app-checkout2',
    templateUrl: './checkout2.component.html',
    styleUrls: ['./checkout2.component.scss']
})
export class Checkout2Component implements OnInit, OnDestroy {

    sub: any;
    address: Address = {name: '', location: {address1: '', postal: '', city: '', country: {}}};
    selectedCountry: IdNamePair = {} as IdNamePair;
    countries: IdNamePair[] = [];
    addresses: Address[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
        public accountService: AccountService, private checkoutService: CheckoutService) {
    }

    ngOnInit(): void {
        this.sub = this.route
            .params
            .subscribe(params => {
                this.address = {name: 'Invoice address'} as Address;
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

    validateBillAddress(address: Address) {
        this.checkoutService.setBillAddress(address);
        this.router.navigate(['/checkout/checkout3']);
    }

    validateNewAddress() {
        console.log('VALIDATE NEW ADDRESS');
    }
}
