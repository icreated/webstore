import { ApplicationConfig, importProvidersFrom, PLATFORM_ID } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';
import { HttpErrorInterceptor } from '@core/interceptors/error.interceptor';
import { AuthService } from '@core/authentication/auth.service';
import { LocalStorageService } from '@core/services/local.storage.service';
import { ApiModule } from '@api/api.module';
import { environment } from '@env/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        importProvidersFrom(
            CollapseModule,
            BsDropdownModule,
            ApiModule.forRoot({ rootUrl: environment.api.baseUrl }),
            JwtModule.forRoot({
                jwtOptionsProvider: {
                    provide: JWT_OPTIONS,
                    useFactory: (platformId: any) => ({
                        tokenGetter: () => isPlatformBrowser(platformId) ? localStorage.getItem('token') : null,
                        whitelistedDomains: environment.whitelistedDomains
                    }),
                    deps: [PLATFORM_ID]
                }
            })
        ),
        AuthService,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ]
};
