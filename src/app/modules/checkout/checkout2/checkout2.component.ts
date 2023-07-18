import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Library} from 'src/app/core/library';
import {CommonService} from '../../../api/services/common.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {IdNamePair} from '../../../api/models/id-name-pair';
import {AddressAction} from '../../../shared/components/address/address.component';

const VALIDATE = 'Validate';

@Component({
    selector: 'app-checkout2',
    templateUrl: './checkout2.component.html',
    styleUrls: ['./checkout2.component.scss']
})
export class Checkout2Component implements OnInit {

  address: Address = {} as Address;
  addresses: Address[] = [];
  actions = [
    {label: 'Validate', icon: 'fa-bank', buttonClass: 'btn-success'},
  ];
  newAddressAction = {label: 'Create Invoice Address', icon: 'fa-plus', buttonClass: 'btn-primary'};

    constructor(private router: Router, private route: ActivatedRoute, private commonService: CommonService,
        public accountService: AccountService, private checkoutService: CheckoutService) {
    }

  ngOnInit(): void {
    this.address = {label: 'Invoice address', location: {} } as unknown as Address;
    this.accountService.getAddresses()
      .subscribe(addresses => this.addresses = addresses);
  }

  validateAddress(address: Address): void {
    this.checkoutService.getOrder().billAddress = address;
    this.router.navigate(['/checkout/checkout3']);
  }
}
