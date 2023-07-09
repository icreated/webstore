import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';


@Component({
    selector: 'app-address',
    templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {

    private _addressObservable: Observable<Address[]> = EMPTY;

    addresses: Address[] = [];

    constructor(private router: Router, public accountService: AccountService,
        private authService: AuthService) {}

    ngOnInit(): any {
        // TODO: SPOK: Fix this
        // this._addressObservable = this.accountService.getAddresses();
        // this._addressObservable.subscribe();


        this.accountService.getAddresses()
            .subscribe(
                addresses => this.addresses = addresses,
            );

    }

    deleteAddress(item: Address) {
        this.accountService.deleteAddress({id: item?.id || 0})
            .subscribe(
                res => {
                    // TODO: SPOK: Fix this
                    // if (res.status === 202) {
                    //     const i = this.accountService.addresses.indexOf(item);
                    //     this.accountService.addresses.splice(i, 1);
                    //     this.authService.showAlert({type: 'success', msg: 'Address deleted'});
                    // } else {
                    //     this.authService.showAlert({type: 'danger', msg: 'Address not deleted'});
                    // }
                }
            );
    }

    modifyAddress(address: Address) {
        this.router.navigate(['/account/new-address', address.id]);
    }

}
