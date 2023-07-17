import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {AddressAction} from '../../../shared/components/address/address.component';
import {AlertService} from '../../../core/services/alert.service';

const EDIT = 'Edit';
const DELETE = 'Delete';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {

    addresses: Address[] = [];
    actions = [
      {label: EDIT, icon: 'fa-edit', buttonClass: 'btn-primary'},
      {label: DELETE, icon: 'fa-minus-circle', buttonClass: 'btn-danger'},
      ];

    constructor(private router: Router, public accountService: AccountService,
        private alertService: AlertService) {}

    ngOnInit(): any {
        this.accountService.getAddresses()
            .subscribe(data => this.addresses = data);

    }

    actionEvent(action: AddressAction, address: Address) {
      switch (action.label) {
        case EDIT:
          this.updateAddress(address);
          break;
        case DELETE:
          this.deleteAddress(address);
          break;
      }
    }

    updateAddress(address: Address) {
      this.router.navigate(['/account/upsert-address', address.id]);
    }

    deleteAddress(item: Address) {
        this.accountService.deleteAddress$Response({id: item.id || 0})
            .subscribe(
                res => {
                  console.log(res.status);
                    if (res.status === 200) {
                        this.addresses = this.addresses.filter(a => a.id !== item.id);
                        this.alertService.showAlert({type: 'success', msg: 'Address deleted'});
                    } else {
                        this.alertService.showAlert({type: 'danger', msg: 'Address not deleted'});
                    }
                }
            );
    }

}


