import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {CatalogService} from '../../api/services/catalog.service';
import {ProductCategory} from '../../api/models/product-category';
import {PriceListProduct} from '../../api/models/price-list-product';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isCollapsed = false;
    decodedToken: any;

    categories: ProductCategory[] = [];

    constructor(private router: Router, private catalogService: CatalogService, private cartService: CartService,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.catalogService.getCategories().subscribe(data => {
            this.categories = data;
        });

        let cartItems = this.cartService.getCart();

        if (cartItems.length === 0) {
            this.cartService.getCartFromStorage().subscribe((res: PriceListProduct[]) => {
                if (!res) {
                    return;
                }
                cartItems = res;
                cartItems.forEach((item) => {
                    for (const sitem of this.cartService.getSimpleCart()) {
                        if (item.id === sitem.id) {
                            item.qty = sitem.qty;
                            break;
                        }
                    }
                });
                this.cartService.setCart(cartItems);
            });
        }


        this.authService.decodedToken$.subscribe(
            token => {
                this.decodedToken = token;
            });
        this.authService.testIsAuthenticated();
    }

    onSearch(event: any) {
        this.router.navigate(['/catalog/search'], {queryParams: {searchString: event.target.search.value}});
        event.target.search.value = '';
    }

    getCartCount() {
        return this.cartService.getCart().length;
    }

    isLogged() {
        return this.authService.isAuthenticated();
    }

    getConnectedUser() {
        return this.authService.getName();
    }

    logout() {
        this.decodedToken = null;
        this.authService.logout();
        // this.checkoutService.clear();
        this.router.navigate(['/']);
    }
}
