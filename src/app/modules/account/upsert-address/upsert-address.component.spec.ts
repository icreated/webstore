import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAddressComponent } from './upsert-address.component';

describe('AddAddressComponent', () => {
  let component: UpsertAddressComponent;
  let fixture: ComponentFixture<UpsertAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
