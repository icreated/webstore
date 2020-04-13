import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { CoreModule } from 'src/app/core/core.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ControlMessagesComponent } from 'src/app/shared/components/control-messages/control-messages.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
