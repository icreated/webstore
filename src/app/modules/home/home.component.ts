import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '@core/services/cart.service';
import { CatalogService } from '@api/services/catalog.service';
import { PriceListProduct } from '@api/models/price-list-product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [CurrencyPipe, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    private readonly catalogService = inject(CatalogService);
    private readonly cartService = inject(CartService);

    featuredProducts = toSignal(this.catalogService.getProductsFeatured(), { initialValue: [] as PriceListProduct[] });

    add(item: PriceListProduct) {
        this.cartService.addItem(item);
    }
}
