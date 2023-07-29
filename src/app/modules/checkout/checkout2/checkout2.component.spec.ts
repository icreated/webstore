import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {Checkout2Component} from './checkout2.component';

describe('Checkout2Component', () => {
    let component: Checkout2Component;
    let fixture: ComponentFixture<Checkout2Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ Checkout2Component ],
        imports: [RouterTestingModule, HttpClientTestingModule, CoreModule]
      }).compileComponents();

      fixture = TestBed.createComponent(Checkout2Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
