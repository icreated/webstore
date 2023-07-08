import {Component} from '@angular/core';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from '../../api/models/price-list-product';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {

    constructor(public cartService: CartService) {
    }

    onCounterChange(item: PriceListProduct) {
        this.cartService.synchronize(item);
    }

    deleteItem(item: PriceListProduct) {
        this.cartService.deleteItem(item);
    }

    increment(item: PriceListProduct) {
        // @ts-ignore
      item.qty = item.qty + 1;
    }

    decrement(item: PriceListProduct) {
        if (item.qty === 1) {
            return;
        }
        // @ts-ignore
      item.qty = item.qty - 1;
    }

}
