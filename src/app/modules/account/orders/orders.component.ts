import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Document} from 'src/app/api/models';
import {AccountService} from '../../../api/services/account.service';
import {AlertService} from '../../../core/services/alert.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
    private accountService = inject(AccountService);
    private alertService = inject(AlertService);

    orders = signal<Document[]>([]);

    voidOrder(id: number) {
        this.accountService.voidOrder({id}).subscribe(order => {
            this.orders.update(list => list.map(o => o.id === order.id ? order : o));
            this.alertService.showAlert({type: 'success', msg: 'Order has been voided'});
        });
    }

    ngOnInit(): void {
        this.accountService.getOrders().subscribe(orders => this.orders.set(orders));
    }
}
