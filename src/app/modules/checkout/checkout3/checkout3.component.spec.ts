import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Checkout3Component} from './checkout3.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Checkout3Component', () => {
    let component: Checkout3Component;
    let fixture: ComponentFixture<Checkout3Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
    declarations: [Checkout3Component],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

      fixture = TestBed.createComponent(Checkout3Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
