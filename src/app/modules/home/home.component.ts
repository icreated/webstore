import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/core/services/cart.service';
import {CatalogService} from '../../api/services/catalog.service';
import {PriceListProduct} from '../../api/models/price-list-product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    featuredProducts: PriceListProduct[] = [];

    constructor(private catalogService: CatalogService, private cartService: CartService) {
    }

    ngOnInit() {
        this.catalogService.getProductsFeatured()
            .subscribe(data => this.featuredProducts = data);
    }

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }

}
