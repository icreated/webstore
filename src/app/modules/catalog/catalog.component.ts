import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from '../../api/models/price-list-product';
import {CatalogService} from '../../api/services/catalog.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    products: PriceListProduct[] = [];

    constructor(private catalogService: CatalogService, private cartService: CartService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const categoryId = this.route.snapshot.params['categoryId'];
        if (categoryId) {
            this.catalogService.getProducts({categoryId}).subscribe(data => this.products = data);
        }
        const searchString = this.route.snapshot.queryParams['searchString'];
        if (searchString) {
            this.catalogService.getProductsSearch(searchString).subscribe(data => this.products = data);
        }
    }

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }

}
