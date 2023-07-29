import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Checkout1Component} from './checkout1.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../../core/core.module';

describe('Checkout1Component', () => {
    let component: Checkout1Component;
    let fixture: ComponentFixture<Checkout1Component>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ Checkout1Component ],
        imports: [RouterTestingModule, HttpClientTestingModule, CoreModule]
      }).compileComponents();

      fixture = TestBed.createComponent(Checkout1Component);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
