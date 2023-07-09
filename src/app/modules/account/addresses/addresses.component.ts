import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {

    addresses: Address[] = [];

    constructor(private router: Router, public accountService: AccountService,
        private authService: AuthService) {}

    ngOnInit(): any {
        this.accountService.getAddresses()
            .subscribe(data => this.addresses = data);

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

    updateAddress(address: Address) {
        this.router.navigate(['/account/new-address', address.id]);
    }

}
