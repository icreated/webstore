import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule} from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot()
  ],
  providers: [

  ]
})
export class CoreModule { 


  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }


static forRoot(): ModuleWithProviders {
  return {
    ngModule: CoreModule,
    providers: [
      AuthService
    ]
  };
}
}


