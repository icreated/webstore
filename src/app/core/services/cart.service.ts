import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {LocalStorageService} from './local.storage.service';
import {Router} from '@angular/router';
import {SimpleItem} from 'src/app/shared/models/simple-item';
import {PriceListProduct} from '../../api/models/price-list-product';
import {CatalogService} from '../../api/services/catalog.service';
import {AlertService} from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cart: WritableSignal<PriceListProduct[]> = signal(this.storageService.get('cart'));

    constructor(private catalogService: CatalogService, private storageService: LocalStorageService, private router: Router,
        private alertService: AlertService) {

        effect(() => {
            this.saveCartToStorage();
        } );
    }

    addItem(item: PriceListProduct) {
        this.cart.mutate((basket) => {
            if(!basket) {
              basket = [];
            }
            const productIn = basket
              .find((product) => product.id === item.id);
            if (productIn) {
              productIn.qty += 1;
              this.alertService.showAlert({type: 'success', msg: 'Quantity has been updated'});
            } else {
              item.qty = 1;
              basket.push(item);
              this.alertService.showAlert({type: 'success', msg: 'Item has been added to shopping cart'});
            }
        });
    }


    saveCartToStorage() {
        if (Array.isArray(this.cart())) {
          const simpleCart = this.cart().map((item) => {
            return {id: item.id, qty: item.qty};
          });
          this.storageService.save('cart', simpleCart);
        }
    }


    deleteItem(item: PriceListProduct) {
        const index = this.cart().indexOf(item);
        this.cart.mutate((basket) => basket.splice(index, 1));
        this.alertService.showAlert({type: 'success', msg: 'Item has been removed from shopping cart'});
    }

    clearCart() {
        this.cart.set([]);
        this.storageService.save('cart', []);
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
