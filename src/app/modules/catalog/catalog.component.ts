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
        this.route.params.subscribe(
            params => {
                const categoryId = +params['categoryId'];
                if (categoryId) {
                    this.catalogService.getProducts({categoryId})
                        .subscribe(data => this.products = data);
                }
            });

        this.route.queryParams.subscribe(
            params => {
                const searchString = params['searchString'];
                if (searchString) {
                    this.catalogService.getProductsSearch({ searchString })
                        .subscribe(data => this.products = data);
                }
            });
    }

    add(event: Event ) {
      alert(event.target)
      const item = (event.target as any).item;
      alert('Item added to cart' + item)
      this.cartService.addItem(item);
    }

}
