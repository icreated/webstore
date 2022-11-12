import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {Address} from 'src/app/shared/models/address';
import {ApiService} from 'src/app/core/services/api.service';
import {Library} from 'src/app/core/library';

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html'
})
export class AddAddressComponent implements OnInit {

    sub: any;
    address = {label: 'My address'} as Address;
    selectedCountry: IdNamePair = {} as IdNamePair;
    countries: IdNamePair[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
        private privateService: PrivateService, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.sub = this.route
            .params
            .subscribe(params => {
                const id = params['id'];
                if (id) {
                    this.address = this.privateService.getAddress(id);
                    this.apiService.getCountries()
                        .subscribe(
                            (countries) => {
                                this.countries = countries;
                                this.selectedCountry = this.countries.filter(f => f.id === this.address.countryId)[0];
                            });
                } else {
                    this.address = {} as Address;
                    this.apiService.getCountries()
                        .subscribe(
                            (countries) => {
                                this.countries = countries;
                                this.selectedCountry = this.countries.filter(f => f.id === Library.currentCountryId)[0];
                            });
                }
            });
    }


    save(addressBean: Address): void {
        addressBean.countryId = this.selectedCountry.id;
        addressBean.countryName = this.selectedCountry.name;

        this.privateService.createUpdateAddress(addressBean).subscribe(
            (address) => {
                this.address = address;
                this.router.navigate(['/account/addresses']);
                this.authService.showAlert({type: 'success', msg: 'Address added'});
            });
    }
}
