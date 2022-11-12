import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';


const routes: Routes = [
    {
        path: '',
        component: CartComponent
    }
];

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CollapseModule.forRoot(),
    ]
})
export class CartModule { }
