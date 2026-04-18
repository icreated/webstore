import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CatalogComponent', () => {
    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
    declarations: [CatalogComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
          .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
