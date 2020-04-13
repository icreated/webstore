import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
  }
];

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CollapseModule.forRoot(),
  ]
})
export class CatalogModule { }
