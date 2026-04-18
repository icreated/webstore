import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Document } from '@api/models';
import { AccountService } from '@api/services/account.service';
import { AlertService } from '@core/services/alert.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    standalone: true,
    imports: [RouterLink, CurrencyPipe, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
    private readonly accountService = inject(AccountService);
    private readonly alertService = inject(AlertService);

    orders = signal<Document[]>([]);

    ngOnInit() {
        this.accountService.getOrders().subscribe(orders => this.orders.set(orders));
    }

    voidOrder(id: number) {
        this.accountService.voidOrder({ id }).subscribe(order => {
            this.orders.update(list => list.map(o => o.id === order.id ? order : o));
            this.alertService.showAlert({ type: 'success', msg: 'Order has been voided' });
        });
    }
}
