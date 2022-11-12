import {BrowserModule} from '@angular/platform-browser';
import {NgModule, PLATFORM_ID} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {CoreModule} from './core/core.module';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {LocalStorageService} from './core/services/local.storage.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {SharedModule} from './shared/shared.module';
import {Library} from './core/library';
import {isPlatformBrowser} from '@angular/common';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {HttpErrorInterceptor} from './core/interceptors/error.interceptor';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {FormsModule} from '@angular/forms';


export const jwtOptionsFactory = (platformId: any) => ({
    tokenGetter: () => {
        let token = null;
        if (isPlatformBrowser(platformId)) {
            token = localStorage.getItem('token');
        }
        return token;
    },
    whitelistedDomains: [Library.apiDomain]
});


@NgModule({
    declarations: [
        AppComponent, FooterComponent, HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule.forRoot(),
        FormsModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [PLATFORM_ID]
            }
        })
    ],
    providers: [
        LocalStorageService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

