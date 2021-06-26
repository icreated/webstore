import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {PrivateService} from 'src/app/core/services/private.service';
import {Address} from 'src/app/shared/models/address';
import {Library} from 'src/app/core/library';
import {ApiService} from 'src/app/core/services/api.service';


@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.scss']
})
export class Checkout2Component implements OnInit, OnDestroy {

  sub: any;
  address: Address = {} as Address;
  selectedCountry: IdNamePair = {} as IdNamePair;
  countries: IdNamePair[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
              public privateService: PrivateService, private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.address = <Address>{label: 'Invoice address'};
        this.apiService.getCountries()
          .subscribe(
            (countries: IdNamePair[]) => {
              this.countries = countries;
              this.selectedCountry = this.countries.filter(f => f.id === Library.CURRENT_COUNTRY_ID)[0];
            });
      });
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
