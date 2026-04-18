import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileService } from '@core/services/file.service';
import { AccountService } from '@api/services/account.service';
import { Order } from '@api/models/order';
import { AlertService } from '@core/services/alert.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    standalone: true,
    imports: [RouterLink, CurrencyPipe, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
    private readonly accountService = inject(AccountService);
    private readonly route = inject(ActivatedRoute);
    private readonly fileService = inject(FileService);
    private readonly alertService = inject(AlertService);

    order = signal<Order | undefined>(undefined);

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.accountService.getOrder({ id }).subscribe(data => this.order.set(data));
    }

    voidOrder() {
        this.accountService.voidOrder({ id: this.order()!.id }).subscribe(order => {
            this.order.set(order);
            this.alertService.showAlert({ type: 'success', msg: 'Order has been voided' });
        });
    }

    downloadOrder() {
        const o = this.order()!;
        this.fileService.downloadFile(o.id, 'order', o.documentNo ?? 'order');
    }
}
