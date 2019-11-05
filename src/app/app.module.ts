import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { CoreModule } from './core/core.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LocalStorageService } from './core/services/local.storage.service';
import { BsDropdownModule} from 'ngx-bootstrap';
import { SharedModule } from './shared/shared.module';
import { Library } from './core/library';
import { isPlatformBrowser } from '@angular/common';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from './core/services/checkout.service';

@NgModule({
  declarations: [
    AppComponent,FooterComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule.forRoot(),
    FormsModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
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
export class AppModule { }

export function jwtOptionsFactory(platformId) {
  return {
      tokenGetter: () => {
          let token = null;
          if (isPlatformBrowser(platformId)) {
              token = localStorage.getItem('token');
          }
          return token;
      },
      whitelistedDomains: [Library.API_DOMAIN]
  };
}
