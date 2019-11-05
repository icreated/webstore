import { Injectable }             from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { CheckoutService } from '../services/checkout.service';



@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(private checkoutService: CheckoutService, private router: Router) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (next.url.toString() === 'checkout1') {
     // this.router.navigate(['/auth/checkout']);
    } else if (next.url.toString() === 'checkout2') {
        if (!this.checkoutService.shipAddress) {
          this.router.navigate(['/checkout/checkout1']);
        }
    } else if (next.url.toString() === 'checkout3') {

      if (!this.checkoutService.shipAddress) {
        this.router.navigate(['/checkout/checkout1']);
      } else if (!this.checkoutService.billAddress) {
        this.router.navigate(['/checkout/checkout2']);
      }
    } else if (next.url.toString().match(/^(checkout4|checkout4i|checkout5)/)) {

    }

    return true;
  }
}
