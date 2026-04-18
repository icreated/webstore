import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {CatalogService} from '@api/services/catalog.service';
import {CartService} from '@core/services/cart.service';
import {AuthService} from '@core/authentication/auth.service';
import {ProductCategory} from '@api/models/product-category';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    isCollapsed = false;

    private router = inject(Router);
    private catalogService = inject(CatalogService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);

    categories = toSignal(this.catalogService.getCategories(), { initialValue: [] as ProductCategory[] });
    cartCount = computed(() => this.cartService.getCart()?.length || 0);
    loggedUser = toSignal(this.authService.decodedToken$, { initialValue: null });

    ngOnInit() {
        this.cartService.getCartFromStorage();
        this.authService.testIsAuthenticated();
    }

    onSearch(event: any) {
        this.router.navigate(['/catalog/search'], {queryParams: {searchString: event.target.search.value}});
        event.target.search.value = '';
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
