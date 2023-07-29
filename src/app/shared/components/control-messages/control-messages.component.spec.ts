import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMessagesComponent } from './control-messages.component';

describe('ControlMessagesComponent', () => {
    let component: ControlMessagesComponent;
    let fixture: ComponentFixture<ControlMessagesComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
          declarations: [ControlMessagesComponent]
        })
          .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
