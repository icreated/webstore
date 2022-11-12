import {Component, OnInit} from '@angular/core';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {ApiService} from 'src/app/core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from 'src/app/core/services/cart.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    products: PriceListProduct[] = [];

    constructor(private apiService: ApiService, private cartService: CartService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const categoryId = +params['categoryId'];
                if (categoryId) {
                    this.apiService.getProducts(categoryId).subscribe(data => {
                        this.products = data;
                    });
                }
            });

        this.route.queryParams.subscribe(
            params => {
                const searchString = params['searchString'];
                if (searchString) {
                    this.apiService.getSearchingProducts(searchString).subscribe(data => {
                        this.products = data;
                    });
                }
            });
    }

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }

}
