import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Address} from 'src/app/shared/models/address';
import {Router} from '@angular/router';
import {PrivateService} from 'src/app/core/services/private.service';
import {AuthService} from 'src/app/core/authentication/auth.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

  private _addressObservable: Observable<Address[]>;

  constructor(private router: Router, public privateService: PrivateService,
      private authService: AuthService) {}

  ngOnInit(): any {

   this._addressObservable = this.privateService.getAddresses();
   this._addressObservable.subscribe();

    /*
    this.privateService.getAddresses()
      .subscribe(
        addresses => this.addresses = addresses,
        error => this.error = <any>error
      );
      */
  }

  deleteAddress(item: Address) {
    this.privateService.deleteAddress(item)
      .subscribe(
        res => {
          if (res.status === 202) {
            const i = this.privateService.addresses.indexOf(item);
            this.privateService.addresses.splice(i, 1);
            this.authService.showAlert({type: 'success', msg: 'Address deleted'});
          } else {
            this.authService.showAlert({type: 'danger', msg: 'Address not deleted'});
          }
        }
      );
  }

  modifyAddress(address: Address) {
    this.router.navigate(['/account/new-address', address.id]);
  }

}
