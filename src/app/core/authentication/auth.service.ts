import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {Alert} from 'src/app/shared/models/alert';
import {UserCredentials} from '../../api/models/user-credentials';
import {AuthenticationService} from '../../api/services/authentication.service';
import {Token} from '../../api/models/token';
import {AccountService} from '../../api/services/account.service';
import {NewAccountForm} from '../../api/models/new-account-form';


@Injectable()
export class AuthService {

    decodedToken: any;
    decodedTokenSource = new Subject<string>();
    decodedToken$ = this.decodedTokenSource.asObservable();
    jwtHelper: JwtHelperService = new JwtHelperService();

    alertSource = new Subject<Alert>();
    alert$ = this.alertSource.asObservable();

    logoutSource = new Subject<boolean>();
    logout$ = this.logoutSource.asObservable();


    private loggedIn = false;
    private name = '';

    constructor(private authenticationService: AuthenticationService, private accountService: AccountService,
                private router: Router) {
    }


    login(userCredentials: UserCredentials, redirectTo: string) {

        this.authenticationService.authenticateUser$Response({body: userCredentials}).subscribe(
            (response: HttpResponse<Token>) => {
                this.loggedIn = true;
                localStorage.setItem('jwt', response.body?.token || '');
                this.onDecodedToken(response.body?.token || '');
                this.showAlert({type: 'success', msg: 'Welcome ' + this.decodedToken.name});
                this.router.navigateByUrl('/' + redirectTo);
            },
            error => {
                this.loggedIn = false;
                this.router.navigateByUrl('/signup');
                this.decodedToken = null;
                this.showAlert({type: 'warning', msg: 'Credentials are wrong'});
            }
        );

    }

    signup(account: NewAccountForm, redirectTo: string) {
        delete account.confirmPassword;
        this.accountService.signup$Response({body: account}).subscribe(
            (response: HttpResponse<Token>) => {
                this.loggedIn = true;
                localStorage.setItem('jwt', response.body?.token || '');
                this.onDecodedToken(response.body?.token || '');
                this.showAlert({type: 'success', msg: 'Welcome ' + this.decodedToken.name});
                this.router.navigateByUrl('/' + redirectTo);
            },
            error => {
                this.loggedIn = false;
                this.router.navigateByUrl('/signup');
                this.decodedToken = null;
            }
        );
    }

    updateToken(tokenJson: Token) {
        localStorage.setItem('jwt', tokenJson.token || '');
        this.onDecodedToken(tokenJson.token || '');
    }

    testIsAuthenticated() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            this.onDecodedToken(jwt);
            this.loggedIn = true;
        }
    }

    isAuthenticated() {
        return this.loggedIn;
    }

    getName() {
        return this.name;
    }

    public getToken(): string {
        return localStorage.getItem('jwt') as string;
    }

    onDecodedToken(token: string) {
        try {
            this.decodedToken = token ? this.jwtHelper.decodeToken(token) : this.decodedToken = null;
            this.name = this.decodedToken.name;
            this.decodedTokenSource.next(this.decodedToken);
        } catch (e) {
            this.logout();
            this.router.navigateByUrl('/auth');
        }

    }

    logout() {
        this.loggedIn = false;
        this.decodedToken = null;
        localStorage.removeItem('jwt');
        this.logoutSource.next(true);
    }

    showAlert(alert: Alert) {
        this.alertSource.next(alert);
    }

}

