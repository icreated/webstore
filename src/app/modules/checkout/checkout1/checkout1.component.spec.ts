import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Checkout1Component} from './checkout1.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Checkout1Component', () => {
    let component: Checkout1Component;
    let fixture: ComponentFixture<Checkout1Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
    declarations: [Checkout1Component],
    imports: [RouterTestingModule, CoreModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

      fixture = TestBed.createComponent(Checkout1Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
