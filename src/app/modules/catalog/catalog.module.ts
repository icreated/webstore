import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
  }
];

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    AngularFontAwesomeModule,
    CommonModule,
    RouterModule.forChild(routes),
    CollapseModule.forRoot(),
  ]
})
export class CatalogModule { }
