import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {LocalStorageService} from './local.storage.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HEADERS, Library} from '../library';
import {SimpleItem} from 'src/app/shared/models/simple-item';
import {AuthService} from '../authentication/auth.service';
import {PriceListProduct} from '../../api/models/price-list-product';
import {CatalogService} from '../../api/services/catalog.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: WritableSignal<PriceListProduct[]> = signal([]);

    constructor(private catalogService: CatalogService, private storageService: LocalStorageService, private router: Router,
        private authService: AuthService) {

        effect(() => {
            this.saveCartToStorage();
        } );
    }

    addItem(item: PriceListProduct) {
        this.cart.mutate((basket) => {
            const productIn = basket
              .find((product) => product.id === item.id);
            if (productIn) {
              productIn.qty += 1;
            } else {
              item.qty = 1;
              basket.push(item);
            }
        });
    }


    saveCartToStorage() {
      if (this.cart().length > 0) {
        const simpleCart = this.cart().map((item) => {
          return {id: item.id, qty: item.qty};
        });
        this.storageService.save('cart', simpleCart);
      }
    }


    deleteItem(item: PriceListProduct) {
        const index = this.cart().indexOf(item);
        this.cart.mutate((basket) => basket.splice(index, 1));
        this.authService.showAlert({type: 'success', msg: 'Item has been removed from shopping cart'});
    }

    clearCart() {
        this.cart.set([]);
    }


    getCart() {
        return this.cart();
    }


    getCartFromStorage() {
        const cart: SimpleItem[] = this.storageService.get('cart');
        let ids: number[] = [];
        if (typeof cart !== 'undefined') {
          ids = cart.map(item => item.id);
          this.catalogService.getCart({'ids': ids})
            .subscribe((list) => {
              list.forEach((item) => {
                item.qty = cart.find(sItem => sItem.id === item.id)?.qty || 1;
              } );
              this.cart.set(list);
            });
        }
    }

    getTotalPrice() {
      return this.cart().reduce((sum, item) => (sum += item.price * item?.qty, sum), 0);
    }

}
