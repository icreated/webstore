import {Injectable} from '@angular/core';
import {LocalStorageService} from './local.storage.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {HEADERS, Library} from '../library';
import {SimpleItem} from 'src/app/shared/models/simple-item';
import {AuthService} from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: PriceListProduct[] = [];
  private simpleCart: SimpleItem[] = [];

  constructor(private http: HttpClient, private storageService: LocalStorageService, private router: Router,
              private authService: AuthService) {
    this.cart = [];
  }

  addItem(item: PriceListProduct) {
    this.cart.push(item);
    this.synchronize(item);
    this.authService.showAlert({type: 'success', msg: 'Item added to cart'});
  }

  synchronize(curItem: PriceListProduct) {

    if (typeof this.simpleCart === 'undefined') {
      this.simpleCart = [];
    }

    let updated = false;
    this.simpleCart.forEach((item, index) => {
      if (item.id === curItem.id) {
        item.qty = curItem.qty;
        updated = true;
      }
    });
    if (!updated) {
      const sObj = <SimpleItem>{};
      sObj.id = curItem.id;
      sObj.qty = curItem.qty;
      this.simpleCart.push(sObj);
    }
    this.storageService.save('cart', this.simpleCart);
  }

  deleteItem(item: PriceListProduct) {
    const index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
    this.simpleCart.splice(index, 1);
    this.storageService.save('cart', this.simpleCart);
    this.authService.showAlert({type: 'success', msg: 'L\'article a été supprimé du panier'});
  }

  clearCart() {
    this.cart = [];
    this.storageService.save('cart', []);
    this.simpleCart = [];
  }

  setCart(cart: PriceListProduct[]) {
    this.cart = cart;
  }

  getCart() {
    return this.cart;
  }

  getSimpleCart() {
    return this.simpleCart;
  }

  getCartFromStorage(): Observable<any> {
    this.simpleCart = this.storageService.get('cart');
    if (this.simpleCart === null || this.simpleCart === undefined) {
      this.storageService.save('cart', []);
      this.simpleCart = this.storageService.get('cart');
    }

    let params: HttpParams = new HttpParams();
    if (typeof this.simpleCart !== 'undefined') {
      for (const item of this.simpleCart) {
        params = params.append('id', item.id.toString());
      }
    }

    return this.http.get(Library.API_ENDPOINT + 'catalog/cart', {params: params, headers: HEADERS});
  }

  getTotalPrice() {
    const totalPrice = this.cart.reduce((sum, cartItem) => {
      return sum += cartItem.price * cartItem.qty, sum;
    }, 0);
    return totalPrice;
  }

}
