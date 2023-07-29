import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {Checkout3Component} from './checkout3.component';

describe('Checkout3Component', () => {
    let component: Checkout3Component;
    let fixture: ComponentFixture<Checkout3Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ Checkout3Component ],
        imports: [RouterTestingModule, HttpClientTestingModule, CoreModule]
      }).compileComponents();

      fixture = TestBed.createComponent(Checkout3Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
