import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from 'src/app/shared/models/address';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {PrivateService} from 'src/app/core/services/private.service';
import {CartService} from 'src/app/core/services/cart.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Library} from 'src/app/core/library';
import {ApiService} from 'src/app/core/services/api.service';


@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.scss'],
})
export class Checkout1Component implements OnInit, OnDestroy {

  sub: any;
  billAddressSelected = true;
  address: Address;
  selectedCountry: IdNamePair;
  id: number;
  countries: IdNamePair[];

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
              public privateService: PrivateService, private cartService: CartService, private checkoutService: CheckoutService) {
  }


  ngOnInit(): void {
    this.checkoutService.order = null;
    this.checkoutService.shipAddress = null;
    this.checkoutService.billAddress = null;
    this.checkoutService.shipper = null;

    this.sub = this.route
      .params
      .subscribe(params => {
        this.address = <Address>{label: 'My address'};
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

  validateShipAddress(address: Address) {
    this.checkoutService.setShipAddress(address);
    this.router.navigate(['/checkout/checkout2']);
  }


  validateNewAddress(): void {
    this.address.countryId = this.selectedCountry.id;
    this.address.countryName = this.selectedCountry.name;

    this.privateService.createUpdateAddress(this.address).subscribe(
      (address) => {
        this.address = address;
        this.checkoutService.setShipAddress(address);
        if (this.billAddressSelected) {
          this.checkoutService.setBillAddress(address);
          this.router.navigate(['/checkout/checkout3']);
        } else {
          this.router.navigate(['/checkout/checkout2']);
        }
      },
      error => {
        console.log('ERROR ' + error);
      });
  }
}
