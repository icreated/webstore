import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CoreModule} from '../../core/core.module';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
          declarations: [CartComponent],
          imports: [HttpClientTestingModule, CoreModule]
        })
          .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
