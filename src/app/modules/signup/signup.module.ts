import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SharedModule} from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: SignupComponent
    }
];

@NgModule({
    declarations: [SignupComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TabsModule.forRoot()
    ],
    providers: [
    ]
})
export class SignupModule { }
