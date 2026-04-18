import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Checkout4Component} from './checkout4.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Checkout4Component', () => {
    let component: Checkout4Component;
    let fixture: ComponentFixture<Checkout4Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
    declarations: [Checkout4Component],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

      fixture = TestBed.createComponent(Checkout4Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
