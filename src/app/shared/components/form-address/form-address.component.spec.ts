import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddressComponent } from './form-address.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('FormAddressComponent', () => {
  let component: FormAddressComponent;
  let fixture: ComponentFixture<FormAddressComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [FormAddressComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(FormAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
