import { ComponentFixture, TestBed } from '@angular/core/testing';
import {UserPasswordComponent} from './user-password.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserPasswordComponent', () => {
    let component: UserPasswordComponent;
    let fixture: ComponentFixture<UserPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    declarations: [UserPasswordComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
            .compileComponents();

        fixture = TestBed.createComponent(UserPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
