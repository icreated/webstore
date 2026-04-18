import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Checkout5Component} from './checkout5.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Checkout5Component', () => {
    let component: Checkout5Component;
    let fixture: ComponentFixture<Checkout5Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
    declarations: [Checkout5Component],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

      fixture = TestBed.createComponent(Checkout5Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
