import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@core/header/header.component';
import { FooterComponent } from '@core/footer/footer.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { RouterOutlet } from '@angular/router';
import { TokenInterceptor } from '@core/interceptors/token.interceptor';
import { HttpErrorInterceptor } from '@core/interceptors/error.interceptor';
import { AuthService } from '@core/authentication/auth.service';
import { LocalStorageService } from '@core/services/local.storage.service';
import { ApiModule } from '@api/api.module';
import { environment } from '@env/environment';

export const jwtOptionsFactory = (platformId: any) => ({
    tokenGetter: () => {
        let token = null;
        if (isPlatformBrowser(platformId)) {
            token = localStorage.getItem('token');
        }
        return token;
    },
    whitelistedDomains: environment.whitelistedDomains
});

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        ApiModule.forRoot({ rootUrl: environment.api.baseUrl }),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [PLATFORM_ID]
            }
        }),
        HeaderComponent,
        FooterComponent,
        AlertComponent,
        RouterOutlet,
    ],
    providers: [
        AuthService,
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
