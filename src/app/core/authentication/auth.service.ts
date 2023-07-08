import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HEADERS, Library, OPTIONS} from '../library';
import {Token} from 'src/app/shared/models/token';
import {Alert} from 'src/app/shared/models/alert';
import {NewAccount} from 'src/app/shared/models/new-account';
import {UserCredentials} from '../../api/models/user-credentials';


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

    constructor(private http: HttpClient, private router: Router) {
    }


  login(username: string | undefined, password: string | undefined, redirectTo: string) {
        this.http.post<Token>(Library.apiEndpoint + 'auth/login', {username, password}, OPTIONS)
            .subscribe(
                (response: Token) => {
                    this.loggedIn = true;
                    localStorage.setItem('jwt', response.token);
                    this.onDecodedToken(response.token);
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

    signup(account: NewAccount, redirectTo: string) {
        delete account.confirmPassword;

        this.http.post<Token>(Library.apiEndpoint + 'account/signup', account, OPTIONS)
            .subscribe(
                (response: Token) => {
                    this.loggedIn = true;
                    localStorage.setItem('jwt', response.token);

                    this.onDecodedToken(response.token);
                    this.showAlert({type: 'success', msg: 'Welcome ' + this.decodedToken.name});
                    this.router.navigateByUrl('/' + redirectTo);
                },
                error => {
                    this.loggedIn = false;
                    this.router.navigateByUrl('/auth');
                    this.decodedToken = null;
                }
            );
    }


    forgotPassword(email: string) {
        return this.http.post<Token>(Library.apiEndpoint + 'login/password/forgot', {token: email}, OPTIONS);
    }

    changePassword(login: UserCredentials): Observable<HttpResponse<any>> {
        return this.http.post(Library.apiEndpoint + 'login/password/change', login, {
            headers: HEADERS,
            observe: 'response'
        });
    }


    updateToken(tokenJson: Token) {
        localStorage.setItem('jwt', tokenJson.token);
        this.onDecodedToken(tokenJson.token);
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

