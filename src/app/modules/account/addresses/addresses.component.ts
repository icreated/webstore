import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Address} from '../../../api/models/address';
import {AccountService} from '../../../api/services/account.service';
import {AddressAction} from '../../../shared/components/address/address.component';
import {AlertService} from '../../../core/services/alert.service';

const EDIT = 'Edit';
const DELETE = 'Delete';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesComponent implements OnInit {
    private router = inject(Router);
    private accountService = inject(AccountService);
    private alertService = inject(AlertService);

    addresses = signal<Address[]>([]);
    actions = [
        {label: EDIT, icon: 'fa-edit', buttonClass: 'btn-primary'},
        {label: DELETE, icon: 'fa-minus-circle', buttonClass: 'btn-danger'},
    ];

    ngOnInit(): void {
        this.accountService.getAddresses().subscribe(data => this.addresses.set(data));
    }

    actionEvent(action: AddressAction, address: Address) {
        switch (action.label) {
            case EDIT: this.editAddress(address); break;
            case DELETE: this.deleteAddress(address); break;
        }
    }

    editAddress(address: Address) {
        this.router.navigate(['/account/upsert-address', address.id]);
    }

    deleteAddress(item: Address) {
        this.accountService.deleteAddress$Response({id: item.id || 0}).subscribe(res => {
            if (res.status === 200) {
                this.addresses.update(list => list.filter(a => a.id !== item.id));
                this.alertService.showAlert({type: 'success', msg: 'Address deleted'});
            } else {
                this.alertService.showAlert({type: 'danger', msg: 'Address not deleted'});
            }
        });
    }
}
