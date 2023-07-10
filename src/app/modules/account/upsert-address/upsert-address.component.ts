import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {IdNamePair} from '../../../api/models/id-name-pair';

@Component({
    selector: 'app-upsert-address',
    templateUrl: './upsert-address.component.html'
})
export class UpsertAddressComponent implements OnInit {

    address = {name: 'My address', location: { } } as Address;
    countries: IdNamePair[] = [];
    isUpdate = false;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
                private accountService: AccountService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.isUpdate = id > 0;

                this.commonService.getCountries()
                    .pipe(
                        switchMap(countries => {
                            this.countries = countries;
                            if (this.isUpdate) {
                                return this.accountService.getAddress({ id });
                            } else {
                                this.address.location.country = this.countries.find( country =>
                                    country.id === Library.defaultCountryId) || {} as IdNamePair;
                                return EMPTY;
                            }
                        }
                        )).subscribe(address => {
                        this.address = address;
                        this.address.location.country = this.countries.find( country =>
                            country.id === this.address?.location?.country?.id || 0) || {} as IdNamePair;
                    });
            });
    }


    save(): void {
        if (this.isUpdate) {
            this.accountService.updateAddress({body: this.address}).subscribe(
                (address) => {
                    this.router.navigate(['/account/addresses']);
                    this.authService.showAlert({type: 'success', msg: 'Address updated'});
                });
        } else {
            this.accountService.createAddress({body: this.address}).subscribe(
                (address) => {
                    this.router.navigate(['/account/addresses']);
                    this.authService.showAlert({type: 'success', msg: 'New Address added'});
                });
        }
    }
}
