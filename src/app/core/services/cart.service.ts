import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@core/services/local.storage.service';
import { Router } from '@angular/router';
import { SimpleItem } from '@shared/models/simple-item';
import { PriceListProduct } from '@api/models/price-list-product';
import { CatalogService } from '@api/services/catalog.service';
import { AlertService } from '@core/services/alert.service';

const CART_STORAGE_KEY = 'cartArray';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly storageService = inject(LocalStorageService);
    private readonly catalogService = inject(CatalogService);
    private readonly alertService = inject(AlertService);
    private readonly router = inject(Router);

    private readonly cart = signal<PriceListProduct[]>(this.storageService.get(CART_STORAGE_KEY) ?? []);

    constructor() {
        effect(() => this.saveCartToStorage());
    }

    addItem(item: PriceListProduct) {
        this.cart.update(basket => {
            const existing = basket.find(p => p.id === item.id);
            if (existing) {
                this.alertService.showAlert({ type: 'success', msg: 'Quantity has been updated' });
                return basket.map(p => p === existing ? { ...p, qty: p.qty + 1 } : p);
            }
            this.alertService.showAlert({ type: 'success', msg: 'Item has been added to shopping cart' });
            return [...basket, { ...item, qty: 1 }];
        });
    }

    deleteItem(item: PriceListProduct) {
        this.cart.update(basket => basket.filter(p => p !== item));
        this.alertService.showAlert({ type: 'success', msg: 'Item has been removed from shopping cart' });
    }

    clearCart() {
        this.cart.set([]);
        this.storageService.save(CART_STORAGE_KEY, []);
    }

    getCart() {
        return this.cart();
    }

    updateItemQty(item: PriceListProduct, qty: number) {
        this.cart.update(list => list.map(p => p === item ? { ...p, qty } : p));
    }

    getTotalPrice() {
        return this.cart().reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    getCartFromStorage() {
        const cart: SimpleItem[] = this.storageService.get(CART_STORAGE_KEY);
        if (!cart?.length) return;

        const ids = cart.map(item => item.id);
        this.catalogService.getCart({ ids }).subscribe(list => {
            const hydrated = list.map(item => ({
                ...item,
                qty: cart.find(s => s.id === item.id)?.qty ?? 1
            }));
            this.cart.set(hydrated);
        });
    }

    private saveCartToStorage() {
        if (!Array.isArray(this.cart())) return;
        const simpleCart = this.cart().map(({ id, qty }) => ({ id, qty }));
        this.storageService.save(CART_STORAGE_KEY, simpleCart);
    }
}
