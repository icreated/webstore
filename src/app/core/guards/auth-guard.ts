import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService.testIsAuthenticated();
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/signup'], { queryParams: { to: state.url } });
        return false;
    }
}
