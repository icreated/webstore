import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '@core/services/checkout.service';
import { FileService } from '@core/services/file.service';

@Component({
    selector: 'app-checkout5',
    providers: [FileService],
    templateUrl: './checkout5.component.html',
    styleUrls: ['./checkout5.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkout5Component {

    private readonly router = inject(Router);
    private readonly checkoutService = inject(CheckoutService);
    private readonly fileService = inject(FileService);

    readonly order = this.checkoutService.order;

    downloadOrder() {
        this.fileService.downloadFile(this.order().id, 'order', this.order().documentNo ?? 'order');
    }
}
