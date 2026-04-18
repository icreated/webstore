import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CheckoutService } from '@core/services/checkout.service';


@Injectable({
    providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {

    private readonly checkoutService = inject(CheckoutService);
    private readonly router = inject(Router);

    canActivate(next: ActivatedRouteSnapshot) {
        const url = next.url.toString();

        if (url === 'checkout2' && !this.checkoutService.shipAddress) {
            this.router.navigate(['/checkout/checkout1']);
        } else if (url === 'checkout3') {
            if (!this.checkoutService.shipAddress) {
                this.router.navigate(['/checkout/checkout1']);
            } else if (!this.checkoutService.billAddress) {
                this.router.navigate(['/checkout/checkout2']);
            }
        }
        return true;
    }
}
