import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {IdNameBean} from '../../../api/models/id-name-bean';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-upsert-address',
    templateUrl: './upsert-address.component.html'
})
export class UpsertAddressComponent implements OnInit {

    address = {name: 'My address', location: { } } as Address;
    countries: IdNameBean[] = [];
    isUpdate = false;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
                private accountService: AccountService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                const id = params['id'];
                this.isUpdate = id > 0;
                if (this.isUpdate) {
                    this.accountService.getAddress({ id })
                        .pipe(
                            switchMap(address => {
                                this.address = address;
                                return this.commonService.getCountries();
                            }
                            )).subscribe(countries => {
                            this.countries = countries;
                            this.address.location.country = this.countries.find( country =>
                                country.id === this.address?.location?.country?.id || 0
                            ) || {} as IdNameBean;
                        });
                } else {
                    this.commonService.getCountries().subscribe(countries => {
                        this.countries = countries;
                        this.address.location.country = this.countries.find( country =>
                            country.id === Library.currentCountryId
                        ) || {} as IdNameBean;
                    });
                }
            });
    }


    save(addressBean: Address): void {
        if (this.isUpdate) {
            this.accountService.updateAddress({body: addressBean}).subscribe(
                (address) => {
                    this.router.navigate(['/account/addresses']);
                    this.authService.showAlert({type: 'success', msg: 'Address updated'});
                });
        } else {
            this.accountService.createAddress({body: addressBean}).subscribe(
                (address) => {
                    this.router.navigate(['/account/addresses']);
                    this.authService.showAlert({type: 'success', msg: 'New Address added'});
                });
        }
    }
}
