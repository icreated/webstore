import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAddressComponent } from './upsert-address.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('UpsertAddressComponent', () => {
    let component: UpsertAddressComponent;
    let fixture: ComponentFixture<UpsertAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ UpsertAddressComponent ],
            imports: [RouterTestingModule]
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
