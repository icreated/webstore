import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';
import {Checkout4Component} from './checkout4.component';

describe('Checkout4Component', () => {
    let component: Checkout4Component;
    let fixture: ComponentFixture<Checkout4Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ Checkout4Component ],
        imports: [RouterTestingModule, HttpClientTestingModule, CoreModule]
      }).compileComponents();

      fixture = TestBed.createComponent(Checkout4Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
