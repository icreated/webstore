import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { CheckoutService } from '@core/services/checkout.service';
import { AccountService } from '@api/services/account.service';
import { CartService } from '@core/services/cart.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterOutlet, CurrencyPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly accountService = inject(AccountService);
    private readonly authService = inject(AuthService);
    private readonly checkoutService = inject(CheckoutService);
    private readonly cartService = inject(CartService);

    disabled = true;
    readonly order = this.checkoutService.order;

    readonly steps = [
        { index: 1, label: 'Delivery',  route: './checkout1', path: '/checkout/checkout1' },
        { index: 2, label: 'Invoice',   route: './checkout2', path: '/checkout/checkout2' },
        { index: 3, label: 'Shipper',   route: './checkout3', path: '/checkout/checkout3' },
        { index: 4, label: 'Payment',   route: './checkout4', path: '/checkout/checkout4' },
        { index: 5, label: 'Order',     route: './checkout5', path: '/checkout/checkout5' },
    ];

    ngOnInit() {
        this.checkoutService.setOrder({ ...this.order(), grandTotal: this.cartService.getTotalPrice() });
    }

    routeIsActive(routePath: string) {
        return routePath === '/checkout/checkout5'
            ? this.router.url.startsWith('/checkout/checkout5')
            : this.router.url === routePath;
    }

    get currentStep(): number {
        if (this.router.url.startsWith('/checkout/checkout5')) return 5;
        if (this.router.url === '/checkout/checkout4') return 4;
        if (this.router.url === '/checkout/checkout3') return 3;
        if (this.router.url === '/checkout/checkout2') return 2;
        return 1;
    }

    isStepActive(index: number): boolean {
        return index === this.currentStep;
    }

    isStepDone(index: number): boolean {
        return index < this.currentStep;
    }
}
