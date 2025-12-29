import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {CoreModule} from '../../core/core.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
    declarations: [CartComponent],
    imports: [CoreModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
