import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AuthService} from '@core/authentication/auth.service';
import {LocalStorageService} from '@core/services/local.storage.service';

@NgModule({ declarations: [], imports: [RouterModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule.forRoot()], providers: [AuthService, LocalStorageService, provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }


    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule
        };
    }
}


