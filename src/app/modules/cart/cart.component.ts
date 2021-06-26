import {Component} from '@angular/core';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';

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
    item.qty = item.qty + 1;
  }

  decrement(item: PriceListProduct) {
    if (item.qty === 1) {
      return;
    }
    item.qty = item.qty - 1;
  }

}
