import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {CartService} from 'src/app/core/services/cart.service';
import {CatalogService} from '../../api/services/catalog.service';
import {PriceListProduct} from '../../api/models/price-list-product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    private catalogService = inject(CatalogService);
    private cartService = inject(CartService);

    featuredProducts = toSignal(this.catalogService.getProductsFeatured(), { initialValue: [] as PriceListProduct[] });

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }
}
