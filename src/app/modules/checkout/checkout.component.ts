import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {CheckoutService} from 'src/app/core/services/checkout.service';
import {Address} from '../../api/models/address';
import {AccountService} from '../../api/services/account.service';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {

    disabled = true;
    currentUrl = '/checkout/checkout1';

    private _addressObservable: Observable<Address[]> = EMPTY;

    constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService,
        private authService: AuthService, private checkoutService: CheckoutService) {
    }

    ngOnInit(): any {
        this._addressObservable = this.accountService.getAddresses();
        this._addressObservable.subscribe();
    }


    routeIsActive(routePath: string) {
        if (routePath === '/checkout/checkout5' && this.router.url.startsWith('/checkout/checkout5')) {
            return true;
        } else {
            return this.router.url === routePath;
        }
    }

}
