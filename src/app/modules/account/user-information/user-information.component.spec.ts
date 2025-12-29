import { ComponentFixture, TestBed } from '@angular/core/testing';

import {UserInformationComponent} from './user-information.component';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserInformationComponent', () => {
    let component: UserInformationComponent;
    let fixture: ComponentFixture<UserInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    declarations: [UserInformationComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
            .compileComponents();

        fixture = TestBed.createComponent(UserInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
