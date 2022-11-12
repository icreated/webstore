/**
 * Created by spok on 16/10/18.
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../authentication/auth.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //        this.authService.logout();
        this.authService.testIsAuthenticated();
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/signup'], {queryParams: {to: state.url}});
            /*
            if (state.url === '/checkout') {
              this.router.navigate(['/login'], { queryParams: { to: state.url }});
            } else {
              this.router.navigate(['/login']);
            }
      */
            return false;
        }
    }
}
