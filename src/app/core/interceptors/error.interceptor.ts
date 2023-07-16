import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private alertService: AlertService, private router: Router) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        if (error.status === 401) {

                            this.authService.logout();
                            this.router.navigate(['/signup']);
                            return throwError(errorMessage);
                        }
                    }
                    this.alertService.showAlert({type: 'danger', msg: error.error.message});

                    return throwError(errorMessage);
                })
            );
    }

}
