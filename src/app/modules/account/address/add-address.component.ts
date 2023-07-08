import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {IdNameBean} from '../../../api/models/id-name-bean';
import {Address} from '../../../api/models/address';

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html'
})
export class AddAddressComponent implements OnInit {

    sub: any;
    address = {name: 'My address'} as Address;
    selectedCountry: IdNameBean = {} as IdNameBean;
    countries: IdNameBean[] = [];

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
        private privateService: PrivateService, private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.sub = this.route
            .params
            .subscribe(params => {
                const id = params['id'];
                if (id) {
                    this.address = this.privateService.getAddress(id);
                    this.commonService.getCountries()
                        .subscribe(
                            (countries) => {
                                this.countries = countries;
                                this.selectedCountry = this.countries.filter(f => f.id === this.address?.location?.country?.id)[0];
                            });
                } else {
                    this.address = {} as Address;
                    this.commonService.getCountries()
                        .subscribe(
                            (countries) => {
                                this.countries = countries;
                                this.selectedCountry = this.countries.filter(f => f.id === Library.currentCountryId)[0];
                            });
                }
            });
    }


    save(addressBean: Address): void {
        if (this.selectedCountry.id != null) {
            // TODO: SPOK: Fix this
            // addressBean?.location?.country?.id = this.selectedCountry.id;
        }
        if (this.selectedCountry.name != null) {
            // TODO: SPOK: Fix this
            // addressBean?.location?.country?.name = this.selectedCountry.name;
        }

        this.privateService.createUpdateAddress(addressBean).subscribe(
            (address) => {
                this.address = address;
                this.router.navigate(['/account/addresses']);
                this.authService.showAlert({type: 'success', msg: 'Address added'});
            });
    }
}
