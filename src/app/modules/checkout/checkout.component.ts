import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { CheckoutService } from '@core/services/checkout.service';
import { AccountService } from '@api/services/account.service';
import { CartService } from '@core/services/cart.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: false,
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

    ngOnInit() {
        this.checkoutService.setOrder({ ...this.order(), grandTotal: this.cartService.getTotalPrice() });
    }

    routeIsActive(routePath: string) {
        return routePath === '/checkout/checkout5'
            ? this.router.url.startsWith('/checkout/checkout5')
            : this.router.url === routePath;
    }
}
