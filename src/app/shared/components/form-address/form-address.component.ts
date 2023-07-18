import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../core/services/alert.service';
import {CommonService} from '../../../api/services/common.service';
import {switchMap} from 'rxjs/operators';
import {Library} from '../../../core/library';
import {IdNamePair} from '../../../api/models/id-name-pair';
import {EMPTY} from 'rxjs';

export interface FormAddressAction {
  label: string;
  icon: string;
  buttonClass: string;
}

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() id = 0;
  @Input() action: FormAddressAction = { label: 'Save', icon: 'fa-map-marker', buttonClass: 'btn-primary' };
  @Output() actionEvent = new EventEmitter<Address>();
  address: Address = { name: '', location: {} } as Address;
  countries: IdNamePair[] = [];


  constructor(private router: Router, private route: ActivatedRoute, private alertService: AlertService,
              private accountService: AccountService, private commonService: CommonService) {
  }

  ngOnInit(): void {

    this.isUpdate = this.id > 0;

    this.commonService.getCountries()
      .pipe(
        switchMap(countries => {
            this.countries = countries;
            if (this.isUpdate) {
              return this.accountService.getAddress({ 'id': this.id });
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

  }

  onSubmit(address: Address) {
    if (this.isUpdate) {
      this.accountService.updateAddress({body: address}).subscribe(
        () => {
          this.router.navigate(['/account/addresses']);
          this.alertService.showAlert({type: 'success', msg: 'Address updated'});
        });
    } else {
      this.accountService.createAddress({body: address}).subscribe(
        () => {
          this.actionEvent.emit(address);
          this.alertService.showAlert({type: 'success', msg: 'New Address added'});
        });
    }
  }

}
