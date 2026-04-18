import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { isJson } from '@shared/utils/utils';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    private readonly authService = inject(AuthService);
    private readonly alertService = inject(AlertService);
    private readonly router = inject(Router);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.error instanceof ErrorEvent) {
                    return throwError(() => `Error: ${errorResponse.error.message}`);
                }

                if (errorResponse.status === 401) {
                    this.authService.logout();
                    this.router.navigate(['/signup']);
                    return throwError(() => errorResponse.message);
                }

                const error = isJson(errorResponse.error) ? JSON.parse(errorResponse.error) : errorResponse.error;
                this.alertService.showAlert({ type: 'danger', msg: error.message });
                return throwError(() => `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.message}`);
            })
        );
    }
}
