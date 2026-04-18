import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {merge, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from '../../api/models/price-list-product';
import {CatalogService} from '../../api/services/catalog.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent {
    private catalogService = inject(CatalogService);
    private cartService = inject(CartService);
    private route = inject(ActivatedRoute);

    products = toSignal(
        merge(
            this.route.params.pipe(
                switchMap(params => {
                    const categoryId = +params['categoryId'];
                    return categoryId ? this.catalogService.getProducts({categoryId}) : EMPTY;
                })
            ),
            this.route.queryParams.pipe(
                switchMap(params => {
                    const searchString = params['searchString'];
                    return searchString ? this.catalogService.getProductsSearch({searchString}) : EMPTY;
                })
            )
        ),
        { initialValue: [] as PriceListProduct[] }
    );

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }
}
