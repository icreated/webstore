import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CoreModule} from '../../core/core.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
          declarations: [SignupComponent],
          imports: [RouterTestingModule, HttpClientTestingModule, CoreModule, FormsModule, ReactiveFormsModule]
        })
          .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
