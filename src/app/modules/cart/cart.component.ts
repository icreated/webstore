import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { PriceListProduct } from '@api/models/price-list-product';
import { CheckoutService } from '@core/services/checkout.service';
import { Order } from '@api/models/order';
import { Router, RouterLink } from '@angular/router';
import { DocumentLine } from '@api/models/document-line';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: true,
    imports: [CurrencyPipe, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
    private readonly cartService = inject(CartService);
    private readonly checkoutService = inject(CheckoutService);
    private readonly router = inject(Router);

    items = computed(() => this.cartService.getCart() ?? []);

    deleteItem(item: PriceListProduct) {
        this.cartService.deleteItem(item);
    }

    increment(item: PriceListProduct) {
        this.cartService.updateItemQty(item, item.qty + 1);
    }

    decrement(item: PriceListProduct) {
        if (item.qty === 1) return;
        this.cartService.updateItemQty(item, item.qty - 1);
    }

    checkout() {
        const order: Order = {
            id: 0,
            lines: this.cartService.getCart().map(item => ({
                productId: item.id, name: item.name, description: item.description, qty: item.qty, price: item.price
            } as DocumentLine))
        } as Order;
        this.checkoutService.setOrder(order);
        this.router.navigate(['/checkout/checkout1']);
    }

    getTotalPrice() {
        return this.cartService.getTotalPrice();
    }
}
