import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {Checkout5Component} from './checkout5.component';

describe('Checkout5Component', () => {
    let component: Checkout5Component;
    let fixture: ComponentFixture<Checkout5Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ Checkout5Component ],
        imports: [RouterTestingModule, HttpClientTestingModule, CoreModule]
      }).compileComponents();

      fixture = TestBed.createComponent(Checkout5Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
