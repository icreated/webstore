import {Component, effect} from '@angular/core';
import {CartService} from 'src/app/core/services/cart.service';
import {PriceListProduct} from '../../api/models/price-list-product';
import {CheckoutService} from '../../core/services/checkout.service';
import {Order} from '../../api/models/order';
import {Router} from '@angular/router';
import {DocumentLine} from '../../api/models/document-line';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {

    items: PriceListProduct[] = [];

    constructor(private cartService: CartService, private checkoutService: CheckoutService, private router: Router) {
      effect(() => {
        this.items = this.cartService.getCart();
      });
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

    checkout() {
      const order = {id: 0} as Order;
      order.lines = this.cartService.getCart()
          .map(item => {
            return {
              productId: item.id, name: item.name, description: item.description, qty: item.qty, price: item.price
            } as DocumentLine;
          });
        this.checkoutService.setOrder(order);
        this.router.navigate(['/checkout/checkout1']);
    }

    getTotalPrice() {
      return this.cartService.getTotalPrice();
    }

}
